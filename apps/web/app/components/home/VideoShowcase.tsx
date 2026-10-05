'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Heart, MessageCircle, Play, Share2 } from 'lucide-react';
import { useAuthPrompt } from '../../hooks/useAuthPrompt';
import { supabaseEnabled } from '../../../lib/supabaseClient';
import {
  fetchComments,
  fetchLikeCount,
  postComment,
  subscribeToComments,
  subscribeToLikeCount,
  updateLikeCount,
  type ContentComment,
} from '../../../lib/supabaseContent';

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

type VideoFilter = 'all' | 'story' | 'project' | 'event' | 'news';

function formatRelativeTime(value: string, now: number) {
  const timestamp = new Date(value).getTime();
  if (!value || Number.isNaN(timestamp)) return '';

  const seconds = Math.round((timestamp - now) / 1000);
  const absoluteSeconds = Math.abs(seconds);
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (absoluteSeconds < 60) return formatter.format(seconds, 'second');
  if (absoluteSeconds < 3600) return formatter.format(Math.round(seconds / 60), 'minute');
  if (absoluteSeconds < 86400) return formatter.format(Math.round(seconds / 3600), 'hour');
  if (absoluteSeconds < 2592000) return formatter.format(Math.round(seconds / 86400), 'day');
  if (absoluteSeconds < 31536000) return formatter.format(Math.round(seconds / 2592000), 'month');
  return formatter.format(Math.round(seconds / 31536000), 'year');
}

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

