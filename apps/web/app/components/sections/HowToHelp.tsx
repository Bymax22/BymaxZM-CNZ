'use client';

import { motion } from 'framer-motion';
import { 
  FaHandHoldingUsd, 
  FaUsers, 
  FaHandsHelping, 
  FaShareAlt,
  FaCalendarAlt,
  FaHeart,
  FaArrowRight,
  FaEye,
  FaClock,
  FaUserFriends,
  FaMapMarkerAlt
} from 'react-icons/fa';

const waysToHelp = [
  {
    icon: FaHandHoldingUsd,
    title: 'Donate',
    description: 'Support conservation projects and community initiatives with your financial contribution.',
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    action: 'Donate Now',
    impact: 'Plants 100 trees'
  },
  {
    icon: FaUsers,
    title: 'Volunteer',
    description: 'Join our field operations, community outreach, or administrative tasks as a volunteer.',
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    action: 'Join Team',
    impact: 'Helps 50 families'
  },
  {
    icon: FaHandsHelping,
    title: 'Partner',
    description: 'Collaborate with us as a corporate partner, NGO, or community organization.',
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    action: 'Partner With Us',
    impact: 'Scales impact'
  },
  {
    icon: FaShareAlt,
    title: 'Share',
    description: 'Spread our mission on social media and help us reach more supporters.',
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    action: 'Share Now',
    impact: 'Reaches thousands'
  },
  {
    icon: FaCalendarAlt,
    title: 'Events',
    description: 'Participate in workshops, tree planting events, and conservation campaigns.',
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    action: 'View Events',
    impact: 'Joins community'
  },
  {
    icon: FaHeart,
    title: 'Join Clubs',
    description: 'Join Care for Nature Clubs and be part of our conservation family.',
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    action: 'Join Club',
    impact: 'Grows movement'
  }
];

export function HowToHelp() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#F0F9F4]">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#029346]/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#F79021]/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#F79021] to-[#AA5D26] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
            >
              <FaHandsHelping className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              How You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Help</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              Discover meaningful ways to contribute your time, skills, and resources towards creating sustainable change.
            </p>
          </motion.div>

          {/* Ways to Help Grid - Mobile First */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {waysToHelp.map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Main Card - Mobile Optimized */}
                <div className={`relative p-4 sm:p-6 rounded-2xl ${way.bgColor} border border-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col overflow-hidden`}>
                  
                  {/* Animated Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${way.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon Container */}
                  <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${way.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                      <way.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    
                    {/* Impact Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 border border-white/50"
                    >
                      {way.impact}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                      {way.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed flex-1">
                      {way.description}
                    </p>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-white overflow-hidden bg-gradient-to-r ${way.color} shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base`}
                    >
                      <span>{way.action}</span>
                      <motion.span
                        initial={{ x: -3 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Summary - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-xl overflow-hidden">
              <div className="relative z-10 text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                  Your Action Creates <span className="text-[#F79021]">Impact</span>
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                  Every contribution creates lasting change in communities and ecosystems across Zambia.
                </p>
                
                {/* Impact Metrics - Mobile Optimized */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { value: '100%', label: 'Transparent', icon: FaEye },
                    { value: '15+', label: 'Years', icon: FaClock },
                    { value: '50+', label: 'Team', icon: FaUserFriends },
                    { value: '10', label: 'Provinces', icon: FaMapMarkerAlt }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-1">
                        <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F79021]" />
                      </div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F79021] mb-1">
                        {metric.value}
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm font-medium">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-6 sm:mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-[#029346] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto group"
                  >
                    Start Making a Difference
                    <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}