'use client';

import { motion } from 'framer-motion';
import { FaUsers, FaHandsHelping, FaLightbulb } from 'react-icons/fa';

export function TeamHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#029346] via-[#0C4726] to-[#08331C]">
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
            <FaUsers className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#F79021]">Team</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate individuals driving our mission forward. Our diverse team of 
            conservationists, community developers, and environmental experts work tirelessly 
            to create lasting impact across Zambia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}