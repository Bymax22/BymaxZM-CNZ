'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    text: "Zambia's natural resources are under pressure from climate change and unsustainable practices.",
    icon: FaIndustry,
    image: '/images/deforestation.jpg',
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES',
    text: 'We support women, youth, and communities to build sustainable livelihoods.',
    icon: MdOutlinePeople,
    image: '/images/community.jpg',
  },
  {
    id: 2,
    title: 'DRIVING REAL IMPACT',
    text: 'We partner with global and local organizations to create lasting change.',
    icon: FaHeart,
    image: '/images/partnership.jpg',
  },
];

const Visual = ({ active }: { active: number }) => {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Layered visuals always mounted */}
      <motion.div
        animate={{ opacity: active === 0 ? 1 : 0 }}
        className="absolute"
      >
        <div className="w-40 h-40 rounded-full bg-green-500/20 animate-pulse" />
      </motion.div>

      <motion.div
        animate={{ opacity: active === 1 ? 1 : 0 }}
        className="absolute"
      >
        <div className="flex flex-col items-center">
          <div className="w-2 h-24 bg-green-400 rounded-full" />
          <div className="w-10 h-10 bg-green-500 rounded-full mt-2" />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: active === 2 ? 1 : 0 }}
        className="absolute"
      >
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-orange-400/50 rounded-full" />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function StorySection() {
  const [active, setActive] = useState(0);

  // Preload images
  useEffect(() => {
    sections.forEach((sec) => {
      const img = new Image();
      img.src = sec.image;
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-green-900 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-16">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <motion.div
                key={sec.id}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.3 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3">
                  <Icon className={`text-2xl ${active === i ? 'text-orange-400' : 'text-white/40'}`} />
                  <div className={`h-[2px] transition-all ${active === i ? 'w-12 bg-orange-400' : 'w-6 bg-white/30'}`} />
                </div>

                <h2 className={`text-3xl transition ${active === i ? 'text-orange-400' : 'text-white/60'}`}>
                  {sec.title}
                </h2>

                <p className={`mt-3 max-w-md transition ${active === i ? 'opacity-100' : 'opacity-50'}`}>
                  {sec.text}
                </p>

                {active === i && (
                  <motion.div
                    layoutId="indicator"
                    className="mt-4 h-[2px] w-10 bg-orange-400"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex items-center justify-center sticky top-32">
          <Visual active={active} />
        </div>
      </div>
    </section>
  );
}