'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function HeroStorySection() {
  const ref = useRef(null);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1, 0.5, 0]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[var(--primary-green)] text-white overflow-hidden">

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">

        {/* Background layers */}
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-800 to-green-700"
        />

        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 opacity-30 bg-[url('/images/forest.jpg')] bg-cover bg-center"
        />

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative max-w-5xl px-6 text-center"
        >

          {/* Small intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-widest text-orange-400 mb-6"
          >
            OUR STORY
          </motion.p>

          {/* Big headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light leading-tight"
          >
            Protecting Zambia’s
            <br />
            <span className="text-orange-400">Natural Future</span>
          </motion.h1>

          {/* Handwritten highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={`mt-8 text-2xl md:text-3xl ${caveat.className}`}
          >
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="inline-block"
            >
              "Change begins with people"
            </motion.span>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 text-white/80 max-w-2xl mx-auto"
          >
            We work at the intersection of communities, environment, and policy to build a sustainable Zambia where people and nature thrive together.
          </motion.p>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 flex flex-col items-center"
        >
          <div className="w-[2px] h-12 bg-white/40 mb-2" />
          <p className="text-xs text-white/50">Scroll</p>
        </motion.div>

      </div>

      {/* Progress bar */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="fixed top-0 left-0 w-[3px] h-full bg-orange-400 origin-top"
      />

    </section>
  );
}
