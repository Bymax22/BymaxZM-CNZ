'use client';

import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaHeart, FaGlobeAfrica } from 'react-icons/fa';

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#029346] via-[#0C4726] to-[#08331C]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#F79021]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#029346]/10 rounded-full blur-3xl"></div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-20 text-white/20"
        >
          <FaLeaf className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 right-20 text-white/20"
        >
          <FaUsers className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20"
          >
            <FaGlobeAfrica className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            About <span className="text-[#F79021]">Care for Nature</span> Zambia
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Since 2008, we've been at the forefront of environmental conservation and community 
            empowerment in Zambia, creating sustainable impact through innovative solutions and 
            collaborative partnerships.
          </p>
        </motion.div>

        {/* Quick Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: '15+', label: 'Years of Service', icon: FaHeart },
            { number: '50K+', label: 'Trees Planted', icon: FaLeaf },
            { number: '100+', label: 'Communities', icon: FaUsers },
            { number: '10', label: 'Provinces', icon: FaGlobeAfrica },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <stat.icon className="w-8 h-8 text-[#F79021] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}