'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaChartBar, FaCalendarAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/staff/dashboard', icon: FaTachometerAlt },
  { name: 'Content', href: '/staff/content', icon: FaClipboardList },
  { name: 'Projects', href: '/staff/projects', icon: FaChartBar },
  { name: 'Events', href: '/staff/events', icon: FaCalendarAlt },
  { name: 'Team', href: '/staff/users', icon: FaUsers },
];

export default function StaffSidebar() {
  const { data: session, status } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Ensure only staff can access this sidebar
  useEffect(() => {
    if (status === 'authenticated') {
      const userRole = (session?.user as any)?.role;
      if (userRole !== 'STAFF') {
        router.push('/');
      }
    }
  }, [status, session, router]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleNavigation = (href: string) => router.push(href);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      className="bg-slate-950 text-slate-100 flex flex-col h-full border-r border-slate-800"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-slate-800">
        <div>
          <div className="text-2xl font-bold text-blue-400">CNZ</div>
          {!collapsed && <p className="text-sm font-semibold">Staff Portal</p>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FaChevronRight className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-150 ${
              isActive(item.href)
                ? 'bg-emerald-600 text-white shadow-inner shadow-emerald-500/20'
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
          className="flex w-full items-center gap-3 rounded-2xl bg-slate-800 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700"
        >
          <FaSignOutAlt className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
