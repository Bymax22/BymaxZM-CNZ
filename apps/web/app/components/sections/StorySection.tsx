'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { storyCategories as categories, storyTopics } from './storyData';

export default function StorySection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('National');

  const filteredTopics =
    activeCategory === 'All'
      ? storyTopics
      : storyTopics.filter((topic) => topic.category === activeCategory);

  return (
    <section className="relative bg-[#4e2507] text-white overflow-hidden py-20">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-16 w-36 h-36 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-16 right-16 w-56 h-56 rounded-full bg-black/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-white/70">CaNZ Involvement</p>
          <h2 className="mt-5 text-4xl md:text-5xl font-light leading-tight">
            Our stories for advocacy, engagement and dialogue.
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed">
            National, Regional and Global Engagements, advocacy and dialogue.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                category === activeCategory
                  ? 'border-white bg-white text-black'
                  : 'border-white/25 bg-white/10 text-white/80 hover:border-white hover:bg-white/15'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic) => (
              <motion.article
                key={topic.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="group overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
              >
                <div className="relative aspect-[16/10] bg-black/10">
                  {topic.mediaType === 'video' ? (
                    <video
                      src={topic.media}
                      controls
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={topic.media}
                      alt={topic.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--primary-green)]">
                    <span>{topic.category}</span>
                    <span className="text-white/40">•</span>
                    <span>{topic.mediaType === 'video' ? 'Video' : 'Image'}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{topic.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{topic.description}</p>
                  <div className="mt-6">
                    <Link
                      href={`/our-stories/${topic.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/20"
                    >
                      See full story
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredTopics.length === 0 && (
          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-10 text-center text-white/75">
            No topics found for {activeCategory}. Please choose another category.
          </div>
        )}
      </div>
    </section>
  );
}
