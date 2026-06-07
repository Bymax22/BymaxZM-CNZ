'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedNotification = notifications.find((item) => item.id === selectedId) || notifications[0] || null;

  useEffect(() => {
    async function loadNotifications() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/communications/notifications?take=50');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || 'Unable to load notifications');
        }
        setNotifications(data.notifications || []);
        if (Array.isArray(data.notifications) && data.notifications.length > 0) {
          setSelectedId(data.notifications[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load notifications');
      } finally {
        setIsLoading(false);
      }
    }

    loadNotifications();
  }, []);

  const handleSelectNotification = async (notification: NotificationItem) => {
    setSelectedId(notification.id);

    if (!notification.isRead) {
      try {
        const res = await fetch(`/api/communications/notifications/${notification.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          setNotifications((prev) => prev.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item)));
        }
      } catch (error) {
        console.error('Failed to mark notification read', error);
      }
    }
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Notifications</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Your notifications</h1>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Review your latest alerts, updates, reminders, and announcements in one place.
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-slate-800 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Unread</p>
              <p className="text-3xl font-semibold">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent updates</h2>
                <p className="text-sm text-slate-500">Tap a notification to open details.</p>
              </div>
              <Link href="/" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                Home
              </Link>
            </div>
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading notifications…</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : notifications.length === 0 ? (
              <p className="text-sm text-slate-500">No notifications available yet.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleSelectNotification(notification)}
                    className={`w-full rounded-3xl border p-4 text-left transition-all duration-200 ${notification.id === selectedId ? 'border-emerald-300 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{notification.title}</p>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{notification.type.replace(/_/g, ' ')}</p>
                      </div>
                      {!notification.isRead && <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                    </div>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{notification.content}</p>
                    <p className="mt-3 text-xs text-slate-400">{new Date(notification.createdAt).toLocaleString()}</p>
                  </button>
                ))}
              </div>
            )}
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {selectedNotification ? (
              <>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Notification details</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{selectedNotification.title}</h2>
                  </div>
                  <p className="text-sm text-slate-500">{new Date(selectedNotification.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Type</p>
                  <p className="mt-1 text-base font-medium text-slate-900">{selectedNotification.type.replace(/_/g, ' ')}</p>
                </div>
                <div className="mt-6 space-y-4 text-slate-700">
                  <p>{selectedNotification.content}</p>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                Select a notification from the list to see the full details.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
