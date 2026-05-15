// app/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { FiUser, FiBell } from 'react-icons/fi';

export const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    {
      name: 'Our Work',
      items: [
        {
          title: 'Nature Conservation',
          desc: 'Protecting ecosystems & biodiversity',
          href: '/projects/conservation',
          image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        },
        {
          title: 'Climate Action',
          desc: 'Fighting climate change impacts',
          href: '/projects/climate',
          image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d',
        },
      ],
    },
    {
      name: 'Programs',
      items: [
        {
          title: 'Children & Education',
          desc: 'Empowering children & youth',
          href: '/projects/education',
          image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a',
        },
        {
          title: 'Community Development',
          desc: 'Supporting local communities',
          href: '/projects/community',
          image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0',
        },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

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

        {/* NAV */}
        <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-700">

          {menus.map((menu) => (
            <div
              key={menu.name}
              onMouseEnter={() => setActiveMenu(menu.name)}
              onMouseLeave={() => setActiveMenu(null)}
              className="relative"
            >
              <span className="cursor-pointer hover:text-[#029346] transition-colors duration-200">
                {menu.name}
              </span>

              {/* DROPDOWN */}
              {activeMenu === menu.name && (
                <div className="absolute left-0 top-10 w-[600px] bg-white shadow-xl border rounded-xl p-6 grid grid-cols-2 gap-6">

                  {menu.items.map((item) => (
                    <Link key={item.title} href={item.href}>
                      <div className="group cursor-pointer">

                        <div className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover group-hover:scale-105 transition"
                          />
                        </div>

                        <h4 className="mt-3 font-semibold text-gray-900 group-hover:text-[#029346]">
                          {item.title}
                        </h4>

                        <p className="text-xs text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}

                </div>
              )}
            </div>
          ))}

          <Link href="/projects" className="hover:text-[#029346] transition-colors duration-200">Our Work</Link>
          <Link href="/our-stories" className="hover:text-[#029346] transition-colors duration-200">Our Stories</Link>
          <Link href="/get-involved" className="hover:text-[#029346] transition-colors duration-200">Get Involved</Link>
        </nav>

        {/* RIGHT */}
        <div className="hidden md:block">
          <Link
            href="/get-involved/donate"
            className="bg-[#F79021] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-[#e67e1a] transition-colors duration-200"
          >
            Donate
          </Link>
        </div>

        {/* MOBILE: show portal & clubs buttons in the main header */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Sign in or sign up"
          >
            <FiUser className="w-7 h-7 stroke-current" />
          </Link>

          <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-gray-700 ml-0.5" aria-label="Notifications">
            <FiBell className="w-7 h-7 stroke-current" />
          </button>
        </div>
      </div>
    </header>
  );
};