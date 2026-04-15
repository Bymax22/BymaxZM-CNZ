// app/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineMenu, MdOutlineClose } from 'react-icons/md';

export const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <MdOutlineClose className="w-6 h-6" /> : <MdOutlineMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-in slide-in-from-top-2 duration-300">
          <div className="px-6 py-4 space-y-4">
            {menus.map((menu) => (
              <div key={menu.name}>
                <div className="font-medium text-gray-900 mb-2">{menu.name}</div>
                <div className="space-y-3 pl-4">
                  {menu.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <Link href="/impact" className="block text-gray-700 hover:text-[#029346] text-sm" onClick={() => setIsMobileMenuOpen(false)}>Impact</Link>
              <Link href="/get-involved" className="block text-gray-700 hover:text-[#029346] text-sm" onClick={() => setIsMobileMenuOpen(false)}>Get Involved</Link>
              <Link href="/donate" className="block bg-[#F79021] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-[#e67e1a] transition-colors text-center mt-4" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};