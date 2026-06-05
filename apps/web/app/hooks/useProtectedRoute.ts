'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'VOLUNTEER' | 'DONOR' | 'USER';

interface UseProtectedRouteOptions {
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { requiredRole, redirectTo = '/auth/login' } = options;
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.push(redirectTo);
      return;
    }

    if (requiredRole) {
      const userRole = session?.user?.role;
      const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

      if (!userRole || !requiredRoles.includes(userRole)) {
        router.push('/');
        return;
      }
    }
  }, [status, session, requiredRole, redirectTo, router]);

  return {
    session,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    userRole: session?.user?.role,
  };
}

export function useIsAuthenticated() {
  const { data: session, status } = useSession();
  return {
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    session,
  };
}

export function useUserRole() {
  const { data: session } = useSession();
  return session?.user?.role as UserRole | undefined;
}

export function useHasRole(roles: UserRole | UserRole[]) {
  const userRole = useUserRole();
  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  return userRole ? requiredRoles.includes(userRole) : false;
}
