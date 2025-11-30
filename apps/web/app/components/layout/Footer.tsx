'use client';

import { motion } from 'framer-motion';
import { 
  FaLeaf, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaHeart,
  FaArrowRight,
  FaDonate
} from 'react-icons/fa';

const footerSections = [
  {
    title: 'Our Work',
    links: [
      { name: 'Forest Conservation', href: '/projects/conservation' },
      { name: 'Community Programs', href: '/projects/community' },
      { name: 'Education', href: '/projects/education' },
      { name: 'Climate Action', href: '/projects/climate' }
    ]
  },
  {
    title: 'Get Involved',
    links: [
      { name: 'Volunteer', href: '/get-involved/volunteer' },
      { name: 'Donate', href: '/get-involved/donate' },
      { name: 'Partner', href: '/get-involved/partner' },
      { name: 'Nature Clubs', href: '/clubs' }
    ]
  },
  {
    title: 'About',
    links: [
      { name: 'Our Story', href: '/about/story' },
      { name: 'Team', href: '/about/team' },
      { name: 'Reports', href: '/resources/reports' },
      { name: 'Contact', href: '/contact' }
    ]
  }
];

const socialLinks = [
  { 
    icon: FaFacebookF, 
    href: '#', 
    name: 'Facebook'
  },
  { 
    icon: FaTwitter, 
    href: '#', 
    name: 'Twitter'
  },
  { 
    icon: FaInstagram, 
    href: '#', 
    name: 'Instagram'
  },
  { 
    icon: FaLinkedinIn, 
    href: '#', 
    name: 'LinkedIn'
  },
  { 
    icon: FaYoutube, 
    href: '#', 
    name: 'YouTube'
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#08331C] via-[#0C4726] to-[#029346]">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#029346]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#F79021]/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main Footer */}
      <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 mb-6"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <FaLeaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">Care for Nature</div>
                  <div className="text-[#F79021] font-semibold text-sm sm:text-base">Zambia</div>
                </div>
              </motion.div>

              {/* Mission Statement */}
              <p className="text-white/80 mb-6 leading-relaxed text-sm sm:text-base">
                Leading environmental conservation and community empowerment across Zambia through sustainable practices and education.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F79021]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F79021]/30 transition-colors flex-shrink-0">
                    <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white/70 text-xs sm:text-sm">Phone</div>
                    <div className="text-white font-semibold text-sm sm:text-base">+260 965 638 175</div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F79021]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F79021]/30 transition-colors flex-shrink-0">
                    <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white/70 text-xs sm:text-sm">Email</div>
                    <div className="text-white font-semibold text-sm sm:text-base truncate">info@carefornaturezambia.org</div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F79021]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F79021]/30 transition-colors flex-shrink-0">
                    <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white/70 text-xs sm:text-sm">Location</div>
                    <div className="text-white font-semibold text-sm sm:text-base">Lusaka, Zambia</div>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:bg-[#F79021] backdrop-blur-sm border border-white/10 hover:border-[#F79021] group"
                    title={social.name}
                  >
                    <social.icon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Links Columns */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaHeart className="w-4 h-4 text-[#F79021]" />
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 3 }}
                    >
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-300 text-sm sm:text-base flex items-center gap-1 group"
                      >
                        <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Stay <span className="text-[#F79021]">Updated</span>
              </h3>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-lg mx-auto">
                Get updates on our projects and opportunities to make a difference.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F79021] backdrop-blur-sm text-sm sm:text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#F79021] hover:bg-[#AA5D26] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 justify-center text-sm sm:text-base"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Subscribe
                </motion.button>
              </motion.div>
              
              <p className="text-white/60 text-xs sm:text-sm mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/60">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center sm:text-left text-sm"
            >
              <span>© {currentYear} Care for Nature Zambia. All rights reserved.</span>
              <span className="block sm:inline sm:ml-2 text-[#F79021]">
                Developed by Bymax Zambia
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm"
            >
              {[
                { name: 'Privacy', href: '/privacy' },
                { name: 'Terms', href: '/terms' },
                { name: 'Contact', href: '/contact' },
                { name: 'Careers', href: '/careers' }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  className="hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Donate Button - Mobile Optimized */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F79021] to-[#AA5D26] rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center text-white z-50 group overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center">
          <FaDonate className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
          <span className="text-[10px] sm:text-xs font-bold">Donate</span>
        </div>
      </motion.button>
    </footer>
  );
}