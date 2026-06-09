'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { storyTopics } from "../components/sections/storyData";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import StoryInteractions from '../components/stories/StoryInteractions';

type Story = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  media?: string;
  description?: string;
  subtitle?: string;
  imageUrl?: string;
  publishedAt?: string;
  metadata?: any;
};

export default function StoriesPage() {
  const initialStories: Story[] = storyTopics.map((s) => ({
    id: s.id,
    slug: s.slug || s.id,
    title: s.title,
    summary: s.summary,
    media: s.media,
  }));
  
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const res = await fetch('/api/communications/cards?cardType=STORY&take=100&status=PUBLISHED');
        const data = await res.json();
        const items = data.cards || data.contentCards || [];
        
        if (items.length > 0) {
          const mapped = items.map((item: any) => ({
            id: item.id,
            slug: item.slug || item.id,
            title: item.title,
            summary: item.subtitle || item.description || item.metadata?.summary || '',
            media: item.imageUrl || item.metadata?.gallery?.[0]?.url || '',
            description: item.description,
            subtitle: item.subtitle,
            imageUrl: item.imageUrl,
            publishedAt: item.publishedAt,
            metadata: item.metadata,
          }));
          setStories(mapped);
        }
      } catch (error) {
        console.error('Failed to load stories:', error);
        // Fall back to static data
      } finally {
        setLoading(false);
      }
    };
    void loadStories();
  }, []);

  return (
    <main className="bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
        <Link href="/" className="text-sm text-[#008000] font-semibold hover:text-[#026730]">
          ← Back to Home
        </Link>
      </div>

      <section className="relative overflow-hidden bg-[#0b4f2f]">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-[url('/children.jpg')] bg-cover bg-right-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-center">
            <div className="max-w-2xl text-white">
              <p className="text-sm uppercase tracking-[0.32em] text-[#bfe8c9]">Our Stories</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Our Projects' stories
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                Read first-hand accounts from beneficiaries, volunteers, and partners about how our projects are making a difference.
              </p>
            </div>

       
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-600">Loading stories...</p>
          </div>
        ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story.id} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow">
              <div className="relative h-48 w-full overflow-hidden">
                <img src={story.media} alt={story.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>

              <div className="p-6 flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Story</span>
                  <div className="text-sm text-slate-400">&nbsp;</div>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-slate-900">{story.title}</h2>
                <p className="mt-3 text-sm text-slate-600 flex-1">{story.summary}</p>

                  <div className="mt-4">
                    <StoryInteractions storyId={story.id} />
                  </div>

                <div className="mt-6">
                  <Link href={`/stories/${story.id}`} className="inline-flex items-center gap-2 text-[#008000] font-semibold hover:text-[#026730]">Read Full Story <span aria-hidden>→</span></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}
      </section>
    </main>
  );
}
