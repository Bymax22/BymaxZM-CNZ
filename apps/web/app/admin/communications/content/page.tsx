'use client';

import { useEffect, useState } from 'react';
import CloudinaryUploader from '../../../components/admin/CloudinaryUploader';

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
  const [imageUrl, setImageUrl] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [cardType, setCardType] = useState<string>('STORY');
  const [subtitle, setSubtitle] = useState<string>('');
  const [imageAlt, setImageAlt] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [category, setCategory] = useState<string>('general');
  const [status, setStatus] = useState<string>('DRAFT');
  const [featured, setFeatured] = useState<boolean>(false);

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
      const payload = {
        title: form.title,
        slug: slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        subtitle,
        description: form.body,
        imageUrl: imageUrl || undefined,
        imageAlt,
        link: undefined,
        cardType,
        category,
        tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        status,
        featured,
        displayOrder: 0,
        metadata: {},
        relatedId: undefined,
        publishedAt: status === 'PUBLISHED' ? new Date().toISOString() : undefined,
      };

      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setCards((prev) => [data.contentCard || data.contentCards?.[0] || payload, ...prev]);
        setMessage('Content card created successfully.');
        setForm({ title: '', body: '', published: false });
        setImageUrl('');
        setSlug('');
        setSubtitle('');
        setImageAlt('');
        setTags('');
        setCategory('general');
+        setCardType('STORY');
+        setStatus('DRAFT');
+        setFeatured(false);
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
              <label className="block text-sm font-medium text-slate-700">Upload media</label>
              <div className="mt-2">
                <CloudinaryUploader onUpload={(u) => setImageUrl(u)} />
              </div>
              <p className="mt-2 text-xs text-slate-500">After uploading, paste the secure URL into the Image URL field below.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Image URL</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="https://res.cloudinary.com/.../image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-slate-700">Slug</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" placeholder="my-story-slug" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Subtitle</label>
              <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Card Type</label>
                <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                  <option value="STORY">Story</option>
                  <option value="NEWS">News</option>
                  <option value="PROJECT">Project</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Image alt text</label>
                <input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input value={tags} onChange={(e) => setTags(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>
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

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                Featured
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded border-slate-300 text-sm">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
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
