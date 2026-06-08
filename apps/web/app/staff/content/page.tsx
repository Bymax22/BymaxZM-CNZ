"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContentForm, { ContentCardFormData } from '../../components/admin/ContentForm';

type Card = {
  id: string;
  title: string;
  cardType?: string;
  status?: string;
  publishedAt?: string;
  imageUrl?: string;
  description?: string;
  body?: string;
  slug?: string;
  subtitle?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  metadata?: any;
};

function normalizeCard(card: Card) {
  return {
    ...card,
    tags: card.tags || [],
    metadata: card.metadata || {},
  };
}

export default function StaffContentList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadCards = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/content?take=50');
      const data = await res.json();
      if (res.ok) {
        setCards(data.cards || data.contentCards || []);
      }
    } catch (error) {
      console.error('Failed to load staff content', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCards();
  }, []);

  useEffect(() => {
    const source = new EventSource('/api/staff/updates');
    source.onmessage = async (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload?.resource === 'content') {
          await loadCards();
          setMessage(`Realtime update: ${payload.action} ${payload.resource}`);
          window.setTimeout(() => setMessage(null), 4000);
        }
      } catch {
        // ignore malformed SSE events
      }
    };
    source.onerror = () => {
      source.close();
    };
    return () => {
      source.close();
    };
  }, []);

  const handleSubmit = async (payload: ContentCardFormData) => {
    setSaving(true);
    try {
      const method = payload.id ? 'PUT' : 'POST';
      const endpoint = payload.id ? `/api/staff/content/${encodeURIComponent(payload.id)}` : '/api/staff/content';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          publishedAt: payload.publishedAt || undefined,
          displayOrder: payload.displayOrder ?? 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || 'Failed to save content.' };
      }
      await loadCards();
      setShowModal(false);
      setSelectedCard(null);
      setMessage(payload.id ? 'Content card updated.' : 'Content card created.');
      setTimeout(() => setMessage(null), 4000);
      return { data };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to save content.' };
    } finally {
      setSaving(false);
    }
  };

  const openNew = () => {
    setSelectedCard(null);
    setShowModal(true);
  };

  const startEdit = async (card: Card) => {
    try {
      const res = await fetch(`/api/staff/content/${encodeURIComponent(card.id)}`);
      if (!res.ok) return;
      const detail = await res.json();
      setSelectedCard(normalizeCard(detail));
      setShowModal(true);
    } catch (error) {
      console.error('Failed to load content for edit', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Staff Content Management</h1>
            <p className="mt-2 text-sm text-slate-600">Create and update content cards using staff-level tools with backend proxy protection.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={openNew} className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              New Content
            </button>
          </div>
        </div>

        {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
            <div className="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-lg">
              <ContentForm
                heading={selectedCard ? 'Edit Content' : 'New Content'}
                submitText={selectedCard ? 'Update Content' : 'Create Content'}
                initialData={selectedCard ?? undefined}
                onSubmit={handleSubmit}
                onSuccess={() => {
                  /* handled by parent */
                }}
                onCancel={() => {
                  setSelectedCard(null);
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Content Cards</h2>
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="py-8 text-center text-slate-500">Loading content cards…</div>
            ) : cards.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No content cards available.</div>
            ) : (
              cards.map((card) => (
                <div key={card.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={card.title} className="h-16 w-24 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-slate-200 text-xs text-slate-500">No image</div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="text-sm text-slate-500">{card.cardType || 'Content'} • {card.status || 'Draft'} • {card.publishedAt ? new Date(card.publishedAt).toLocaleString() : 'No publish date'}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button onClick={() => startEdit(card)} className="rounded-2xl border border-emerald-600 px-4 py-2 text-sm text-emerald-600">Edit</button>
                    <Link href={`/stories/${card.id}`} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700">View</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
