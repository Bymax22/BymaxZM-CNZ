// components/portal/PortalSidebar.tsx
'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLeaf,
  FaTachometerAlt,
  FaUsers,
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
  FaQuestionCircle,
  FaHandsHelping,
  
  FaBook,
  FaMapMarkerAlt,

} from 'react-icons/fa';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SubMenuItem[];
  badge?: number;
}

interface SubMenuItem {
  name: string;
  href: string;
}

export default function PortalSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      href: '/portal/dashboard',
      icon: FaTachometerAlt
    },
    {
      name: 'Clubs',
      href: '/portal/clubs',
      icon: FaUsers,
      children: [
        { name: 'My Clubs', href: '/portal/clubs/my' },
        { name: 'Explore Clubs', href: '/portal/clubs/explore' },
        { name: 'Club Management', href: '/portal/clubs/manage' },
        { name: 'Meeting Minutes', href: '/portal/clubs/meetings' }
      ]
    },
    {
      name: 'Projects',
      href: '/portal/projects',
      icon: FaTree,
      badge: 3,
      children: [
        { name: 'Active Projects', href: '/portal/projects/active' },
        { name: 'Project Proposals', href: '/portal/projects/proposals' },
        { name: 'Volunteer Opportunities', href: '/portal/projects/volunteer' },
        { name: 'Progress Reports', href: '/portal/projects/reports' }
      ]
    },
    {
      name: 'Events',
      href: '/portal/events',
      icon: FaCalendar,
      children: [
        { name: 'Upcoming Events', href: '/portal/events/upcoming' },
        { name: 'Event Calendar', href: '/portal/events/calendar' },
        { name: 'Create Event', href: '/portal/events/create' },
        { name: 'My Registrations', href: '/portal/events/registrations' }
      ]
    },
    {
      name: 'Volunteer',
      href: '/portal/volunteer',
      icon: FaHandsHelping,
      children: [
        { name: 'Hours Tracking', href: '/portal/volunteer/hours' },
        { name: 'Achievements', href: '/portal/volunteer/achievements' },
        { name: 'Training', href: '/portal/volunteer/training' },
        { name: 'Certificates', href: '/portal/volunteer/certificates' }
      ]
    },
    {
      name: 'Donations',
      href: '/portal/donations',
      icon: FaDonate,
      children: [
        { name: 'Make Donation', href: '/portal/donations/make' },
        { name: 'Donation History', href: '/portal/donations/history' },
        { name: 'Recurring Donations', href: '/portal/donations/recurring' },
        { name: 'Donation Impact', href: '/portal/donations/impact' }
      ]
    },
    {
      name: 'Reports',
      href: '/portal/reports',
      icon: FaChartBar,
      children: [
        { name: 'Field Reports', href: '/portal/reports/field' },
        { name: 'Progress Reports', href: '/portal/reports/progress' },
        { name: 'Financial Reports', href: '/portal/reports/financial' },
        { name: 'Analytics', href: '/portal/reports/analytics' }
      ]
    },
    {
      name: 'Resources',
      href: '/portal/resources',
      icon: FaBook,
      children: [
        { name: 'Learning Materials', href: '/portal/resources/learning' },
        { name: 'Documentation', href: '/portal/resources/docs' },
        { name: 'Media Library', href: '/portal/resources/media' },
        { name: 'Templates', href: '/portal/resources/templates' }
      ]
    },
    {
      name: 'Field Work',
      href: '/portal/field',
      icon: FaMapMarkerAlt,
      children: [
        { name: 'Field Data', href: '/portal/field/data' },
        { name: 'GPS Tracking', href: '/portal/field/tracking' },
        { name: 'Species Catalog', href: '/portal/field/species' },
        { name: 'Conservation Areas', href: '/portal/field/areas' }
      ]
    }
  ];

  const bottomMenuItems = [
    {
      name: 'Support',
      href: '/portal/support',
      icon: FaQuestionCircle
    },
    {
      name: 'Settings',
      href: '/portal/settings',
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

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-gradient-to-b from-emerald-800 to-green-900 text-white flex flex-col h-full relative transition-all duration-300"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white text-emerald-600 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
      >
        {isCollapsed ? (
          <FaChevronRight className="w-3 h-3" />
        ) : (
          <FaChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Header */}
      <div className="p-6 border-b border-emerald-700/50">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ scale: isCollapsed ? 0.8 : 1 }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg"
          >
            <FaLeaf className="w-6 h-6 text-emerald-600" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl font-bold">CNZ Portal</h1>
                <p className="text-emerald-200 text-xs">Conservation Hub</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-emerald-700/50">
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
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-emerald-200 text-xs">Club Leader</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!isCollapsed && (
            <button className="relative p-1 rounded-lg hover:bg-emerald-700/50 transition-colors">
              <FaBell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-800"></span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
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
                    : 'hover:bg-emerald-700/50'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive(item.href) ? 'text-white' : 'text-emerald-200'
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
                    <motion.button
                      key={subItem.name}
                      whileHover={{ x: 5 }}
                      onClick={() => handleNavigation(subItem.href)}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive(subItem.href)
                          ? 'bg-emerald-600/50 text-white'
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-700/30'
                      }`}
                    >
                      {subItem.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-emerald-700/50">
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
                  : 'hover:bg-emerald-700/50'
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  isActive(item.href) ? 'text-white' : 'text-emerald-200'
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
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-200 hover:bg-red-600/20 hover:text-red-100 transition-all duration-200 group"
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
            className="mt-4 pt-4 border-t border-emerald-700/50"
          >
            <p className="text-emerald-300 text-xs text-center">
              CNZ Portal v2.1.0
            </p>
          </motion.div>
        )}
      </div>

      {/* Collapsed Tooltip */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-full top-0 ml-2 hidden lg:block"
          >
            <div className="bg-gray-900 text-white text-sm rounded-lg py-1 px-2 shadow-xl">
              CNZ Portal
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}