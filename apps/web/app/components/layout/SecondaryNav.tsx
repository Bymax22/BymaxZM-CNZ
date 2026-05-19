// app/components/layout/SecondaryNav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { FaSearch, FaFacebookF, FaEnvelope, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { FaTree, FaUsers, FaTools, FaHandshake } from 'react-icons/fa';
import React from 'react';

const socialLinks = [
  { href: 'https://facebook.com/carefornaturezambia', icon: FaFacebookF, label: 'Facebook', external: true },
  { href: 'https://wa.me/260965638175', icon: FaWhatsapp, label: 'WhatsApp', external: true },
  { href: 'mailto:info@carefornaturezambia.org', icon: FaEnvelope, label: 'Email', external: false },
  { href: 'tel:+260965638175', icon: FaPhone, label: 'Call', external: false },
  { href: '/search', icon: FaSearch, label: 'Search', external: false },
];

type MobileMenuItem = {
  title: string;
  href: string;
  desc: string;
};

type MobileMenu = {
  name: string;
  items: MobileMenuItem[];
};

const thematicTabs = [
  { label: 'Our Projects', icon: FaTree, href: '/projects' },
  { label: 'Our Initiatives', icon: FaUsers, href: '/our-initiatives' },
  { label: 'Our Work', icon: FaTools, href: '/projects' },
  { label: 'Our Stories', icon: null, href: '/our-stories' },
];

const mobileMenus: MobileMenu[] = [ 
];

export const SecondaryNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPopupVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      setIsScrolling(true);
      setHasScrolled(window.scrollY > 48);

      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => setIsScrolling(false), 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-16 md:top-20 left-0 w-full z-40 md:hidden transform transition duration-500 ease-out ${isScrolling ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 py-1 border-b transition-colors duration-500 ease-out backdrop-blur-xl ${
            hasScrolled
              ? 'bg-white/95 border-slate-200 shadow-xl text-slate-900'
              : 'bg-slate-950/15 border-white/15 text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-2 py-1 h-8">
            <div className="flex items-center gap-1 md:gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer noopener' : undefined}
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20"
                  aria-label={link.label}
                >
                  <link.icon className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              ))}
            </div>

            <button
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center flex-shrink-0"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <MdOutlineClose className="w-5 h-5 md:w-6 md:h-6" /> : <MdOutlineMenu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-lg">
              <div className="space-y-5 max-h-[calc(100vh-280px)] overflow-y-auto">
                {/* Thematic tabs at top of dropdown */}
                <div>
                  <div className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider border-b pb-3">Menu</div>
                  <div className="grid grid-cols-2 gap-3">
                    {thematicTabs.map((tab) => (
                      <Link
                        key={tab.label}
                        href={tab.href}
                        className="block rounded-lg p-3 text-center bg-gradient-to-br from-gray-50 to-white hover:from-[#f0f9f4] hover:to-gray-50 border border-gray-200 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="text-2xl mb-2">
                          {tab.icon ? React.createElement(tab.icon, { className: 'w-6 h-6 mx-auto text-[#029346]' }) : <span className="text-2xl">📖</span>}
                        </div>
                        <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">{tab.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                {mobileMenus.map((menu) => (
                  <div key={menu.name}>
                    <div className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider border-b pb-3">{menu.name}</div>
                    <div className="space-y-3 pl-1">
                      {menu.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block rounded-lg p-3 hover:bg-[#f0f9f4] transition-colors border border-transparent hover:border-[#029346]/20"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-5 flex flex-col gap-3">
                  <Link
                    href="/portal/dashboard"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-white bg-[#029346] hover:bg-[#027437] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portal
                  </Link>
                  <Link
                    href="/portal/clubs"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-white bg-[#029346] hover:bg-[#027437] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Clubs
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-white bg-[#F79021] hover:bg-[#e67e1a] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-white bg-[#F79021] hover:bg-[#e67e1a] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/about"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/reports"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reports
                  </Link>
                  <Link
                    href="/news"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    News
                  </Link>
                  <Link
                    href="/careers"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Careers
                  </Link>
                  <Link
                    href="/contact"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/webnar"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Webnar
                  </Link>
                  <Link
                    href="/get-involved"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/get-involved/donate"
                    className="block rounded-lg px-4 py-3 text-center text-sm font-bold text-white bg-[#029346] hover:bg-[#027437] transition-colors"
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

      {isPopupVisible && (
        <div className="md:hidden fixed left-4 right-4 top-[7.5rem] z-50">
          <div className="relative rounded-xl bg-[var(--primary-orange)] text-white p-3 border border-orange-600">
            <button
              className="absolute top-2 right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Close event popup"
              onClick={() => setIsPopupVisible(false)}
            >
              <MdOutlineClose className="w-4 h-4" />
            </button>
            <div className="pr-8">
              <p className="text-[10px] uppercase tracking-[0.28em] opacity-90 mb-1">Upcoming Event</p>
              <h3 className="text-sm font-semibold">No Upcoming Events Available</h3>
              <p className="text-xs text-white/90">Date • Location</p>
            </div>
            <Link
              href="/portal/events"
              className="mt-3 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              View
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
