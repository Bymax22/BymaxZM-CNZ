'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: '400' });

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    text: "Zambia's natural resources are under pressure from climate change and unsustainable practices. Deforestation, mining impacts, and water scarcity threaten our communities and future generations.",
    icon: FaIndustry,
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES',
    text: 'We work with vulnerable communities, especially women, youth, and children, to promote sustainable livelihoods and defend their rights to natural resources.',
    icon: MdOutlinePeople,
  },
  {
    id: 2,
    title: 'DRIVING REAL IMPACT',
    text: 'Through partnerships with global and local organizations, we protect ecosystems, advocate for children’s rights, and build climate resilience across Zambia.',
    icon: FaHeart,
  },
];

// Handwriting animation variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Component to split text into letters
const HandwritingText = ({ text }: { text: string }) => {
  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className={`mt-4 text-white/80 leading-relaxed ${caveat.className}`}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letter}>
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="inline-block w-0.5 h-5 bg-orange-400 ml-1"
      />
    </motion.p>
  );
};

export default function StorySection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-gradient-to-b from-green-900 to-[var(--primary-green)] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">

        {sections.map((sec, i) => {
          const Icon = sec.icon;
          const isActive = active === i;

          return (
            <motion.div
              key={sec.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.3, once: true }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <Icon className={`text-2xl ${isActive ? 'text-orange-400' : 'text-white/40'}`} />
                <div className={`h-[2px] transition-all duration-300 ${isActive ? 'w-12 bg-orange-400' : 'w-6 bg-white/30'}`} />
              </div>

              {/* Title */}
              <h2 className={`text-3xl font-light transition ${isActive ? 'text-orange-400' : 'text-white/60'}`}>
                {sec.title}
              </h2>

              {/* Handwriting Text */}
              {isActive && <HandwritingText text={sec.text} />}

              {/* Indicator */}
              {isActive && (
                <motion.div
                  layoutId="indicator"
                  className="mt-6 h-[2px] w-12 bg-orange-400"
                />
              )}
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
