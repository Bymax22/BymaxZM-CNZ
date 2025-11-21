// app/admin/layout.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = session?.user?.role as string | undefined;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session && !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
      router.push('/portal/dashboard');
    }
  }, [status, session, router, userRole]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!session || !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}