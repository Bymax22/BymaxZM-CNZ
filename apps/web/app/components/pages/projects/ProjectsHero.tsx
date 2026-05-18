'use client';

import { motion } from 'framer-motion';
import { FaSeedling, FaTree, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

export function ProjectsHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(2,147,70,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.06),transparent_30%)] pointer-events-none" />

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
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white shadow-sm flex items-center justify-center"
          >
            <FaSeedling className="w-10 h-10 text-[#029346]" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#029346]">Projects</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive portfolio of environmental conservation and community 
            development initiatives making a tangible difference across Zambia&apos;s diverse landscapes.
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
            { number: '200+', label: 'Active Projects', icon: FaTree },
            { number: '10', label: 'Provinces', icon: FaUsers },
            { number: '50K+', label: 'Beneficiaries', icon: FaHandHoldingHeart },
            { number: '85%', label: 'Success Rate', icon: FaSeedling },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <stat.icon className="w-6 h-6 text-[#029346] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}