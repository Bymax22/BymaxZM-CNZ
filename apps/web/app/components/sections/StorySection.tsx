// app/components/sections/StorySection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaIndustry,
  FaHeart,
  FaUsers,
  FaLeaf,
} from 'react-icons/fa';
import { GiAfrica } from 'react-icons/gi';
import { MdOutlinePeople } from 'react-icons/md';

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    text: 'Zambia\'s natural resources are under pressure from climate change and unsustainable practices. Deforestation, mining impacts, and water scarcity threaten our communities and future generations.',
    icon: <FaIndustry className="w-8 h-8 text-[#F79021]" />,
    image: '/images/deforestation.jpg', // or appropriate image
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES',
    text: 'We work with vulnerable communities, especially women, youth, and children, to promote sustainable livelihoods and defend their rights to natural resources.',
    icon: <MdOutlinePeople className="w-8 h-8 text-[#F79021]" />,
    image: '/images/community.jpg',
  },
  {
    id: 2,
    title: 'DRIVING REAL IMPACT',
    text: 'Through partnerships with Save the Children, UNDP, and local communities, we protect ecosystems, advocate for children\'s rights, and build climate resilience across Zambia.',
    icon: <FaHeart className="w-8 h-8 text-[#F79021]" />,
    image: '/images/partnership.jpg',
  },
];

