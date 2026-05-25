'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731229/486240878_1067791558713450_6216512268647952228_n_mmsku6.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779730968/481197667_1050112700481336_3465528187804489358_n_tkfyqj.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053097/677790147_1429823699176899_1661133342896079994_n_xhjbav.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050159/691922078_1446763210816281_7392245079690066370_n_2_uu8xed.jpg',
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
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731231/486835500_1068855051940434_4817210095087666781_n_s1fhv8.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731468/652405364_1388376946654908_5333200032965844494_n_gzzcvf.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731467/486694471_1067572398735366_556474302159851573_n_culsjt.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731466/486489781_1066948912131048_1409106385180258181_n_qiu65u.jpg',
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
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731230/486959969_1068853805273892_8836352372438584646_n_v9vwz0.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731225/451575162_885504463608828_4447996411749857183_n_f1ge7p.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779730969/481163238_1050112807147992_6699109248082235717_n_aiuxqq.jpg',
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
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731951/430668235_798310958994846_3096352634249485481_n_e5gshv.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731956/486322126_1067509512074988_3431872985529835197_n_geql99.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779730966/426287969_783097297182879_2818881992467480425_n_ia3flk.jpg',
    ],
    accent: 'orange',
    href: '/projects/odp',
  },
];

const accentStyles = {
  green: {
    glow: 'shadow-[0_10px_40px_rgba(15,23,42,0.06)]',
    overlay: 'bg-gradient-to-t from-[var(--primary-green)]/40 to-transparent',
    text: 'text-[var(--primary-green)]',
    hover: 'hover:bg-[var(--primary-green)]',
  },
  orange: {
    glow: 'shadow-[0_10px_40px_rgba(15,23,42,0.06)]',
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

  // Per-card slideshow that runs only while hovered/touched
  useEffect(() => {
    if (hoveredCard === null) return;

    const project = projects.find((p) => p.id === hoveredCard);
    if (!project) return;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => ({
        ...prev,
        [hoveredCard]: ((prev[hoveredCard] ?? 0) + 1) % project.images.length,
      }));
    }, 1000); // faster while hovered

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
                onTouchStart={() => setHoveredCard(project.id)}
                onTouchEnd={() => setHoveredCard(null)}
                onTouchCancel={() => setHoveredCard(null)}
                className={`group relative overflow-hidden bg-white ${accentStyles[project.accent].glow} transition-all duration-500`}
              >

                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${currentImage})` }}
                    />
                  </AnimatePresence>

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