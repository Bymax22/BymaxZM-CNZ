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
  FaSeedling,
  FaHandsHelping,
  FaDonate,
  FaArrowRight,
  FaRibbon
} from 'react-icons/fa';

const footerSections = [
  {
    title: 'Our Impact',
    icon: FaSeedling,
    links: [
      { name: 'Forest Conservation', href: '/projects/conservation', description: 'Protecting ecosystems' },
      { name: 'Community Programs', href: '/projects/community', description: 'Empowering locals' },
      { name: 'Education Initiatives', href: '/projects/education', description: 'Teaching generations' },
      { name: 'Climate Action', href: '/projects/climate', description: 'Combating change' },
      { name: 'Wildlife Protection', href: '/projects/wildlife', description: 'Saving species' }
    ]
  },
  {
    title: 'Get Involved',
    icon: FaHandsHelping,
    links: [
      { name: 'Volunteer Programs', href: '/get-involved/volunteer', description: 'Join our team' },
      { name: 'Make a Donation', href: '/get-involved/donate', description: 'Support our work' },
      { name: 'Become a Partner', href: '/get-involved/partner', description: 'Collaborate with us' },
      { name: 'Nature Clubs', href: '/clubs', description: 'Start a chapter' },
      { name: 'Events & Campaigns', href: '/events', description: 'Participate' }
    ]
  },
  {
    title: 'Resources',
    icon: FaRibbon,
    links: [
      { name: 'Annual Reports', href: '/resources/reports', description: 'Our progress' },
      { name: 'Publications', href: '/resources/publications', description: 'Research & insights' },
      { name: 'Media Gallery', href: '/resources/gallery', description: 'Photos & videos' },
      { name: 'Research Papers', href: '/resources/research', description: 'Scientific work' },
      { name: 'Learning Materials', href: '/resources/education', description: 'Educational tools' }
    ]
  },
  {
    title: 'About CNZ',
    icon: FaHeart,
    links: [
      { name: 'Our Story', href: '/about/story', description: 'Journey since 2008' },
      { name: 'Leadership Team', href: '/about/team', description: 'Meet our experts' },
      { name: 'Governance', href: '/about/governance', description: 'How we operate' },
      { name: 'Transparency', href: '/about/transparency', description: 'Financial reports' },
      { name: 'Contact Us', href: '/contact', description: 'Get in touch' }
    ]
  }
];

const socialLinks = [
  { 
    icon: FaFacebookF, 
    href: '#', 
    color: 'hover:bg-blue-600',
    name: 'Facebook'
  },
  { 
    icon: FaTwitter, 
    href: '#', 
    color: 'hover:bg-blue-400',
    name: 'Twitter'
  },
  { 
    icon: FaInstagram, 
    href: '#', 
    color: 'hover:bg-gradient-to-br from-purple-600 to-pink-600',
    name: 'Instagram'
  },
  { 
    icon: FaLinkedinIn, 
    href: '#', 
    color: 'hover:bg-blue-700',
    name: 'LinkedIn'
  },
  { 
    icon: FaYoutube, 
    href: '#', 
    color: 'hover:bg-red-600',
    name: 'YouTube'
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Main Footer */}
      <div className="relative section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 mb-8"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <FaLeaf className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <div className="text-3xl font-bold text-white">Care for Nature</div>
                  <div className="text-amber-400 font-semibold text-lg">Zambia</div>
                </div>
              </motion.div>

              {/* Mission Statement */}
              <p className="text-white/80 mb-8 leading-relaxed text-lg font-light">
                Leading environmental conservation and community empowerment across Zambia through sustainable practices, education, and collaborative action since 2008.
              </p>

              {/* Impact Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { number: '50K+', label: 'Trees Planted' },
                  { number: '100+', label: 'Communities' },
                  { number: '10K+', label: 'Lives Impacted' },
                  { number: '15+', label: 'Years Serving' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                  >
                    <div className="text-amber-400 font-bold text-lg">{stat.number}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <FaPhone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Phone</div>
                    <div className="text-white font-semibold">+260 211 123 456</div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <FaEnvelope className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Email</div>
                    <div className="text-white font-semibold">info@carefornaturezambia.org</div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <FaMapMarkerAlt className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Location</div>
                    <div className="text-white font-semibold">Lusaka, Zambia</div>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-3 mt-8"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${social.color} backdrop-blur-sm border border-white/10 hover:border-white/20 group`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Links Columns */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                    >
                      <a
                        href={link.href}
                        className="group flex flex-col p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                      >
                        <span className="text-white font-medium group-hover:text-amber-400 transition-colors">
                          {link.name}
                        </span>
                        <span className="text-white/60 text-sm group-hover:text-white/80">
                          {link.description}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <FaEnvelope className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our <span className="text-amber-400">Conservation Community</span>
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Get monthly updates on our projects, success stories from the field, and exclusive opportunities to make a difference.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Subscribe Now
                  <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
              
              <p className="text-white/60 text-sm mt-4">
                No spam, just impactful stories. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 relative">
        <div className="container-custom">
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center md:text-left"
            >
              <span>© {currentYear} Care for Nature Zambia. All rights reserved.</span>
              <span className="block md:inline md:ml-2 text-amber-400">
                Developed by Bymax Zambia
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 text-sm"
            >
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Transparency', href: '/transparency' },
                { name: 'Sitemap', href: '/sitemap' },
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

      {/* Floating Donate Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center text-white z-50 group overflow-hidden"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <div className="relative z-10 flex flex-col items-center">
          <FaDonate className="w-6 h-6 mb-1" />
          <span className="text-xs font-bold">Donate</span>
        </div>
      </motion.button>
    </footer>
  );
}