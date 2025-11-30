'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaTree, 
  FaUsers, 
  FaSchool, 
  FaHandHoldingHeart,
  FaRecycle,
  FaSun,
  FaMapMarkerAlt
} from 'react-icons/fa';
import CountUp from 'react-countup';

const stats = [
  {
    icon: FaTree,
    end: 50000,
    suffix: '+',
    label: 'Trees Planted',
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    delay: 0.1
  },
  {
    icon: FaUsers,
    end: 100,
    suffix: '+',
    label: 'Communities Reached',
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    delay: 0.2
  },
  {
    icon: FaSchool,
    end: 5000,
    suffix: '+',
    label: 'Children Educated',
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    delay: 0.3
  },
  {
    icon: FaHandHoldingHeart,
    end: 10000,
    suffix: '+',
    label: 'Lives Impacted',
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    delay: 0.4
  }
];

export function ImpactStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-white to-[#F0F9F4]">
      {/* Background Elements - Simplified for Mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-5 left-5 w-48 h-48 bg-[#029346]/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-5 right-5 w-64 h-64 bg-[#F79021]/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
            >
              <FaHandHoldingHeart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Lasting Impact</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
              Through sustainable initiatives and community partnerships, we're building a greener future for Zambia.
            </p>
          </motion.div>

          {/* Stats Grid - Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: stat.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group"
              >
                {/* Card - Mobile Optimized */}
                <div className={`relative p-4 sm:p-6 rounded-2xl ${stat.bgColor} border border-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 overflow-hidden`}>
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Counter */}
                  <div className={`relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-br ${stat.color} text-transparent bg-clip-text text-center`}>
                    {isInView && (
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        duration={2.5}
                        separator=","
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className="relative z-10 text-gray-700 font-semibold text-sm sm:text-base text-center leading-tight">
                    {stat.label}
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: stat.delay + 0.3 }}
                    viewport={{ once: true }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Summary - Simplified for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
              {[
                { label: "Provinces", value: "10", color: "text-[#029346]" },
                { label: "Years Active", value: "8", color: "text-[#F79021]" },
                { label: "Team Members", value: "50+", color: "text-[#029346]" },
                { label: "Partner NGOs", value: "25+", color: "text-[#F79021]" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${item.color} mb-1 sm:mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Nationwide Impact Section - Mobile Friendly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl"
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Nationwide Impact</h3>
                <p className="text-white/80 text-sm sm:text-base">
                  Reaching communities across all 10 provinces of Zambia
                </p>
              </div>
              
              {/* Simplified Interactive Map */}
              <div className="relative h-40 sm:h-48 lg:h-56 bg-white/10 rounded-xl sm:rounded-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-white/5"></div>
                
                {/* Animated Impact Dots - Reduced for Mobile */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.8 + i * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-[#F79021] rounded-full shadow-md"
                    style={{
                      left: `${15 + (i % 4) * 25}%`,
                      top: `${20 + Math.floor(i / 4) * 25}%`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-full h-full bg-[#F79021] rounded-full"
                    />
                  </motion.div>
                ))}
                
                {/* Connection Lines - Simplified */}
                <svg className="absolute inset-0 w-full h-full">
                  {[...Array(6)].map((_, i) => (
                    <motion.line
                      key={i}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      x1="50%"
                      y1="50%"
                      x2={`${25 + (i % 3) * 25}%`}
                      y2={`${25 + Math.floor(i / 3) * 25}%`}
                      stroke="white"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className="opacity-40"
                    />
                  ))}
                </svg>

                {/* Central Hub */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full bg-white rounded-full"
                  />
                </motion.div>
              </div>

              {/* Map Legend - Mobile Optimized */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                {[
                  { color: 'bg-[#F79021]', label: 'Active Projects' },
                  { color: 'bg-white', label: 'Headquarters' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${item.color}`} />
                    <span className="text-white/80 text-xs sm:text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action - Mobile Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Ready to be part of our impact story?
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[#029346] to-[#0C4726] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Mission
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}