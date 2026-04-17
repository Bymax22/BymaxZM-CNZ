'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    icon: <FaIndustry className="w-6 h-6 text-[#F79021]" />,
    path: `
      M10 90 
      C 40 40, 80 40, 110 90 
      S 180 140, 220 90 
      S 300 40, 340 90 
      S 420 140, 480 90 
      S 560 40, 620 90
    `,
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES',
    icon: <MdOutlinePeople className="w-6 h-6 text-[#F79021]" />,
    path: `
      M10 90 
      C 50 30, 120 30, 160 90 
      S 260 150, 300 90 
      S 380 40, 440 90 
      S 520 140, 600 90
    `,
  },
  {
    id: 2,
    title: 'DRIVING REAL IMPACT',
    icon: <FaHeart className="w-6 h-6 text-[#F79021]" />,
    path: `
      M10 90 
      C 60 50, 140 50, 200 90 
      S 320 130, 380 90 
      S 460 50, 520 90 
      S 600 140, 680 90
    `,
  },
];

const Handwriting = ({ path }: { path: string }) => {
  return (
    <div className="mt-6 w-full">
      <svg
        viewBox="0 0 720 140"
        className="w-full h-auto"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <motion.path
          d={path}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

export default function StorySection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-green)] to-[var(--secondary-green)]" />

      <div className="relative max-w-4xl mx-auto px-6 py-32 space-y-32">
        {sections.map((sec, i) => {
          const isActive = active === i;

          return (
            <motion.div
              key={sec.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.3, once: true }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                {sec.icon}
                <div
                  className={`h-[2px] transition-all ${
                    isActive
                      ? 'w-12 bg-[var(--primary-orange)]'
                      : 'w-6 bg-white/30'
                  }`}
                />
              </div>

              <h2
                className={`text-3xl md:text-4xl font-light ${
                  isActive
                    ? 'text-[var(--primary-orange)]'
                    : 'text-white/60'
                }`}
              >
                {sec.title}
              </h2>

              {isActive && <Handwriting path={sec.path} />}

              {isActive && (
                <motion.div
                  layoutId="indicator"
                  className="mt-6 h-[2px] w-12 bg-[var(--primary-orange)]"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}