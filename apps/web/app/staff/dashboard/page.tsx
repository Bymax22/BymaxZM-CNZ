'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaClipboardList, FaUsers, FaChartBar, FaCalendarAlt } from 'react-icons/fa';

interface StaffStats {
  pendingReview: number;
  activeProjects: number;
  pendingPublish: number;
  upcomingEvents: number;
}

interface ActivityLog {
  type: 'content' | 'project' | 'event';
  action: string;
  timestamp: string;
}

export default function StaffDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<StaffStats>({
    pendingReview: 0,
    activeProjects: 0,
    pendingPublish: 0,
    upcomingEvents: 0,
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      // Ensure only staff can access this dashboard
      const userRole = (session?.user as any)?.role;
      if (userRole !== 'STAFF') {
        router.push('/');
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [contentRes, projectsRes, eventsRes] = await Promise.all([
          fetch('/api/staff/content?take=100'),
          fetch('/api/staff/projects?limit=100'),
          fetch('/api/staff/events?limit=100'),
        ]);

        const contentData = await contentRes.json();
        const projectsData = await projectsRes.json();
        const eventsData = await eventsRes.json();

        // Count content items by status
        const contentCards = contentData.contentCards || contentData.cards || [];
        const pendingReview = contentCards.filter((c: any) => c.status === 'DRAFT').length;
        const pendingPublish = contentCards.filter((c: any) => c.status === 'PENDING_APPROVAL').length;

        // Count projects
        const projects = projectsData.projects || [];
        const activeProjects = projects.filter((p: any) => p.status === 'ACTIVE').length;

        // Count upcoming events (next 30 days)
        const events = eventsData.events || [];
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const upcomingEvents = events.filter((e: any) => {
          const eventDate = new Date(e.startDate);
          return eventDate > now && eventDate < thirtyDaysFromNow;
        }).length;

        setStats({
          pendingReview,
          activeProjects,
          pendingPublish,
          upcomingEvents,
        });

        // Build recent activity log
        const recentActivities: ActivityLog[] = [];

        // Add recent content updates
        contentCards.slice(0, 2).forEach((card: any) => {
          recentActivities.push({
            type: 'content',
            action: `${card.status === 'DRAFT' ? 'Draft' : 'Published'} content: "${card.title}"`,
            timestamp: card.publishedAt || card.updatedAt || new Date().toISOString(),
          });
        });

        // Add recent project updates
        projects.slice(0, 2).forEach((proj: any) => {
          recentActivities.push({
            type: 'project',
            action: `Project updated: "${proj.title}" (${proj.status})`,
            timestamp: proj.updatedAt || new Date().toISOString(),
          });
        });

        // Add recent event updates
        events.slice(0, 2).forEach((evt: any) => {
          recentActivities.push({
            type: 'event',
            action: `Event scheduled: "${evt.title}"`,
            timestamp: evt.startDate || new Date().toISOString(),
          });
        });

        // Sort by timestamp descending
        recentActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivities(recentActivities.slice(0, 5));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchDashboardData();
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    const source = new EventSource('/api/staff/updates');
    source.onmessage = async (event) => {
      try {
        const payload = JSON.parse(event.data);
        // Refresh dashboard data on any update
        const contentRes = await fetch('/api/staff/content?take=100');
        const projectsRes = await fetch('/api/staff/projects?limit=100');
        const eventsRes = await fetch('/api/staff/events?limit=100');

        const contentData = await contentRes.json();
        const projectsData = await projectsRes.json();
        const eventsData = await eventsRes.json();

        const contentCards = contentData.contentCards || contentData.cards || [];
        const pendingReview = contentCards.filter((c: any) => c.status === 'DRAFT').length;
        const pendingPublish = contentCards.filter((c: any) => c.status === 'PENDING_APPROVAL').length;

        const projects = projectsData.projects || [];
        const activeProjects = projects.filter((p: any) => p.status === 'ACTIVE').length;

        const events = eventsData.events || [];
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const upcomingEvents = events.filter((e: any) => {
          const eventDate = new Date(e.startDate);
          return eventDate > now && eventDate < thirtyDaysFromNow;
        }).length;

        setStats({
          pendingReview,
          activeProjects,
          pendingPublish,
          upcomingEvents,
        });
      } catch {
        // ignore parse failures
      }
    };
    source.onerror = () => source.close();

    return () => source.close();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading staff dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const cardConfigs = [
    { title: 'Needs Review', value: stats.pendingReview, description: 'Content drafts awaiting staff review.', icon: FaClipboardList, color: 'emerald' },
    { title: 'Active Projects', value: stats.activeProjects, description: 'Projects currently in progress.', icon: FaUsers, color: 'blue' },
    { title: 'Pending Publish', value: stats.pendingPublish, description: 'Content awaiting final approval.', icon: FaChartBar, color: 'amber' },
    { title: 'Upcoming Events', value: stats.upcomingEvents, description: 'Events in the next 30 days.', icon: FaCalendarAlt, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Staff Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Monitor pending reviews, active projects, and upcoming events with real-time data.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-600">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {cardConfigs.map((card) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{card.title}</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
                    </div>
                    <div className={`rounded-3xl p-3 bg-${card.color}-100 text-${card.color}-600`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-500">{card.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>• Review pending content changes</li>
                  <li>• Update project status and notes</li>
                  <li>• Coordinate event logistics</li>
                  <li>• Track team assignments</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Staff Workflow</h2>
                <p className="mt-4 text-sm text-slate-600">This portal is designed for staff actions only. Full admin-level control is managed in the admin interface.</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {activities.length > 0 ? (
                    activities.map((activity, idx) => (
                      <li key={idx}>• {activity.action}</li>
                    ))
                  ) : (
                    <li>No recent activity yet</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
