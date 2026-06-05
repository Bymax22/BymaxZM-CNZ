'use client';

export default function AdminNotificationGroupsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Notification Groups</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Notification Groups</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Manage named user groups for broadcast notifications, email digests, and internal communications to staff, members, donors, or custom segments.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-gray-500">Groups let you target notifications to specific audiences without manual recipient selection each time.</p>
        </div>
      </div>
    </div>
  );
}