// Simple rotating globe with gentle pulse
const SimpleGlobe = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-[#029346]/10 via-[#F79021]/10 to-[#0C4726]/10"
        animate={{
          boxShadow: [
            '0 0 20px rgba(2,147,70,0.2)',
            '0 0 30px rgba(247,144,33,0.3)',
            '0 0 20px rgba(2,147,70,0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <GiAfrica className="w-40 h-40 md:w-48 md:h-48 text-white/60" />
        </motion.div>
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-4 rounded-full border border-white/5" />
      </motion.div>
    </div>
  );
};

// Gentle pollution representation - abstract and elegant
const GentlePollution = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <div className="relative">
        {/* Abstract factory shape */}
        <div className="relative">
          <div className="w-32 h-24 bg-white/5 rounded-lg backdrop-blur-sm" />
          <div className="absolute -top-8 left-4 w-6 h-12 bg-white/5 rounded-t-lg" />
          <div className="absolute -top-8 left-14 w-6 h-16 bg-white/5 rounded-t-lg" />
          
          {/* Gentle smoke wisps */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${12 + i * 16}px`, top: -20 }}
              animate={{
                y: [-5, -20, -5],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeInOut',
              }}
            >
              <div className="w-8 h-8 bg-white/10 rounded-full blur-sm" />
            </motion.div>
          ))}
        </div>
        
        {/* Gentle crack effect */}
        <svg className="absolute -bottom-4 left-0 w-full h-8">
          <path
            d="M0,5 L15,0 L30,5 L45,2 L60,5 L75,3 L90,5"
            stroke="#F79021"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
};

// Simple growing plant
const SimplePlant = () => {
  const [hasGrown, setHasGrown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasGrown(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Soil mound */}
        <div className="absolute bottom-16 w-24 h-6 bg-[#AA5D26]/30 rounded-full" />
        
        {/* Stem */}
        <motion.div
          className="relative w-3 h-32 bg-gradient-to-t from-[#029346] to-[#4CAF50] rounded-full origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hasGrown ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'bottom' }}
        >
          {/* Leaves */}
          <motion.div
            className="absolute -left-3 top-12 w-5 h-8 bg-[#029346] rounded-full rotate-[-45deg]"
            initial={{ scale: 0 }}
            animate={{ scale: hasGrown ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
          <motion.div
            className="absolute -right-3 top-14 w-5 h-7 bg-[#029346] rounded-full rotate-[45deg]"
            initial={{ scale: 0 }}
            animate={{ scale: hasGrown ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />
        </motion.div>
        
        {/* Flower */}
        <motion.div
          className="absolute top-[82px] w-8 h-8 bg-[#F79021]/60 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: hasGrown ? 1 : 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <div className="absolute inset-1 bg-[#F79021]/80 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaLeaf className="text-white text-sm" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Simple community circles
const SimpleCommunity = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <div className="relative">
        {/* Central heart */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#F79021]/20 rounded-full flex items-center justify-center z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaHeart className="text-[#F79021] text-2xl" />
        </motion.div>
        
        {/* Orbiting circles */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 360) / 6;
          const radius = 70;
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) translateX(-50%) translateY(-50%)`,
              }}
            >
              <div className="w-8 h-8 bg-[#029346]/20 rounded-full flex items-center justify-center">
                <FaUsers className="text-white/60 text-xs" />
              </div>
            </motion.div>
          );
        })}
        
        {/* Inner orbiting circles */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * 360) / 4 + 45;
          const radius = 45;
          return (
            <motion.div
              key={`inner-${i}`}
              className="absolute top-1/2 left-1/2"
              animate={{
                rotate: [angle, angle + 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) translateX(-50%) translateY(-50%)`,
              }}
            >
              <div className="w-5 h-5 bg-white/10 rounded-full" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const StorySection = () => {
  const [active, setActive] = useState(0);

  const getAnimationComponent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <SimpleGlobe />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <GentlePollution />
            </div>
          </div>
        );
      case 1:
        return <SimplePlant />;
      case 2:
        return <SimpleCommunity />;
      default:
        return <SimpleGlobe />;
    }
  };

  return (
    <section className="relative text-white">
      {/* Background - Keep original gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-green)] to-[var(--secondary-green)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-40">

        {/* MOBILE LAYOUT - Single Column */}
        <div className="md:hidden max-w-4xl mx-auto space-y-40 z-10">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative cursor-pointer p-6 rounded-lg"
              onClick={() => setActive(i)}
            >
              {i === active && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
                  style={{ backgroundImage: `url(${sec.image})` }}
                />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-12 h-[2px] bg-[var(--primary-orange)]"
                    animate={{ width: active === i ? 48 : 32 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{ scale: active === i ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {sec.icon}
                  </motion.div>
                </div>

                <h2
                  className={`text-3xl md:text-4xl font-light transition-colors duration-300 ${
                    active === i ? 'text-[var(--primary-orange)]' : 'text-white/60'
                  }`}
                >
                  {sec.title}
                </h2>

                <p
                  className={`mt-6 text-white/80 max-w-md transition-all duration-300 ${
                    active === i ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {sec.text}
                </p>

                {active === i && (
                  <motion.div
                    className="mt-6 w-12 h-[2px] bg-[var(--primary-orange)]"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Mobile: Visual appears below text */}
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-12 flex justify-center"
                >
                  {getAnimationComponent(active)}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* DESKTOP LAYOUT - Horizontal with inline visuals */}
        <div className="hidden md:block max-w-7xl mx-auto space-y-40 z-10">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative cursor-pointer"
              onClick={() => setActive(i)}
            >
              <div className="grid grid-cols-2 gap-16 items-center min-h-[400px]">
                {/* Left: Text Content */}
                <div className="relative p-6 rounded-lg">
                  {i === active && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
                      style={{ backgroundImage: `url(${sec.image})` }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-12 h-[2px] bg-[var(--primary-orange)]"
                        animate={{ width: active === i ? 48 : 32 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        animate={{ scale: active === i ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {sec.icon}
                      </motion.div>
                    </div>

                    <h2
                      className={`text-3xl md:text-4xl font-light transition-colors duration-300 ${
                        active === i ? 'text-[var(--primary-orange)]' : 'text-white/60'
                      }`}
                    >
                      {sec.title}
                    </h2>

                    <p
                      className={`mt-6 text-white/80 max-w-md transition-all duration-300 ${
                        active === i ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      {sec.text}
                    </p>

                    {active === i && (
                      <motion.div
                        className="mt-6 w-12 h-[2px] bg-[var(--primary-orange)]"
                        layoutId="activeIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>

                {/* Right: Visual Animation - appears next to active story */}
                <div className="flex items-center justify-center">
                  {active === i ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, scale: 0.92, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: -20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {getAnimationComponent(active)}
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center">
                        <sec.icon.type className="w-8 h-8 text-white/30" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};