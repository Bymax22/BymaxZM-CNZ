'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  FaTree, 
  FaUserFriends, 
  FaSchool, 
  FaSun,
  FaHandHoldingHeart,
  FaGlobeAfrica
} from 'react-icons/fa';

const impactStats = [
  {
    icon: FaTree,
    value: 50000,
    suffix: '+',
    label: 'Trees Planted',
    description: 'Across 10 provinces'
  },
  {
    icon: FaUserFriends,
    value: 100,
    suffix: '+',
    label: 'Communities Reached',
    description: 'Active partnerships'
  },
  {
    icon: FaSchool,
    value: 5000,
    suffix: '+',
    label: 'Students Educated',
    description: 'Environmental awareness'
  },
  {
    icon: FaSun,
    value: 15000,
    suffix: '+',
    label: 'Solar Lights Installed',
    description: 'Clean energy access'
  },
  {
    icon: FaHandHoldingHeart,
    value: 10000,
    suffix: '+',
    label: 'Lives Impacted',
    description: 'Direct beneficiaries'
  },
  {
    icon: FaGlobeAfrica,
    value: 10,
    suffix: '',
    label: 'Provinces Covered',
    description: 'Nationwide presence'
  }
];

export function ProjectImpact() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#F0F9F4] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable results and tangible benefits from our conservation and development initiatives
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} separator="," />
              </div>
              
              <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-gray-600 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Impact Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Success <span className="text-[#029346]">Stories</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Community Reforestation',
                location: 'Eastern Province',
                impact: '20,000 trees planted by local communities, creating sustainable income through agroforestry',
                image: '/images/stories/reforestation.jpg'
              },
              {
                title: 'Youth Education',
                location: 'Lusaka Schools',
                impact: 'Environmental clubs established in 25 schools, engaging 2,000+ students in conservation',
                image: '/images/stories/education.jpg'
              },
              {
                title: 'Clean Energy Access',
                location: 'Rural Villages',
                impact: 'Solar lights installed in 500 households, reducing kerosene use and improving safety',
                image: '/images/stories/solar.jpg'
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-100 rounded-2xl h-48 mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Story Image</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h4>
                <div className="text-[#029346] font-semibold mb-3">{story.location}</div>
                <p className="text-gray-600 leading-relaxed">{story.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}