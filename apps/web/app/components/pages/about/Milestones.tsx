'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaTree, FaUserFriends, FaSchool, FaHandHoldingHeart, FaAward } from 'react-icons/fa';

const milestones = [
  {
    icon: FaTree,
    value: 50000,
    suffix: '+',
    label: 'Trees Planted',
    description: 'Across Zambia’s priority landscapes.',
  },
  {
    icon: FaUserFriends,
    value: 100,
    suffix: '+',
    label: 'Communities Engaged',
    description: 'Partnering for conservation and livelihoods.',
  },
  {
    icon: FaSchool,
    value: 5000,
    suffix: '+',
    label: 'Students Educated',
    description: 'Environmental awareness in schools and youth groups.',
  },
  {
    icon: FaHandHoldingHeart,
    value: 10000,
    suffix: '+',
    label: 'Lives Impacted',
    description: 'Through nature-based actions, health, and education programs.',
  },
  {
    icon: FaAward,
    value: 15,
    suffix: '+',
    label: 'Awards Received',
    description: 'Recognition for excellence in conservation and social action.',
  },
];

export function Milestones() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Key Milestones</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable achievements that reflect our progress and ongoing growth.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white shadow">
                <milestone.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <CountUp end={milestone.value} suffix={milestone.suffix} duration={2.5} separator="," />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-slate-50">
          <div className="relative h-72 w-full">
            <Image
              src="/tree-planting.jpg"
              alt="Future goals"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="p-10">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Looking ahead to 2030</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our focus is on scaling conservation, building school-based environmental leadership, and creating sustainable livelihoods for thousands of families.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { target: '1M+', label: 'Trees by 2030' },
                { target: '50K+', label: 'Children reached' },
                { target: '100%', label: 'Transparent reporting' },
              ].map((goal) => (
                <div key={goal.label} className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-700 mb-2">{goal.target}</div>
                  <div className="text-gray-600">{goal.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
