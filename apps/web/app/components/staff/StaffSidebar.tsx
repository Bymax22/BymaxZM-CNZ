'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaChartBar, FaCogs, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRoles?: string[];
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/staff/dashboard', icon: FaTachometerAlt },
  { name: 'Tasks', href: '/staff/tasks', icon: FaClipboardList, requiredRoles: ['STAFF', 'PROJECT_MANAGER', 'FIELD_OFFICER', 'VOLUNTEER_COORDINATOR'] },
  { name: 'Team', href: '/staff/team', icon: FaUsers, requiredRoles: ['STAFF', 'PROJECT_MANAGER', 'FIELD_OFFICER'] },
  { name: 'Projects', href: '/staff/projects', icon: FaChartBar, requiredRoles: ['PROJECT_MANAGER', 'FIELD_OFFICER', 'STAFF'] },
  { name: 'Operations', href: '/staff/operations', icon: FaCogs, requiredRoles: ['FINANCE_OFFICER', 'STAFF', 'PROJECT_MANAGER'] },
];

export default function StaffSidebar() {
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

  const handleNavigation = (href: string) => router.push(href);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      className="bg-slate-950 text-slate-100 flex flex-col h-full border-r border-slate-800"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-slate-800">
        <div>
          <div className="text-2xl text-emerald-400">ST</div>
          {!collapsed && <p className="text-sm font-semibold">Staff Hub</p>}
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
