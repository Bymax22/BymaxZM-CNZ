'use client';

import { motion } from 'framer-motion';
import { 
  FaHandHoldingUsd, 
  FaUsers, 
  FaHandshake, 
  FaShareAlt,
  FaSchool,
  FaTree
} from 'react-icons/fa';
import Link from 'next/link';

const options = [
  {
    icon: FaHandHoldingUsd,
    title: 'Donate',
    description: 'Support our conservation projects with your financial contribution. Every donation makes a difference.',
    href: '/get-involved/donate',
    color: 'from-[#029346] to-[#0C4726]',
    impact: 'Funds 100 trees planted',
    cta: 'Make a Donation'
  },
  {
    icon: FaUsers,
    title: 'Volunteer',
    description: 'Join our field operations, community outreach, or administrative tasks as a volunteer.',
    href: '/get-involved/volunteer',
    color: 'from-[#F79021] to-[#AA5D26]',
    impact: 'Helps 50 families',
    cta: 'Join as Volunteer'
  },
  {
    icon: FaHandshake,
    title: 'Partner',
    description: 'Collaborate with us as a corporate partner, NGO, or community organization.',
    href: '/get-involved/partnership',
    color: 'from-[#029346] to-[#0C4726]',
    impact: 'Scales our impact',
    cta: 'Become a Partner'
  },
  {
    icon: FaShareAlt,
    title: 'Spread Awareness',
    description: 'Share our mission on social media and help us reach more supporters.',
    href: '/get-involved/share',
    color: 'from-[#F79021] to-[#AA5D26]',
    impact: 'Reaches thousands',
    cta: 'Share Our Work'
  },
  {
    icon: FaSchool,
    title: 'Start a Club',
    description: 'Establish a Care for Nature Club in your school, university, or community.',
    href: '/clubs',
    color: 'from-[#029346] to-[#0C4726]',
    impact: 'Engages youth',
    cta: 'Learn About Clubs'
  },
  {
    icon: FaTree,
    title: 'Attend Events',
    description: 'Participate in our workshops, tree planting events, and conservation campaigns.',
    href: '/events',
    color: 'from-[#F79021] to-[#AA5D26]',
    impact: 'Joins community',
    cta: 'View Events'
  }
];

export function InvolvementOptions() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Get Involved</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose how you want to make a difference. Every action counts in our mission to protect Zambia's environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={option.href}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${option.color} text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <option.icon className="w-8 h-8" />
                      <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                        {option.impact}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                    <p className="text-white/90 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{option.cta}</span>
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#029346] group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}