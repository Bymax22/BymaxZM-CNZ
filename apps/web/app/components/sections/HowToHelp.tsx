'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
};

const steps: Step[] = [
  {
    icon: FaHeart,
    title: 'Discover Our Mission',
    description:
      'Learn about our conservation work and community impact across Zambia.',
    step: 1,
  },
  {
    icon: FaUsers,
    title: 'Choose Your Impact',
    description:
      'Support through volunteering, partnerships, or community programs.',
    step: 2,
  },
  {
    icon: FaHandHoldingUsd,
    title: 'Take Action',
    description:
      'Contribute through donations or active participation in our initiatives.',
    step: 3,
  },
  {
    icon: FaShareAlt,
    title: 'Spread the Word',
    description:
      'Help amplify our mission and reach more communities.',
    step: 4,
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

        {/* STEPS */}
        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all"
            >
              {/* STEP NUMBER */}
              <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                {step.step}
              </div>

              {/* ICON */}
              <div className="w-14 h-14 rounded-xl bg-[var(--primary-green)]/10 flex items-center justify-center mb-6">
                <step.icon className="text-[var(--primary-green)] w-6 h-6" />
              </div>

              {/* TEXT */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* CTA */}
              <button className="inline-flex items-center gap-2 text-[var(--primary-green)] font-semibold group-hover:gap-3 transition-all">
                Learn More <FaArrowRight />
              </button>
            </motion.div>
          ))}
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