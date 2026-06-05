'use client';

import { useState } from 'react';

export default function AdminNewsletterSendPage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sendTo, setSendTo] = useState('ALL');
  const [testEmail, setTestEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/communications/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          body,
          sendTo,
          testEmail: testEmail || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Newsletter campaign submitted successfully.');
        setSubject('');
        setBody('');
        setTestEmail('');
      } else {
        setMessage(data.error || 'Failed to send newsletter.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to send newsletter.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Newsletter Campaign</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Send Newsletter</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Launch newsletter campaigns to active subscribers, or send a test email before publishing.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">Subject</label>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="Campaign subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Body</label>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={8}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                placeholder="Newsletter body content"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Send to</label>
                <select
                  value={sendTo}
                  onChange={(event) => setSendTo(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="ALL">All active subscribers</option>
                  <option value="TEST">Test email only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Test email</label>
                <input
                  value={testEmail}
                  onChange={(event) => setTestEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                  placeholder="Optional test recipient email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Newsletter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
