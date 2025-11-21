'use client';

import { useState, useEffect } from 'react';
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
  FaSeedling
} from 'react-icons/fa';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-emerald-700 to-green-800 text-white py-3 px-4 text-sm border-b border-white/10"
      >
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <FaPhone className="w-3 h-3" />
              <span>+260 965 638 175</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <FaEnvelope className="w-3 h-3" />
              <span>info@carefornaturezambia.org</span>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="hover:text-amber-300 transition-colors font-medium"
            >
              Care for Nature Clubs
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-amber-500 hover:bg-amber-600 px-4 py-1 rounded-full text-white font-medium transition-all duration-300"
            >
              Portal Login
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
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg ${
                  scrolled ? 'shadow-emerald-200' : 'shadow-emerald-400'
                }`}
              >
                <FaLeaf className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl leading-none ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Care for Nature
                </span>
                <span className={`text-sm font-medium ${
                  scrolled ? 'text-emerald-600' : 'text-emerald-200'
                }`}>
                  Zambia
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`nav-link flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50' 
                        : 'text-white hover:text-emerald-200 hover:bg-white/10'
                    }`}
                    onMouseEnter={() => {
                      setActiveSubmenu(item.name);
                      setIsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        if (!document.querySelector('.submenu:hover')) {
                          setIsDropdownOpen(false);
                        }
                      }, 100);
                    }}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
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
                      className={`absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl border border-gray-100 submenu ${
                        scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-xl'
                      } ${
                        activeSubmenu === item.name && isDropdownOpen
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95 pointer-events-none'
                      } transition-all duration-300 origin-top`}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">{item.name}</h3>
                        <div className="space-y-2">
                          {item.submenu.map((subItem) => (
                            <motion.a
                              key={subItem.name}
                              href={subItem.href}
                              whileHover={{ x: 5 }}
                              className="flex flex-col p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 group transition-all duration-300 border border-transparent hover:border-emerald-100"
                            >
                              <span className="font-semibold text-gray-800 group-hover:text-emerald-600">
                                {subItem.name}
                              </span>
                              <span className="text-sm text-gray-500 group-hover:text-gray-600">
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
              <div className="flex items-center gap-3 ml-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                    scrolled 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-emerald-200 hover:shadow-xl' 
                      : 'bg-white text-emerald-600 hover:bg-gray-50 hover:shadow-white hover:shadow-xl'
                  }`}
                >
                  <FaDonate className="inline w-4 h-4 mr-2" />
                  Donate
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 border-2 ${
                    scrolled 
                      ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white' 
                      : 'border-white text-white hover:bg-white hover:text-amber-500'
                  }`}
                >
                  <FaUsers className="inline w-4 h-4 mr-2" />
                  Join Us
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`xl:hidden p-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
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
              className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
            >
              <div className="container-custom py-6">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between w-full py-4 text-gray-700 font-semibold hover:text-emerald-600 transition-colors group"
                      onClick={() => item.submenu ? setActiveSubmenu(
                        activeSubmenu === item.name ? null : item.name
                      ) : setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-emerald-500 group-hover:text-emerald-600" />
                        )}
                        {item.name}
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
                        className="pl-7 pb-3 space-y-2"
                      >
                        {item.submenu.map((subItem) => (
                          <motion.a
                            key={subItem.name}
                            href={subItem.href}
                            whileHover={{ x: 5 }}
                            className="block py-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium"
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
                  className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaDonate className="w-5 h-5" />
                    Make a Donation
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-emerald-500 text-emerald-500 font-bold py-4 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaUsers className="w-5 h-5" />
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