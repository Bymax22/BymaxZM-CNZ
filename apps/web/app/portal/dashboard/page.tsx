// app/portal/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaTree, 
  FaDonate, 
  FaHandsHelping,
  FaSeedling,
  FaCalendar,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaBell,
  FaCog
} from 'react-icons/fa';

interface DashboardStats {
  totalMembers: number;
  activeProjects: number;
  totalDonations: number;
  volunteerHours: number;
  treesPlanted: number;
  upcomingEvents: number;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'donation' | 'event' | 'member';
  title: string;
  description: string;
  time: string;
  user: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockStats: DashboardStats = {
      totalMembers: 1247,
      activeProjects: 18,
      totalDonations: 45670,
      volunteerHours: 2345,
      treesPlanted: 48732,
      upcomingEvents: 7
    };

    const mockActivity: RecentActivity[] = [
      {
        id: '1',
        type: 'project',
        title: 'New Project Launched',
        description: 'Urban Greening Initiative in Lusaka',
        time: '2 hours ago',
        user: 'Sarah Chibwe'
      },
      {
        id: '2',
        type: 'donation',
        title: 'Donation Received',
        description: 'ZMW 5,000 from Green Future Corp',
        time: '4 hours ago',
        user: 'System'
      },
      {
        id: '3',
        type: 'member',
        title: 'New Member Joined',
        description: 'John Banda joined Copperbelt Club',
        time: '1 day ago',
        user: 'System'
      },
      {
        id: '4',
        type: 'event',
        title: 'Event Scheduled',
        description: 'Tree Planting - Saturday, 10 AM',
        time: '2 days ago',
        user: 'Grace Mwale'
      }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setRecentActivity(mockActivity);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const statCards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers.toLocaleString(),
      change: '+12%',
      isPositive: true,
      icon: FaUsers,
      color: 'blue',
      description: 'Across all clubs'
    },
    {
      title: 'Active Projects',
      value: stats?.activeProjects.toString(),
      change: '+3',
      isPositive: true,
      icon: FaTree,
      color: 'emerald',
      description: 'In progress'
    },
    {
      title: 'Total Donations',
      value: `ZMW ${stats?.totalDonations.toLocaleString()}`,
      change: '+18%',
      isPositive: true,
      icon: FaDonate,
      color: 'green',
      description: 'This month'
    },
    {
      title: 'Volunteer Hours',
      value: stats?.volunteerHours.toLocaleString(),
      change: '+156',
      isPositive: true,
      icon: FaHandsHelping,
      color: 'amber',
      description: 'This quarter'
    },
    {
      title: 'Trees Planted',
      value: stats?.treesPlanted.toLocaleString(),
      change: '+2,347',
      isPositive: true,
      icon: FaSeedling,
      color: 'emerald',
      description: 'Lifetime total'
    },
    {
      title: 'Upcoming Events',
      value: stats?.upcomingEvents.toString(),
      change: '+2',
      isPositive: true,
      icon: FaCalendar,
      color: 'purple',
      description: 'Next 30 days'
    }
  ];

  const quickActions = [
    {
      title: 'Create Project',
      description: 'Start a new conservation initiative',
      icon: FaSeedling,
      href: '/portal/projects/new',
      color: 'emerald'
    },
    {
      title: 'Schedule Event',
      description: 'Organize community activities',
      icon: FaCalendar,
      href: '/portal/events/new',
      color: 'blue'
    },
    {
      title: 'View Reports',
      description: 'Check progress and analytics',
      icon: FaChartLine,
      href: '/portal/reports',
      color: 'green'
    },
    {
      title: 'Manage Members',
      description: 'Handle club memberships',
      icon: FaUsers,
      href: '/portal/clubs/members',
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session.user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here&apos;s what&apos;s happening with your conservation efforts today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaCog className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {session.user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <FaArrowUp className="w-3 h-3" />
                  ) : (
                    <FaArrowDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={action.title}
                    href={action.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}>
                        <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h2>
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Urban Greening Initiative', progress: 75, members: 12, deadline: '2024-03-15' },
                    { name: 'School Conservation Program', progress: 90, members: 8, deadline: '2024-02-28' },
                    { name: 'Wildlife Corridor Restoration', progress: 45, members: 15, deadline: '2024-04-30' }
                  ].map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <FaUsers className="w-3 h-3" />
                            <span>{project.members} members</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Due: {project.deadline}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-emerald-600">
                          {project.progress}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Upcoming Events */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-2 h-2 mt-2 rounded-full ${
                        activity.type === 'project' ? 'bg-emerald-500' :
                        activity.type === 'donation' ? 'bg-green-500' :
                        activity.type === 'event' ? 'bg-blue-500' : 'bg-amber-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="space-y-4">
                  {[
                    { title: 'Community Tree Planting', date: 'Tomorrow, 08:00', location: 'Lusaka City Park' },
                    { title: 'Conservation Workshop', date: 'Mar 15, 14:00', location: 'Online' },
                    { title: 'Club Meeting', date: 'Mar 18, 17:00', location: 'CNZ Headquarters' }
                  ].map((event, index) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                        <FaCalendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <FaUsers className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}