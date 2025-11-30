'use client';

import { motion } from 'framer-motion';
import { FaSeedling, FaUsers, FaTree, FaAward, FaSchool, FaGlobeAfrica } from 'react-icons/fa';

const timelineEvents = [
  {
    year: '2008',
    title: 'Foundation',
    description: 'Care for Nature Zambia was founded by a group of passionate environmentalists concerned about deforestation in rural communities.',
    icon: FaSeedling,
    color: 'from-[#029346] to-[#0C4726]'
  },
  {
    year: '2010',
    title: 'First Major Project',
    description: 'Launched our first community reforestation project in Eastern Province, planting 5,000 trees with local volunteers.',
    icon: FaTree,
    color: 'from-[#F79021] to-[#AA5D26]'
  },
  {
    year: '2013',
    title: 'Youth Education Program',
    description: 'Started environmental education programs in schools, reaching over 1,000 students in the first year.',
    icon: FaSchool,
    color: 'from-[#029346] to-[#0C4726]'
  },
  {
    year: '2016',
    title: 'National Expansion',
    description: 'Expanded operations to 5 provinces, establishing local chapters and community partnerships.',
    icon: FaGlobeAfrica,
    color: 'from-[#F79021] to-[#AA5D26]'
  },
  {
    year: '2019',
    title: 'Climate Action Initiative',
    description: 'Launched comprehensive climate change adaptation programs focusing on sustainable agriculture and renewable energy.',
    icon: FaAward,
    color: 'from-[#029346] to-[#0C4726]'
  },
  {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Implemented digital monitoring systems and launched the CNZ Portal for better impact tracking and community engagement.',
    icon: FaUsers,
    color: 'from-[#F79021] to-[#AA5D26]'
  }
];

export function Timeline() {
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fifteen years of dedicated service to environmental conservation and community development
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#029346] to-[#F79021]"></div>
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className={`p-6 rounded-2xl shadow-lg border border-gray-100 ${
                  index % 2 === 0 ? 'bg-gradient-to-r from-white to-gray-50' : 'bg-gradient-to-l from-white to-gray-50'
                }`}>
                  <span className="text-sm font-semibold text-[#029346]">{event.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{event.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </div>

              {/* Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-xl border-4 border-white`}>
                  <event.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Spacer for right side */}
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}