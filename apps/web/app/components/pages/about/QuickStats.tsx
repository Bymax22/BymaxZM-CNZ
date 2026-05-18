'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  FaTree, 
  FaUsers, 
  FaSchool, 
  FaHandHoldingHeart,
  FaRecycle,
  FaSun
} from 'react-icons/fa';

const stats = [
  {
    icon: FaTree,
    end: 50000,
    suffix: '+',
    label: 'Trees Planted',
    color: 'bg-[#029346]',
  },
  {
    icon: FaUsers,
    end: 100,
    suffix: '+',
    label: 'Communities Reached',
    color: 'bg-[#F79021]',
  },
  {
    icon: FaSchool,
    end: 5000,
    suffix: '+',
    label: 'Children Educated',
    color: 'bg-[#029346]',
  },
  {
    icon: FaHandHoldingHeart,
    end: 10000,
    suffix: '+',
    label: 'Lives Impacted',
    color: 'bg-[#F79021]',
  },
  {
    icon: FaRecycle,
    end: 200,
    suffix: '+',
    label: 'Conservation Projects',
    color: 'bg-[#029346]',
  },
  {
    icon: FaSun,
    end: 15000,
    suffix: '+',
    label: 'Solar Lights Installed',
    color: 'bg-[#F79021]',
  }
];

export function QuickStats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#029346]">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable results from our dedication to environmental conservation and community development
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                <CountUp end={stat.end} suffix={stat.suffix} duration={2.5} separator="," />
              </div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}