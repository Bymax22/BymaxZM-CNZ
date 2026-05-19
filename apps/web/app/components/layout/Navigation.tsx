// app/components/layout/Navigation.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserCircle, FaSearch, FaFacebookF, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi';

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();

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
        { title: 'Initiatives Overview', href: '/our-initiatives' },
        { title: 'Programs', href: '/projects' },
        { title: 'Impact Areas', href: '/our-stories' },
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
      <header className="fixed top-0 left-0 w-full bg-white z-50 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 gap-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Care for Nature logo d-site-01.png"
              alt="Care for Nature Zambia"
              width={170}
              height={72}
              className="object-contain"
            />
          </Link>

          <div className="hidden md:flex flex-1 items-center gap-6">
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-xl rounded-full border border-gray-200 bg-gray-50 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#029346]">
              <FaSearch className="w-4 h-4 text-gray-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search..."
                aria-label="Search"
                className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
              />
            </form>

            <nav className="flex items-center gap-6 text-sm font-semibold text-gray-700">
              {navMenus.map((menu) => (
                <div
                  key={menu.name}
                  onMouseEnter={() => setActiveMenu(menu.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                  className="relative"
                >
                  <Link
                    href={menu.href}
                    className="hover:text-[#029346] transition-colors"
                  >
                    {menu.name}
                  </Link>

                  {activeMenu === menu.name && (
                    <div className="absolute left-0 top-10 z-50 w-56 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
                      <div className="space-y-2">
                        {menu.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#029346] transition-colors"
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
            <Link
              href="/auth/login"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#029346] hover:text-[#029346] transition-colors"
              aria-label="Login or sign up"
            >
              <FaUserCircle className="w-6 h-6" />
            </Link>

            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#029346] hover:text-[#029346] transition-colors"
              aria-label="Notifications"
            >
              <FiBell className="w-6 h-6" />
            </button>

            <Link
              href="/get-involved/donate"
              className="inline-flex items-center justify-center rounded-full bg-[#029346] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#027437] transition-colors"
            >
              Donate
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/auth/login"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Sign in or sign up"
            >
              <FaUserCircle className="w-7 h-7" />
            </Link>

            <button
              className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-gray-700 ml-0.5"
              aria-label="Notifications"
            >
              <FiBell className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* SECONDARY DESKTOP HEADER */}
      <nav className="hidden md:block fixed top-16 left-0 w-full bg-white z-40 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
            <Link
              href="https://facebook.com/carefornaturezambia"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </Link>
            <Link
              href="https://wa.me/260965638175"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:info@carefornaturezambia.org"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="w-4 h-4" />
            </Link>
            <Link
              href="tel:+260965638175"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Call"
            >
              <FaPhone className="w-4 h-4" />
            </Link>

            <Link href="/projects" className="hover:text-[#029346] transition-colors">Programs</Link>
            <Link href="/get-involved" className="hover:text-[#029346] transition-colors">Get Involved</Link>
            <Link href="/about" className="hover:text-[#029346] transition-colors">About</Link>
            <Link href="/news" className="hover:text-[#029346] transition-colors">News</Link>
            <Link href="/get-involved/careers" className="hover:text-[#029346] transition-colors">Careers</Link>
            <Link href="/contact" className="hover:text-[#029346] transition-colors">Contact</Link>
            <Link href="/about/reports" className="hover:text-[#029346] transition-colors">Reports</Link>
            <Link href="/webinar" className="hover:text-[#029346] transition-colors">Webnar</Link>
            <Link href="/auth/register" className="hover:text-[#029346] transition-colors">Create Account</Link>
            <Link href="/auth/login" className="hover:text-[#029346] transition-colors">Login</Link>
          </div>

          <Link
            href="/portal/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-[#029346] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#027437] transition-colors"
          >
            Go to Portal
          </Link>
        </div>
      </nav>
    </>
  );
};