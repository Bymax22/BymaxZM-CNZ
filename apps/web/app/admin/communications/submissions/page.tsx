'use client';

export default function AdminSubmissionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Submissions</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Staff Submissions</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Review staff requests, project submissions, and internal reports. Assign items, update priorities, and capture approval notes in the database.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-gray-500">Staff submissions are now recorded in the communications backend and available for workflow tracking.</p>
        </div>
      </div>
    </div>
  );
}
