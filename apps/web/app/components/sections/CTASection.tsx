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
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-800">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-32 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-amber-300/15 rounded-full blur-xl"
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative section-padding">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mb-8 bg-amber-500 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <FaRocket className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Journey</span> with Us
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed font-light">
                  Join thousands of passionate Zambians creating lasting environmental impact. Whether you donate, volunteer, or partner with us, your action today shapes a sustainable tomorrow.
                </p>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-6 mb-8"
                >
                  {[
                    { number: '24/7', label: 'Support', icon: FaClock, color: 'text-amber-400' },
                    { number: '100%', label: 'Transparent', icon: FaShieldAlt, color: 'text-emerald-300' },
                    { number: '15+', label: 'Years Experience', icon: FaLeaf, color: 'text-amber-400' },
                    { number: '5K+', label: 'Active Members', icon: FaUsers, color: 'text-emerald-300' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.number}
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Emergency Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center"
                    >
                      <FaWhatsapp className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-lg mb-1">Emergency Conservation Hotline</div>
                      <div className="text-white/90">Available 24/7 for urgent environmental concerns</div>
                      <div className="text-amber-400 font-semibold text-lg mt-1">+260 96 123 4567</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Action Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Donate Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500 to-green-600 rounded-bl-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    >
                      <FaDonate className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Fund Change
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Your donation directly supports conservation projects, community empowerment, and environmental education across Zambia.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                      >
                        <FaHeart className="w-5 h-5" />
                        Donate Now
                        <FaArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Volunteer Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500 to-orange-600 rounded-bl-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    >
                      <FaHandsHelping className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Join Our Force
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Offer your skills and time to support field operations, community programs, and conservation initiatives.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                      >
                        <FaUsers className="w-5 h-5" />
                        Become a Volunteer
                        <FaArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
                >
                  <h4 className="font-bold mb-6 text-xl flex items-center gap-3">
                    <FaEnvelope className="w-5 h-5 text-amber-400" />
                    Get In Touch
                  </h4>
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <FaPhone className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-white/80 text-sm">Phone</div>
                        <div className="font-semibold">+260 211 123 456</div>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-white/80 text-sm">Email</div>
                        <div className="font-semibold">info@carefornaturezambia.org</div>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-white/80 text-sm">Location</div>
                        <div className="font-semibold">Lusaka, Zambia</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}