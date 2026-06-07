'use client';

import React, { useState } from 'react';
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

// Sample events data
const ALL_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Forest Conservation Summit 2026',
    date: '2026-07-15',
    time: '09:00 AM',
    location: 'Lusaka, Zambia',
    description: 'Join us for an intensive summit on forest conservation strategies and climate resilience initiatives. This event brings together leading experts, policymakers, and environmental advocates to discuss sustainable forest management practices.',
    imageUrl: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    partnerLogos: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/v1779726699/logo_placeholder1_abc123.png',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/v1779726699/logo_placeholder2_def456.png',
    ],
    category: 'SUMMIT',
    attendees: 250,
    featured: true,
  },
  {
    id: '2',
    title: 'Children\'s Climate Action Workshop',
    date: '2026-08-10',
    time: '02:00 PM',
    location: 'Livingstone, Zambia',
    description: 'An interactive workshop empowering children to lead climate action in their communities. Through hands-on activities and group discussions, children will learn about environmental conservation.',
    imageUrl: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    partnerLogos: [],
    category: 'WORKSHOP',
    attendees: 100,
    featured: false,
  },
  {
    id: '3',
    title: 'Water Resources Management Seminar',
    date: '2026-09-05',
    time: '10:00 AM',
    location: 'Ndola, Zambia',
    description: 'A comprehensive seminar on sustainable water resource management in Southern Africa. Participants will learn about water conservation techniques and community-based water projects.',
    imageUrl: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    partnerLogos: [],
    category: 'SEMINAR',
    attendees: 150,
    featured: false,
  },
  {
    id: '4',
    title: 'Community Clean-Up Initiative',
    date: '2026-07-22',
    time: '08:00 AM',
    location: 'Zambia (Multiple Locations)',
    description: 'Join our nationwide clean-up initiative to remove plastic waste from rivers, forests, and communities. This volunteer-driven event aims to raise awareness about environmental conservation.',
    imageUrl: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    partnerLogos: [],
    category: 'VOLUNTEER',
    attendees: 500,
    featured: false,
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function EventsPage() {
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...new Set(ALL_EVENTS.map(e => e.category))];
  
  const filteredEvents = selectedCategory === 'ALL' 
    ? ALL_EVENTS 
    : ALL_EVENTS.filter(e => e.category === selectedCategory);

  const toggleLike = (eventId: string) => {
    const newLiked = new Set(likedEvents);
    if (newLiked.has(eventId)) {
      newLiked.delete(eventId);
    } else {
      newLiked.add(eventId);
    }
    setLikedEvents(newLiked);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-r from-[#008000]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#008000] mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Join us for meaningful events that drive environmental change and community engagement across Zambia.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
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

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {/* Event Image */}
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

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Event Details */}
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
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Action Buttons */}
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
        </div>
      </section>
    </main>
  );
}
