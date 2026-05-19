'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaLeaf, FaUsers, FaShieldAlt, FaLightbulb, FaHeart } from 'react-icons/fa';

const values = [
  {
    icon: FaHandsHelping,
    title: 'Community First',
    description: 'We prioritize community needs and involve local people in every step of our conservation efforts.',
    color: 'bg-emerald-700',
  },
  {
    icon: FaLeaf,
    title: 'Environmental Stewardship',
    description: 'We are committed to protecting and restoring Zambia’s natural heritage for future generations.',
    color: 'bg-emerald-700',
  },
  {
    icon: FaUsers,
    title: 'Collaboration',
    description: 'We believe in the power of partnerships and work together with communities, government, and organizations.',
    color: 'bg-orange-600',
  },
  {
    icon: FaShieldAlt,
    title: 'Transparency',
    description: 'We maintain open communication and accountability in all our operations and financial management.',
    color: 'bg-orange-600',
  },
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'We embrace creative solutions and adapt to new challenges in conservation and community development.',
    color: 'bg-emerald-700',
  },
  {
    icon: FaHeart,
    title: 'Compassion',
    description: 'We approach our work with empathy, respect, and genuine care for both people and the planet.',
    color: 'bg-orange-600',
  },
];

export function OurValues() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
                The principles that guide our work and define how we partner with communities, children, and institutions.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white ${value.color}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="relative h-96 w-full">
              <Image
                src="/women-conservation.jpg"
                alt="Women in conservation"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-950/30 p-8 flex flex-col justify-end">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">People first</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Values rooted in respect, trust and long-term impact.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
