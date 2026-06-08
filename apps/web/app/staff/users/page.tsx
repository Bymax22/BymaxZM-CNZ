"use client";

import { useEffect, useState } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function StaffUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/users?limit=50');
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        setMessage(data.error || 'Failed to load users');
      }
    } catch (error) {
      console.error('Failed to load users', error);
      setMessage('Unable to load user directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Staff Directory</h1>
            <p className="mt-2 text-sm text-slate-600">This directory is view-only. User management is handled in admin tools.</p>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-500">Staff can view team members and contact information here.</p>
          </div>
        </div>

        {message && <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{message}</div>}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Team Members</h2>
            <span className="text-sm text-slate-500">{loading ? 'Loading…' : `${users.length} members`}</span>
          </div>
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="py-8 text-center text-slate-500">Loading staff directory…</div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No users found.</div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user.role}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
