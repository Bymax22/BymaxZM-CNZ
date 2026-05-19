'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaTree, FaUsers, FaSchool, FaHandHoldingHeart, FaRecycle } from 'react-icons/fa';

const stats = [
  { icon: FaTree, end: 50, suffix: '+', label: 'Trees Planted', color: 'bg-emerald-700' },
  { icon: FaUsers, end: 15, suffix: '+', label: 'Communities Reached', color: 'bg-orange-600' },
  { icon: FaSchool, end: 5000, suffix: '+', label: 'Children Educated', color: 'bg-emerald-700' },
  { icon: FaHandHoldingHeart, end: 10000, suffix: '+', label: 'Lives Impacted', color: 'bg-orange-600' },
  { icon: FaRecycle, end: 8, suffix: '+', label: 'Conservation Projects', color: 'bg-emerald-700' },
];

export function QuickStats() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable results from our dedication to environmental conservation and community development.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(240px,1fr)] items-stretch">
          {stats.slice(0, 4).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm"
            >
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white ${stat.color}`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <CountUp end={stat.end} suffix={stat.suffix} duration={2.5} separator="," />
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative h-full min-h-[360px] w-full">
              <Image
                src="/images/community.jpg"
                alt="Community conservation team"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">A powerful mix of people and purpose.</h3>
              <p className="text-gray-600 leading-relaxed">
                Our teams work together with partners, local leaders, and children to turn ideas into measurable results across Zambia.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
