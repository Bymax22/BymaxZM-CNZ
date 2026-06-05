'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaBookOpen, FaChartPie, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', href: '/club/dashboard', icon: FaTachometerAlt },
  { name: 'Members', href: '/club/members', icon: FaUsers, requiredRoles: ['CLUB_LEADER'] },
  { name: 'Events', href: '/club/events', icon: FaCalendarAlt, requiredRoles: ['CLUB_LEADER'] },
  { name: 'Resources', href: '/club/resources', icon: FaBookOpen },
  { name: 'Reports', href: '/club/reports', icon: FaChartPie, requiredRoles: ['CLUB_LEADER'] },
];

export default function ClubSidebar() {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const userRole = session?.user?.role as string | undefined;
  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.requiredRoles) return true;
    return userRole ? item.requiredRoles.includes(userRole) : false;
  });

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      className="bg-slate-900 text-white flex flex-col h-full border-r border-slate-800"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-slate-800">
        <div>
          <div className="text-2xl text-cyan-300">CL</div>
          {!collapsed && <p className="text-sm font-semibold">Club Lead</p>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full bg-slate-800 p-2 text-white hover:bg-slate-700"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FaChevronRight className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-150 ${
              isActive(item.href)
                ? 'bg-cyan-600 text-white shadow-inner shadow-cyan-500/25'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
          </button>
        ))}
      </div>

      <div className="border-t border-slate-800 px-4 py-4">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex w-full items-center gap-3 rounded-2xl bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700"
        >
          <FaSignOutAlt className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
