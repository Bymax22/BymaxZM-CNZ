'use client';

import { motion } from 'framer-motion';
import { FaTree, FaGraduationCap, FaHandsHelping, FaUsers } from 'react-icons/fa';

type Accent = 'green' | 'orange';

type Project = {
  id: number;
  title: string;
  description: string;
  icon: typeof FaGraduationCap;
  image: string;
  accent: Accent;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Green Schools Initiative',
    description: 'Empowering young environmental champions through school-based conservation clubs and eco-education programs.',
    icon: FaGraduationCap,
    image: '/green-schools.jpg',
    accent: 'green',
  },
  {
    id: 2,
    title: 'Community Reforestation',
    description: 'Planting indigenous trees and promoting sustainable forest management practices that restore ecosystems.',
    icon: FaTree,
    image: '/tree-planting.jpg',
    accent: 'orange',
  },
  {
    id: 3,
    title: "Children's Rights & Education",
    description: 'Programs that strengthen child participation, school clubs, and protect children from exploitation in extractives.',
    icon: FaHandsHelping,
    image: '/children.jpg',
    accent: 'green',
  },
  {
    id: 4,
    title: 'Women in Conservation',
    description: 'Empowering women through conservation enterprise training and sustainable income sources.',
    icon: FaUsers,
    image: '/SAM_1430.JPG',
    accent: 'orange',
  },
];

const accentStyles = {
  green: {
    glow: 'shadow-[0_10px_40px_rgba(2,147,70,0.15)]',
    overlay: 'bg-gradient-to-t from-[var(--primary-green)]/40 to-transparent',
    text: 'text-[var(--primary-green)]',
    hover: 'hover:bg-[var(--primary-green)]',
  },
  orange: {
    glow: 'shadow-[0_10px_40px_rgba(247,144,33,0.2)]',
    overlay: 'bg-gradient-to-t from-[#F79021]/40 to-transparent',
    text: 'text-[#F79021]',
    hover: 'hover:bg-[#F79021]',
  },
};

export function FeaturedProjects() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* BACKGROUND (MATCH STORY SECTION FLOW) */}
      <div className="absolute inset-0 bg-white" />

      {/* SOFT AMBIENT BLOBS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-green)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#F79021]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--primary-green)] mb-4 font-semibold">
            Our Work in Action
          </p>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            Transforming Communities Through
            <span className="block text-[var(--primary-green)] mt-2">
              Sustainable Projects
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Our initiatives combine environmental conservation, human rights, and community empowerment to build a more resilient Zambia.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-[28px] overflow-hidden bg-white ${accentStyles[project.accent].glow} transition-all duration-500`}
            >

              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* OVERLAY */}
                <div className={`absolute inset-0 ${accentStyles[project.accent].overlay}`} />
              </div>

              {/* CONTENT */}
              <div className="p-8">

                {/* ICON */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-md ${accentStyles[project.accent].text}`}>
                  <project.icon className="w-6 h-6" />
                </div>

                {/* TEXT */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* CTA */}
                <button className={`inline-flex items-center gap-3 font-semibold transition-all duration-300 ${accentStyles[project.accent].text}`}>
                  <span>Learn More</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>

              </div>

              {/* HOVER GLOW BORDER */}
              <div className="absolute inset-0 rounded-[28px] border border-transparent group-hover:border-white/40 transition duration-500 pointer-events-none" />

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}