'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import EventRegistrationModal from '../events/EventRegistrationModal';

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  partnerLogos: string[];
  category: string;
  attendees?: number;
  featured?: boolean;
  publishedAt?: string;
  status?: string;
  durationMinutes?: number;
  startDateTime?: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = target - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-3">
      {[
        { value: countdown.days, label: 'Days' },
        { value: countdown.hours, label: 'Hours' },
        { value: countdown.minutes, label: 'Mins' },
        { value: countdown.seconds, label: 'Secs' },
      ].map((unit, idx) => (
        <div key={idx} className="bg-[#008000]/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[#008000]">{String(unit.value).padStart(2, '0')}</div>
          <div className="text-xs text-gray-600 mt-1">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString || 'TBD';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function combineDateAndTime(dateString: string, timeString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const hasTime = dateString.includes('T') || /\b(AM|PM)\b/i.test(timeString);
  if (!Number.isNaN(date.getTime()) && hasTime) {
    return dateString;
  }

  const datePart = dateString.split('T')[0] || dateString;
  const timePart = timeString || '00:00';
  return `${datePart}T${timePart}`;
}

function getEventStatus(event: UpcomingEvent, now: number) {
  const start = new Date(event.startDateTime || combineDateAndTime(event.date, event.time)).getTime();
  const durationMs = (event.durationMinutes || 60) * 60 * 1000;
  const end = start + durationMs;

  if (Number.isNaN(start) || start === 0) {
    return { status: 'upcoming' as const, label: 'Date TBD', targetTime: now };
  }

  if (now < start) {
    return { status: 'upcoming' as const, label: 'Upcoming', targetTime: start };
  }

  if (now < end) {
    return { status: 'live' as const, label: 'In session', targetTime: end };
  }

  return { status: 'ended' as const, label: 'Ended', targetTime: end };
}

function mapCardToEvent(card: any): UpcomingEvent {
  const gallery = Array.isArray(card.metadata?.gallery) ? card.metadata.gallery : [];
  const imageUrl =
    card.imageUrl ||
    gallery.find((item: any) => item.type === 'image')?.url ||
    gallery[0]?.url ||
    '';
  const eventDate = card.metadata?.date || card.publishedAt || '';
  const eventTime = card.metadata?.time || card.time || '';

  return {
    id: card.id || card.slug || '',
    title: card.title || card.name || '',
    description: card.description || card.body || '',
    date: eventDate,
    time: eventTime,
    startDateTime: combineDateAndTime(eventDate, eventTime),
    location: card.metadata?.location || card.venue || card.category || '',
    imageUrl,
    partnerLogos: card.metadata?.partnerLogos || [],
    category: (card.cardType === 'EVENT' ? 'EVENT' : (card.category || 'EVENT')).toString().toUpperCase(),
    attendees: card.metadata?.attendees || card.attendees || 0,
    featured: Boolean(card.featured || card.metadata?.featured),
    publishedAt: card.publishedAt,
    status: card.status,
    durationMinutes: card.metadata?.durationMinutes || card.metadata?.duration || 60,
  };
}

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const [liked, setLiked] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeEvents = events.filter((event) => {
    const start = new Date(event.startDateTime || combineDateAndTime(event.date, event.time)).getTime();
    const end = start + ((event.durationMinutes || 60) * 60 * 1000);
    return !Number.isNaN(start) && end > now;
  });

  const selectedStatus = selectedEvent ? getEventStatus(selectedEvent, now) : null;
  const countdownLabel = selectedStatus?.status === 'live' ? 'Time remaining' : selectedStatus?.status === 'ended' ? 'Event ended' : 'Event starts in';
  const countdownTarget = selectedStatus ? new Date(selectedStatus.targetTime).toISOString() : new Date().toISOString();

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadEvents() {
      try {
        const res = await fetch('/api/communications/cards?cardType=EVENT&take=6');
        const data = await res.json();
        const cards = Array.isArray(data) ? data : data.cards || data.contentCards || [];

        const mapped = cards
          .filter(
            (card: any) =>
              card &&
              (card.cardType === 'EVENT' || card.category === 'event' || card.category === 'EVENT') &&
              (card.status === 'PUBLISHED' || Boolean(card.publishedAt))
          )
          .map(mapCardToEvent)
          .sort((a: UpcomingEvent, b: UpcomingEvent) => {
            const startA = new Date(a.startDateTime || combineDateAndTime(a.date, a.time)).getTime() || 0;
            const startB = new Date(b.startDateTime || combineDateAndTime(b.date, b.time)).getTime() || 0;
            return startA - startB;
          });

        if (!mounted) return;
        setEvents(mapped);
        if (!selectedEvent && mapped.length > 0) {
          const nextActive = mapped.find((event: UpcomingEvent) => {
            const start = new Date(event.startDateTime || combineDateAndTime(event.date, event.time)).getTime();
            const durationMs = (event.durationMinutes || 60) * 60 * 1000;
            return !Number.isNaN(start) && start + durationMs > Date.now();
          });
          setSelectedEvent(nextActive || mapped[0]);
        }
      } catch (err) {
        console.error('Failed to load upcoming events', err);
        if (!mounted) return;
        setError('Unable to load upcoming events.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadEvents();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;

    const { status } = getEventStatus(selectedEvent, now);
    if (status === 'ended') {
      const nextEvent = activeEvents.find((event) => getEventStatus(event, now).status !== 'ended');
      if (nextEvent && nextEvent.id !== selectedEvent.id) {
        setSelectedEvent(nextEvent);
      } else if (!nextEvent) {
        setSelectedEvent(null);
      }
    }
  }, [now, activeEvents, selectedEvent]);

  const handleJoinEvent = () => {
    setIsRegistrationModalOpen(true);
  };

  if (loading) {
    return (
      <section className="relative overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-600">
          <p>Loading upcoming events...</p>
        </div>
      </section>
    );
  }

  if (error || !selectedEvent) {
    return (
      <section className="relative overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-600">
          <p>{error || 'No upcoming events are available at the moment.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-12">
      <div className="absolute inset-0">
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-right-center bg-no-repeat opacity-100"
          style={{ backgroundImage: `url('${selectedEvent.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
          <div className="max-w-[360px] lg:self-start">
            <p className="text-sm uppercase tracking-[0.25em] text-[#bfe8c9]">Upcoming Events</p>
            <h3 className="text-2xl font-bold leading-tight mt-4">{selectedEvent.title}</h3>
            {selectedStatus && (
              <div className="mt-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#bfe8c9]">
                {selectedStatus.label}
              </div>
            )}

            <div className="space-y-2 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#bfe8c9]" />
                <span>{formatDate(selectedEvent.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#bfe8c9]" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#bfe8c9]" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20">
              <p className="text-xs uppercase tracking-[0.2em] text-[#bfe8c9] mb-2">{countdownLabel}</p>
              <CountdownTimer targetDate={countdownTarget} />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleJoinEvent}
                  className="inline-flex items-center px-4 py-2 bg-white text-[#006400] rounded-lg font-semibold shadow-lg shadow-black/10 transition hover:bg-slate-50"
                >
                  Join Event
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                >
                  <Heart size={18} fill={liked ? 'white' : 'none'} />
                </button>
                <button className="inline-flex items-center justify-center p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Other Upcoming Events</h4>
            <div className="bg-white/10 p-2 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                {activeEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`p-3 text-left transition ${
                      selectedEvent.id === event.id ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm font-semibold leading-snug mb-1 line-clamp-2">{event.title}</div>
                    <div className="text-xs text-white/70 space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        {event.location}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-white/20">
                <Link href="/events">
                  <button className="w-full text-center py-2 text-sm font-semibold text-white hover:bg-white/10 rounded transition">
                    View All Events
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventRegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          eventId={selectedEvent.id}
          eventTitle={selectedEvent.title}
          eventDate={formatDate(selectedEvent.date)}
        />
      )}
    </section>
  );
}
