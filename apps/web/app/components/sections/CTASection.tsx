'use client';

import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp,
  FaDonate,
  FaHandsHelping,
  FaArrowRight,
  FaHeart,
  FaUsers,
  FaShieldAlt,
  FaClock,
  FaLeaf,
  FaRocket
} from 'react-icons/fa';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#029346] via-[#0C4726] to-[#08331C]">
      {/* Background Elements - Simplified for Mobile */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-5 left-5 w-20 h-20 sm:w-24 sm:h-24 bg-[#F79021]/20 rounded-full blur-lg sm:blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-10 right-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg sm:blur-xl"
        />

        {/* Floating Particles - Reduced for Mobile */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-14 h-14 sm:w-16 sm:h-16 mb-6 bg-[#F79021] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
              >
                <FaRocket className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F79021] to-[#FFA726]">Journey</span> with Us
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Join thousands of passionate Zambians creating lasting environmental impact. Your action today shapes a sustainable tomorrow.
              </p>

              {/* Quick Stats - Simplified */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
              >
                {[
                  { number: '24/7', label: 'Support', icon: FaClock, color: 'text-[#F79021]' },
                  { number: '100%', label: 'Transparent', icon: FaShieldAlt, color: 'text-[#029346]' },
                  { number: '15+', label: 'Years Experience', icon: FaLeaf, color: 'text-[#F79021]' },
                  { number: '5K+', label: 'Active Members', icon: FaUsers, color: 'text-[#029346]' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                    </div>
                    <div className={`text-lg sm:text-xl font-bold ${stat.color} mb-1`}>
                      {stat.number}
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Emergency Contact - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#029346] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-base sm:text-lg mb-1">Emergency Hotline</div>
                    <div className="text-white/90 text-xs sm:text-sm">24/7 environmental concerns</div>
                    <div className="text-[#F79021] font-semibold text-base sm:text-lg mt-1">+260 965 638 175</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Action Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Donate Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-[#029346] to-[#0C4726] rounded-bl-2xl sm:rounded-bl-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 sm:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                  >
                    <FaDonate className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                      Fund Change
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      Your donation supports conservation projects, community empowerment, and environmental education.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#029346] to-[#0C4726] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group/btn text-sm sm:text-base"
                    >
                      <FaHeart className="w-4 h-4" />
                      Donate Now
                      <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Volunteer Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-[#F79021] to-[#AA5D26] rounded-bl-2xl sm:rounded-bl-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 sm:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#F79021] to-[#AA5D26] rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                  >
                    <FaHandsHelping className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                      Join Our Force
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      Offer your skills and time to support field operations and community programs.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#F79021] to-[#AA5D26] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group/btn text-sm sm:text-base"
                    >
                      <FaUsers className="w-4 h-4" />
                      Volunteer
                      <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
              >
                <h4 className="font-bold mb-4 sm:mb-6 text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
                  <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#F79021]" />
                  Get In Touch
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F79021]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/80 text-xs sm:text-sm">Phone</div>
                      <div className="font-semibold text-sm sm:text-base truncate">+260 965 638 175</div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F79021]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/80 text-xs sm:text-sm">Email</div>
                      <div className="font-semibold text-sm sm:text-base truncate">info@carefornaturezambia.org</div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F79021]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/80 text-xs sm:text-sm">Location</div>
                      <div className="font-semibold text-sm sm:text-base">Lusaka, Zambia</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}