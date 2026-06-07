'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

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

function mapCardToEvent(card: any): UpcomingEvent {
  const gallery = Array.isArray(card.metadata?.gallery) ? card.metadata.gallery : [];
  const imageUrl =
    card.imageUrl ||
    gallery.find((item: any) => item.type === 'image')?.url ||
    gallery[0]?.url ||
    '';

  return {
    id: card.id || card.slug || '',
    title: card.title || card.name || '',
    description: card.description || card.body || '',
    date: card.publishedAt || card.metadata?.date || '',
    time: card.metadata?.time || card.time || '',
    location: card.metadata?.location || card.venue || card.category || '',
    imageUrl,
    partnerLogos: card.metadata?.partnerLogos || [],
    category: (card.cardType === 'EVENT' ? 'EVENT' : (card.category || 'EVENT')).toString().toUpperCase(),
    attendees: card.metadata?.attendees || card.attendees || 0,
    featured: Boolean(card.featured || card.metadata?.featured),
    publishedAt: card.publishedAt,
    status: card.status,
  };
}

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const [liked, setLiked] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            const dateA = new Date(a.date).getTime() || 0;
            const dateB = new Date(b.date).getTime() || 0;
            return dateA - dateB;
          });

        if (!mounted) return;
        setEvents(mapped);
        if (!selectedEvent && mapped.length > 0) {
          setSelectedEvent(mapped[0]);
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
  }, [selectedEvent]);

  const handleJoinEvent = async () => {
    if (!selectedEvent) return;
    setRegistering(true);
    setRegisterStatus({ type: 'idle', message: '' });

    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: selectedEvent.id, email: 'user@example.com' }),
      });
      const data = await res.json();

      if (res.ok) {
        setRegisterStatus({ type: 'success', message: 'Successfully registered!' });
      } else {
        setRegisterStatus({ type: 'error', message: data.error || 'Failed to register' });
      }
    } catch (err) {
      setRegisterStatus({ type: 'error', message: 'Failed to register' });
    } finally {
      setRegistering(false);
      setTimeout(() => setRegisterStatus({ type: 'idle', message: '' }), 5000);
    }
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

  const countdownTarget = selectedEvent.date || selectedEvent.publishedAt || new Date().toISOString();

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
              <p className="text-xs uppercase tracking-[0.2em] text-[#bfe8c9] mb-2">Event starts in</p>
              <CountdownTimer targetDate={countdownTarget} />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleJoinEvent}
                  disabled={registering}
                  className="inline-flex items-center px-4 py-2 bg-white text-[#006400] rounded-lg font-semibold shadow-lg shadow-black/10 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  {registering ? 'Registering...' : 'Join Event'}
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
              {registerStatus.message && (
                <div
                  className={`text-xs p-2 rounded-lg text-center ${
                    registerStatus.type === 'success' ? 'bg-emerald-400/20 text-emerald-100' : 'bg-red-400/20 text-red-100'
                  }`}
                >
                  {registerStatus.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Other Upcoming Events</h4>
            <div className="bg-white/10 p-2 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                {events.map((event) => (
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
    </section>
  );
}
