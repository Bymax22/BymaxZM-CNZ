'use client';

import { useEffect, useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  userId?: string;
}

const notificationTypes = [
  'SYSTEM',
  'PROJECT_UPDATE',
  'EVENT_REMINDER',
  'DONATION_RECEIPT',
  'MEMBERSHIP_UPDATE',
  'CLUB_ANNOUNCEMENT',
  'SECURITY_ALERT',
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', type: 'SYSTEM', userId: '' });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotifications() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/communications/notifications');
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications || []);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotifications();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/communications/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          type: form.type,
          userId: form.userId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications((prev) => [data.notification, ...prev]);
        setMessage('Notification created successfully.');
        setForm({ title: '', content: '', type: 'SYSTEM', userId: '' });
      } else {
        setMessage(data.error || 'Failed to create notification.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to create notification.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Notifications</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Create and review notifications sent to specific users or notification groups, with support for event reminders, system alerts, and membership updates.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                {message}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                  placeholder="Notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Type</label>
                <select
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                >
                  {notificationTypes.map((option) => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Content</label>
              <textarea
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="Write the notification body"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">User ID</label>
              <input
                value={form.userId}
                onChange={(event) => setForm({ ...form, userId: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="Target user ID (optional)"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? 'Sending...' : 'Create Notification'}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent Notifications</h2>
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading notifications…</p>
            ) : notifications.length === 0 ? (
              <p className="text-sm text-slate-500">No notifications have been created yet.</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                      <p className="text-sm text-slate-500">{notification.type.replace('_', ' ')}</p>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-3 text-slate-600">{notification.content}</p>
                  {notification.userId && <p className="mt-2 text-xs text-slate-500">User ID: {notification.userId}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
