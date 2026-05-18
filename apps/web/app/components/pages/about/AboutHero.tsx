'use client';

import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaHeart, FaGlobeAfrica } from 'react-icons/fa';

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(2,147,70,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.08),transparent_28%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#029346] text-white shadow-lg">
            <FaGlobeAfrica className="w-10 h-10" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Care for Nature Zambia
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-5 max-w-3xl mx-auto leading-relaxed">
            We are a Zambian non-governmental organization supporting environmental conservation, children&apos;s rights, strong governance, and sustainable development across rural and peri-urban communities.
          </p>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our work brings together conservation, youth leadership, community accountability and climate justice to deliver long-term results for people and nature.
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
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#029346] text-white">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}