// app/components/layout/Navigation.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FaSearch, FaFacebookF, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FiBell, FiUser } from 'react-icons/fi';

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [secondaryHidden, setSecondaryHidden] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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

  useEffect(() => {
    const handleScroll = () => {
      setSecondaryHidden(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      href: '/our-stories',
      items: [
        { title: 'All Stories', href: '/our-stories' },
        { title: 'Nature', href: '/our-stories/nature' },
        { title: 'Children', href: '/our-stories/children' },
        { title: 'Mining', href: '/our-stories/mining' },
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
                href="/auth/login"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-shadow duration-200 hover:shadow-sm hover:border-[#029346] hover:text-[#029346]"
                aria-label="Login or sign up"
              >
                <FiUser className="w-6 h-6" />
              </Link>
            )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-shadow duration-200 hover:shadow-sm hover:border-[#029346] hover:text-[#029346] md:h-12 md:w-12"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <Link
              href="/get-involved/donate"
              className="inline-flex items-center justify-center rounded-full bg-[#029346] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#027437]"
            >
              Donate
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/auth/login"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-700 hover:bg-white/20 transition-colors"
              aria-label="Sign in or sign up"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            <button
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-slate-700 hover:bg-white/20 transition-colors"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* SECONDARY DESKTOP HEADER */}
      <nav className={`hidden md:block fixed top-20 left-0 w-full z-40 bg-[#007200] text-white shadow-sm transition-transform duration-300 ${secondaryHidden ? '-translate-y-full' : 'translate-y-0'}`}>
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
            <Link href="/projects" className="transition-colors duration-200 hover:text-[#F0F9F4]">Programs</Link>
            <Link href="/get-involved" className="transition-colors duration-200 hover:text-[#F0F9F4]">Get Involved</Link>
            <Link href="/about" className="transition-colors duration-200 hover:text-[#F0F9F4]">About</Link>
            <Link href="/news" className="transition-colors duration-200 hover:text-[#F0F9F4]">News</Link>
            <Link href="/get-involved/careers" className="transition-colors duration-200 hover:text-[#F0F9F4]">Careers</Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-[#F0F9F4]">Contact</Link>
            <Link href="/about/reports" className="transition-colors duration-200 hover:text-[#F0F9F4]">Reports</Link>
            <Link href="/webinar" className="transition-colors duration-200 hover:text-[#F0F9F4]">Webinar</Link>
            <Link href="/auth/register" className="transition-colors duration-200 hover:text-[#F0F9F4]">Create Account</Link>
            <Link href="/auth/login" className="transition-colors duration-200 hover:text-[#F0F9F4]">Login</Link>
          </div>

          <Link
            href="/portal/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#029346] shadow-sm transition-colors duration-200 hover:bg-slate-100"
          >
            Go to Portal
          </Link>
        </div>
      </nav>
    </>
  );
};