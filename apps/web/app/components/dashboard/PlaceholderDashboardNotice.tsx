'use client';

import { useSession } from 'next-auth/react';

export default function PlaceholderDashboardNotice() {
  const { data: session } = useSession();
  const name = session?.user?.name || 'there';

  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 mb-8">
      <p className="text-sm font-semibold text-emerald-700">Hi {name},</p>
      <p className="mt-2 text-sm leading-6 text-emerald-900">
        We are still building the full dashboard experience in the background. What you see now is a placeholder view, and you will receive a notification as soon as the real portal is live.
      </p>
    </div>
  );
}
