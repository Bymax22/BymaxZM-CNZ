'use client';

import Image from 'next/image';
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
    description: 'Support our projects with your financial contribution. Every donation makes a difference.',
    href: '/get-involved/donate',
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779725638/482250613_1058339666325306_2005527676673850582_n_wxcov2.jpg',
    imageAlt: 'Hands holding a tree sapling for donation impact',
    impact: 'Make a Difference',
    cta: 'Make a Donation'
  },
  {
    icon: FaUsers,
    title: 'Volunteer',
    description: 'Join our field operations, community outreach, or administrative tasks as a volunteer.',
    href: '/get-involved/volunteer',
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053035/679892067_1434164485409487_1368698975194245651_n_txyhcj.jpg',
    imageAlt: 'Volunteers working together in the field',
    impact: 'Supporting Communities',
    cta: 'Join as Volunteer'
  },
  {
    icon: FaHandshake,
    title: 'Partner',
    description: 'Collaborate with us as a corporate partner, NGO, or community organization.',
    href: '/get-involved/partnership',
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731951/430668235_798310958994846_3096352634249485481_n_e5gshv.jpg',
    imageAlt: 'Partners collaborating on community conservation work',
    impact: 'Scales the impact',
    cta: 'Become a Partner'
  },
  {
    icon: FaShareAlt,
    title: 'Spread Awareness',
    description: 'Share our work and help reach more.',
    href: '/get-involved/share',
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779730968/481665428_1050112787147994_3743707429000313539_n_o21q55.jpg',
    imageAlt: 'Community members sharing conservation stories',
    impact: 'Reach More',
    cta: 'Share Our Work'
  },
  {
    icon: FaSchool,
    title: 'Start a Club',
    description: 'Establish a Care for Nature Club in your school, university, or community.',
    href: '/clubs',
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779730965/402642239_734363315389611_2340961023292662326_n_lwuhlg.jpg',
    imageAlt: 'Young people gathering at a community club event',
    impact: 'Engages children, youths or community memebers',
    cta: 'Learn About Clubs'
  },
  {
    icon: FaTree,
    title: 'Attend Events',
    description: 'Participate in our workshops, events, advocacy and campaigns.',
    href: '/events',
    image: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050065/690822822_1446469870845615_2517492534617368429_n_cr2ym2.jpg',
    imageAlt: 'Community event',
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
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={option.image}
                      alt={option.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-flex items-center justify-between rounded-full bg-white/15 px-3 py-1 text-xs font-semibold leading-none backdrop-blur-sm">
                        {option.impact}
                      </span>
                      <h3 className="mt-4 text-2xl font-bold tracking-tight">{option.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-700 leading-relaxed">{option.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">{option.cta}</span>
                      <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-gray-900 transition-all duration-300 group-hover:bg-[#029346] group-hover:text-white">
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