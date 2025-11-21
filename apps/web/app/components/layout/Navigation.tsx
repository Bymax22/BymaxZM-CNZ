'use client';

import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      {/* Top Bar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-[#029346] to-[#0C4726] text-white py-2 px-4 text-sm border-b border-white/10"
      >
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="tel:+260965638175"
              className="flex items-center gap-2 hover:text-[#F79021] transition-colors cursor-pointer text-xs sm:text-sm"
            >
              <FaPhone className="w-3 h-3" />
              <span>+260 965 638 175</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:info@carefornaturezambia.org"
              className="flex items-center gap-2 hover:text-[#F79021] transition-colors cursor-pointer text-xs sm:text-sm"
            >
              <FaEnvelope className="w-3 h-3" />
              <span>info@carefornaturezambia.org</span>
            </motion.a>
          </div>
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="hover:text-[#F79021] transition-colors font-medium text-xs sm:text-sm flex items-center gap-1"
            >
              <FaUsers className="w-3 h-3" />
              <span className="hidden sm:inline">Clubs</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-[#F79021] hover:bg-[#AA5D26] px-3 py-1 rounded-full text-white font-medium transition-all duration-300 text-xs sm:text-sm flex items-center gap-1"
            >
              <FaUserCircle className="w-3 h-3" />
              <span>Portal</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
            : 'bg-white shadow-lg'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/images/logo.png"
                  alt="Care for Nature Zambia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg lg:text-xl leading-none ${
                  scrolled ? 'text-gray-800' : 'text-gray-800'
                }`}>
                  Care for Nature
                </span>
                <span className={`text-xs lg:text-sm font-medium ${
                  scrolled ? 'text-[#029346]' : 'text-[#029346]'
                }`}>
                  Zambia
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`nav-link flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 rounded-xl font-medium transition-all duration-300 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-[#029346] hover:bg-[#029346]/10' 
                        : 'text-gray-700 hover:text-[#029346] hover:bg-[#029346]/10'
                    }`}
                    onMouseEnter={() => handleSubmenuEnter(item.name)}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="text-sm lg:text-base">{item.name}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="w-3 h-3" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Enhanced Submenu */}
                  {item.submenu && (
                    <motion.div 
                      ref={dropdownRef}
                      className={`absolute top-full left-0 mt-1 w-64 rounded-2xl shadow-2xl border border-gray-100 submenu bg-white/95 backdrop-blur-xl ${
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
                              className="flex flex-col p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#029346]/5 hover:to-[#0C4726]/5 group transition-all duration-300 border border-transparent hover:border-[#029346]/20"
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
                  className="bg-[#029346] hover:bg-[#0C4726] text-white font-semibold px-4 py-2 lg:px-6 lg:py-3 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <FaDonate className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Donate</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#F79021] text-[#F79021] hover:bg-[#F79021] hover:text-white font-semibold px-4 py-2 lg:px-6 lg:py-3 rounded-xl text-sm transition-all duration-300 flex items-center gap-2"
                >
                  <FaUsers className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Join Us</span>
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
            >
              <div className="container-custom py-4">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between w-full py-3 text-gray-700 font-semibold hover:text-[#029346] transition-colors group text-left"
                      onClick={() => item.submenu ? setActiveSubmenu(
                        activeSubmenu === item.name ? null : item.name
                      ) : (setIsOpen(false), window.location.href = item.href)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-[#029346] group-hover:text-[#029346]" />
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
                        className="pl-7 pb-2 space-y-1"
                      >
                        {item.submenu.map((subItem) => (
                          <motion.a
                            key={subItem.name}
                            href={subItem.href}
                            whileHover={{ x: 5 }}
                            className="block py-2 text-gray-600 hover:text-[#029346] transition-colors font-medium text-sm"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#029346] text-white font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaDonate className="w-4 h-4" />
                    Make a Donation
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-[#F79021] text-[#F79021] font-semibold py-3 rounded-xl hover:bg-[#F79021] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUsers className="w-4 h-4" />
                    Join as Volunteer
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}