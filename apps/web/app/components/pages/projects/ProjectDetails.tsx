'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaUsers, FaTree, FaWater, FaSun } from 'react-icons/fa';

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

export function ProjectDetails({ project }: { project: Project }) {
  const features = [
    {
      icon: FaTree,
      title: 'Reforestation',
      description: 'Planting native tree species to restore degraded forests and create wildlife corridors'
    },
    {
      icon: FaUsers,
      title: 'Community Engagement',
      description: 'Involving local communities in forest management and creating sustainable livelihoods'
    },
    {
      icon: FaWater,
      title: 'Watershed Protection',
      description: 'Protecting water sources through forest conservation and sustainable land use'
    },
    {
      icon: FaSun,
      title: 'Climate Resilience',
      description: 'Building ecosystem resilience to climate change through diverse forest landscapes'
    }
  ];

  const objectives = [
    'Restore 50,000 hectares of degraded forest land by 2025',
    'Engage 100 communities in sustainable forest management',
    'Protect 25 critical watershed areas',
    'Create 5,000 green jobs in forestry and ecotourism',
    'Reduce carbon emissions by 100,000 tons annually'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Features</h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project Objectives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Objectives</h2>
            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#029346] transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-[#029346] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{objective}</span>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-2xl text-white"
            >
              <h3 className="text-xl font-bold mb-3">Get Involved</h3>
              <p className="text-white/90 mb-4">
                Support our forest conservation efforts and help protect Zambia's natural heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-white text-[#029346] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Donate to This Project
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#029346] px-6 py-3 rounded-xl font-semibold transition-colors">
                  Volunteer Opportunity
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}