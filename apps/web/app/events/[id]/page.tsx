'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users, Heart, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
    id: card.relatedId || card.id || card.slug || '',
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

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  useEffect(() => {
    let mounted = true;

    async function loadEvent() {
      if (!eventId) {
        setError('Event ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/communications/card/${encodeURIComponent(eventId)}`);
        const card = await res.json();

        if (!res.ok) {
          throw new Error(card.error || 'Event not found');
        }

        if (!mounted) return;
        setEvent(mapCardToEvent(card));
      } catch (err) {
        console.error('Failed to load event', err);
        if (!mounted) return;
        setError((err as Error).message || 'Unable to load event.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadEvent();
    return () => {
      mounted = false;
    };
  }, [eventId]);

  const handleJoinEvent = async () => {
    if (!event) return;
    setRegistering(true);
    setRegisterStatus({ type: 'idle', message: '' });

    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, email: 'user@example.com' }),
      });
      const data = await res.json();

      if (res.ok) {
        setRegisterStatus({ type: 'success', message: 'Successfully registered for the event!' });
      } else {
        setRegisterStatus({ type: 'error', message: data.error || 'Failed to register.' });
      }
    } catch (err) {
      setRegisterStatus({ type: 'error', message: 'Failed to register for event.' });
    } finally {
      setRegistering(false);
      setTimeout(() => setRegisterStatus({ type: 'idle', message: '' }), 5000);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading event details...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'We could not find the event you are looking for.'}</p>
          <Link href="/events">
            <button className="inline-flex items-center px-6 py-3 bg-[#008000] text-white rounded-lg font-semibold hover:bg-[#006400] transition">
              <ArrowLeft size={18} className="mr-2" />
              Back to Events
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const countdownTarget = event.date || event.publishedAt || new Date().toISOString();

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#008000]/10 to-transparent py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/events">
            <button className="inline-flex items-center text-[#008000] font-semibold hover:text-[#006400] transition mb-4">
              <ArrowLeft size={18} className="mr-2" />
              Back to Events
            </button>
          </Link>
        </div>
      </div>

      <div className="relative h-96 bg-gray-300 overflow-hidden">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className="inline-block bg-[#008000] text-white text-sm font-bold px-4 py-2 rounded-full">
            {event.category}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} className="text-[#008000]" />
                    <span className="text-sm font-semibold">Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatDate(event.date)}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock size={18} className="text-[#008000]" />
                    <span className="text-sm font-semibold">Time</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{event.time}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin size={18} className="text-[#008000]" />
                    <span className="text-sm font-semibold">Location</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-700 mb-8">
              <Users size={20} className="text-[#008000]" />
              <span className="font-semibold">{event.attendees || 0}+ attendees expected</span>
            </div>

            {event.partnerLogos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Partners</h2>
                <div className="flex flex-wrap gap-4">
                  {event.partnerLogos.map((logo, idx) => (
                    <img key={idx} src={logo} alt={`Partner logo ${idx}`} className="h-12 object-contain" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#008000]/5 to-transparent rounded-lg p-6 mb-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Starts In</h3>
              <CountdownTimer targetDate={countdownTarget} />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleJoinEvent}
                disabled={registering}
                className="w-full px-6 py-3 bg-[#008000] text-white rounded-lg font-semibold hover:bg-[#006400] transition disabled:opacity-50"
              >
                {registering ? 'Registering...' : 'Join Event'}
              </button>
              {registerStatus.message && (
                <div
                  className={`text-sm p-3 rounded-lg ${
                    registerStatus.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {registerStatus.message}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition border-2 flex items-center justify-center gap-2 ${
                    liked
                      ? 'bg-red-100 border-red-500 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                  {liked ? 'Liked' : 'Like'}
                </button>
                <button className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
