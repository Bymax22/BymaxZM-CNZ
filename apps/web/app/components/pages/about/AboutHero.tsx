'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGlobeAfrica, FaLeaf, FaUsers, FaHeart } from 'react-icons/fa';

const heroStats = [
  { icon: FaGlobeAfrica, value: '15+', label: 'Years of Service' },
  { icon: FaLeaf, value: '50+', label: 'Communities Reached' },
  { icon: FaUsers, value: '5,000+', label: 'Students Educated' },
  { icon: FaHeart, value: '10', label: 'Provinces Supported' },
];

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image
          src="/hero/hero-bg.jpg"
          alt="Care for Nature Zambia hero image"
          fill
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 lg:py-32">
        <div className="grid gap-12 xl:grid-cols-[1.4fr_1fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.32em] text-emerald-300 uppercase mb-4">
              Care for Nature Zambia
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Environmental conservation, community leadership, and child-centred action for Zambia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 leading-relaxed">
              We support communities through sustainable land management, youth empowerment, safe mining reform, and public accountability.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className="flex items-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90">
              <div className="relative h-80">
                <Image
                  src="/tree-planting.jpg"
                  alt="Community tree planting"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-slate-950/35 p-6 flex flex-col justify-end">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Community Action</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Tree planting and local training</h2>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90">
              <div className="relative h-60">
                <Image
                  src="/children-program.jpg"
                  alt="Children learning outdoors"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-slate-950/35 p-6 flex flex-col justify-end">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Youth Leadership</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">Children leading conservation projects</h2>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
