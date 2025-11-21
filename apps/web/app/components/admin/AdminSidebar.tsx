// components/admin/AdminSidebar.tsx
'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaTree,
  FaDonate,
  FaCalendar,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaBell,
 
  FaCogs,
  FaFileAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SubMenuItem[];
  badge?: number;
  requiredRole?: string[];
}

interface SubMenuItem {
  name: string;
  href: string;
  requiredRole?: string[];
}

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: FaTachometerAlt
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: FaUsers,
      badge: 3,
      children: [
        { name: 'All Users', href: '/admin/users' },
        { name: 'Admins', href: '/admin/users/admins' },
        { name: 'Club Leaders', href: '/admin/users/leaders' },
        { name: 'Members', href: '/admin/users/members' },
        { name: 'Pending Approval', href: '/admin/users/pending' }
      ]
    },
    {
      name: 'Clubs Management',
      href: '/admin/clubs',
      icon: FaMapMarkerAlt,
      children: [
        { name: 'All Clubs', href: '/admin/clubs' },
        { name: 'Club Approvals', href: '/admin/clubs/approvals' },
        { name: 'Club Analytics', href: '/admin/clubs/analytics' },
        { name: 'Regional Overview', href: '/admin/clubs/regions' }
      ]
    },
    {
      name: 'Projects Oversight',
      href: '/admin/projects',
      icon: FaTree,
      children: [
        { name: 'All Projects', href: '/admin/projects' },
        { name: 'Project Approvals', href: '/admin/projects/approvals' },
        { name: 'Budget Management', href: '/admin/projects/budgets' },
        { name: 'Progress Tracking', href: '/admin/projects/progress' }
      ]
    },
    {
      name: 'Financial Management',
      href: '/admin/finance',
      icon: FaDonate,
      requiredRole: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER'],
      children: [
        { name: 'Donations', href: '/admin/finance/donations' },
        { name: 'Expenses', href: '/admin/finance/expenses' },
        { name: 'Financial Reports', href: '/admin/finance/reports' },
        { name: 'Budget Allocation', href: '/admin/finance/budget' }
      ]
    },
    {
      name: 'Events Management',
      href: '/admin/events',
      icon: FaCalendar,
      children: [
        { name: 'All Events', href: '/admin/events' },
        { name: 'Event Approvals', href: '/admin/events/approvals' },
        { name: 'Calendar', href: '/admin/events/calendar' },
        { name: 'Attendance', href: '/admin/events/attendance' }
      ]
    },
    {
      name: 'Reports & Analytics',
      href: '/admin/analytics',
      icon: FaChartBar,
      children: [
        { name: 'System Analytics', href: '/admin/analytics/system' },
        { name: 'Impact Reports', href: '/admin/analytics/impact' },
        { name: 'User Activity', href: '/admin/analytics/activity' },
        { name: 'Performance Metrics', href: '/admin/analytics/performance' }
      ]
    },
    {
      name: 'System Settings',
      href: '/admin/settings',
      icon: FaCogs,
      requiredRole: ['SUPER_ADMIN'],
      children: [
        { name: 'General Settings', href: '/admin/settings/general' },
        { name: 'User Roles', href: '/admin/settings/roles' },
        { name: 'Email Templates', href: '/admin/settings/email' },
        { name: 'Backup & Restore', href: '/admin/settings/backup' }
      ]
    },
    {
      name: 'Audit Logs',
      href: '/admin/audit',
      icon: FaFileAlt,
      requiredRole: ['SUPER_ADMIN'],
      children: [
        { name: 'User Activity', href: '/admin/audit/users' },
        { name: 'System Logs', href: '/admin/audit/system' },
        { name: 'Security Events', href: '/admin/audit/security' }
      ]
    }
  ];

  const bottomMenuItems = [
    {
      name: 'Admin Settings',
      href: '/admin/profile',
      icon: FaCog
    }
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const toggleSubmenu = (menuName: string) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const hasPermission = (requiredRoles?: string[]) => {
    if (!requiredRoles) return true;
    // This would check against the current user's role
    return true; // Simplified for demo
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col h-full relative transition-all duration-300"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white text-gray-900 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
      >
        {isCollapsed ? (
          <FaChevronRight className="w-3 h-3" />
        ) : (
          <FaChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ scale: isCollapsed ? 0.8 : 1 }}
            className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <FaUserShield className="w-6 h-6 text-white" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <p className="text-gray-400 text-xs">System Administration</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-semibold text-white">
            <FaUser className="w-5 h-5" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden flex-1"
              >
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-gray-400 text-xs">Super Administrator</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!isCollapsed && (
            <button className="relative p-1 rounded-lg hover:bg-gray-700 transition-colors">
              <FaBell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800"></span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            !hasPermission(item.requiredRole) ? null : (
              <div key={item.name}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (item.children) {
                      toggleSubmenu(item.name);
                    } else {
                      handleNavigation(item.href);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                    isActive(item.href)
                      ? 'bg-emerald-600 shadow-lg'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive(item.href) ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm font-medium truncate"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center space-x-1">
                    {item.badge && !isCollapsed && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                    {item.children && !isCollapsed && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        className="w-3 h-3"
                      >
                        <FaChevronRight className="w-3 h-3" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                {/* Submenu */}
                {item.children && activeSubmenu === item.name && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.children.map((subItem) => (
                      !hasPermission(subItem.requiredRole) ? null : (
                        <motion.button
                          key={subItem.name}
                          whileHover={{ x: 5 }}
                          onClick={() => handleNavigation(subItem.href)}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive(subItem.href)
                              ? 'bg-emerald-600/50 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                          }`}
                        >
                          {subItem.name}
                        </motion.button>
                      )
                    ))}
                  </motion.div>
                )}
              </div>
            )
          ))}
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-1">
          {bottomMenuItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                isActive(item.href)
                  ? 'bg-emerald-600 shadow-lg'
                  : 'hover:bg-gray-700'
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  isActive(item.href) ? 'text-white' : 'text-gray-400'
                }`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 group"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Version Info */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <p className="text-gray-500 text-xs text-center">
              Admin Portal v2.1.0
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}