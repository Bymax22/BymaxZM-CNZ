'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaTree, FaUserFriends, FaSchool, FaHandHoldingHeart, FaAward } from 'react-icons/fa';

const milestones = [
  {
    icon: FaTree,
    value: 50000,
    suffix: '+',
    label: 'Trees Planted',
    description: 'Across 10 provinces of Zambia'
  },
  {
    icon: FaUserFriends,
    value: 100,
    suffix: '+',
    label: 'Communities Engaged',
    description: 'Partnering for sustainable development'
  },
  {
    icon: FaSchool,
    value: 5000,
    suffix: '+',
    label: 'Students Educated',
    description: 'Environmental awareness programs'
  },
  {
    icon: FaHandHoldingHeart,
    value: 10000,
    suffix: '+',
    label: 'Lives Impacted',
    description: 'Through various initiatives'
  },
  {
    icon: FaAward,
    value: 15,
    suffix: '+',
    label: 'Awards Received',
    description: 'Recognition for excellence'
  }
];

export function Milestones() {
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
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Milestones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Significant achievements that mark our journey and impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <milestone.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <CountUp end={milestone.value} suffix={milestone.suffix} duration={2.5} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{milestone.label}</h3>
              <p className="text-gray-600 text-sm">{milestone.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Future Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Looking to the <span className="text-[#F79021]">Future</span>
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our vision for 2030 includes planting 1 million trees, establishing environmental 
              clubs in every Zambian school, and creating sustainable livelihoods for 50,000 families.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { target: '1M+', label: 'Trees by 2030' },
                { target: '100%', label: 'Schools Reached' },
                { target: '50K', label: 'Families Empowered' },
                { target: 'Carbon', label: 'Neutral Operations' }
              ].map((goal, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#F79021]">{goal.target}</div>
                  <div className="text-white/80 text-sm">{goal.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}