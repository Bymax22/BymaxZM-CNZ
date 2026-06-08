'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FaTachometerAlt, FaCalendar, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function UserPortalSidebar() {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: 'Dashboard', href: '/portal/user/dashboard', icon: FaTachometerAlt },
    { name: 'My Projects', href: '/portal/user/projects', icon: FaTachometerAlt },
    { name: 'My Events', href: '/portal/user/events', icon: FaCalendar },
    { name: 'Profile', href: '/portal/user/settings', icon: FaUser }
  ];

  const navigate = (href: string) => router.push(href);

  return (
    <div className="bg-white border-r w-64 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">User Portal</h2>
        <p className="text-sm text-gray-500">Welcome, {session?.user?.name}</p>
      </div>
      <nav className="space-y-2">
        {menu.map((m) => (
          <button key={m.name} onClick={() => navigate(m.href)} className={`w-full text-left p-2 rounded ${pathname === m.href ? 'bg-gray-100' : ''}`}>
            <div className="flex items-center gap-3">
              <m.icon className="w-4 h-4" />
              <span className="text-sm">{m.name}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-2 text-sm text-red-600">
          <FaSignOutAlt /> Sign out
        </button>
      </div>
    </div>
  );
}
