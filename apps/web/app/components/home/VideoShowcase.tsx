'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

type VideoCard = {
  id: string;
  title: string;
  type: string;
  description: string;
  videoUrl: string;
  posterUrl?: string;
  href: string;
  publishedAt: string;
};

function isVideoUrl(value?: string) {
  return !!value && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(value);
}

function getPosterUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    if (!url.hostname.endsWith('cloudinary.com')) return undefined;
    url.pathname = url.pathname
      .replace('/video/upload/', '/video/upload/so_0/')
      .replace(/\.(mp4|webm|mov|ogg)$/i, '.jpg');
    return url.toString();
  } catch {
    return undefined;
  }
}

function getCardHref(card: any) {
  const type = String(card.cardType || 'STORY').toUpperCase();
  const route = type === 'EVENT' ? 'events' : type === 'PROJECT' ? 'projects' : type === 'NEWS' ? 'news' : 'stories';
  return `/${route}/${encodeURIComponent(String(card.slug || card.id || ''))}`;
}

export default function VideoShowcase() {
  const [videos, setVideos] = useState<VideoCard[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadVideos() {
      try {
        const cards: any[] = [];
        const pageSize = 100;
        let skip = 0;
        let total = Number.POSITIVE_INFINITY;

        while (skip < total) {
          const params = new URLSearchParams({ take: String(pageSize), skip: String(skip) });
          ['STORY', 'NEWS', 'EVENT', 'PROJECT'].forEach((type) => params.append('cardType', type));
          const response = await fetch(`/api/communications/cards?${params.toString()}`);
          if (!response.ok) return;

          const payload = await response.json();
          const page = Array.isArray(payload) ? payload : payload.cards || payload.contentCards || [];
          cards.push(...page);
          total = Number(payload.total ?? cards.length);
          if (!page.length) break;
          skip += page.length;
        }

        const publishedVideos: VideoCard[] = cards.flatMap((card: any) => {
          if (String(card.status || '').toUpperCase() !== 'PUBLISHED') return [];

          const gallery = Array.isArray(card.metadata?.gallery) ? card.metadata.gallery : [];
          const galleryUrls = Array.isArray(card.metadata?.galleryUrls) ? card.metadata.galleryUrls : [];
          const galleryVideo = gallery.find((item: any) => item?.type === 'video' && item.url)?.url
            || gallery.find((item: any) => isVideoUrl(item?.url))?.url
            || galleryUrls.find((url: string) => isVideoUrl(url));
          const videoUrl = card.video || (isVideoUrl(card.imageUrl) ? card.imageUrl : '') || galleryVideo;
          if (!videoUrl) return [];

          return [{
            id: String(card.id || card.slug || videoUrl),
            title: String(card.title || 'Care for Nature Zambia'),
            type: String(card.cardType || 'Story').toLowerCase(),
            description: String(card.subtitle || card.description || ''),
            videoUrl: String(videoUrl),
            posterUrl: gallery.find((item: any) => item?.type === 'image' && item.url)?.url || getPosterUrl(String(videoUrl)),
            href: getCardHref(card),
            publishedAt: String(card.publishedAt || card.createdAt || ''),
          }];
        });

        publishedVideos.sort((first, second) =>
          new Date(second.publishedAt || 0).getTime() - new Date(first.publishedAt || 0).getTime()
        );
        if (mounted) setVideos(publishedVideos);
      } catch (error) {
        console.error('Unable to load published videos:', error);
      }
    }

    void loadVideos();
    return () => {
      mounted = false;
    };
  }, []);

  if (!videos.length) return null;

  return (
    <section className="overflow-hidden bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">From the field</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">Watch our work in action</h2>
          </div>
          <Link href="/our-stories" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            More stories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
          {videos.map((video) => (
            <article key={video.id} className="w-[84vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-xl border border-slate-200 bg-white md:w-auto md:max-w-none">
              <div className="relative aspect-video bg-slate-950">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={video.posterUrl}
                  className="h-full w-full object-cover"
                  aria-label={`Play video: ${video.title}`}
                >
                  <source src={video.videoUrl} />
                </video>
                <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  <Play size={12} fill="currentColor" /> {video.type}
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="line-clamp-1 text-sm font-semibold text-slate-900">{video.title}</h3>
                {video.description && <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{video.description}</p>}
                <Link href={video.href} className="mt-3 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                  View story <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}