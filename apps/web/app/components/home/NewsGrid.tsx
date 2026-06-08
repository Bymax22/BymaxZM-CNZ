"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { fetchLikeCount, updateLikeCount } from '../../../lib/supabaseContent';

const NEWS = [
  {
    id: 'news-1',
    slug: 'children-face-climate-change-threats-chibamba',
    title: 'Children Face Climate Change Threats – CHIBAMBA',
    date: 'May 07',
    month: 'May',
    day: '07',
    type: 'News',
    excerpt:
      'Government says children remain among the most vulnerable groups affected by climate change.',
    image:
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779063895/vid_w3flah.mp4',
  },
  {
    id: 'event-1',
    slug: 'enviromentors-program-launch',
    title: 'EnviroMentors Program Launch',
    date: 'May 08',
    month: 'May',
    day: '08',
    type: 'Event',
    excerpt:
      'Today we celebrated another milestone as we launched the Environmentors Program...',
    image:
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053938/689842600_1446768710815731_6105767634409331045_n_pnlc30.jpg',
  },
  {
    id: 'event-2',
    slug: 'environmentors-program-launch-2',
    title: 'EnviroMentors Program Launch',
    date: 'May 08',
    month: 'May',
    day: '08',
    type: 'Event',
    excerpt:
      'Today we celebrated another milestone as we launched the Environmentors Program...',
    image:
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053938/689842600_1446768710815731_6105767634409331045_n_pnlc30.jpg',
  },
  {
    id: 'event-3',
    slug: 'environmentors-program-launch-3',
    title: 'EnviroMentors Program Launch',
    date: 'May 08',
    month: 'May',
    day: '08',
    type: 'Event',
    excerpt:
      'Today we celebrated another milestone as we launched the Environmentors Program...',
    image:
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053938/689842600_1446768710815731_6105767634409331045_n_pnlc30.jpg',
  },
  {
    id: 'event-4',
    slug: 'enviromentors-program-launch-4',
    title: 'EnviroMentors Program Launch',
    date: 'May 08',
    month: 'May',
    day: '08',
    type: 'Event',
    excerpt:
      'Today we celebrated another milestone as we launched the Environmentors Program...',
    image:
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053938/689842600_1446768710815731_6105767634409331045_n_pnlc30.jpg',
  },
  {
    id: 'event-5',
    slug: 'enviromentors-program-launch-5',
    title: 'EnviroMentors Program Launch',
    date: 'May 08',
    month: 'May',
    day: '08',
    type: 'Event',
    excerpt:
      'Today we celebrated another milestone as we launched the Environmentors Program...',
    image:
      'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053938/689842600_1446768710815731_6105767634409331045_n_pnlc30.jpg',
  },
];

function formatRelativePublishedTime(publishedAt: string, now: number) {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return '';

  const seconds = Math.round((date.getTime() - now) / 1000);
  const absSeconds = Math.abs(seconds);

  const formatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
  if (absSeconds < 60) {
    return formatter.format(seconds, 'second');
  }
  if (absSeconds < 3600) {
    return formatter.format(Math.round(seconds / 60), 'minute');
  }
  if (absSeconds < 86400) {
    return formatter.format(Math.round(seconds / 3600), 'hour');
  }
  if (absSeconds < 2592000) {
    return formatter.format(Math.round(seconds / 86400), 'day');
  }
  if (absSeconds < 31536000) {
    return formatter.format(Math.round(seconds / 2592000), 'month');
  }
  return formatter.format(Math.round(seconds / 31536000), 'year');
}

