// app/admin/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaUserShield, 
  FaTree, 
  FaMapMarkerAlt,
  FaCalendar,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  activeProjects: number;
  totalClubs: number;
  pendingApprovals: number;
  systemHealth: number;
  revenueThisMonth: number;
  activeVolunteers: number;
}

interface PendingItem {
  id: string;
  type: 'USER' | 'CLUB' | 'PROJECT' | 'EVENT';
  title: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = session?.user?.role as string | undefined;
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<{ action: string; time: string; user: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session && !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
      router.push('/portal/dashboard');
    }
  }, [status, session, router, userRole]);

  useEffect(() => {
    // Mock data
    const mockStats: AdminStats = {
      totalUsers: 1247,
      totalAdmins: 8,
      activeProjects: 24,
      totalClubs: 45,
      pendingApprovals: 12,
      systemHealth: 98,
      revenueThisMonth: 125430,
      activeVolunteers: 345
    };

    const mockPending: PendingItem[] = [
      {
        id: '1',
        type: 'CLUB',
        title: 'New Club Registration - Green Future Youth',
        submittedBy: 'Sarah Chibwe',
        submittedAt: '2024-03-15T10:30:00',
        priority: 'HIGH'
      },
      {
        id: '2',
        type: 'PROJECT',
        title: 'Project Proposal - Urban Farming Initiative',
        submittedBy: 'John Banda',
        submittedAt: '2024-03-14T14:20:00',
        priority: 'MEDIUM'
      },
      {
        id: '3',
        type: 'USER',
        title: 'Admin Role Request - David Mwale',
        submittedBy: 'System',
        submittedAt: '2024-03-14T09:15:00',
        priority: 'HIGH'
      }
    ];

    const mockActivity = [
      { action: 'New user registered', time: '2 hours ago', user: 'System' },
      { action: 'Project approved', time: '4 hours ago', user: 'Admin User' },
      { action: 'Club created', time: '1 day ago', user: 'Sarah Chibwe' },
      { action: 'Donation processed', time: '1 day ago', user: 'System' }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setPendingItems(mockPending);
      setRecentActivity(mockActivity);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers.toLocaleString(),
      change: '+8.2%',
      isPositive: true,
      icon: FaUsers,
      color: 'blue',
      description: 'Registered users'
    },
    {
      title: 'Administrators',
      value: stats?.totalAdmins.toString(),
      change: '+1',
      isPositive: true,
      icon: FaUserShield,
      color: 'purple',
      description: 'System admins'
    },
    {
      title: 'Active Projects',
      value: stats?.activeProjects.toString(),
      change: '+3',
      isPositive: true,
      icon: FaTree,
      color: 'emerald',
      description: 'Ongoing projects'
    },
    {
      title: 'Clubs',
      value: stats?.totalClubs.toString(),
      change: '+2',
      isPositive: true,
      icon: FaMapMarkerAlt,
      color: 'green',
      description: 'Active clubs'
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals.toString(),
      change: '+5',
      isPositive: false,
      icon: FaClock,
      color: 'amber',
      description: 'Require attention'
    },
    {
      title: 'System Health',
      value: `${stats?.systemHealth}%`,
      change: '+2%',
      isPositive: true,
      icon: FaChartLine,
      color: 'green',
      description: 'Uptime & performance'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'USER': return FaUsers;
      case 'CLUB': return FaMapMarkerAlt;
      case 'PROJECT': return FaTree;
      case 'EVENT': return FaCalendar;
      default: return FaUsers;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                System overview and management console
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back</p>
                <p className="font-semibold text-gray-900">{session.user?.name}</p>
              </div>
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
          {/* Pending Approvals & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                    {pendingItems.length} items
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pendingItems.map((item, index) => {
                    const IconComponent = getTypeIcon(item.type);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <span>By: {item.submittedBy}</span>
                              <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                            Review
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {pendingItems.length === 0 && (
                  <div className="text-center py-8">
                    <FaCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600">No pending approvals</p>
                  </div>
                )}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { type: 'warning', message: 'Backup scheduled for tonight at 2:00 AM', time: '2 hours ago' },
                    { type: 'info', message: 'System update available (v2.1.1)', time: '1 day ago' },
                    { type: 'success', message: 'All services running normally', time: '2 days ago' }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <FaExclamationTriangle className={`w-4 h-4 ${
                        alert.type === 'warning' ? 'text-yellow-500' :
                        alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Stats */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add User', href: '/admin/users/new', color: 'blue' },
                    { label: 'Create Club', href: '/admin/clubs/new', color: 'green' },
                    { label: 'View Reports', href: '/admin/analytics', color: 'purple' },
                    { label: 'System Settings', href: '/admin/settings', color: 'gray' }
                  ].map((action) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(action.href)}
                      className={`p-3 rounded-xl bg-${action.color}-50 text-${action.color}-700 hover:bg-${action.color}-100 transition-colors text-sm font-medium`}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">System Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { service: 'Database', status: 'online', latency: '45ms' },
                    { service: 'API Server', status: 'online', latency: '23ms' },
                    { service: 'File Storage', status: 'online', latency: '67ms' },
                    { service: 'Email Service', status: 'online', latency: '89ms' }
                  ].map((service) => (
                    <div key={service.service} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{service.service}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{service.latency}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          service.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
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