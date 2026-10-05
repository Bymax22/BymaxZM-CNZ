"use client";

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Heart, Share2 } from 'lucide-react';
import { storyTopics } from "../sections/storyData";
import { fetchLikeCount, updateLikeCount } from '../../../lib/supabaseContent';
import { useAuthPrompt } from '../../hooks/useAuthPrompt';

type CardView = { id: string; slug?: string; text?: string; author?: string; image?: string; video?: string; publishedAt?: string; location?: string; partnerLogos?: string[] };

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

function formatRelativeTime(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const absSeconds = Math.abs(seconds);
  const formatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
  if (absSeconds < 60) return formatter.format(-seconds, 'second');
  if (absSeconds < 3600) return formatter.format(-Math.round(seconds / 60), 'minute');
  if (absSeconds < 86400) return formatter.format(-Math.round(seconds / 3600), 'hour');
  if (absSeconds < 2592000) return formatter.format(-Math.round(seconds / 86400), 'day');
  return formatter.format(-Math.round(seconds / 2592000), 'month');
}

// initial fallback from static data
const initialCards: CardView[] = storyTopics.map((s) => ({
  id: s.id,
  text: s.summary || s.description || s.highlight,
  author: s.title,
  image: s.media,
  location: 'Zambia',
  partnerLogos: [],
}));

function truncateSentences(text: string, max = 3) {
  if (!text) return '';
  // Split by sentence-ending punctuation followed by space
  const parts = text.split(/(?<=[.!?])\s+/g).filter(Boolean);
  const out = parts.slice(0, max).join(' ');
  return parts.length > max ? `${out}…` : out;
}