export default function NewsGrid() {
  const [items, setItems] = useState<any[]>(NEWS);
  const [now, setNow] = useState(() => Date.now());
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/communications/cards?cardType=NEWS&cardType=EVENT&take=4');
        if (!res.ok) return;
        const data = await res.json();
        const cards = data.cards || data.contentCards || [];
        if (!mounted) return;
        setItems(
          cards.map((c: any) => {
            const publishedAt = c.publishedAt || c.createdAt || '';
            const date = publishedAt ? new Date(publishedAt) : null;
            const slug = c.slug || c.id || String(c.title).toLowerCase().replace(/\s+/g, '-');
            return {
              id: c.id || slug,
              slug,
              title: c.title,
              excerpt: c.description || c.subtitle || '',
              image: c.imageUrl || c.media || '',
              publishedAt: publishedAt || undefined,
              month: date ? date.toLocaleString('en-US', { month: 'short' }) : '',
              day: date ? date.getDate().toString().padStart(2, '0') : '',
              type: c.cardType || 'News',
            };
          })
        );
      } catch (e) {
        // keep static fallback
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadLikeCounts() {
      const counts: Record<string, number> = {};
      await Promise.all(
        items.map(async (item) => {
          if (!item?.id) return;
          const contentType = item.type === 'Event' ? 'event' : 'news';
          const count = await fetchLikeCount(contentType, item.id);
          if (mounted) {
            counts[item.id] = count;
          }
        })
      );
      if (mounted) {
        setLikes(counts);
      }
    }

    if (items.length) {
      void loadLikeCounts();
    }

    return () => {
      mounted = false;
    };
  }, [items]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">News & Events</h3>
          <Link href="/news" className="text-sm text-[#008000] transition hover:text-[#026730]">
            View All News →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((n, index) => {
            // Use ID for routing; backend APIs return IDs consistently
            const detailUrl = n.type === 'Event' ? `/events/${n.id}` : `/news/${n.id}`;
            const contentType = n.type === 'Event' ? 'event' : 'news';
            return (
              <div
                key={`${n.slug ?? n.id ?? n.title}-${index}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
              <div className="relative overflow-hidden">
                <img
                  src={n.image}
                  alt={n.title}
                  className="h-28 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div
                    className={`px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white ${
                      n.type === 'Event' ? 'bg-emerald-600' : 'bg-orange-500'
                    }`}
                  >
                    {n.month}
                  </div>
                  <div className="bg-white px-3 pb-3 pt-2 text-center">
                    <span className="block text-lg font-semibold text-slate-900 leading-none">{n.day}</span>
                  </div>
                </div>
                <div
                  className={`absolute left-4 top-24 inline-flex rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${
                    n.type === 'Event' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  {n.type}
                </div>
              </div>

              <div className="p-3">
                <h4 className="mt-2 text-sm font-semibold text-slate-900">{n.title}</h4>
                <p className="mt-1 text-xs leading-5 text-slate-600 line-clamp-2 overflow-hidden">{n.excerpt}</p>
                <p className="mt-2 text-[11px] text-slate-500">
                  {n.publishedAt ? formatRelativePublishedTime(n.publishedAt, now) : 'Date not available'}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <Link
                    href={detailUrl}
                    className="text-sm font-semibold text-[#008000] transition hover:text-[#026730]"
                  >
                    Read More →
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Like"
                      onClick={async () => {
                        if (!n.id) return;
                        const isLiked = !!liked[n.id];
                        setLiked((prev) => ({ ...prev, [n.id]: !isLiked }));
                        const nextCount = await updateLikeCount(contentType, n.id, isLiked ? -1 : 1);
                        setLikes((prev) => ({ ...prev, [n.id]: nextCount }));
                      }}
                      className={`flex h-8 min-w-[2rem] items-center justify-center gap-1 rounded-lg transition ${liked[n.id] ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-emerald-600'}`}
                    >
                      <Heart size={16} fill={liked[n.id] ? 'currentColor' : 'none'} />
                      <span className="text-[11px] font-semibold">{likes[n.id] ?? 0}</span>
                    </button>
                    <Link href={detailUrl} aria-label="Comment" className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600">
                      <MessageCircle size={16} />
                    </Link>
                    <button
                      type="button"
                      aria-label="Share"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          const shareUrl = `${window.location.origin}${detailUrl}`;
                          if (navigator.share) {
                            navigator.share({ title: n.title, url: shareUrl }).catch(() => {});
                          } else {
                            void navigator.clipboard.writeText(shareUrl);
                          }
                        }
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
