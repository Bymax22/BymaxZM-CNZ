'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaClipboardList, FaUsers, FaProjectDiagram, FaChartBar } from 'react-icons/fa';

export default function StaffDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user?.name || 'team member'}. Manage staff activity, projects, and operational updates here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Open Tasks', value: '24', icon: FaClipboardList, color: 'emerald' },
            { title: 'Team Members', value: '18', icon: FaUsers, color: 'blue' },
            { title: 'Active Projects', value: '7', icon: FaProjectDiagram, color: 'amber' },
            { title: 'Performance', value: '92%', icon: FaChartBar, color: 'purple' }
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-${card.color}-100 text-${card.color}-600`}>
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Latest operational metrics for your role.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
