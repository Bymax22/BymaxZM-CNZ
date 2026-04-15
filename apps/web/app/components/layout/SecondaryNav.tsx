// app/components/layout/SecondaryNav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineWeb, MdOutlineGroup, MdOutlineCardGiftcard, MdOutlineWork } from 'react-icons/md';

const tabs = [
  { name: 'Portal', href: '/portal', icon: MdOutlineWeb },
  { name: 'Clubs', href: '/clubs', icon: MdOutlineGroup },
  { name: 'Donors', href: '/donors', icon: MdOutlineCardGiftcard },
  { name: 'Careers', href: '/careers', icon: MdOutlineWork },
];

export const SecondaryNav = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-16 left-0 w-full border-b z-40 md:hidden transition-colors duration-300 ${
      isScrolled ? 'bg-[var(--primary-orange)] border-orange-300' : 'bg-[var(--primary-green)] border-[var(--secondary-green)]'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-2 py-1">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 transform hover:scale-105 ${
                pathname === tab.href
                  ? 'bg-white text-[var(--primary-green)] shadow-md'
                  : 'text-white hover:bg-white/20 hover:shadow-sm'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};