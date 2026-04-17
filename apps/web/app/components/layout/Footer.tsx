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
    <footer className="bg-[rgb(0,78,37)] text-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pb-8 border-b border-gray-700">
          <div>
            <div className="mb-4">
              <Image
                src="/Care for Nature logo d-site-01.png"
                alt="Care for Nature Zambia Logo"
                width={200}
                height={60}
                className="h-8 md:h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Building resilient communities through citizen participation in nature conservation.
              Together for humanity and nature.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-700 hover:bg-[#029346] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-300 hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates on our work and ways to get involved.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#029346] focus:border-transparent"
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
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#F79021] text-sm transition-colors"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-700">
          <div className="flex items-start space-x-3">
            <FaMapMarkerAlt className="text-[#F79021] mt-1 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Headquarters</p>
              <p className="text-gray-400 text-sm">
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
                className="text-gray-400 text-sm hover:text-[#F79021] transition-colors"
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
                className="text-gray-400 text-sm hover:text-[#F79021] transition-colors"
              >
                +260 965 638 175
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs text-center md:text-left">
              © {currentYear} Care for Nature Zambia. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/privacy" className="text-gray-400 hover:text-[#F79021] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="text-gray-400 hover:text-[#F79021] transition-colors">
                Terms of Use
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/contact" className="text-gray-400 hover:text-[#F79021] transition-colors">
                Support
              </Link>
            </div>
            <p className="text-gray-500 text-xs flex items-center gap-1">
              Registered under Registrar of Societies
              <br className="hidden sm:inline" />
              Chapter 119: ORS/102/46/334
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};