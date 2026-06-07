'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Share2, Heart } from 'lucide-react';
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
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Events are loaded from the backend API at runtime


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
          minutes: Math.floor((distance / 1000 / 60) % 60),
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
        <div key={idx} className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white">{String(unit.value).padStart(2, '0')}</div>
          <div className="text-xs text-white/60 mt-1">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const [liked, setLiked] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

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

  useEffect(() => {
    let mounted = true;
    async function loadEvents() {
      try {
        const res = await fetch('/api/events?limit=6&upcoming=true');
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.events || data.items || data.data || [];
        const mapped = items.map((it: any) => ({
          id: it.id,
          title: it.title || it.name || '',
          date: it.date || it.publishedAt || it.startDate || it.metadata?.date || '',
          time: it.time || it.metadata?.time || '',
          location: it.location || it.venue || it.metadata?.location || '',
          description: it.description || it.body || '',
          imageUrl: it.imageUrl || it.image || (it.media?.[0]?.url) || '',
          partnerLogos: it.partnerLogos || it.metadata?.partnerLogos || [],
          category: it.category || it.type || '',
          attendees: it.attendees || it.metadata?.attendees || 0,
          featured: Boolean(it.featured),
        }));
        if (!mounted) return;
        setEvents(mapped);
        if (mapped.length > 0) setSelectedEvent(mapped[0]);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    }

    loadEvents();
    return () => { mounted = false; };
  }, []);

  if (!selectedEvent) return null;

  return (
    <section className="relative overflow-hidden py-12">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-right-center bg-no-repeat opacity-100" style={{ backgroundImage: `url('${selectedEvent.imageUrl}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
          {/* Left Content */}
          <div className="max-w-[360px] lg:self-start">
            <p className="text-sm uppercase tracking-[0.25em] text-[#bfe8c9]">Upcoming Events</p>
            <h3 className="text-2xl font-bold leading-tight mt-4">
              {selectedEvent.title}
            </h3>

            {/* Event Details */}
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

            {/* Countdown */}
            <div className="mt-4 pt-3 border-t border-white/20">
              <p className="text-xs uppercase tracking-[0.2em] text-[#bfe8c9] mb-2">Event starts in</p>
              <CountdownTimer targetDate={selectedEvent.date} />
            </div>

            {/* Action Buttons */}
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
                <div className={`text-xs p-2 rounded-lg text-center ${
                  registerStatus.type === 'success' ? 'bg-emerald-400/20 text-emerald-100' : 'bg-red-400/20 text-red-100'
                }`}>
                  {registerStatus.message}
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Events Grid */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Other Upcoming Events</h4>
            <div className="bg-white/10 p-2 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`p-3 text-left transition ${
                    selectedEvent.id === event.id ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="text-sm font-semibold leading-snug mb-1 line-clamp-2">
                    {event.title}
                  </div>
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

