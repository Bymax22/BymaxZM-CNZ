'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDonate, FaHeart, FaChartLine, FaRegCalendarAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', href: '/donor/dashboard', icon: FaTachometerAlt },
  { name: 'Giving History', href: '/donor/history', icon: FaDonate },
  { name: 'Impact Stories', href: '/donor/impact', icon: FaHeart },
  { name: 'Campaigns', href: '/donor/campaigns', icon: FaRegCalendarAlt },
  { name: 'Insights', href: '/donor/insights', icon: FaChartLine },
];

export default function DonorSidebar() {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const userRole = session?.user?.role as string | undefined;
  const filteredMenuItems = userRole === 'DONOR' || !userRole ? menuItems : [{ name: 'Dashboard', href: '/donor/dashboard', icon: FaTachometerAlt }];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      className="bg-emerald-950 text-white flex flex-col h-full border-r border-emerald-900"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-emerald-900">
        <div>
          <div className="text-2xl text-emerald-300">DN</div>
          {!collapsed && <p className="text-sm font-semibold">Donor Space</p>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full bg-emerald-900 p-2 text-white hover:bg-emerald-800"
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
                ? 'bg-emerald-600 text-white shadow-inner shadow-emerald-500/30'
                : 'hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
          </button>
        ))}
      </div>

      <div className="border-t border-emerald-900 px-4 py-4">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex w-full items-center gap-3 rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <FaSignOutAlt className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
