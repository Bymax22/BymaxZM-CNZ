'use client';

import { useEffect, useMemo, useState } from 'react';
import CloudinaryUploader from './CloudinaryUploader';

export interface ContentCardFormData {
  id?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  cardType: string;
  category: string;
  tags: string[];
  status: string;
  featured: boolean;
  displayOrder: number;
  metadata: {
    category?: string;
    location?: string;
    partnerLogos?: string[];
    galleryUrls?: string[];
  };
  relatedId?: string;
  publishedAt?: string;
}

interface ContentFormProps {
  initialData?: Partial<ContentCardFormData>;
  heading: string;
  submitText: string;
  onSubmit: (data: ContentCardFormData) => Promise<{ data?: any; error?: string }>;
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
}

const defaultForm: ContentCardFormData = {
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  imageAlt: '',
  link: '',
  cardType: 'STORY',
  category: '',
  tags: [],
  status: 'DRAFT',
  featured: false,
  displayOrder: 0,
  metadata: {
    location: '',
    partnerLogos: [],
    galleryUrls: [],
  },
  relatedId: '',
  publishedAt: '',
};

function normalizeList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ContentForm({
  initialData,
  heading,
  submitText,
  onSubmit,
  onSuccess,
  onCancel,
}: ContentFormProps) {
  const [form, setForm] = useState<ContentCardFormData>({ ...defaultForm });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        tags: initialData.tags || defaultForm.tags,
        metadata: {
          ...defaultForm.metadata,
          ...initialData.metadata,
          location: initialData.metadata?.location || defaultForm.metadata.location,
          partnerLogos: initialData.metadata?.partnerLogos || defaultForm.metadata.partnerLogos,
          galleryUrls: initialData.metadata?.galleryUrls || defaultForm.metadata.galleryUrls,
        },
      });
    } else {
      setForm({ ...defaultForm });
    }
  }, [initialData]);

  const tagsInput = useMemo(() => form.tags.join(', '), [form.tags]);
  const partnerLogosInput = useMemo(() => form.metadata.partnerLogos?.join(', ') || '', [form.metadata.partnerLogos]);
  const galleryUrlsInput = useMemo(() => form.metadata.galleryUrls?.join(', ') || '', [form.metadata.galleryUrls]);
  const locationInput = useMemo(() => form.metadata.location || '', [form.metadata.location]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload: ContentCardFormData = {
      ...form,
      tags: normalizeList(tagsInput),
      metadata: {
        ...form.metadata,
          location: locationInput,

    try {
      const result = await onSubmit(payload);
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage('Saved successfully.');
        onSuccess?.(result.data);
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to save content card.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Content</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{heading}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="content-card-form"
            disabled={saving}
            className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : submitText}
          </button>
        </div>
      </div>
      {message && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          {message}
        </div>
      )}
      <form id="content-card-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Title
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="Write a title"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Slug
            <input
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="story-slug"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Subtitle
            <input
              value={form.subtitle}
              onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Category
            <input
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700">
          Description
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            rows={5}
            required
          />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Card Type
            <select
              value={form.cardType}
              onChange={(event) => setForm((prev) => ({ ...prev, cardType: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              required
            >
              <option value="STORY">Story</option>
              <option value="NEWS">News</option>
              <option value="PROJECT">Project</option>
              <option value="EVENT">Event</option>
              <option value="DONATION">Donation</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Status
            <select
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Image URL
            <input
              value={form.imageUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="https://..."
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Image Alt Text
            <input
              value={form.imageAlt}
              onChange={(event) => setForm((prev) => ({ ...prev, imageAlt: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Link
            <input
              value={form.link}
              onChange={(event) => setForm((prev) => ({ ...prev, link: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="Optional destination URL"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Related ID
            <input
              value={form.relatedId}
              onChange={(event) => setForm((prev) => ({ ...prev, relatedId: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="Optional related entity ID"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Tags
            <input
              value={tagsInput}
              onChange={(event) => setForm((prev) => ({ ...prev, tags: normalizeList(event.target.value) }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="comma separated tags"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Display Order
            <input
              type="number"
              value={form.displayOrder}
              onChange={(event) => setForm((prev) => ({ ...prev, displayOrder: Number(event.target.value) }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Location / Address
            <input
              value={locationInput}
              onChange={(event) => setForm((prev) => ({ ...prev, metadata: { ...prev.metadata, location: event.target.value } }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="e.g., Lusaka, Zambia or specific address"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Partner Logos
            <input
              value={partnerLogosInput}
              onChange={(event) => setForm((prev) => ({ ...prev, metadata: { ...prev.metadata, partnerLogos: normalizeList(event.target.value) } }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              placeholder="comma separated logo URLs"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700">
          Gallery URLs
          <input
            value={galleryUrlsInput}
            onChange={(event) => setForm((prev) => ({ ...prev, metadata: { ...prev.metadata, galleryUrls: normalizeList(event.target.value) } }))}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            placeholder="comma separated image URLs"
          />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Published At
            <input
              type="datetime-local"
              value={form.publishedAt || ''}
              onChange={(event) => setForm((prev) => ({ ...prev, publishedAt: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <div className="space-y-2 text-sm text-slate-700">
            <p>Upload featured image</p>
            <CloudinaryUploader
              imageUrl={form.imageUrl}
              onUpload={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
