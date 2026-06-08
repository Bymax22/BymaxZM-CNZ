// app/components/layout/Navigation.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FaSearch, FaFacebookF, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FiBell, FiUser } from 'react-icons/fi';

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [secondaryHidden, setSecondaryHidden] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Hide navigation on dashboard/portal routes
  if (pathname.startsWith('/portal') || pathname.startsWith('/admin') || pathname.startsWith('/staff') || pathname.startsWith('/donor') || pathname.startsWith('/club')) {
    return null;
  }

  const getDashboardHref = (role?: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
        return '/admin/dashboard';
      case 'STAFF':
      case 'PROJECT_MANAGER':
      case 'FINANCE_OFFICER':
      case 'VOLUNTEER_COORDINATOR':
      case 'FIELD_OFFICER':
        return '/staff/dashboard';
      case 'DONOR':
        return '/donor/dashboard';
      case 'CLUB_LEADER':
        return '/club/dashboard';
      default:
        return '/portal/dashboard';
    }
  };

  const dashboardHref = getDashboardHref(session?.user?.role);
  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const selectedNotification = notifications.find((item) => item.id === selectedNotificationId) || notifications[0] || null;

  useEffect(() => {
    const handleScroll = () => {
      setSecondaryHidden(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      setNotificationsLoading(true);
      try {
        const res = await fetch('/api/communications/notifications?take=5');
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications || []);
          if (!selectedNotificationId && Array.isArray(data.notifications) && data.notifications.length > 0) {
            setSelectedNotificationId(data.notifications[0].id);
          }
        } else {
          console.error('Notifications load error:', data.error || 'Unable to load notifications');
        }
      } catch (error) {
        console.error('Notifications load failed:', error);
      } finally {
        setNotificationsLoading(false);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isNotificationsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

  const handleSelectNotification = async (notification: NotificationItem) => {
    setSelectedNotificationId(notification.id);

    if (!notification.isRead) {
      try {
        const res = await fetch(`/api/communications/notifications/${notification.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          setNotifications((prev) => prev.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item)));
        }
      } catch (error) {
        console.error('Failed to mark notification read:', error);
      }
    }
  };

  const navMenus = [
    {
      name: 'Our Projects',
      href: '/projects',
      items: [
        { title: 'Conservation', href: '/projects/conservation' },
        { title: 'Climate Action', href: '/projects/climate' },
        { title: 'Community', href: '/projects/community' },
        { title: 'Education', href: '/projects/education' },
      ],
    },
    {
      name: 'Our Stories',
      href: '/stories',
      items: [
        { title: 'All Stories', href: '/stories' },
        { title: 'Nature', href: '/stories/nature' },
        { title: 'Children', href: '/stories/children' },
        { title: 'Mining', href: '/stories/mining' },
      ],
    },
    {
      name: 'Our Initiatives',
      href: '/our-initiatives',
      items: [
        { title: 'ZCCC', href: '/our-initiatives' },
        { title: 'Zero Children in Mining', href: '/our-initiatives' },
        { title: 'Luapula Alternative Mining Indaba', href: '/our-initiatives' },
      ],
    },
    {
      name: 'Our Work',
      href: '/projects',
      items: [
        { title: 'Featured Projects', href: '/projects' },
        { title: 'Climate Action', href: '/projects/climate' },
        { title: 'Community Development', href: '/projects/community' },
        { title: 'Education', href: '/projects/education' },
      ],
    },
  ];

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <>
      {/* PRIMARY HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6 gap-8">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Care for Nature logo d-site-01.png"
              alt="Care for Nature Zambia"
              width={170}
              height={72}
              className="object-contain"
            />
          </Link>

          <div className="hidden md:flex flex-1 items-center gap-8">
            <form onSubmit={handleSearch} className="flex items-center gap-3 w-full max-w-2xl rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-[#029346]/30">
              <FaSearch className="w-4 h-4 text-slate-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects, stories, initiatives..."
                aria-label="Search"
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              />
            </form>

            <nav className="flex items-center gap-8 text-sm font-semibold text-slate-700">
              {navMenus.map((menu) => (
                <div
                  key={menu.name}
                  onMouseEnter={() => setActiveMenu(menu.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                  className="relative"
                >
                  <Link
                    href={menu.href}
                    className="transition-colors duration-200 hover:text-[#029346]"
                  >
                    {menu.name}
                  </Link>

                  {activeMenu === menu.name && (
                    <div className="absolute left-0 top-12 z-50 w-64 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.35)]">
                      <div className="space-y-2">
                        {menu.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="block rounded-2xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#029346]"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session?.user?.role ? (
              <Link
                href={dashboardHref}
                className="inline-flex items-center justify-center rounded-full bg-[#029346] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#027437]"
              >
                Open Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/register"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-shadow duration-200 hover:shadow-sm hover:border-[#029346] hover:text-[#029346]"
                aria-label="Choose account"
              >
                <FiUser className="w-6 h-6" />
              </Link>
            )}

            <div className="relative">
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setIsNotificationsOpen((open) => !open)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-shadow duration-200 hover:shadow-sm hover:border-[#029346] hover:text-[#029346] md:h-12 md:w-12"
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
              >
                <FiBell className="w-5 h-5 md:w-6 md:h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[0.65rem] font-semibold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full z-50 mt-3 w-96 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_-30px_rgba(15,23,42,0.35)]"
                >
                  <div className="border-b border-slate-200 px-5 py-4 bg-slate-50">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Notifications</p>
                        <p className="text-xs text-slate-500">{unreadCount} unread</p>
                      </div>
                      <Link href="/notifications" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                        View all
                      </Link>
                    </div>
                  </div>
                  <div className="max-h-[28rem] overflow-y-auto p-4">
                    {notificationsLoading ? (
                      <p className="text-sm text-slate-500">Loading notifications…</p>
                    ) : notifications.length === 0 ? (
                      <div className="space-y-2 text-sm text-slate-500">
                        <p>No notifications yet.</p>
                        <p>Check back for new announcements and important updates.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            type="button"
                            onClick={() => handleSelectNotification(notification)}
                            className={`w-full rounded-3xl border px-4 py-3 text-left transition ${notification.id === selectedNotification?.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">{notification.type.replace(/_/g, ' ')}</p>
                              </div>
                              {!notification.isRead && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                            </div>
                            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{notification.content}</p>
                            <p className="mt-3 text-xs text-slate-400">{new Date(notification.createdAt).toLocaleString()}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/get-involved/donate"
              className="inline-flex items-center justify-center rounded-full bg-[#029346] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#027437]"
            >
              Donate
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/auth/register"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-700 hover:bg-white/20 transition-colors"
              aria-label="Choose account"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            <button
              type="button"
              ref={buttonRef}
              onClick={() => setIsNotificationsOpen((open) => !open)}
              className="relative h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-slate-700 hover:bg-white/20 transition-colors"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-emerald-600 px-1 text-[0.6rem] font-semibold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* SECONDARY DESKTOP HEADER */}
      <nav className={`hidden md:block fixed top-20 left-0 w-full z-40 bg-[rgb(114,42,0)] text-white shadow-sm transition-transform duration-300 ${secondaryHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6 gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            <Link
              href="https://facebook.com/carefornaturezambia"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </Link>
            <Link
              href="https://wa.me/260965638175"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:info@carefornaturezambia.org"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="w-4 h-4" />
            </Link>
            <Link
              href="tel:+260965638175"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Call"
            >
              <FaPhone className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white">
            <Link href="/programs" className="transition-colors duration-200 hover:text-[#F0F9F4]">Programs</Link>
            <Link href="/get-involved" className="transition-colors duration-200 hover:text-[#F0F9F4]">Get Involved</Link>
            <Link href="/about" className="transition-colors duration-200 hover:text-[#F0F9F4]">About</Link>
            <Link href="/news" className="transition-colors duration-200 hover:text-[#F0F9F4]">News & Events</Link>
            <Link href="/get-involved/careers" className="transition-colors duration-200 hover:text-[#F0F9F4]">Careers</Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-[#F0F9F4]">Contact</Link>
            <Link href="/about/reports" className="transition-colors duration-200 hover:text-[#F0F9F4]">Reports</Link>
            <Link href="/webinar" className="transition-colors duration-200 hover:text-[#F0F9F4]">Webinar</Link>
            <Link href="/events" className="transition-colors duration-200 hover:text-[#F0F9F4]">Upcoming Events</Link>
           
          </div>

          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#029346] shadow-sm transition-colors duration-200 hover:bg-slate-100"
          >
            Go to Portal
          </Link>
        </div>
      </nav>
    </>
  );
};