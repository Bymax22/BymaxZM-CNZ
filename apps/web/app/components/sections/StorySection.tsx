'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    text:
      "Zambia's natural resources are under pressure from climate change and unsustainable practices. Deforestation, mining impacts, and water scarcity threaten our communities and future generations.",
    icon: <FaIndustry className="w-6 h-6 text-[#F79021]" />,
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES',
    text:
      'We work with vulnerable communities, especially women, youth, and children, to promote sustainable livelihoods and defend their rights to natural resources.',
    icon: <MdOutlinePeople className="w-6 h-6 text-[#F79021]" />,
  },
  {
    id: 2,
    title: 'DRIVING REAL IMPACT',
    text:
      "Through partnerships with Save the Children, UNDP, and local communities, we protect ecosystems, advocate for children's rights, and build climate resilience across Zambia.",
    icon: <FaHeart className="w-6 h-6 text-[#F79021]" />,
  },
];

// ✨ Ink reveal (feels like handwriting appearing)
const InkText = ({ text }: { text: string }) => {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      className="mt-6 text-white/85 leading-relaxed text-lg md:text-xl"
      style={{
        fontFamily: '"Caveat", cursive',
      }}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              filter: 'blur(6px)',
              y: 6,
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
            },
          }}
          transition={{
            duration: 0.35,
            delay: i * 0.05,
          }}
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

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C4726] to-[#029346]" />

      <div className="relative max-w-4xl mx-auto px-6 py-28 space-y-28">

        {sections.map((sec, i) => {
          const isActive = active === i;

          return (
            <motion.div
              key={sec.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.4 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-3">
                {sec.icon}
                <div
                  className={`h-[2px] transition-all duration-300 ${
                    isActive
                      ? 'w-12 bg-[#F79021]'
                      : 'w-6 bg-white/30'
                  }`}
                />
              </div>

              {/* Title (kept clean professional font) */}
              <h2
                className={`text-3xl md:text-4xl font-light transition ${
                  isActive
                    ? 'text-[#F79021]'
                    : 'text-white/60'
                }`}
              >
                {sec.title}
              </h2>

              {/* ✨ Ink handwriting effect */}
              {isActive && <InkText text={sec.text} />}

              {/* Indicator */}
              {isActive && (
                <motion.div
                  layoutId="indicator"
                  className="mt-6 h-[2px] w-12 bg-[#F79021]"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
