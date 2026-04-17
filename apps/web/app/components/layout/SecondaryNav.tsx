// app/components/layout/SecondaryNav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineWeb, MdOutlineGroup, MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';

const tabs = [
  { name: 'Portal', href: '/portal', icon: MdOutlineWeb },
  { name: 'Clubs', href: '/clubs', icon: MdOutlineGroup },
  { name: 'Facebook', href: 'https://facebook.com/carefornaturezambia', icon: FaFacebookF, external: true },
  { name: 'Email', href: 'mailto:info@carefornaturezambia.org', icon: FaEnvelope, external: true },
];

const mobileMenus = [
  {
    name: 'Our Work',
    items: [
      { title: 'Nature Conservation', href: '/conservation', desc: 'Protecting ecosystems & biodiversity' },
      { title: 'Climate Action', href: '/climate', desc: 'Fighting climate change impacts' },
    ],
  },
  {
    name: 'Programs',
    items: [
      { title: 'Child Rights', href: '/children', desc: 'Empowering children & youth' },
      { title: 'Sustainable Mining', href: '/mining', desc: 'Responsible resource use' },
    ],
  },
];

export const SecondaryNav = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-16 left-0 w-full border-b z-40 md:hidden transition-colors duration-300 ${
        isScrolled ? 'bg-[var(--primary-orange)] border-orange-300' : 'bg-[var(--primary-green)] border-[var(--secondary-green)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex items-center gap-2 overflow-x-auto pr-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  target={tab.external ? '_blank' : undefined}
                  rel={tab.external ? 'noreferrer noopener' : undefined}
                  className={`flex items-center justify-center gap-1 min-w-[4.5rem] px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    pathname === tab.href && !tab.external
                      ? 'bg-white text-[var(--primary-green)] shadow-md'
                      : 'text-white hover:bg-white/20 hover:shadow-sm'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.external ? <span className="sr-only">{tab.name}</span> : tab.name}
                </Link>
              ))}
            </div>

            <button
              className="p-2 text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <MdOutlineClose className="w-6 h-6" /> : <MdOutlineMenu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="bg-white border border-white/10 rounded-3xl p-4 shadow-2xl mt-2">
              <div className="space-y-4">
                {mobileMenus.map((menu) => (
                  <div key={menu.name}>
                    <div className="font-semibold text-gray-900 mb-2">{menu.name}</div>
                    <div className="space-y-3 pl-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block rounded-2xl p-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-medium text-sm text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 flex flex-col gap-3">
                  <Link
                    href="/impact"
                    className="block rounded-2xl px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Impact
                  </Link>
                  <Link
                    href="/get-involved"
                    className="block rounded-2xl px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/donate"
                    className="block rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white bg-[#F79021] hover:bg-[#e67e1a] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="md:hidden fixed top-[5.5rem] left-0 right-0 px-4 z-30">
        <div className="rounded-3xl bg-[#F79021] text-white p-4 shadow-2xl border border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-90 mb-1">Upcoming Event</p>
              <h3 className="text-sm font-semibold">Community Clean-Up Day</h3>
              <p className="text-xs text-white/90">Sat, May 3 • Lusaka River Park</p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
