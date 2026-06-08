// app/portal/user/layout.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserPortalSidebar from '../../components/portal/UserPortalSidebar';

export default function UserPortalLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const role = (session?.user as any)?.role;
      if (role !== 'USER') {
        router.push('/');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <UserPortalSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
