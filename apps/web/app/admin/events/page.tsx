'use client';

export default function AdminEventsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Events</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Event and Webinar Management</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Manage upcoming events, webinar invitations, online meetings, and event registrations from the admin portal.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-gray-500">This page connects to backend event APIs for online meetings and webinar workflows.</p>
        </div>
      </div>
    </div>
  );
}
