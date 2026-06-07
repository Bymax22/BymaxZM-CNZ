'use client';

import React, { useState } from 'react';
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
}

// Sample events data
const ALL_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Forest Conservation Summit 2026',
    date: '2026-07-15',
    time: '09:00 AM',
    location: 'Lusaka, Zambia',
    description: 'Join us for an intensive summit on forest conservation strategies and climate resilience initiatives. This event brings together leading experts, policymakers, and environmental advocates to discuss sustainable forest management practices. We will explore innovative solutions to combat deforestation, protect biodiversity, and promote sustainable land use.',
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
    description: 'An interactive workshop empowering children to lead climate action in their communities. Through hands-on activities and group discussions, children will learn about environmental conservation, the impact of climate change, and how they can make a difference. This workshop is designed for children ages 8-16.',
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
    description: 'A comprehensive seminar on sustainable water resource management in Southern Africa. Participants will learn about water conservation techniques and community-based water projects. This event is open to policymakers, water resource managers, and community leaders.',
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
    description: 'Join our nationwide clean-up initiative to remove plastic waste from rivers, forests, and communities. This volunteer-driven event aims to raise awareness about environmental conservation and the impact of plastic pollution. All volunteers are welcome!',
    imageUrl: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    partnerLogos: [],
    category: 'VOLUNTEER',
    attendees: 500,
    featured: false,
  },
];

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

  React.useEffect(() => {
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
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;
  
  const event = ALL_EVENTS.find(e => e.id === eventId);
  const [liked, setLiked] = useState(false);

  if (!event) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
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

  return (
    <main className="min-h-screen bg-white">
      {/* Header with Back Button */}
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

      {/* Hero Image */}
      <div className="relative h-96 bg-gray-300 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-block bg-[#008000] text-white text-sm font-bold px-4 py-2 rounded-full">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>

            {/* Quick Info */}
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

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {event.description}
              </p>
            </div>

            {/* Expected Attendees */}
            <div className="flex items-center gap-2 text-gray-700 mb-8">
              <Users size={20} className="text-[#008000]" />
              <span className="font-semibold">{event.attendees || 0}+ attendees expected</span>
            </div>

            {/* Partners */}
            {event.partnerLogos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Partners</h2>
                <div className="flex flex-wrap gap-4">
                  {event.partnerLogos.map((logo, idx) => (
                    <img
                      key={idx}
                      src={logo}
                      alt={`Partner logo ${idx}`}
                      className="h-12 object-contain"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Countdown */}
            <div className="bg-gradient-to-br from-[#008000]/5 to-transparent rounded-lg p-6 mb-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Starts In</h3>
              <CountdownTimer targetDate={event.date} />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-[#008000] text-white rounded-lg font-semibold hover:bg-[#006400] transition">
                Join Event
              </button>
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

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase">Share Event</h3>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Facebook
                </button>
                <button className="w-full py-2 px-4 bg-blue-400 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition">
                  Twitter
                </button>
                <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events */}
      <section className="bg-gray-50 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALL_EVENTS.filter(e => e.id !== eventId).slice(0, 2).map(relatedEvent => (
              <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="h-40 bg-gray-300 overflow-hidden">
                    <img
                      src={relatedEvent.imageUrl}
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">{relatedEvent.title}</h3>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(relatedEvent.date)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