function VideoCardActions({ video }: { video: VideoCard }) {
  const { requireAuthentication, authPrompt } = useAuthPrompt();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<ContentComment[]>([]);
  const [shares, setShares] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likePending, setLikePending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const seenCommentIds = useRef(new Set<string>());
  const contentType = video.type;

  useEffect(() => {
    let mounted = true;
    let liveCounterUpdate = false;
    const removeLikeUpdates = subscribeToLikeCount(contentType, video.id, (count) => {
      liveCounterUpdate = true;
      setLikes(count);
    });
    const removeShareUpdates = subscribeToLikeCount(`${contentType}_share`, video.id, (count) => {
      liveCounterUpdate = true;
      setShares(count);
    });
    const removeCommentUpdates = subscribeToComments(contentType, video.id, (comment) => {
      if (seenCommentIds.current.has(comment.id)) return;
      seenCommentIds.current.add(comment.id);
      setComments((current) => [comment, ...current]);
    });

    async function loadEngagement() {
      const [likeCount, storedComments, shareCount] = await Promise.all([
        fetchLikeCount(contentType, video.id),
        fetchComments(contentType, video.id),
        fetchLikeCount(`${contentType}_share`, video.id),
      ]);
      if (!mounted) return;

      if (!liveCounterUpdate) {
        setLikes(likeCount);
        setShares(shareCount);
      }
      storedComments.forEach((comment) => seenCommentIds.current.add(comment.id));
      setComments((current) => {
        const merged = new Map(current.map((comment) => [comment.id, comment]));
        storedComments.forEach((comment) => merged.set(comment.id, comment));
        return [...merged.values()].sort((first, second) => second.created_at.localeCompare(first.created_at));
      });
    }

    void loadEngagement();
    return () => {
      mounted = false;
      removeLikeUpdates();
      removeShareUpdates();
      removeCommentUpdates();
    };
  }, [contentType, video.id]);

  async function handleLike() {
    if (likePending) return;
    const performLike = async () => {
      const nextLiked = !liked;
      setLikePending(true);
      setLiked(nextLiked);
      setLikes((count) => Math.max(0, count + (nextLiked ? 1 : -1)));
      try {
        setLikes(await updateLikeCount(contentType, video.id, nextLiked ? 1 : -1));
      } finally {
        setLikePending(false);
      }
    };
    if (!requireAuthentication(performLike)) return;
    await performLike();
  }

  async function handleShare() {
    const url = `${window.location.origin}${video.href}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, text: video.description, url });
      } else {
        await navigator.clipboard.writeText(url);
        setFeedback('Link copied');
      }
      setShares(await updateLikeCount(`${contentType}_share`, video.id, 1));
    } catch {
      setFeedback('Unable to share');
    }
    window.setTimeout(() => setFeedback(''), 2500);
  }

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitComment = async () => {
      const text = commentText.trim();
      if (!text) return;
      const savedComment = await postComment(contentType, video.id, text);
      if (!savedComment) {
        setFeedback('Unable to post comment');
        return;
      }
      if (!seenCommentIds.current.has(savedComment.id)) {
        seenCommentIds.current.add(savedComment.id);
        setComments((current) => [savedComment, ...current]);
      }
      setCommentText('');
      setFeedback('Comment added');
      window.setTimeout(() => setFeedback(''), 2500);
    };
    if (!requireAuthentication(submitComment)) return;
    await submitComment();
  }

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => void handleLike()} disabled={!supabaseEnabled || likePending} className={`inline-flex items-center gap-1.5 rounded-md border-0 px-2.5 py-1.5 text-xs font-semibold text-white transition disabled:opacity-50 ${liked ? 'bg-[#d66f0b]' : 'bg-[#f79021] hover:bg-[#df7d16]'}`}>
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} /> {likes}
        </button>
        <button type="button" onClick={() => {
          const openComment = () => setCommentOpen(true);
          if (!requireAuthentication(openComment)) return;
          setCommentOpen((open) => !open);
        }} disabled={!supabaseEnabled} className="inline-flex items-center gap-1.5 rounded-md border-0 bg-[#f79021] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#df7d16] disabled:opacity-50">
          <MessageCircle size={14} /> {comments.length}
        </button>
        <button type="button" onClick={() => void handleShare()} className="inline-flex items-center gap-1.5 rounded-md border-0 bg-[#f79021] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#df7d16]">
          <Share2 size={14} /> {shares}
        </button>
        {feedback && <span role="status" className="text-xs text-slate-500">{feedback}</span>}
      </div>

      {commentOpen && (
        <form onSubmit={(event) => void handleCommentSubmit(event)} className="mt-3 flex gap-2">
          <input value={commentText} onChange={(event) => setCommentText(event.target.value)} maxLength={1000} placeholder="Write a comment" className="min-w-0 flex-1 rounded-md border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-orange-400" />
          <button type="submit" className="rounded-md border-0 bg-[#f79021] px-3 py-2 text-xs font-semibold text-white hover:bg-[#df7d16]">Post</button>
        </form>
      )}
      {commentOpen && comments.slice(0, 2).map((comment) => <p key={comment.id} className="mt-2 line-clamp-2 text-xs text-slate-600">{comment.content}</p>)}
      {authPrompt}
    </div>
  );
}

export default function VideoShowcase() {
  const [videos, setVideos] = useState<VideoCard[]>([]);
  const [activeFilter, setActiveFilter] = useState<VideoFilter>('all');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(interval);
  }, []);

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

  const filters: { id: VideoFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'story', label: 'Stories' },
    { id: 'project', label: 'Projects' },
    { id: 'event', label: 'Events' },
    { id: 'news', label: 'News' },
  ];
  const filteredVideos = activeFilter === 'all' ? videos : videos.filter((video) => video.type === activeFilter);

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

        <div role="group" aria-label="Filter videos by content type" className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const count = filter.id === 'all' ? videos.length : videos.filter((video) => video.type === filter.id).length;
            return (
              <button key={filter.id} type="button" onClick={() => setActiveFilter(filter.id)} className={`shrink-0 rounded-full border-0 px-3 py-1.5 text-xs font-semibold transition ${activeFilter === filter.id ? 'bg-[#f79021] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {filter.label} <span className="ml-1 opacity-75">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
          {filteredVideos.map((video) => (
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
                {video.publishedAt && <time dateTime={video.publishedAt} className="mt-2 block text-[11px] text-slate-500">{formatRelativeTime(video.publishedAt, now)}</time>}
                <Link href={video.href} className="mt-3 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                  View story <ArrowRight size={14} className="ml-1" />
                </Link>
                <VideoCardActions video={video} />
              </div>
            </article>
          ))}
        </div>
        {!filteredVideos.length && <p className="py-8 text-center text-sm text-slate-500">No videos in this category yet.</p>}
      </div>
    </section>
  );
}