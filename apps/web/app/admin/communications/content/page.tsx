'use client';

import { useEffect, useState } from 'react';

interface ContentCard {
  id: string;
  title: string;
  body: string;
  published: boolean;
  createdAt: string;
}

export default function AdminContentPage() {
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', published: false });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCards() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (res.ok) {
          setCards(data.contentCards || []);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCards();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setCards((prev) => [data.contentCard, ...prev]);
        setMessage('Content card created successfully.');
        setForm({ title: '', body: '', published: false });
      } else {
        setMessage(data.error || 'Failed to create content card.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to create content card.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Content</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Stories / News Cards</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">Create story cards, news entries, and publish content for the homepage cards and editorial sections.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">New Content Card</h2>
              <p className="mt-2 text-sm text-slate-500">Build a headline card and publish it right away.</p>
            </div>
          </div>

          {message && (
            <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="Content title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Body</label>
              <textarea
                value={form.body}
                onChange={(event) => setForm({ ...form, body: event.target.value })}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="Short description or body text"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => setForm({ ...form, published: event.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                Publish immediately
              </label>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Save Content Card'}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent Content</h2>
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading content cards...</p>
            ) : cards.length === 0 ? (
              <p className="text-sm text-slate-500">No content cards created yet.</p>
            ) : (
              cards.map((card) => (
                <div key={card.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="text-sm text-slate-500">{card.published ? 'Published' : 'Draft'} • {new Date(card.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">{card.body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
