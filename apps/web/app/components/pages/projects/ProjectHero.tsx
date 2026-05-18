'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaTree, FaUsers, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';

interface ProjectStats {
  treesPlanted: number;
  areasProtected: number;
  communities: number;
  carbonReduced: number;
}

interface Project {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  stats: ProjectStats;
}

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(2,147,70,0.06),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.05),transparent_30%)] pointer-events-none" />

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
            className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white shadow-sm flex items-center justify-center text-4xl"
          >
            {project.icon}
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          
          <p className="text-2xl text-[#029346] font-semibold mb-6">
            {project.subtitle}
          </p>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            {project.description}
          </p>

          {/* Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: FaTree, value: project.stats.treesPlanted, label: 'Trees Planted' },
              { icon: FaMapMarkerAlt, value: project.stats.areasProtected, label: 'Areas Protected' },
              { icon: FaUsers, value: project.stats.communities, label: 'Communities' },
              { icon: FaLeaf, value: project.stats.carbonReduced, label: 'Tons CO₂ Reduced' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <stat.icon className="w-8 h-8 text-[#F79021] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value.toLocaleString()}
                  {stat.label === 'Tons CO₂ Reduced' && '+'}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}