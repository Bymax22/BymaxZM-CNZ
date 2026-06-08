import Link from 'next/link';
import React from 'react';

export default function StaffPortalHome() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900">Staff Portal</h1>
        <p className="mt-2 text-sm text-slate-600">A scoped workspace for staff actions, review workflows, and content coordination.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/staff/dashboard" className="block rounded-xl bg-white p-6 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <p className="mt-2 text-sm text-slate-500">See review queues, assigned work, and upcoming events.</p>
          </Link>

          <Link href="/staff/content" className="block rounded-xl bg-white p-6 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Content</h3>
            <p className="mt-2 text-sm text-slate-500">Create and edit approved content cards in a staff-safe workflow.</p>
          </Link>

          <Link href="/staff/projects" className="block rounded-xl bg-white p-6 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Projects</h3>
            <p className="mt-2 text-sm text-slate-500">Update project summaries and status without full admin controls.</p>
          </Link>

          <Link href="/staff/events" className="block rounded-xl bg-white p-6 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Events</h3>
            <p className="mt-2 text-sm text-slate-500">Manage event details and coordination tasks in a scoped view.</p>
          </Link>

          <Link href="/staff/users" className="block rounded-xl bg-white p-6 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Team</h3>
            <p className="mt-2 text-sm text-slate-500">View your team directory. User management remains admin-only.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
