'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';

export function StoryHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/community.jpg"
          alt="Community storytelling"
          fill
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-xl">
            <FaHistory className="h-10 w-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Our Story of people, nature, and long-term impact
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            From our first conservation project in 2008 to today, discover how Care for Nature Zambia has grown through partnerships, community leadership, and youth empowerment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
