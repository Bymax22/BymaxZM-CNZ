"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Heart, MessageCircle, Search, Share2, Sparkles } from 'lucide-react';
import {
  fetchComments,
  fetchLikeCount,
  postComment,
  updateLikeCount,
} from '../../lib/supabaseContent';

type NewsEventItem = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  date?: string;
  href: string;
  itemType: 'News' | 'Event';
  comments: string[];
};

type RawCard = {
  id?: string | number;
  slug?: string | number;
  title?: string;
  name?: string;
  description?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  media?: { url?: string };
  image?: string;
  category?: string;
  cardType?: string;
  type?: string;
  publishedAt?: string;
  createdAt?: string;
  metadata?: { publishedAt?: string; date?: string };
  date?: string;
  eventDate?: string;
  comments?: string[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function truncateText(text: string, maxLength: number) {
  const normalized = String(text || '').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}…`;
}

function normalizeCardToItem(card: RawCard, index: number): NewsEventItem {
  const publishedAt = card.publishedAt || card.createdAt || card.metadata?.publishedAt || '';
  const dateValue = publishedAt || card.metadata?.date || card.date || card.eventDate || '';
  const slug = card.slug || card.id || `news-item-${index}`;
  const itemType = card.cardType === 'EVENT' || card.type === 'Event' ? 'Event' : 'News';
  const excerptSource = card.description || card.subtitle || card.body || '';
  const comments = Array.isArray(card.comments)
    ? card.comments.map(String)
    : ['Nice story.'];

  return {
    id: String(card.id ?? slug ?? index),
    title: card.title || card.name || 'Untitled story',
    excerpt: truncateText(excerptSource, 220),
    image: card.imageUrl || card.media?.url || card.image || '',
    category: card.category || card.cardType || 'News',
    date: dateValue,
    href: itemType === 'Event' ? `/events/${slug}` : `/news/${slug}`,
    itemType,
    comments,
  };
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'events'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCommentItem, setActiveCommentItem] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [shareMessages, setShareMessages] = useState<Record<string, string>>({});
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadItems() {
      try {
        const res = await fetch('/api/communications/cards?cardType=NEWS&cardType=EVENT&take=30');
        if (!res.ok) {
          throw new Error(`Failed to load cards: ${res.status}`);
        }

        const data = await res.json();
        const cards = Array.isArray(data) ? data : data.cards || data.contentCards || [];
        const parsedItems = cards.map(normalizeCardToItem);

        if (!mounted) return;

        setItems(parsedItems);

        const countData = await Promise.all(
          parsedItems.map(async (item: NewsEventItem) => {
            const contentType = item.itemType === 'Event' ? 'event' : 'news';
            const [likeCount, storedComments] = await Promise.all([
              fetchLikeCount(contentType, item.id),
              fetchComments(contentType, item.id),
            ]);
            return {
              id: item.id,
              likeCount,
              comments: storedComments.map((comment) => comment.content),
            };
          })
        );

        if (!mounted) return;

        setLikes(
          countData.reduce((acc: Record<string, number>, item) => {
            acc[item.id] = item.likeCount;
            return acc;
          }, {})
        );
        setComments(
          countData.reduce((acc: Record<string, string[]>, item) => {
            acc[item.id] = item.comments;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error('Unable to load /news cards:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void loadItems();
    return () => {
      mounted = false;
    };
  }, []);

  const allItems = useMemo(
    () => items,
    [items]
  );

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) => {
        const matchesTab =
          activeTab === 'all' ||
          (activeTab === 'news' && item.itemType === 'News') ||
          (activeTab === 'events' && item.itemType === 'Event');

        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query);

        return matchesTab && matchesSearch;
      }),
    [activeTab, searchTerm, allItems]
  );

  const handleToggleLike = async (itemId: string) => {
    const currentLiked = likedItems[itemId] ?? false;
    const nextLiked = !currentLiked;

    setLikedItems((prev) => ({ ...prev, [itemId]: nextLiked }));
    setLikes((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + (nextLiked ? 1 : -1),
    }));

    const item = items.find((entry) => entry.id === itemId);
    if (!item) return;

    const contentType = item.itemType === 'Event' ? 'event' : 'news';
    const nextCount = await updateLikeCount(contentType, itemId, nextLiked ? 1 : -1);
    setLikes((current) => ({ ...current, [itemId]: nextCount }));
  };

  const handleAddComment = async (itemId: string) => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    const item = items.find((entry) => entry.id === itemId);
    if (!item) return;

    const contentType = item.itemType === 'Event' ? 'event' : 'news';
    const savedComment = await postComment(contentType, itemId, trimmed);
    if (!savedComment) return;

    setComments((prev) => ({
      ...prev,
      [itemId]: [trimmed, ...(prev[itemId] ?? [])],
    }));
    setCommentText('');
  };

  const handleShare = async (itemId: string, href: string) => {
    const shareText = `${typeof window !== 'undefined' ? window.location.origin : ''}${href}`;

    try {
      await navigator.clipboard.writeText(shareText);
      setShareMessages((prev) => ({
        ...prev,
        [itemId]: 'Link copied!',
      }));
      window.setTimeout(() => {
        setShareMessages((prev) => ({ ...prev, [itemId]: '' }));
      }, 2200);
    } catch {
      setShareMessages((prev) => ({
        ...prev,
        [itemId]: 'Copy failed. Use browser share.',
      }));
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">News & Events</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Explore all stories, updates, and upcoming community events.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Browse the latest news, filter by type, and engage with posts using likes, comments, and share actions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Show All
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 md:p-6">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Search size={18} className="text-slate-400" />
                <label className="sr-only" htmlFor="news-search">
                  Search news and events
                </label>
                <input
                  id="news-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search news, events, or topics"
                  className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {['all', 'news', 'events'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab as 'all' | 'news' | 'events')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'news' ? 'News' : 'Events'}
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Showing</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredItems.length} items</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600">Current filter</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {activeTab === 'all'
                        ? 'All news and events'
                        : activeTab === 'news'
                        ? 'News only'
                        : 'Events only'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Quick tips</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Use the buttons below each card to like, comment, or share. The news feed updates immediately as you type.
              </p>

              <div className="mt-6 space-y-4 text-sm text-slate-700">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Comment inline</p>
                  <p className="mt-2 text-slate-600">Click the comment icon to open the form and leave your thoughts.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Share quickly</p>
                  <p className="mt-2 text-slate-600">Click the share icon to copy the story link to your clipboard.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200" />
                  )}
                  <div
                    className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                      item.itemType === 'Event' ? 'bg-emerald-600 text-white' : 'bg-orange-500 text-white'
                    }`}
                  >
                    {item.itemType}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-slate-500">
                    <span>{item.category}</span>
                    <span>{item.date ? formatDate(item.date) : 'Date not available'}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{item.excerpt}</p>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link href={item.href} className="text-sm font-semibold text-[#008000] transition hover:text-[#026730]">
                      {item.itemType === 'Event' ? 'View Details →' : 'Read Full Story →'}
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleLike(item.id)}
                        aria-label="Like"
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 transition ${
                          likedItems[item.id] ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Heart size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCommentItem(item.id);
                          setCommentText('');
                        }}
                        aria-label="Comment"
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                      >
                        <MessageCircle size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(item.id, item.href)}
                        aria-label="Share"
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>{likes[item.id] ?? 0} likes</span>
                    <span>{(comments[item.id] ?? []).length} comments</span>
                    {shareMessages[item.id] ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                        {shareMessages[item.id]}
                      </span>
                    ) : null}
                  </div>

                  {activeCommentItem === item.id ? (
                    <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                      <div className="text-sm font-semibold text-slate-900">Leave a comment</div>
                      <textarea
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                        placeholder="Write your note here..."
                        className="mt-4 h-24 w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600"
                      />
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveCommentItem(null)}
                          className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddComment(item.id)}
                          disabled={!commentText.trim()}
                          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
                        >
                          Post Comment
                        </button>
                      </div>

                      {((comments[item.id] ?? []).length > 0) ? (
                        <div className="mt-5 space-y-3">
                          {(comments[item.id] ?? []).slice(0, 3).map((comment, index) => (
                            <div key={index} className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                              {comment}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-[32px] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
              <h2 className="text-xl font-semibold text-slate-900">No results found</h2>
              <p className="mt-3">Try a different keyword or select another category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
