'use client';

import { useIsAuthenticated } from '@/hooks/useProtectedRoute';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback = null }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return fallback;
  }

  if (!isAuthenticated) {
    return fallback;
  }

  return <>{children}</>;
}

export function GuestGuard({ children, fallback = null }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return fallback;
  }

  if (isAuthenticated) {
    return fallback;
  }

  return <>{children}</>;
}
