// app/components/sections/HeroSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type ProjectItem = {
  id: string;
  images: string[];
  title: string;
  description: string;
  date: string;
  partners: string[];
};

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

const projectGallery: ProjectItem[] = [
  {
    id: 'children',
    images: [
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050049/692066766_1446470007512268_6438163747249751749_n_r6dnst.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050048/688852805_1446469347512334_6499262433093471038_n_ozx6uq.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050051/689491941_1446467464179189_3634010048253755955_n_exgv7s.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050065/690822822_1446469870845615_2517492534617368429_n_cr2ym2.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050059/693557373_1446466034179332_2255816289780254286_n_lzng31.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050042/692549481_1446466477512621_8596614007717111887_n_euvkoj.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050051/689491941_1446467464179189_3634010048253755955_n_exgv7s.jpg',
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779050102/691536929_1446465980846004_1994393868613685973_n_udcivx.jpg',
    ],
    title: 'The 2026 Children’s Climate Summit',
    description: 'Securing for every child through Climate Action',
    date: '6th May 2026',
    partners: ['/sweden.png', '/images/partners/save-children.png', '/Coat_of_arms_of_Zambia.svg (1).png', '/keepers-foundation.png'],
  },
  {
    id: 'EnviroMentors',
    images: ['/green-schools.jpg', '/CFN40.jpg', '/women-conservation.jpg', '/reforestation.jpg'],
    title: 'Enviromentors Program Launch',
    description: 'Mentorship sessions empowering students to become environmental champions.',
    date: '8th May 2026',
    partners: ['/images/partners/ministry-green-economy.png', '/images/partners/international-fund.png'],
  },
  {
    id: 'reforestation',
    images: ['/tree-planting.jpg', '/partnership.jpg', '/SAM_1430.JPG', '/504824918_1125090142983591_1606545278639346897_n.jpg'],
    title: 'Community Reforestation',
    description: 'Local communities planted native trees across vulnerable watersheds.',
    date: 'Feb 2026',
    partners: ['/images/partners/zawa.png', '/images/partners/international-fund.png'],
  },
];

const shuffleArray = (items: string[]) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = next[i]!;
    next[i] = next[j]!;
    next[j] = temp;
  }
  return next;
};

const getProjectBatch = (project: ProjectItem, batch: number) => {
  const start = batch * 4;
  return project.images.slice(start, start + 4);
};

const fallbackProject: ProjectItem = projectGallery[0]!;

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [batchIndex, setBatchIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>(getProjectBatch(fallbackProject, 0));
  const [shuffleStage, setShuffleStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentProject = projectGallery[projectIndex] ?? fallbackProject;

  useEffect(() => {
    setBatchIndex(0);
    setShuffleStage(0);
    setDisplayImages(getProjectBatch(currentProject, 0));
  }, [currentProject.id]);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setShuffleStage((stage) => stage + 1);
    }, 5000);
    return () => clearInterval(shuffleInterval);
  }, [currentProject.id]);

  useEffect(() => {
    if (shuffleStage === 1) {
      setDisplayImages((current) => shuffleArray(current));
      return;
    }

    if (shuffleStage === 2) {
      if (currentProject.images.length > 4) {
        setBatchIndex(1);
        setDisplayImages(getProjectBatch(currentProject, 1));
      } else {
        setProjectIndex((prev) => (prev + 1) % projectGallery.length);
      }
      return;
    }

    if (shuffleStage === 3) {
      setProjectIndex((prev) => (prev + 1) % projectGallery.length);
    }
  }, [shuffleStage, currentProject]);

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
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative"
              >
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <div className="grid grid-cols-2 grid-rows-2 h-80">
                    {displayImages.map((src, i) => (
                      <motion.div
                        key={src + i}
                        layout
                        initial={{ opacity: 0, scale: 0.98, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -16 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.05 }}
                        className="relative h-full overflow-hidden rounded-md group"
                      >
                        <Image
                          src={src}
                          alt={`${currentProject.title} ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          sizes="(max-width: 1024px) 50vw, 18vw"
                        />
                      </motion.div>
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
            </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
};