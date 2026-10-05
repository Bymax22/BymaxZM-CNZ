'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthPromptModal from '../components/AuthPromptModal';

export function useAuthPrompt() {
  const { status, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pendingAction = useRef<(() => void | Promise<void>) | null>(null);

  function requireAuthentication(action?: () => void | Promise<void>) {
    if (status === 'authenticated') return true;
    pendingAction.current = action || null;
    setIsOpen(true);
    return false;
  }

  async function finishAuthentication() {
    await update();
    setIsOpen(false);
    const action = pendingAction.current;
    pendingAction.current = null;
    await action?.();
  }

  return {
    requireAuthentication,
    authPrompt: (
      <AuthPromptModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryLabel="Create free account"
        onAuthenticated={finishAuthentication}
      />
    ),
  };
}