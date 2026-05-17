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
  const [galleryIndex, setGalleryIndex] = useState(0);

  const heroGallery = [
    {
      src: '/children-program.jpg',
      title: 'Children’s Climate Summit',
      subtitle: 'Young climate leaders sharing ideas and climate action plans.',
    },
    {
      src: '/green-schools.jpg',
      title: 'Enviromentors Project',
      subtitle: 'Mentoring students in environmental stewardship workshops.',
    },
    {
      src: '/tree-planting.jpg',
      title: 'Community Reforestation',
      subtitle: 'Restoring habitats with local families and school clubs.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const galleryTimer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % heroGallery.length);
    }, 10000);
    return () => clearInterval(galleryTimer);
  }, []);

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
      <div className="relative z-20 h-full flex flex-col md:flex-row items-center md:items-stretch">
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
          <div className="w-full max-w-[32rem]">
            <AnimatePresence mode="wait">
              {heroGallery[galleryIndex] && (
                <motion.div
                  key={galleryIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl bg-black/20"
                >
                  <div className="relative h-[28rem] w-full">
                    <Image
                      src={heroGallery[galleryIndex].src}
                      alt={heroGallery[galleryIndex].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/80">Featured project</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{heroGallery[galleryIndex].title}</h2>
                    <p className="mt-3 text-sm text-white/80 max-w-sm">{heroGallery[galleryIndex].subtitle}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-center gap-2">
              {heroGallery.map((item, dotIndex) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setGalleryIndex(dotIndex)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${galleryIndex === dotIndex ? 'bg-white' : 'bg-white/40'}`}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};