'use client';

import { useEffect, useState } from 'react';
import CloudinaryUploader from '../../../components/admin/CloudinaryUploader';

interface ContentCard {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  body?: string;
  status?: string;
  imageUrl?: string;
  publishedAt?: string | null;
  createdAt: string;
  cardType?: string;
  subtitle?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  metadata?: any;
}

function parseMediaUrls(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

export default function AdminContentPage() {
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', body: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [cardType, setCardType] = useState<string>('STORY');
  const [subtitle, setSubtitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [imageAlt, setImageAlt] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [category, setCategory] = useState<string>('general');
  const [status, setStatus] = useState<string>('DRAFT');
  const [featured, setFeatured] = useState<boolean>(false);
  const [publishedAtInput, setPublishedAtInput] = useState<string>('');
  const [partnerLogosInput, setPartnerLogosInput] = useState<string>('');
  const [galleryUrlsInput, setGalleryUrlsInput] = useState<string>('');

  useEffect(() => {
    async function loadCards() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (res.ok) {
          setCards(data.cards || data.contentCards || []);
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

  function toDateTimeLocalString(iso?: string | null) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    // format to yyyy-MM-ddTHH:mm (datetime-local)
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  }

  function formatDisplayDate(iso?: string | null) {
    if (!iso) return 'Date not available';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'Date not available';
    return d.toLocaleString();
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const providedPublishedAt = publishedAtInput ? new Date(publishedAtInput).toISOString() : undefined;
      const finalPublishedAt = providedPublishedAt || (status === 'PUBLISHED' ? new Date().toISOString() : undefined);
      const partnerLogos = parseMediaUrls(partnerLogosInput);
      const galleryUrls = parseMediaUrls(galleryUrlsInput);
      const metadata: any = {};

      if (location) metadata.location = location;
      if (partnerLogos.length) metadata.partnerLogos = partnerLogos;
      if (galleryUrls.length) {
        metadata.gallery = galleryUrls.map((url) => ({ url, type: isVideoUrl(url) ? 'video' : 'image' }));
      }

      const payload: any = {
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
        status: status || 'DRAFT',
        featured: Boolean(featured),
        displayOrder: 0,
        metadata,
        relatedId: undefined,
        publishedAt: finalPublishedAt,
      };

      const method = editingId ? 'PUT' : 'POST';
      if (editingId) payload.id = editingId;

      const response = await fetch('/api/admin/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const savedCard = data?.contentCard || data?.card || data?.cards?.[0] || data;
      if (response.ok && savedCard?.id) {
        if (editingId) {
          setCards((prev) => prev.map((c) => (c.id === editingId ? { ...c, ...savedCard } : c)));
          setMessage('Content card updated successfully.');
        } else {
          setCards((prev) => [savedCard, ...prev]);
          setMessage('Content card created successfully.');
        }

        setEditingId(null);
        setForm({ title: '', body: '' });
        setImageUrl('');
        setSlug('');
        setSubtitle('');
        setLocation('');
        setImageAlt('');
        setTags('');
        setCategory('general');
        setCardType('STORY');
        setStatus('DRAFT');
        setFeatured(false);
        setPublishedAtInput('');
        setPartnerLogosInput('');
        setGalleryUrlsInput('');
      } else {
        setMessage(data.error || 'Failed to save content card.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to save content card.');
    } finally {
      setSaving(false);
    }
  };

  function startEdit(card: ContentCard) {
    const existingMetadata = card.metadata || {};
    setEditingId(card.id);
    setForm({ title: card.title || '', body: card.description || card.body || '' });
    setImageUrl(card.imageUrl || '');
    setSlug(card.slug || '');
    setSubtitle(card.subtitle || '');
    setLocation(existingMetadata.location || '');
    setImageAlt(card.imageAlt || '');
    setTags((card.tags || []).join(','));
    setCategory(card.category || 'general');
    setCardType(card.cardType || 'STORY');
    setStatus(card.status || 'DRAFT');
    setFeatured(Boolean(card.featured));
    setPublishedAtInput(toDateTimeLocalString(card.publishedAt || card.createdAt));
    setPartnerLogosInput((existingMetadata.partnerLogos || []).join('\n'));
    setGalleryUrlsInput((existingMetadata.gallery || []).map((item: any) => item.url).join('\n'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
              <p className="mt-2 text-sm text-slate-500">Build a headline card and publish it right away. Use the published date/time field to backdate if needed.</p>
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
              <label className="block text-sm font-medium text-slate-700">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
                placeholder="Location"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Card Type</label>
                <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                  <option value="STORY">Story</option>
                  <option value="NEWS">News</option>
                  <option value="EVENT">Event</option>
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

            <div>
              <label className="block text-sm font-medium text-slate-700">Partner logos (one URL per line)</label>
              <textarea
                value={partnerLogosInput}
                onChange={(e) => setPartnerLogosInput(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
                placeholder="https://.../logo1.png\nhttps://.../logo2.png"
              />
              <p className="mt-2 text-xs text-slate-500">Optional logo URLs for partners or sponsors used on project/story cards.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Gallery media URLs (one per line)</label>
              <textarea
                value={galleryUrlsInput}
                onChange={(e) => setGalleryUrlsInput(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
                placeholder="https://.../image1.jpg\nhttps://.../video1.mp4"
              />
              <p className="mt-2 text-xs text-slate-500">Optional gallery media for the card detail page. Videos are detected by extension.</p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={status === 'PUBLISHED'}
                  onChange={(event) => setStatus(event.target.checked ? 'PUBLISHED' : 'DRAFT')}
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

            <div>
              <label className="block text-sm font-medium text-slate-700">Published date & time (optional)</label>
              <input type="datetime-local" value={publishedAtInput} onChange={(e) => setPublishedAtInput(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              <p className="mt-2 text-xs text-slate-500">Leave blank to use current date/time when publishing, or set to backdate.</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update Content Card' : 'Save Content Card'}
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
                    <div className="flex items-center gap-4">
                      {card.imageUrl ? (
                        <img src={card.imageUrl} alt={card.title} className="h-16 w-24 object-cover rounded-md" />
                      ) : (
                        <div className="h-16 w-24 rounded-md bg-slate-200 flex items-center justify-center">No image</div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                        <p className="text-sm text-slate-500">{(card.status === 'PUBLISHED') ? 'Published' : 'Draft'} • {formatDisplayDate(card.publishedAt || card.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(card)} className="text-sm text-emerald-600">Edit</button>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">{card.description || card.body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
