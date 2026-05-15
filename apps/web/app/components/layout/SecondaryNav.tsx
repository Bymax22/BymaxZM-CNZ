// app/components/layout/SecondaryNav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineWeb, MdOutlineGroup, MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  { href: 'https://facebook.com/carefornaturezambia', icon: FaFacebookF, label: 'Facebook', external: true },
  { href: 'mailto:info@carefornaturezambia.org', icon: FaEnvelope, label: 'Email', external: false },
];

const navLinks = [
  { name: 'Portal', href: '/portal/dashboard', icon: MdOutlineWeb },
  { name: 'Clubs', href: '/portal/clubs', icon: MdOutlineGroup },
];

const thematicStatements = [
  { label: 'Nature', icon: '🌿', href: '/projects/ncp' },
  { label: 'Children', icon: '👶', href: '/projects/crdp' },
  { label: 'Mining', icon: '⛏️', href: '/projects/smp' },
  { label: 'Growth', icon: '📈', href: '/projects/odp' },
];

const mobileMenus = [
  {
    name: 'Nature Conservation Program (NCP)',
    items: [
      { title: 'Habitat Restoration', href: '/projects/ncp', desc: 'Protecting ecosystems & species diversity' },
      { title: 'Climate Resilience', href: '/projects/ncp', desc: 'Building community capacity for climate action' },
      { title: 'Resource Management', href: '/projects/ncp', desc: 'Sustainable use of natural resources' },
      { title: 'Eco-Tourism', href: '/projects/ncp', desc: 'Green jobs & community development' },
    ],
  },
  {
    name: 'Child Rights & Development (CRDP)',
    items: [
      { title: 'Child Participation', href: '/projects/crdp', desc: 'Strengthening child voice in decision-making' },
      { title: 'School Clubs', href: '/projects/crdp', desc: 'Building leadership & climate awareness' },
      { title: 'Rights Protection', href: '/projects/crdp', desc: 'Protection from abuse & exploitation' },
      { title: 'Youth Advocacy', href: '/projects/crdp', desc: 'Child-led initiatives for justice & equality' },
    ],
  },
  {
    name: 'Sustainable Mining Program (SMP)',
    items: [
      { title: 'Legal Compliance', href: '/projects/smp', desc: 'Adhering to environmental & labor frameworks' },
      { title: 'Community Monitoring', href: '/projects/smp', desc: 'Accountability & transparency in mining' },
      { title: 'Land Restoration', href: '/projects/smp', desc: 'Reclamation & tree planting projects' },
      { title: 'Stakeholder Partnerships', href: '/projects/smp', desc: 'Networks for responsible extractives' },
    ],
  },
  {
    name: 'Organization Development (ODP)',
    items: [
      { title: 'Institutional Capacity', href: '/projects/odp', desc: 'Strengthening systems & governance' },
      { title: 'Resource Mobilization', href: '/projects/odp', desc: 'Social enterprises & financial sustainability' },
      { title: 'Partnerships & Networks', href: '/projects/odp', desc: 'Collaboration across sectors' },
      { title: 'Operations & Compliance', href: '/projects/odp', desc: 'Effective NGO management & scaling' },
    ],
  },
];

export const SecondaryNav = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1">
              {/* Rotating thematic area statements */}
              {thematicStatements.map((stmt) => (
                <Link
                  key={stmt.label}
                  href={stmt.href}
                  className="px-1.5 py-0.5 text-xs font-semibold text-white hover:bg-white/10 rounded transition-all"
                  title={stmt.label}
                >
                  {stmt.icon} {stmt.label}
                </Link>
              ))}

              <button
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors ml-auto"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <MdOutlineClose className="w-4 h-4" /> : <MdOutlineMenu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="bg-white border border-white/10 rounded-3xl p-4 shadow-2xl mt-2">
              <div className="space-y-4 max-h-96 overflow-y-auto">
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
          <div className="relative rounded-3xl bg-[#F79021] text-white p-4 shadow-2xl border border-white/10">
            <button
              className="absolute top-3 right-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Close event popup"
              onClick={() => setIsPopupVisible(false)}
            >
              <MdOutlineClose className="w-4 h-4" />
            </button>
            <div className="pr-10">
              <p className="text-[10px] uppercase tracking-[0.28em] opacity-90 mb-1">Upcoming Event</p>
              <h3 className="text-sm font-semibold">Community Clean-Up Day</h3>
              <p className="text-xs text-white/90">Sat, May 3 • Lusaka River Park</p>
            </div>
            <Link
              href="/portal/events"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              View
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
