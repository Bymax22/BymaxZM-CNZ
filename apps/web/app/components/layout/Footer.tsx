// app/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    About: [
      { name: 'Who We Are', href: '/about' },
      { name: 'Our Story', href: '/about/story' },
      { name: 'Governance', href: '/about/governance' },
      { name: 'Team', href: '/about/team' },
    ],
    'Our Work': [
      { name: 'Nature Conservation', href: '/projects/conservation' },
      { name: 'Children & Education', href: '/projects/education' },
      { name: 'Climate Action', href: '/projects/climate' },
      { name: 'Community Development', href: '/projects/community' },
    ],
    'Get Involved': [
      { name: 'Join Our Clubs', href: '/portal/clubs' },
      { name: 'Donate', href: '/get-involved/donate' },
      { name: 'Partnerships', href: '/get-involved/partnership' },
      { name: 'Volunteer', href: '/get-involved/volunteer' },
    ],
    Resources: [
      { name: 'Reports', href: '/about/reports' },
      { name: 'News & Stories', href: '/news' },
      { name: 'Career Opportunities', href: '/get-involved/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com/carefornaturezambia', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/carefornaturezm', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/carefornaturezambia', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/care-for-nature-zambia', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://youtube.com/carefornaturezambia', label: 'YouTube' },
  ];

  return (
    <footer className="bg-[var(--secondary-brown)] text-gray-100">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14 md:py-16">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 pb-10 border-b border-[#7c4520]">
          <div>
            <div className="mb-4">
              <Image
                src="/Care for Nature logo d-site-01.png"
                alt="Care for Nature Zambia Logo"
                width={200}
                height={60}
                className="h-10 md:h-12 w-auto"
              />
            </div>
            <p className="text-gray-200 text-sm max-w-md leading-relaxed">
              Care for Nature Zambia protects Zambia’s environment while empowering communities through conservation, climate education and child-led advocacy.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#7c4520] hover:bg-[#029346] rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-200 hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 uppercase tracking-[0.12em] text-sm">Stay Informed</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe for updates on our projects, community programs and climate advocacy work.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#7c4520] border border-[#6b4a2b] rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#029346] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-[#F79021] hover:bg-[#AA5D26] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 uppercase tracking-[0.12em] text-sm">Contact</h4>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="text-gray-100 font-medium">Headquarters</p>
                <p>Mansa, Luapula Province, Zambia</p>
              </div>
              <div>
                <p className="text-gray-100 font-medium">Email</p>
                <a href="mailto:info@carefornaturezambia.org" className="hover:text-white transition-colors">
                  info@carefornaturezambia.org
                </a>
              </div>
              <div>
                <p className="text-gray-100 font-medium">Phone</p>
                <a href="tel:+260965638175" className="hover:text-white transition-colors">
                  +260 965 638 175
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-[0.08em] text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-[#7c4520]">
          <div className="flex items-start space-x-3">
            <FaMapMarkerAlt className="text-[#F79021] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Headquarters</p>
              <p className="text-gray-300 text-sm">
                Mansa, Luapula Province, Zambia
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaEnvelope className="text-[#F79021] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Email</p>
              <a
                href="mailto:info@carefornaturezambia.org"
                className="text-gray-300 text-sm hover:text-white transition-colors"
              >
                info@carefornaturezambia.org
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaPhone className="text-[#F79021] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Phone</p>
              <a
                href="tel:+260965638175"
                className="text-gray-300 text-sm hover:text-white transition-colors"
              >
                +260 965 638 175
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#7c4520]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-xs text-center md:text-left">
              © {currentYear} Care for Nature Zambia. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/contact" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};