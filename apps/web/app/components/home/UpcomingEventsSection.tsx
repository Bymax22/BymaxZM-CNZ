'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import EventRegistrationModal from '../events/EventRegistrationModal';
import { fetchLikeCount, updateLikeCount } from '../../../lib/supabaseContent';

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

interface BackendEvent {
  id?: string;
  slug?: string;
  title?: string;
  name?: string;
  description?: string;
  body?: string;
  startDate?: string;
  date?: string;
  endDate?: string;
  durationMinutes?: number;
  location?: string;
  venue?: string;
  imageUrl?: string;
  partnerLogos?: string[];
  type?: string;
  category?: string;
  maxAttendees?: number;
  attendees?: number;
  isPublic?: boolean;
  featured?: boolean;
  publishedAt?: string;
  createdAt?: string;
  status?: string;
  isOnline?: boolean;
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
    <div className="grid grid-cols-4 gap-2">
      {[
        { value: countdown.days, label: 'Days' },
        { value: countdown.hours, label: 'Hours' },
        { value: countdown.minutes, label: 'Mins' },
        { value: countdown.seconds, label: 'Secs' },
      ].map((unit, idx) => (
        <div key={idx} className="bg-[#ff8c00] rounded-lg p-2 text-center">
          <div className="text-xl font-bold text-white">{String(unit.value).padStart(2, '0')}</div>
          <div className="text-[10px] text-white/80 mt-1">{unit.label}</div>
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

function normalizeTimeString(timeString: string) {
  const value = (timeString || '00:00').trim();
  if (!value) return '00:00';

  const ampmMatch = value.match(/^([0-9]{1,2})(?::([0-9]{2}))?\s*(AM|PM)$/i);
  if (ampmMatch) {
    let hour = Number(ampmMatch[1]);
    const minute = Number(ampmMatch[2] ?? '0');
    const period = (ampmMatch[3] ?? '').toUpperCase();

    if (!period) {
      return '00:00';
    }

    if (hour === 12) {
      hour = period === 'AM' ? 0 : 12;
    } else if (period === 'PM') {
      hour += 12;
    }

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  }

  const hmsMatch = value.match(/^([0-9]{1,2}):([0-9]{2})(?::([0-9]{2}))?$/);
  if (hmsMatch) {
    return `${String(Number(hmsMatch[1])).padStart(2, '0')}:${String(Number(hmsMatch[2])).padStart(2, '0')}`;
  }

  const hourOnlyMatch = value.match(/^([0-9]{1,2})$/);
  if (hourOnlyMatch) {
    return `${String(Number(hourOnlyMatch[1])).padStart(2, '0')}:00`;
  }

  return '00:00';
}

function combineDateAndTime(dateString: string, timeString: string) {
  if (!dateString) return '';

  const datePart = dateString.split('T')[0] || dateString;
  const normalizedTime = normalizeTimeString(timeString || '00:00');
  return `${datePart}T${normalizedTime}`;
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

function mapBackendEventToUpcomingEvent(event: BackendEvent): UpcomingEvent {
  const startDate = event.startDate || event.date || '';
  const endDate = event.endDate || '';
  const durationMinutes = event.durationMinutes
    || Math.max(60, Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60)))
    || 60;

  return {
    id: event.id || event.slug || '',
    title: event.title || event.name || '',
    description: event.description || event.body || '',
    date: startDate,
    time: '',
    location: event.location || event.venue || '',
    imageUrl: event.imageUrl || '',
    partnerLogos: event.partnerLogos || [],
    category: (event.type || event.category || 'EVENT').toString().toUpperCase(),
    attendees: event.maxAttendees || event.attendees || 0,
    featured: Boolean(event.isPublic ?? event.featured),
    publishedAt: event.publishedAt || event.createdAt || '',
    status: event.status || (event.isOnline ? 'ONLINE' : 'UPCOMING'),
    durationMinutes,
    startDateTime: startDate,
  };
}

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeCount, setLikeCount] = useState<Record<string, number>>({});
  const [shareCount, setShareCount] = useState<Record<string, number>>({});
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

    async function loadCountsForSelectedEvent() {
      if (!selectedEvent) return;

      try {
        const fetchedLikeCount = await fetchLikeCount('event', selectedEvent.id);
        const fetchedShareCount = await fetchLikeCount('event_share', selectedEvent.id);

        if (!mounted) return;
        setLikeCount((prev) => ({ ...prev, [selectedEvent.id]: fetchedLikeCount }));
        setShareCount((prev) => ({ ...prev, [selectedEvent.id]: fetchedShareCount }));
      } catch (err) {
        console.error('Error loading counts for event:', err);
        if (!mounted) return;
        setLikeCount((prev) => ({ ...prev, [selectedEvent.id]: 0 }));
        setShareCount((prev) => ({ ...prev, [selectedEvent.id]: 0 }));
      }
    }

    loadCountsForSelectedEvent();
    return () => {
      mounted = false;
    };
  }, [selectedEvent]);

  useEffect(() => {
    let mounted = true;

    async function loadEvents() {
      try {
        console.log('📡 Fetching upcoming events from /api/events?limit=6&upcoming=true');
        const res = await fetch('/api/events?limit=6&upcoming=true');
        const data = await res.json();
        const eventsData = Array.isArray(data) ? data : data.events || [];

        const mapped = eventsData
          .map(mapBackendEventToUpcomingEvent)
          .sort((a: UpcomingEvent, b: UpcomingEvent) => {
            const startA = new Date(a.startDateTime || combineDateAndTime(a.date, a.time)).getTime() || 0;
            const startB = new Date(b.startDateTime || combineDateAndTime(b.date, b.time)).getTime() || 0;
            return startA - startB;
          });

        if (!mounted) return;
        setEvents(mapped);
        if (mapped.length > 0) {
          const nextActive = mapped.find((event: UpcomingEvent) => {
            const start = new Date(event.startDateTime || combineDateAndTime(event.date, event.time)).getTime();
            const durationMs = (event.durationMinutes || 60) * 60 * 1000;
            return !Number.isNaN(start) && start + durationMs > Date.now();
          });
          setSelectedEvent(nextActive || mapped[0]);
        }
      } catch (err) {
        console.error('❌ Failed to load upcoming events', err);
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

  const handleLike = async () => {
    if (!selectedEvent) return;

    const isCurrentlyLiked = !!liked[selectedEvent.id];
    const delta = isCurrentlyLiked ? -1 : 1;

    setLiked((prev) => ({ ...prev, [selectedEvent.id]: !isCurrentlyLiked }));
    
    try {
      const nextCount = await updateLikeCount('event', selectedEvent.id, delta);
      setLikeCount((prev) => ({ ...prev, [selectedEvent.id]: nextCount }));
    } catch (err) {
      console.error('Error updating like count:', err);
      // Revert on error
      setLiked((prev) => ({ ...prev, [selectedEvent.id]: isCurrentlyLiked }));
    }
  };

  const handleShare = async () => {
    if (!selectedEvent) return;

    try {
      const nextCount = await updateLikeCount('event_share', selectedEvent.id, 1);
      setShareCount((prev) => ({ ...prev, [selectedEvent.id]: nextCount }));
    } catch (err) {
      console.error('Error updating share count:', err);
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

  return (
    <section className="relative overflow-hidden py-8">
      <div className="absolute inset-0">
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-right-center bg-no-repeat opacity-100"
          style={{ backgroundImage: `url('${selectedEvent.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
          <div className="max-w-[520px] lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#bfe8c9]">Upcoming Events</p>
            <h3 className="text-xl lg:text-2xl font-semibold leading-tight mt-3">{selectedEvent.title}</h3>
            {selectedStatus && (
              <div className="mt-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#bfe8c9]">
                {selectedStatus.label}
              </div>
            )}

            <div className="mt-3 text-xs sm:text-sm text-white/90 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <Calendar size={14} className="text-[#bfe8c9]" />
                {formatDate(selectedEvent.date)}
              </span>
              <span className="text-[#bfe8c9]">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} className="text-[#bfe8c9]" />
                {selectedEvent.time}
              </span>
              <span className="text-[#bfe8c9]">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} className="text-[#bfe8c9]" />
                {selectedEvent.location}
              </span>
            </div>

            <div className="mt-3 pt-2 border-t border-white/20">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#bfe8c9] mb-2">{countdownLabel}</p>
              <CountdownTimer targetDate={countdownTarget} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                onClick={handleJoinEvent}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-[#006400] rounded-lg font-semibold shadow-lg shadow-black/10 text-sm transition hover:bg-slate-50"
              >
                Join Event
                <span className="rounded-full bg-[#006400] px-2 py-0.5 text-[10px] font-semibold text-white">
                  {selectedEvent.attendees || 0}
                </span>
              </button>
              <button
                onClick={handleLike}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm transition hover:bg-white/20"
              >
                <Heart size={16} fill={liked[selectedEvent.id] ? 'white' : 'none'} />
                <span>{likeCount[selectedEvent.id] ?? 0}</span>
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm transition hover:bg-white/20"
              >
                <Share2 size={16} />
                <span>{shareCount[selectedEvent.id] ?? 0}</span>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3">Other Upcoming Events</h4>
            <div className="bg-white/10 p-1.5 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                {activeEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`p-2 text-left transition ${
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
              <div className="p-1.5 border-t border-white/20">
                <Link href="/events">
                  <button className="w-full text-center py-1.5 text-xs font-semibold text-white hover:bg-white/10 rounded transition">
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
