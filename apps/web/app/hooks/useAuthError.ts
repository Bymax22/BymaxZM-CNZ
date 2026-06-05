'use client';

import { useState, useCallback } from 'react';
import { AuthErrorType } from '../components/AuthErrorModal';

export interface AuthError {
  type: AuthErrorType;
  message: string;
  title?: string;
}

export function useAuthError() {
  const [error, setError] = useState<AuthError | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showError = useCallback((message: string, title?: string) => {
    setError({
      type: 'error',
      message,
      title,
    });
    setIsOpen(true);
  }, []);

  const showSuccess = useCallback((message: string, title?: string) => {
    setError({
      type: 'success',
      message,
      title,
    });
    setIsOpen(true);
  }, []);

  const showInfo = useCallback((message: string, title?: string) => {
    setError({
      type: 'info',
      message,
      title,
    });
    setIsOpen(true);
  }, []);

  const showWarning = useCallback((message: string, title?: string) => {
    setError({
      type: 'warning',
      message,
      title,
    });
    setIsOpen(true);
  }, []);

  const clearError = useCallback(() => {
    setIsOpen(false);
    setError(null);
  }, []);

  return {
    error,
    isOpen,
    showError,
    showSuccess,
    showInfo,
    showWarning,
    clearError,
  };
}
