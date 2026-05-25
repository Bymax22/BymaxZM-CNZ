'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTree, FaGraduationCap, FaHandsHelping, FaUsers } from 'react-icons/fa';

type Accent = 'green' | 'orange';

type Project = {
  id: number;
  title: string;
  description: string;
  icon: typeof FaGraduationCap;
  images: string[];
  accent: Accent;
  href: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Nature Conservation Program (NCP)',
    description:
      'Protecting natural resources, habitats and biodiversity while building community wealth through sustainable land, water, forest and wildlife management.',
    icon: FaTree,
    images: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053946/692938516_1446768550815747_5499726643162476941_n_nv4vge.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779064259/_MG_2437_jlo9ix.jpg',
    ],
    accent: 'green',
    href: '/our-stories/nature',
  },
  {
    id: 2,
    title: 'Child Rights & Development Program (CRDP)',
    description:
      'Strengthening child participation, school clubs and protection systems so every child can exercise their rights and thrive in a climate-aware society.',
    icon: FaGraduationCap,
    images: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053944/689870554_1020652813653190_5398139666292163193_n_c8e1cx.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779721557/611132077_1317075760451694_7312051361315355744_n_rcakzs.jpg',
    ],
    accent: 'green',
    href: '/our-stories/children',
  },
  {
    id: 3,
    title: 'Sustainable Mining Program (SMP)',
    description:
      'Promoting responsible mining practices, legal compliance and community-led restoration that protect people, land and ecosystems.',
    icon: FaHandsHelping,
    images: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050096/695034324_1446466424179293_4955720521473252367_n_lkvmj7.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779723117/536284483_1185707510255187_8154881700930956562_n_qv3kro.jpg',
    ],
    accent: 'orange',
    href: '/our-stories/mining',
  },
  {
    id: 4,
    title: 'Organization Development Program (ODP)',
    description:
      'Building CNZ capacity in governance, finance, partnerships and operations to scale impact across environment, human rights and development work.',
    icon: FaUsers,
    images: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779725638/482250613_1058339666325306_2005527676673850582_n_wxcov2.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg',
    ],
    accent: 'orange',
    href: '/projects/odp',
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
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>(
    () => Object.fromEntries(projects.map((project) => [project.id, 0]))
  );
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredCard === null) return;

    const project = projects.find((projectItem) => projectItem.id === hoveredCard);
    if (!project) return;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => {
        const currentIndex = prev[hoveredCard] ?? 0;
        const nextIndex = (currentIndex + 1) % project.images.length;
        return { ...prev, [hoveredCard]: nextIndex };
      });
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [hoveredCard]);

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
            Thematic Areas
          </p>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            Care for Nature Zambia’s Strategic Focus
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Our work is organized around four program areas that align environment, children’s rights, sustainable extractives and organizational capacity.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const currentImage = project.images[activeImageIndex[project.id] ?? 0];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative overflow-hidden bg-white ${accentStyles[project.accent].glow} transition-all duration-500`}
              >

                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${currentImage})` }}
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
                  <Link href={project.href} className={`inline-flex items-center gap-3 font-semibold transition-all duration-300 ${accentStyles[project.accent].text}`}>
                    <span>Learn More</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                </div>

                {/* HOVER GLOW BORDER */}
                <div className="absolute inset-0 border border-transparent group-hover:border-white/40 transition duration-500 pointer-events-none" />

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}