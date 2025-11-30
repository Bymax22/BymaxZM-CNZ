'use client';

import { motion } from 'framer-motion';
import { FaHandsHelping, FaHeart, FaUsers, FaSeedling } from 'react-icons/fa';

export function GetInvolvedHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#029346] via-[#0C4726] to-[#08331C]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#F79021]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#029346]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20"
          >
            <FaHandsHelping className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Get <span className="text-[#F79021]">Involved</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Zambians making a difference. Whether you donate, volunteer, partner, 
            or spread awareness, your action creates lasting impact for our environment and communities.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            { number: '5K+', label: 'Active Volunteers', icon: FaUsers },
            { number: '50K+', label: 'Supporters', icon: FaHeart },
            { number: '100+', label: 'Partners', icon: FaHandsHelping },
            { number: '15K', label: 'Actions Taken', icon: FaSeedling },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <stat.icon className="w-6 h-6 text-[#F79021] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}