'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaLeaf, 
  FaChevronDown,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaUsers,
  FaDonate,
  FaHandHoldingHeart,
  FaSeedling,
  FaUserCircle
} from 'react-icons/fa';
import Image from 'next/image';

const navigation = [
  { 
    name: 'Home', 
    href: '/',
    icon: FaLeaf
  },
  { 
    name: 'About Us', 
    href: '/about',
    icon: FaUsers,
    submenu: [
      { name: 'Our Story', href: '/about/story', description: 'Our journey in conservation' },
      { name: 'Leadership Team', href: '/about/team', description: 'Meet our dedicated team' },
      { name: 'Governance', href: '/about/governance', description: 'How we operate' },
      { name: 'Impact Reports', href: '/about/reports', description: 'See our achievements' }
    ]
  },
  { 
    name: 'Projects', 
    href: '/projects',
    icon: FaSeedling,
    submenu: [
      { name: 'Forest Conservation', href: '/projects/conservation', description: 'Protecting ecosystems' },
      { name: 'Community Development', href: '/projects/community', description: 'Empowering communities' },
      { name: 'Environmental Education', href: '/projects/education', description: 'Teaching future generations' },
      { name: 'Climate Action', href: '/projects/climate', description: 'Combating climate change' }
    ]
  },
  { 
    name: 'Get Involved', 
    href: '/get-involved',
    icon: FaHandHoldingHeart,
    submenu: [
      { name: 'Volunteer Programs', href: '/get-involved/volunteer', description: 'Join our team' },
      { name: 'Make a Donation', href: '/get-involved/donate', description: 'Support our work' },
      { name: 'Partnerships', href: '/get-involved/partnership', description: 'Collaborate with us' },
      { name: 'Careers', href: '/get-involved/careers', description: 'Work with us' }
    ]
  },
  { 
    name: 'News', 
    href: '/news',
    icon: FaHeart
  },
  { 
    name: 'Contact', 
    href: '/contact',
    icon: FaDonate
  }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmenuEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubmenu(itemName);
    setIsDropdownOpen(true);
  };

  const handleSubmenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover')) {
        setIsDropdownOpen(false);
        setActiveSubmenu(null);
      }
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleMobileLinkClick = (href: string) => {
    setIsOpen(false);
    window.location.href = href;
  };

  return (
    <>
      {/* Top Bar - Mobile Optimized */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-[#029346] to-[#0C4726] text-white py-2 px-4 text-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex flex-row flex-wrap justify-between items-center gap-2">
          {/* Contact Info - inline on mobile */}
          <div className="flex flex-row items-center gap-2 xs:gap-4 w-auto justify-center xs:justify-start">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+260965638175"
              className="flex items-center gap-2 hover:text-[#F79021] transition-colors cursor-pointer text-xs"
            >
              <FaPhone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Call Us</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:info@carefornaturezambia.org"
              className="flex items-center gap-2 hover:text-[#F79021] transition-colors cursor-pointer text-xs"
            >
              <FaEnvelope className="w-3 h-3 flex-shrink-0" />
              <span className="hidden xs:inline truncate">info@carefornaturezambia.org</span>
              <span className="xs:hidden truncate">Email Us</span>
            </motion.a>
          </div>
          
          {/* Clubs & Portal - Always visible on mobile */}
          <div className="flex items-center gap-3 w-auto justify-center xs:justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-[#F79021] transition-colors font-medium text-xs flex items-center gap-2"
              onClick={() => router.push('/auth/login')}
            >
              <FaUsers className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Clubs</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F79021] hover:bg-[#AA5D26] px-3 py-1 rounded-full text-white font-medium transition-all duration-300 text-xs flex items-center gap-2 whitespace-nowrap"
              onClick={() => router.push('/auth/login')}
            >
              <FaUserCircle className="w-3 h-3 flex-shrink-0" />
              <span>Portal</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-100' 
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo - Optimized for mobile */}
            <motion.div 
              className="flex items-center gap-2 lg:gap-3 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image
                  src="/images/logo.png"
                  alt="Care for Nature Zambia"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 32px, 40px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`font-bold text-sm lg:text-base xl:text-lg whitespace-nowrap ${
                  scrolled ? 'text-gray-800' : 'text-gray-800'
                }`}>
                  Care for Nature
                </span>
                <span className={`text-[10px] lg:text-xs font-medium whitespace-nowrap ${
                  scrolled ? 'text-[#029346]' : 'text-[#029346]'
                }`}>
                  Zambia
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-[#029346] hover:bg-[#029346]/10' 
                        : 'text-gray-700 hover:text-[#029346] hover:bg-[#029346]/10'
                    } text-sm xl:text-base`}
                    onMouseEnter={() => handleSubmenuEnter(item.name)}
                    onMouseLeave={handleSubmenuLeave}
                    onClick={() => { if (!item.submenu) router.push(item.href); }}
                  >
                    {item.icon && <item.icon className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" />}
                    <span>{item.name}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="w-3 h-3 flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Enhanced Submenu */}
                  {item.submenu && (
                    <motion.div 
                      ref={dropdownRef}
                      className={`absolute top-full left-0 mt-1 w-64 rounded-2xl shadow-2xl border border-gray-100 submenu bg-white/98 backdrop-blur-xl ${
                        activeSubmenu === item.name && isDropdownOpen
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'
                      } transition-all duration-300 origin-top`}
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="p-3">
                        <h3 className="font-bold text-gray-800 mb-2 text-sm">{item.name}</h3>
                        <div className="space-y-1">
                          {item.submenu.map((subItem) => (
                            <motion.a
                              key={subItem.name}
                              href={subItem.href}
                              whileHover={{ x: 5 }}
                              className="flex flex-col p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#029346]/5 hover:to-[#0C4726]/5 group transition-all duration-200 border border-transparent hover:border-[#029346]/20"
                            >
                              <span className="font-semibold text-gray-800 group-hover:text-[#029346] text-sm">
                                {subItem.name}
                              </span>
                              <span className="text-xs text-gray-500 group-hover:text-gray-600">
                                {subItem.description}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              
              {/* CTA Buttons */}
              <div className="flex items-center gap-2 ml-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#029346] hover:bg-[#0C4726] text-white font-semibold px-3 xl:px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
                  onClick={() => router.push('/get-involved/donate')}
                >
                  <FaDonate className="w-3 h-3 flex-shrink-0" />
                  <span>Donate</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#F79021] text-[#F79021] hover:bg-[#F79021] hover:text-white font-semibold px-3 xl:px-4 py-2 rounded-xl text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                  onClick={() => router.push('/get-involved/volunteer')}
                >
                  <FaUsers className="w-3 h-3 flex-shrink-0" />
                  <span>Join Us</span>
                </motion.button>
              </div>
            </div>

            {/* Mobile CTA Buttons & Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile CTA Buttons - Always visible */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#029346] text-white font-semibold px-3 py-2 rounded-lg text-xs transition-all duration-300 shadow-lg flex items-center gap-1 whitespace-nowrap"
                onClick={() => router.push('/get-involved/donate')}
              >
                <FaDonate className="w-3 h-3" />
                <span className="hidden xs:inline">Donate</span>
              </motion.button>
              
              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Slide-out Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0">
                    <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14">
                      <Image
                        src="/images/logo.png"
                        alt="Care for Nature Zambia"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">Care for Nature</span>
                      <span className="text-[#029346] text-xs font-medium">Zambia</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="p-4 space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between w-full py-3 text-gray-700 font-semibold hover:text-[#029346] transition-colors group text-left"
                        onClick={() => item.submenu ? setActiveSubmenu(
                          activeSubmenu === item.name ? null : item.name
                        ) : handleMobileLinkClick(item.href)}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && (
                            <item.icon className="w-4 h-4 text-[#029346] group-hover:text-[#029346] flex-shrink-0" />
                          )}
                          <span className="text-base">{item.name}</span>
                        </div>
                        {item.submenu && (
                          <motion.div
                            animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaChevronDown className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        )}
                      </motion.button>
                      
                      {/* Mobile Submenu */}
                      {item.submenu && activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-7 pb-2 space-y-1 bg-gray-50 rounded-lg mt-1"
                        >
                          {item.submenu.map((subItem) => (
                            <motion.a
                              key={subItem.name}
                              href={subItem.href}
                              whileTap={{ scale: 0.98 }}
                              className="block py-2 px-3 text-gray-600 hover:text-[#029346] transition-colors font-medium text-sm rounded-md hover:bg-white"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#029346] text-white font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                      onClick={() => { setIsOpen(false); router.push('/get-involved/donate'); }}
                    >
                      <FaDonate className="w-4 h-4" />
                      Make a Donation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full border-2 border-[#F79021] text-[#F79021] font-semibold py-3 rounded-xl hover:bg-[#F79021] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => { setIsOpen(false); router.push('/get-involved/volunteer'); }}
                    >
                      <FaUsers className="w-4 h-4" />
                      Join as Volunteer
                    </motion.button>
                    
                    {/* Quick Links */}
                    <div className="flex gap-4 justify-center pt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-gray-600 hover:text-[#029346] transition-colors flex items-center gap-1"
                        onClick={() => { setIsOpen(false); router.push('/auth/login'); }}
                      >
                        <FaUsers className="w-3 h-3" />
                        Clubs
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-gray-600 hover:text-[#029346] transition-colors flex items-center gap-1"
                        onClick={() => { setIsOpen(false); router.push('/auth/login'); }}
                      >
                        <FaUserCircle className="w-3 h-3" />
                        Portal
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}