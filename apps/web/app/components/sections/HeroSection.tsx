// app/components/sections/HeroSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    video: '/videos/15336768-hd_1920_1080_30fps.mp4',
    title: 'Welcome to CARE FOR NATURE ZAMBIA',
    subtitle:
      'Were humanity, Fauna and Flora flourish in harmony',
  },
  {
    video: '/videos/9939406-hd_1920_1080_25fps.mp4',
    title: 'BUILDING A JUST AND PROSPEROUS ZAMBIA',
    subtitle:
      'Mobilizing communities, policy actors and children to protect ecosystems and human rights.',
  },
  {
    video: '/videos/11781635-Uhd 3840 2160 60Fps-1.m4v',
    title: 'CREATING SUSTAINABLE FUTURES',
    subtitle:
      'Strengthening organizations, mining accountability and sustainable livelihoods across Zambia',
  },
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);

  const projectGallery = [
    {
      id: 'children',
      images: ['/children-program.jpg', '/children.jpg', '/slide1.jpg', '/slide2.jpg'],
      title: 'Children’s Climate Summit',
      description: 'Youth leaders discuss practical climate solutions for schools and communities.',
      date: 'Apr 2026',
      partners: ['/images/partners/save-children.png', '/images/partners/community-schools.png'],
    },
    {
      id: 'enviromentors',
      images: ['/green-schools.jpg', '/CFN40.jpg', '/women-conservation.jpg', '/reforestation.jpg'],
      title: 'Enviromentors Project',
      description: 'Mentorship sessions empowering students to become environmental champions.',
      date: 'Mar 2026',
      partners: ['/images/partners/ministry-green-economy.png', '/images/partners/international-fund.png'],
    },
    {
      id: 'reforestation',
      images: ['/tree-planting.jpg', '/partnership.jpg', '/SAM_1430.JPG', '/504824918_1125090142983591_1606545278639346897_n.jpg'],
      title: 'Community Reforestation',
      description: 'Local communities planted native trees across vulnerable watersheds.',
      date: 'Feb 2026',
      partners: ['/images/partners/zawa.png', '/images/partners/green-growth.png'],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentProject = projectGallery[projectIndex] ?? projectGallery[0] ?? { images: [], title: '', description: '', date: '', partners: [] };

  return (
    <section className="relative w-full min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-4rem)] overflow-hidden">

      {/* VIDEO BACKGROUND WITH ANIMATION */}
      <AnimatePresence mode="wait">
        {slides[index] && (
          <motion.video
            key={index}
            src={slides[index].video}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* DARK OVERLAY (DEPTH) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* GRADIENT BLEND INTO STORY SECTION */}
      <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-b from-transparent via-black/30 to-[var(--primary-green)] z-10" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col md:flex-row items-center md:items-stretch pt-24 md:pt-28">
        <div className="max-w-5xl px-8 md:w-1/2">

          <AnimatePresence mode="wait">
            {slides[index] && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <h1 className="text-white text-5xl md:text-7xl font-light leading-tight tracking-tight">
                  {slides[index].title}
                </h1>

                <p className="mt-6 text-white/80 text-lg max-w-xl leading-relaxed">
                  {slides[index].subtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <Link
            href="#story"
            className="mt-10 inline-flex items-center gap-4 text-white group"
          >
            <span className="w-12 h-12 bg-[var(--primary-green)] rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="tracking-wide">Explore Our Work</span>
          </Link>

        </div>

        <div className="hidden md:flex items-center justify-center w-full md:w-1/2 px-8">
          <div className="w-full max-w-[36rem]">
            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-white/10">
                <div className="grid grid-cols-2 grid-rows-2 h-72">
                  {currentProject.images.slice(0, 4).map((src, i) => (
                    <div key={src + i} className="relative h-full">
                      <Image src={src} alt={`${currentProject.title} ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 18vw" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs">Recent Projects</div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 rounded-b-lg">
                <p className="text-sm font-semibold text-white">{currentProject.title}</p>
                <p className="mt-1 text-xs text-white/70 leading-tight">{currentProject.description}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">{currentProject.date}</span>
                  <div className="flex items-center gap-2">
                    {currentProject.partners.map((logo) => (
                      <div key={logo} className="h-6 w-6 overflow-hidden rounded-full bg-white/10">
                        <Image src={logo} alt="Partner logo" width={24} height={24} className="object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <button
                  onClick={() => setProjectIndex((projectIndex - 1 + projectGallery.length) % projectGallery.length)}
                  aria-label="Previous project"
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                >
                  ‹
                </button>
                <button
                  onClick={() => setProjectIndex((projectIndex + 1) % projectGallery.length)}
                  aria-label="Next project"
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};