'use client';

import React, { useEffect, useState } from 'react';
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
  publishedAt?: string;
  status?: string;
  durationMinutes?: number;
  startDateTime?: string;
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

function getRelativeTime(start: number, end: number, now: number) {
  if (now < start) {
    const diff = start - now;
    const minutes = Math.ceil(diff / (1000 * 60));
    return `Starts in ${minutes} min`;
  }

  if (now < end) {
    const diff = end - now;
    const minutes = Math.ceil(diff / (1000 * 60));
    return `Ends in ${minutes} min`;
  }

  const diff = now - end;
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.ceil(diff / (1000 * 60));
    return `${minutes} min ago`;
  }

  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.ceil(diff / (1000 * 60 * 60));
    return `${hours} hr ago`;
  }

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function getEventStatus(event: UpcomingEvent) {
  const now = Date.now();
  const start = new Date(event.startDateTime || combineDateAndTime(event.date, event.time)).getTime();
  const durationMs = (event.durationMinutes || 60) * 60 * 1000;
  const end = start + durationMs;

  if (Number.isNaN(start) || start === 0) {
    return 'Date TBD';
  }

  return getRelativeTime(start, end, now);
}

function mapCardToEvent(card: any): UpcomingEvent {
  const gallery = Array.isArray(card.metadata?.gallery) ? card.metadata.gallery : [];
  const imageUrl =
    card.imageUrl ||
    gallery.find((item: any) => item.type === 'image')?.url ||
    gallery[0]?.url ||
    '';

  const date = card.metadata?.date || card.publishedAt || '';
  const time = card.metadata?.time || card.time || '';
  const startDateTime = combineDateAndTime(date, time);

  return {
    id: card.id || card.slug || '',
    title: card.title || card.name || '',
    description: card.description || card.body || '',
    date,
    time,
    location: card.metadata?.location || card.venue || card.category || '',
    imageUrl,
    partnerLogos: card.metadata?.partnerLogos || [],
    category: (card.cardType === 'EVENT' ? 'EVENT' : (card.category || 'EVENT')).toString().toUpperCase(),
    attendees: card.metadata?.attendees || card.attendees || 0,
    featured: Boolean(card.featured || card.metadata?.featured),
    publishedAt: card.publishedAt,
    status: card.status,
    durationMinutes: card.metadata?.durationMinutes || card.metadata?.duration || 60,
    startDateTime,
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadEvents() {
      try {
        const res = await fetch('/api/communications/cards?cardType=EVENT&take=50');
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
      } catch (err) {
        console.error('Failed to load events', err);
        if (!mounted) return;
        setError('Unable to load events. Please try again later.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadEvents();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = ['ALL', ...Array.from(new Set(events.map((event) => event.category).filter(Boolean)))];
  const filteredEvents =
    selectedCategory === 'ALL'
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const toggleLike = (eventId: string) => {
    setLikedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden py-16 bg-gradient-to-r from-[#008000]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#008000] mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Join us for meaningful events that drive environmental change and community engagement across Zambia.
          </p>
        </div>
      </section>

      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-[#008000] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="relative h-48 bg-gray-300 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-block bg-[#008000] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[#008000]" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#008000]" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[#008000]" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                            {getEventStatus(event)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <Link href={`/events/${event.id}`} className="flex-1">
                          <button className="w-full px-4 py-2 bg-[#008000] text-white rounded-lg font-semibold hover:bg-[#006400] transition">
                            View Details
                          </button>
                        </Link>
                        <button
                          onClick={() => toggleLike(event.id)}
                          className={`p-2 rounded-lg transition ${
                            likedEvents.has(event.id)
                              ? 'bg-red-100 text-red-500'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Heart size={18} fill={likedEvents.has(event.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No events found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
