// app/portal/user/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserStats {
  joinedClubs: number;
  myProjects: number;
  myDonations: number;
  upcomingEvents: number;
}

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/user/stats');
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error('Failed to load user stats', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') fetchStats();
  }, [status]);

  if (status === 'loading' || isLoading) return <div className="p-8">Loading user dashboard...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Portal</h1>
          <p className="text-sm text-gray-600">Personal overview and quick access to your activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Joined Clubs</p>
            <p className="text-2xl font-bold">{stats?.joinedClubs ?? '—'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">My Projects</p>
            <p className="text-2xl font-bold">{stats?.myProjects ?? '—'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Donations</p>
            <p className="text-2xl font-bold">{stats?.myDonations ?? '—'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Upcoming Events</p>
            <p className="text-2xl font-bold">{stats?.upcomingEvents ?? '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
