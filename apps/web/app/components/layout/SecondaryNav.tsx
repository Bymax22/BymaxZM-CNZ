// app/components/layout/SecondaryNav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { FaTree, FaUsers, FaTools, FaHandshake } from 'react-icons/fa';
import React from 'react';

const socialLinks = [
  { href: 'https://facebook.com/carefornaturezambia', icon: FaFacebookF, label: 'Facebook', external: true },
  { href: 'mailto:info@carefornaturezambia.org', icon: FaEnvelope, label: 'Email', external: false },
];

const thematicTabs = [
  { label: 'Nature', icon: FaTree, href: '/our-stories/nature' },
  { label: 'Children', icon: FaUsers, href: '/our-stories/children' },
  { label: 'Mining', icon: FaTools, href: '/our-stories/mining' },
  { label: 'Community Engagement', icon: FaHandshake, href: '/projects/community' },
  { label: 'Our Stories', icon: null, href: '/our-stories' },
];



const mobileMenus = [
  {
    name: 'Nature Conservation Program (NCP)',
    items: [
      { title: 'Habitat Restoration', href: '/our-stories/nature', desc: 'Protecting ecosystems & species diversity' },
      { title: 'Climate Resilience', href: '/our-stories/nature', desc: 'Building community capacity for climate action' },
      { title: 'Resource Management', href: '/our-stories/nature', desc: 'Sustainable use of natural resources' },
      { title: 'Eco-Tourism', href: '/our-stories/nature', desc: 'Green jobs & community development' },
    ],
  },
  {
    name: 'Child Rights & Development (CRDP)',
    items: [
      { title: 'Child Participation', href: '/our-stories/children', desc: 'Strengthening child voice in decision-making' },
      { title: 'School Clubs', href: '/our-stories/children', desc: 'Building leadership & climate awareness' },
      { title: 'Rights Protection', href: '/our-stories/children', desc: 'Protection from abuse & exploitation' },
      { title: 'Youth Advocacy', href: '/our-stories/children', desc: 'Child-led initiatives for justice & equality' },
    ],
  },
  {
    name: 'Sustainable Mining Program (SMP)',
    items: [
      { title: 'Legal Compliance', href: '/our-stories/mining', desc: 'Adhering to environmental & labor frameworks' },
      { title: 'Community Monitoring', href: '/our-stories/mining', desc: 'Accountability & transparency in mining' },
      { title: 'Land Restoration', href: '/our-stories/mining', desc: 'Reclamation & tree planting projects' },
      { title: 'Stakeholder Partnerships', href: '/our-stories/mining', desc: 'Networks for responsible extractives' },
    ],
  },
  {
    name: 'Organization Development (ODP)',
    items: [
      { title: 'Institutional Capacity', href: '/projects', desc: 'Strengthening systems & governance' },
      { title: 'Resource Mobilization', href: '/projects', desc: 'Social enterprises & financial sustainability' },
      { title: 'Partnerships & Networks', href: '/projects', desc: 'Collaboration across sectors' },
      { title: 'Operations & Compliance', href: '/projects', desc: 'Effective NGO management & scaling' },
    ],
  },
];

export const SecondaryNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsPopupVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-16 left-0 w-full border-b z-40 md:hidden transition-colors duration-300 ${
          isScrolled ? 'bg-[var(--primary-orange)] border-orange-300' : 'bg-[var(--primary-green)] border-[var(--secondary-green)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-2 py-1">
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer noopener' : undefined}
                  className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20"
                  aria-label={link.label}
                >
                  <link.icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsStoriesOpen(!isStoriesOpen);
                      setIsProgramsOpen(false);
                    }}
                    className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition"
                    aria-expanded={isStoriesOpen}
                    aria-label="Our Stories"
                  >
                    Our Stories
                  </button>

                  {isStoriesOpen && (
                    <div className="absolute left-0 top-10 w-48 rounded-md bg-white border border-gray-200 mt-2 py-1">
                      <nav className="flex flex-col">
                        <Link href="/our-stories/nature" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Nature</Link>
                        <Link href="/our-stories/children" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Children</Link>
                        <Link href="/our-stories/mining" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mining</Link>
                        <Link href="/projects/community" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Community Engagement</Link>
                        <Link href="/our-stories?scope=global" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Global</Link>
                        <Link href="/our-stories?scope=regional" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Regional</Link>
                        <Link href="/our-stories?scope=national" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Nationwide</Link>
                      </nav>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setIsProgramsOpen(!isProgramsOpen);
                      setIsStoriesOpen(false);
                    }}
                    className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition"
                    aria-expanded={isProgramsOpen}
                    aria-label="Programs"
                  >
                    Programs
                  </button>

                  {isProgramsOpen && (
                    <div className="absolute left-0 top-10 w-56 rounded-md bg-white border border-gray-200 mt-2 py-1">
                      <nav className="flex flex-col">
                        <Link href="/projects" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All Programs</Link>
                        <Link href="/projects/community" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Community</Link>
                        <Link href="/our-initiatives" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Initiatives</Link>
                        <Link href="/our-stories" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Story Library</Link>
                      </nav>
                    </div>
                  )}
                </div>

              </div>

              <button
                className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex-shrink-0"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <MdOutlineClose className="w-4 h-4" /> : <MdOutlineMenu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="bg-white border border-gray-200 rounded-xl p-3 mt-2">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {/* Thematic tabs at top of dropdown */}
                <div>
                  <div className="font-semibold text-gray-900 mb-3 text-sm border-b pb-2">Our Focus Areas</div>
                  <div className="grid grid-cols-2 gap-2">
                    {thematicTabs.map((tab) => (
                      <Link
                        key={tab.label}
                        href={tab.href}
                        className="block rounded-lg p-2 text-center bg-white hover:bg-gray-50 border border-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="text-lg">
                          {tab.icon ? React.createElement(tab.icon, { className: 'w-5 h-5 mx-auto text-gray-700' }) : <span className="text-2xl">📖</span>}
                        </div>
                        <div className="text-xs font-semibold text-gray-900 mt-1">{tab.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                {mobileMenus.map((menu) => (
                  <div key={menu.name}>
                    <div className="font-semibold text-gray-900 mb-3 text-sm border-b pb-2">{menu.name}</div>
                    <div className="space-y-2 pl-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block rounded-xl p-2.5 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-medium text-sm text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 flex flex-col gap-2">
                  <Link
                    href="/portal/dashboard"
                    className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white bg-[var(--primary-green)] hover:bg-[var(--secondary-green)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portal
                  </Link>
                  <Link
                    href="/portal/clubs"
                    className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white bg-[var(--primary-green)] hover:bg-[var(--secondary-green)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Clubs
                  </Link>
                    <Link
                      href="/about"
                      className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/our-initiatives"
                      className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Initiatives
                    </Link>
                    <Link
                      href="/news"
                      className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      News
                    </Link>
                  <Link
                    href="/get-involved"
                    className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/get-involved/donate"
                    className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white bg-[#F79021] hover:bg-[#e67e1a] transition-colors"
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
