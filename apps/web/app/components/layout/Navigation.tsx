// app/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBell } from 'react-icons/fa';

export const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    {
      name: 'Our Work',
      items: [
        {
          title: 'Nature Conservation',
          desc: 'Protecting ecosystems & biodiversity',
          href: '/conservation',
          image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        },
        {
          title: 'Climate Action',
          desc: 'Fighting climate change impacts',
          href: '/climate',
          image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d',
        },
      ],
    },
    {
      name: 'Programs',
      items: [
        {
          title: 'Child Rights',
          desc: 'Empowering children & youth',
          href: '/children',
          image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a',
        },
        {
          title: 'Sustainable Mining',
          desc: 'Responsible resource use',
          href: '/mining',
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
            width={140}
            height={60}
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

          <Link href="/impact" className="hover:text-[#029346] transition-colors duration-200">Impact</Link>
          <Link href="/get-involved" className="hover:text-[#029346] transition-colors duration-200">Get Involved</Link>
        </nav>

        {/* RIGHT */}
        <div className="hidden md:block">
          <Link
            href="/donate"
            className="bg-[#F79021] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-[#e67e1a] transition-colors duration-200"
          >
            Donate
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-700" aria-label="Notifications">
          <FaBell className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};