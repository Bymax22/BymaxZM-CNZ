'use client';

import { useEffect, useState } from 'react';

interface SubscriberItem {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubscribers() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/communications/newsletter');
        const data = await res.json();
        if (res.ok) {
          setSubscribers(data.subscribers || []);
        } else {
          setError(data.error || 'Failed to fetch subscribers.');
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError('Failed to fetch subscribers.');
      } finally {
        setIsLoading(false);
      }
    }

    loadSubscribers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Newsletter</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Newsletter Subscribers</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Review newsletter subscribers, manage active status, and launch targeted campaigns from the admin console.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Subscriber list</h2>
              <p className="mt-2 text-sm text-slate-500">View all active newsletter recipients and double-check the list before sending.</p>
            </div>
            <a
              href="/admin/communications/newsletter/send"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Create Campaign
            </a>
          </div>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading subscribers…</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : subscribers.length === 0 ? (
              <p className="text-sm text-slate-500">No newsletter subscribers yet.</p>
            ) : (
              <div className="space-y-4">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <p className="font-semibold text-slate-900">{subscriber.email}</p>
                        {subscriber.name && <p className="text-sm text-slate-500">{subscriber.name}</p>}
                      </div>
                      <span className="text-xs text-slate-500">{subscriber.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">Subscribed: {new Date(subscriber.subscribedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