export default function OurStories() {
  const { requireAuthentication, authPrompt } = useAuthPrompt();
  const scrollRef = useRef<HTMLDivElement>(null);
  const physicalIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState<CardView[]>(initialCards);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [follows, setFollows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;

    async function loadCardsWithCounts() {
      try {
        const res = await fetch('/api/communications/cards?cardType=STORY&take=6&status=PUBLISHED');
        if (!res.ok) return;

        const data = await res.json();
        const items = data.cards || data.contentCards || [];
        if (!mounted) return;

        const mapped: CardView[] = items.map((c: any, i: number) => {
          const gallery = Array.isArray(c.metadata?.gallery) ? c.metadata.gallery : [];
          const heroImage = c.imageUrl || gallery.find((item: any) => item.type === 'image')?.url || '';
          const heroVideo = gallery.find((item: any) => item.type === 'video')?.url || (isVideoUrl(c.imageUrl || '') ? c.imageUrl : undefined);
          const slug = String(c.slug || c.id || '').trim();
          return {
            id: c.id || String(i),
            slug,
            text: c.description || c.subtitle || c.metadata?.summary || '',
            author: c.title,
            image: heroImage,
            video: heroVideo,
            publishedAt: c.publishedAt || c.createdAt,
            location: c.metadata?.location || 'Zambia',
            partnerLogos: c.metadata?.partnerLogos || [],
          };
        });

        if (mapped.length) {
          setCards(mapped);

          const countData = await Promise.all(
            mapped.map(async (card) => {
              const likeCount = await fetchLikeCount('story', card.id);
              return { id: card.id, likeCount };
            })
          );

          if (!mounted) return;

          setLikes(
            countData.reduce((acc: Record<string, number>, item) => {
              acc[item.id] = item.likeCount;
              return acc;
            }, {})
          );
        }
      } catch (e) {
        // keep fallback
      }
    }

    void loadCardsWithCounts();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!scrollRef.current) return;
    const cards = Array.from(scrollRef.current.children) as HTMLElement[];
    const cardElement = cards[index];
    if (!cardElement) return;

    physicalIndexRef.current = index;
    scrollRef.current.scrollTo({
      left: cardElement.offsetLeft,
      behavior,
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    const nextIndex =
      direction === 'left' ? Math.max(0, activeIndex - 1) : Math.min(cards.length - 1, activeIndex + 1);
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateActiveIndex = () => {
      const scrollLeft = element.scrollLeft;
      const visibleCards = Array.from(element.children).filter((card) => (card as HTMLElement).getClientRects().length > 0) as HTMLElement[];
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      visibleCards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      const physicalIndex = Number(visibleCards[nearestIndex]?.dataset.storyIndex ?? nearestIndex);
      physicalIndexRef.current = physicalIndex;
      setActiveIndex(cards.length ? physicalIndex % cards.length : 0);
    };

    element.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);
    updateActiveIndex();

    return () => {
      element.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [cards.length]);

  useEffect(() => {
    if (cards.length < 2) return;

    const mobileMotion = window.matchMedia('(max-width: 767px) and (prefers-reduced-motion: no-preference)');
    if (!mobileMotion.matches) return;

    const interval = window.setInterval(() => {
      const nextIndex = physicalIndexRef.current + 1;
      if (nextIndex >= cards.length * 2) {
        const lastOriginalCard = scrollRef.current?.children[cards.length - 1] as HTMLElement | undefined;
        if (lastOriginalCard && scrollRef.current) {
          scrollRef.current.scrollLeft = lastOriginalCard.offsetLeft;
          physicalIndexRef.current = cards.length - 1;
        }
        return;
      }
      scrollToIndex(nextIndex);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [cards.length]);

  return (
    <section className="bg-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Project Stories</p>
          <h3 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Explore some of our stories from various projects.
          </h3>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-lg transition hover:bg-slate-50 md:flex"
            aria-label="Scroll stories left"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-none snap-x snap-mandatory flex items-stretch gap-4 overflow-x-auto overscroll-x-contain pb-4 scroll-smooth touch-pan-x"
          >
            {[...cards, ...cards].map((t, index) => {
              const isMobileClone = index >= cards.length;
              return (
                <article
                  key={`${t.id}-${index}`}
                  data-story-index={index}
                  className={`snap-start w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] shrink-0 flex h-[22rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${isMobileClone ? 'md:hidden' : ''}`}
                >
                  <div className="relative h-28 shrink-0 overflow-hidden">
                    {t.video ? (
                      <video src={t.video} controls muted loop playsInline className="h-full w-full object-cover" />
                    ) : (
                      <img src={t.image} alt={t.author} className="h-full w-full object-cover" />
                    )}
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col p-3">
                    <h4 className="line-clamp-1 text-sm font-semibold text-slate-900">{t.author}</h4>
                    {t.publishedAt && (
                      <p className="mt-1 text-[11px] text-slate-500">Published {formatRelativeTime(t.publishedAt)}</p>
                    )}
                    <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2 overflow-hidden">{truncateSentences(t.text || '', 2)}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <span aria-hidden="true">📍</span>
                      <span className="line-clamp-1">{t.location || 'Zambia'}</span>
                    </div>
                    {t.partnerLogos && t.partnerLogos.length > 0 && (
                      <div className="mt-2 flex h-5 items-center gap-2 overflow-hidden">
                        {t.partnerLogos.slice(0, 4).map((logo, idx) => (
                          <img key={idx} src={logo} alt="Partner logo" className="h-5 object-contain" />
                        ))}
                      </div>
                    )}
                    <div className="mt-auto border-t border-slate-200 pt-2 flex items-center justify-between gap-2">
                      <Link href={`/stories/${encodeURIComponent(t.slug || t.id)}`} className="text-xs font-semibold text-[#008000] transition-colors hover:text-emerald-700">
                        Read Full Story →
                      </Link>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Like"
                          onClick={async () => {
                            const toggleLike = async () => {
                              const nextLiked = !likedItems[t.id];
                              setLikedItems((prev) => ({ ...prev, [t.id]: nextLiked }));
                              setLikes((prev) => ({ ...prev, [t.id]: (prev[t.id] ?? 0) + (nextLiked ? 1 : -1) }));
                              const nextCount = await updateLikeCount('story', t.id, nextLiked ? 1 : -1);
                              setLikes((prev) => ({ ...prev, [t.id]: nextCount }));
                            };
                            if (!requireAuthentication(toggleLike)) return;
                            await toggleLike();
                          }}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${likedItems[t.id] ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-emerald-600'}`}
                        >
                          <Heart size={16} fill={likedItems[t.id] ? 'currentColor' : 'none'} />
                        </button>

                        <Link
                          href={`/stories/${encodeURIComponent(t.slug || t.id)}`}
                          onClick={(event) => {
                            const targetUrl = event.currentTarget.href;
                            if (!requireAuthentication(() => window.location.assign(`${targetUrl}#engagement`))) event.preventDefault();
                          }}
                          aria-label="Comment"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600"
                        >
                          <MessageCircle size={16} />
                        </Link>

                        <button
                          type="button"
                          aria-label="Share"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: t.author,
                                text: t.text,
                                url: `${typeof window !== 'undefined' ? window.location.origin : ''}/stories/${encodeURIComponent(t.slug || t.id)}`,
                              }).catch(() => {});
                            }
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600"
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
            className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-lg transition hover:bg-slate-50 md:flex"
            aria-label="Scroll stories right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-4 hidden justify-center gap-2 md:flex">
          {cards.map((_, dotIndex) => (
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
        {authPrompt}
      </div>
    </section>
  );
}
