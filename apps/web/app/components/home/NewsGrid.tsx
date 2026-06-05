"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const NEWS = [
  {
    title: 'Children Face Climate Change Threats – CHIBAMBA',
    date: 'May 07',
    month: 'May',
    day: '07',
    type: 'News',
    excerpt:
      'Government says children remain among the most vulnerable groups affected by climate change.',
    video: 'https://res.cloudinary.com/dwxlzl5us/video/upload/q_auto/f_auto/v1779063895/vid_w3flah.mp4',
  },
  {
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

export default function NewsGrid() {
  const [items, setItems] = useState<any[]>(NEWS);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/communications/cards?cardType=NEWS&take=4');
        if (!res.ok) return;
        const data = await res.json();
        const cards = data.cards || data.contentCards || [];
        if (!mounted) return;
        setItems(
          cards.map((c: any) => ({
            title: c.title,
            excerpt: c.description || c.subtitle || '',
            image: c.imageUrl || c.media || '',
            date: c.publishedAt ? new Date(c.publishedAt).toLocaleDateString() : '',
            month: c.publishedAt ? new Date(c.publishedAt).toLocaleString('en-US', { month: 'short' }) : '',
            day: c.publishedAt ? new Date(c.publishedAt).getDate().toString().padStart(2, '0') : '',
            type: c.cardType || 'News',
          }))
        );
      } catch (e) {
        // keep static
      }
    }
    void load();
    return () => { mounted = false; };
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
          {NEWS.map((n) => (
            <div
              key={n.title}
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
                <div className="mt-2 flex items-center justify-between gap-3">
                  <Link
                    href="/news"
                    className="text-sm font-semibold text-[#008000] transition hover:text-[#026730]"
                  >
                    Read More →
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Like"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600"
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Comment"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600"
                    >
                      <MessageCircle size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Share"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-emerald-600"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
