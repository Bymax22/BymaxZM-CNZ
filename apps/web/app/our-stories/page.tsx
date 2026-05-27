'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { StoryTopic } from '../components/sections/storyData';
import { storyCategories, storyThemes, storyTopics } from '../components/sections/storyData';
import { fetchComments, fetchLikeCount, updateLikeCount } from '../../lib/supabaseContent';

function StoryCard({ story, index }: { story: StoryTopic; index: number }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(12 + index * 4);
  const [comments, setComments] = useState(4 + index * 2);
  const [shares, setShares] = useState(8 + index * 3);

  useEffect(() => {
    let isMounted = true;

    async function loadStoryStats() {
      const [likeCount, storedComments] = await Promise.all([
        fetchLikeCount('story', story.id),
        fetchComments('story', story.id),
      ]);

      if (!isMounted) return;
      setLikes(likeCount);
      setComments(storedComments.length);
    }

    void loadStoryStats();
    return () => {
      isMounted = false;
    };
  }, [story.id]);

  const toggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((value) => Math.max(0, value + (nextLiked ? 1 : -1)));

    const updatedCount = await updateLikeCount('story', story.id, nextLiked ? 1 : -1);
    setLikes(updatedCount);
  };

  const handleShare = () => setShares((value) => value + 1);

  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--primary-green)]">
          <span>{story.category}</span>
          <span className="text-slate-400">•</span>
          <span>{story.theme}</span>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-900">{story.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{story.summary}</p>
        <div className="mt-6 rounded-3xl border border-[var(--primary-green)] bg-[var(--primary-green)]/5 px-5 py-3 text-sm font-semibold text-[var(--primary-green)]">
          {story.highlight}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <button
            type="button"
            onClick={toggleLike}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 transition ${
              liked ? 'border-[#029346] bg-[#029346] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-[#029346] hover:text-[#029346]'
            }`}
          >
            ❤ {likes}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-[#029346] hover:text-[#029346]"
          >
            💬 {comments}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-[#029346] hover:text-[#029346]"
          >
            ↗ {shares}
          </button>
        </div>

        <Link
          href={`/our-stories/${story.id}`}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--primary-green)] bg-[var(--primary-green)]/10 px-5 py-3 text-sm font-semibold text-[var(--primary-green)] transition hover:bg-[var(--primary-green)]/15"
        >
          See full story
        </Link>
      </div>
    </article>
  );
}

export default function OurStoriesPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof storyCategories)[number]>('All');
  const [activeTheme, setActiveTheme] = useState<(typeof storyThemes)[number]>('All');

  const filteredStories = useMemo(
    () =>
      storyTopics.filter(
        (story) =>
          (activeCategory === 'All' || story.category === activeCategory) &&
          (activeTheme === 'All' || story.theme === activeTheme),
      ),
    [activeCategory, activeTheme],
  );

  return (
    <main className="min-h-screen bg-[var(--gray-50)]">
      <section className="py-20 bg-[var(--primary-green)] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
            Our Stories
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Real people, real action, real change</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-white/90">
            Discover the stories behind our work: youth climate champions, community conservation leaders, and partners building a stronger, greener Zambia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary-green)] transition"
            >
              Join a story
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-slate-900">Browse by scope</div>
            <div className="flex flex-wrap gap-3">
              {storyCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    category === activeCategory
                      ? 'border-[var(--primary-green)] bg-[var(--primary-green)] text-white'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-slate-900">Filter by theme</div>
            <div className="flex flex-wrap gap-3">
              {storyThemes.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setActiveTheme(theme)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    theme === activeTheme
                      ? 'border-[var(--primary-green)] bg-[var(--primary-green)] text-white'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredStories.length}</span> stories for{' '}
            <span className="font-semibold text-slate-900">{activeCategory}</span> • <span className="font-semibold text-slate-900">{activeTheme}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setActiveTheme('All');
            }}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Reset filters
          </button>
        </div>

        {filteredStories.length === 0 ? (
          <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-10 text-center text-slate-600">
            No stories match this selection. Try another scope or theme.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900">More than progress, it’s a movement</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Each story is a step toward a Zambia where nature and people thrive together. Share your experience, support a community, and help us turn these stories into every day reality.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link href="/auth/login" className="rounded-3xl border border-emerald-900/10 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100">
              Sign in to contribute
            </Link>
            <Link href="/auth/register" className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Create an account
            </Link>
            <Link href="/get-involved/donate" className="rounded-3xl bg-emerald-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Support our work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
