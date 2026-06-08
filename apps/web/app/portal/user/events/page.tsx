'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/user/events?limit=100');
        const data = await res.json();
        if (res.ok) setEvents(data.events || []);
      } catch (err) {
        console.error('Failed to load user events', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') fetchEvents();
  }, [status]);

  if (status === 'loading' || isLoading) return <div className="p-8">Loading events...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="text-sm text-gray-600">{e.location}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(e.startDate).toLocaleString()}</p>
            </div>
          ))}
          {events.length === 0 && <p className="text-sm text-gray-500">No events found.</p>}
        </div>
      </div>
    </div>
  );
}
