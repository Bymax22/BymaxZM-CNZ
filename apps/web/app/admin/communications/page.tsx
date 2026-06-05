'use client';

import Link from 'next/link';

const cards = [
  { title: 'Newsletter Subscribers', href: '/admin/communications/newsletter' },
  { title: 'Broadcast Newsletters', href: '/admin/communications/newsletter/send' },
  { title: 'Notifications', href: '/admin/communications/notifications' },
  { title: 'Notification Groups', href: '/admin/communications/groups' },
  { title: 'Submissions', href: '/admin/communications/submissions' },
];

export default function CommunicationsAdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Communications</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Communications Center</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Manage newsletter subscriptions, internal notifications, notification groups, and staff submissions from one location.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-3 text-slate-600">Open the communications workflow for {card.title.toLowerCase()}.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
