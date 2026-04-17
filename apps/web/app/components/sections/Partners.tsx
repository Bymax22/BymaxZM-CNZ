'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const partners = [
  {
    name: 'Ministry of Green Economy',
    logo: '/images/partners/ministry-green-economy.png',
  },
  {
    name: 'Save The Children Zambia',
    logo: '/images/partners/save-children.png',
  },
  {
    name: 'Zambia Wildlife Authority',
    logo: '/images/partners/zawa.png',
  },
  {
    name: 'Keepers Zambia Foundation',
    logo: '/images/partners/keepers-foundation.png',
  },
  {
    name: 'Local Community Schools',
    logo: '/images/partners/community-schools.png',
  },
  {
    name: 'International Conservation Fund',
    logo: '/images/partners/international-fund.png',
  },
  {
    name: 'Zambia Environmental Agency',
    logo: '/images/partners/zambia-environment.png',
  },
  {
    name: 'Green Growth Zambia',
    logo: '/images/partners/green-growth.png',
  }
];

export function Partners() {
  const [isPaused, setIsPaused] = useState(false);

  // Calculate total width for seamless loop
  const itemWidth = 160; // w-40 = 160px
  const gap = 32; // gap-8 = 32px
  const totalWidth = (partners.length * itemWidth) + ((partners.length - 1) * gap);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Partners</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations committed to environmental conservation
          </p>
        </motion.div>

        {/* Auto-scrolling Logos Container */}
        <div className="relative">
          {/* Scrolling Wrapper */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-8 sm:gap-12"
              animate={{
                x: [0, -totalWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {/* First set */}
              {partners.map((partner, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-32 sm:w-40 h-20 sm:h-24 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="relative w-24 h-12 sm:w-28 sm:h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicated set for seamless loop */}
              {partners.map((partner, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-32 sm:w-40 h-20 sm:h-24 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="relative w-24 h-12 sm:w-28 sm:h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}