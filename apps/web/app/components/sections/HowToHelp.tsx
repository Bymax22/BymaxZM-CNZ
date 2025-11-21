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
  FaSeedling,
  FaHandPeace
} from 'react-icons/fa';

const waysToHelp = [
  {
    icon: FaHandHoldingUsd,
    title: 'Donate',
    description: 'Support our conservation projects and community initiatives with your financial contribution.',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
    action: 'Make a Donation',
    impact: 'Funds 100 trees'
  },
  {
    icon: FaUsers,
    title: 'Volunteer',
    description: 'Join our field operations, community outreach, or administrative tasks as a volunteer.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
    action: 'Join as Volunteer',
    impact: 'Touch 50 lives'
  },
  {
    icon: FaHandsHelping,
    title: 'Partner',
    description: 'Collaborate with us as a corporate partner, NGO, or community organization.',
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    action: 'Become a Partner',
    impact: 'Scale our impact'
  },
  {
    icon: FaShareAlt,
    title: 'Spread Awareness',
    description: 'Share our mission on social media and help us reach more supporters.',
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-100',
    action: 'Share Our Work',
    impact: 'Reach thousands'
  },
  {
    icon: FaCalendarAlt,
    title: 'Attend Events',
    description: 'Participate in our workshops, tree planting events, and conservation campaigns.',
    color: 'from-teal-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-green-100',
    action: 'View Events',
    impact: 'Join community'
  },
  {
    icon: FaHeart,
    title: 'Become a Member',
    description: 'Join Care for Nature Clubs and be part of our growing conservation family.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100',
    action: 'Join Now',
    impact: 'Grow with us'
  }
];

export function HowToHelp() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/20 to-emerald-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/10 rounded-full blur-3xl"></div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 text-emerald-300/30"
        >
          <FaSeedling className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-20 text-amber-300/30"
        >
          <FaHandPeace className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl"
            >
              <FaHandsHelping className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Movement</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover meaningful ways to contribute your time, skills, and resources towards creating sustainable change in Zambia&apos;s communities and ecosystems.
            </p>
          </motion.div>

          {/* Ways to Help Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {waysToHelp.map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Main Card */}
                <div className={`relative p-8 rounded-3xl ${way.bgColor} border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col overflow-hidden`}>
                  
                  {/* Animated Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${way.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon Container */}
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${way.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <way.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Impact Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 border border-white/50"
                    >
                      {way.impact}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                      {way.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed flex-1">
                      {way.description}
                    </p>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative w-full py-4 px-6 rounded-2xl font-semibold text-white overflow-hidden bg-gradient-to-r ${way.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3`}
                    >
                      <span>{way.action}</span>
                      <motion.span
                        initial={{ x: -5 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaArrowRight className="w-4 h-4" />
                      </motion.span>
                      
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </motion.button>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${way.color} rounded-bl-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>

                {/* Connection Line (for visual flow) */}
                {index < waysToHelp.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-gradient-to-r from-amber-200 to-emerald-200 transform translate-x-full -translate-y-1/2 z-0"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Impact Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Action Creates <span className="text-amber-200">Ripple Effects</span>
                </h3>
                <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
                  Every contribution, no matter how small, creates lasting change in communities and ecosystems across Zambia.
                </p>
                
                {/* Impact Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: '100%', label: 'Transparent Use', icon: '🔍' },
                    { value: '15+', label: 'Years Experience', icon: '⏳' },
                    { value: '50+', label: 'Dedicated Team', icon: '👥' },
                    { value: '10', label: 'Provinces Reached', icon: '🗺️' }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl mb-2">{metric.icon}</div>
                      <div className="text-3xl font-bold text-amber-200 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-amber-100 text-sm font-medium">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}