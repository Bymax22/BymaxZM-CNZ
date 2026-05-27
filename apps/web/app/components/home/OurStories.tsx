"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Heart, Share2 } from 'lucide-react';
import { storyTopics } from "../sections/storyData";

const STORY_CARDS = storyTopics.map((s, i) => ({
  id: s.id,
  text: s.summary || s.description || s.highlight,
  author: s.title,
  image: s.media,
  color: i % 3 === 0 ? 'bg-emerald-500' : i % 3 === 1 ? 'bg-orange-500' : 'bg-slate-900',
}));

function truncateSentences(text: string, max = 3) {
  if (!text) return '';
  // Split by sentence-ending punctuation followed by space
  const parts = text.split(/(?<=[.!?])\s+/g).filter(Boolean);
  const out = parts.slice(0, max).join(' ');
  return parts.length > max ? `${out}…` : out;
}

export default function OurStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cards = Array.from(scrollRef.current.children) as HTMLElement[];
    const cardElement = cards[index];
    if (!cardElement) return;

    scrollRef.current.scrollTo({
      left: cardElement.offsetLeft,
      behavior: 'smooth',
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    const nextIndex =
      direction === 'left' ? Math.max(0, activeIndex - 1) : Math.min(STORY_CARDS.length - 1, activeIndex + 1);
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateActiveIndex = () => {
      const scrollLeft = element.scrollLeft;
      const cards = Array.from(element.children) as HTMLElement[];
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    element.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);
    updateActiveIndex();

    return () => {
      element.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Project Stories</p>
          <h3 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Real stories from real people whose lives have been transformed.
          </h3>
        </div>

        <div className="relative mt-14">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-lg transition hover:bg-slate-50"
            aria-label="Scroll stories left"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-none snap-x snap-mandatory flex items-stretch gap-6 overflow-x-auto pb-6 pl-12 pr-12 scroll-smooth touch-pan-x md:pl-14 md:pr-14"
          >
            {STORY_CARDS.map((t) => {
              return (
                <article
                  key={t.id}
                  className="snap-start w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] shrink-0 flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[24px] bg-white shadow-sm"
                >
                  <div className="relative h-52 overflow-hidden rounded-t-[24px]">
                    <img src={t.image} alt={t.author} className="h-full w-full object-cover" />
                    <div className={`absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl ${t.color}`}>
                      <MessageCircle size={20} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-5">
                    <h4 className="text-lg font-semibold text-slate-900">{t.author}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-900 line-clamp-3 overflow-hidden">{truncateSentences(t.text, 2)}</p>
                    <div className="mt-auto border-t border-slate-200 pt-4 flex items-center justify-between gap-3">
                      <a href={`/stories/${t.id}`} className="text-sm text-[#008000] font-medium hover:text-emerald-700 transition-colors">
                        Read Full Story →
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Like"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-emerald-600 transition"
                        >
                          <Heart size={16} />
                        </button>

                        <button
                          type="button"
                          aria-label="Comment"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-emerald-600 transition"
                        >
                          <MessageCircle size={16} />
                        </button>

                        <button
                          type="button"
                          aria-label="Share"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-emerald-600 transition"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-lg transition hover:bg-slate-50"
            aria-label="Scroll stories right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {STORY_CARDS.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => scrollToIndex(dotIndex)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                dotIndex === activeIndex
                  ? 'bg-emerald-600 shadow-[0_0_0_8px_rgba(16,185,129,0.12)]'
                  : 'bg-slate-300'
              }`}
              aria-label={`Go to testimonial ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
