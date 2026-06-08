'use client';

import { useEffect, useState } from 'react';
import ContentForm, { ContentCardFormData } from '../../../components/admin/ContentForm';

interface ContentCard {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  body?: string;
  status?: string;
  imageUrl?: string;
  publishedAt?: string;
  createdAt: string;
  cardType?: string;
  subtitle?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  metadata?: any;
}

function normalizeCard(card: ContentCard) {
  return {
    ...card,
    tags: card.tags || [],
    metadata: card.metadata || {},
    publishedAt: card.publishedAt ?? undefined,
  };
}

export default function AdminContentPage() {
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<ContentCard | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadCards = async () => {
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
  };

  useEffect(() => {
    void loadCards();
  }, []);

  const handleSubmit = async (payload: ContentCardFormData) => {
    setSaving(true);
    setMessage(null);

    try {
      const method = payload.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          publishedAt: payload.publishedAt || undefined,
          displayOrder: payload.displayOrder ?? 0,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return { error: data.error || 'Failed to save content card.' };
      }

      const savedCard = data.card || data.contentCard || data;
      if (!savedCard?.id) {
        return { error: 'Content card did not return an ID.' };
      }

      setCards((prev) => {
        if (payload.id) {
          return prev.map((card) => (card.id === payload.id ? { ...card, ...savedCard } : card));
        }
        return [savedCard, ...prev];
      });
      setSelectedCard(null);
      setMessage(payload.id ? 'Content card updated successfully.' : 'Content card created successfully.');
      return { data: savedCard };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to save content card.' };
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (card: ContentCard) => {
    setSelectedCard(normalizeCard(card));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Content</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Stories / News Cards</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">Create story cards, news entries, and publish content for the homepage cards and editorial sections.</p>
        </div>

        <ContentForm
          heading={selectedCard ? 'Edit Content Card' : 'New Content Card'}
          submitText={selectedCard ? 'Update Content Card' : 'Save Content Card'}
          initialData={selectedCard ?? undefined}
          onSubmit={handleSubmit}
          onSuccess={() => {
            /* no-op, list already updates */
          }}
          onCancel={() => setSelectedCard(null)}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Recent Content</h2>
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
            >
              Clear form
            </button>
          </div>
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
                        <p className="text-sm text-slate-500">{card.status === 'PUBLISHED' ? 'Published' : 'Draft'} • {new Date(card.publishedAt || card.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <button onClick={() => startEdit(card)} className="rounded-2xl border border-emerald-600 px-4 py-2 text-sm text-emerald-600">
                      Edit
                    </button>
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
