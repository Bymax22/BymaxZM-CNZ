'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconType } from 'react-icons/lib';
import {
  FaHeart,
  FaUsers,
  FaHandHoldingUsd,
  FaShareAlt,
  FaArrowRight,
} from 'react-icons/fa';

type Step = {
  icon: IconType;
  title: string;
  description: string;
  step: number;
  image: string;
};

const steps: Step[] = [
  {
    icon: FaHeart,
    title: 'Discover Our Mission',
    description:
      'Learn about our conservation work and community impact across Zambia.',
    step: 1,
    image: '/images/community.jpg',
  },
  {
    icon: FaUsers,
    title: 'Choose Your Impact',
    description:
      'Support through volunteering, partnerships, or community programs.',
    step: 2,
    image: '/images/deforestation.jpg',
  },
  {
    icon: FaHandHoldingUsd,
    title: 'Take Action',
    description:
      'Contribute through donations or active participation in our initiatives.',
    step: 3,
    image: '/images/partnership.jpg',
  },
  {
    icon: FaShareAlt,
    title: 'Spread the Word',
    description:
      'Help amplify our mission and reach more communities.',
    step: 4,
    image: '/images/og-image.jpg',
  },
];

export function HowToHelp() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* SUBTLE BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f5faf7]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--primary-green)] font-semibold mb-4">
            Get Involved
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Your Journey to <span className="text-[var(--primary-green)]">Impact</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            A simple path to becoming part of our mission and creating lasting change.
          </p>
        </motion.div>

        {/* IMAGE BANNERS */}
        <div className="-mx-6 px-6 mb-14">
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory snap-always touch-pan-x">
            {steps.map((step, index) => (
              <article key={index} className="min-w-[220px] sm:min-w-[260px] snap-start rounded-[32px] overflow-hidden border border-gray-100 bg-white shadow-sm flex-shrink-0">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={260}
                  height={180}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary-green)] font-semibold mb-2">
                    Step {step.step}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-2 mb-4 text-sm leading-snug">
                    {step.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-[var(--primary-green)] font-semibold hover:gap-3 transition-all text-sm">
                    Learn More <FaArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative bg-[var(--primary-green)] rounded-[40px] p-10 md:p-16 text-white overflow-hidden">

            {/* SUBTLE SHAPE */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready to Make a Difference?
              </h3>

              <p className="text-white/90 text-lg mb-8">
                Join our growing network of changemakers protecting Zambia’s environment and communities.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-[var(--primary-green)] px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
                  Donate Now
                </button>

                <button className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[var(--primary-green)] transition">
                  Become a Volunteer
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}