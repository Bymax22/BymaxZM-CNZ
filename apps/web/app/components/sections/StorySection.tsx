'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';
import { Indie_Flower } from 'next/font/google';

const handwriting = Indie_Flower({ subsets: ['latin'], weight: '400' });

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    text:
      "Zambia faces interconnected challenges: environmental degradation, child rights risks, and unsustainable extractives. Our approach addresses ecosystems, people, and governance together.",
    icon: <FaIndustry className="w-6 h-6 text-[#F79021]" />,
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES & CHILDREN',
    text:
      'We partner with communities, schools and children to build leadership, improve livelihoods, and ensure rights are protected while conserving nature.',
    icon: <MdOutlinePeople className="w-6 h-6 text-[#F79021]" />,
  },
  {
    id: 2,
    title: 'DRIVING SYSTEMIC CHANGE',
    text:
      "We combine conservation, sustainable mining advocacy, and organizational strengthening to influence policy and scale impact nationally.",
    icon: <FaHeart className="w-6 h-6 text-[#F79021]" />,
  },
];

// ✨ Ink reveal (feels like handwriting appearing)
const InkText = ({ text }: { text: string }) => {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.15,
          },
        },
      }}
      className={`mt-6 text-white/95 leading-relaxed text-lg md:text-xl ${handwriting.className}`}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              filter: 'blur(6px)',
              y: 8,
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
            },
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="inline-block mr-[6px]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default function StorySection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive(prev => (prev + 1) % sections.length);
    }, 9000);
    return () => window.clearInterval(interval);
  }, []);

  const current = sections[active] ?? sections[0]!;

  return (
    <section className="relative bg-[var(--primary-green)] text-white overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-36 h-36 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-black/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-24 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-5">
              {current.icon}
              <div className="h-[2px] w-12 bg-[#F79021]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
              {current.title}
            </h2>

            <InkText text={current.text} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center gap-3">
          {sections.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === active ? 'w-12 bg-white' : 'w-4 bg-white/30'
              }`}
              aria-label={`Show story ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
