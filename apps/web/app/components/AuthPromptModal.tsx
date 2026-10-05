'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { FaInfoCircle, FaTimes, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  onAuthenticated?: () => void | Promise<void>;
}

export default function AuthPromptModal({
  isOpen,
  onClose,
  primaryLabel = 'Create free account',
  secondaryLabel = 'Login',
  onAuthenticated,
}: AuthPromptModalProps) {
  const [mode, setMode] = useState<'signup' | 'signup-code' | 'login' | 'login-code'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function beginGuestSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/guest/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const payload = await response.json();
      if (response.status === 409) {
        setMode('login');
        setMessage('That email already has an account. Sign in here to continue.');
      } else if (!response.ok) {
        setMessage(payload.message || payload.error || 'Unable to send a verification code.');
      } else {
        setMode('signup-code');
        setMessage('Enter the verification code sent to your email.');
      }
    } catch {
      setMessage('Unable to reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function beginLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();
      if (response.status === 401 && payload.otpRequired) {
        setMode('login-code');
        setMessage(payload.message || 'Enter the verification code sent to your email.');
      } else if (response.status === 401 && payload.emailVerificationRequired) {
        setMessage(payload.message || 'Verify your email before signing in.');
      } else if (!response.ok) {
        setMessage(payload.message || payload.error || 'Unable to sign in with those details.');
      } else {
        setMode('login-code');
        setMessage('Enter the verification code sent to your email.');
      }
    } catch {
      setMessage('Unable to reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function finishAuthentication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const result = mode === 'signup-code'
        ? await signIn('credentials', { email, otp, flow: 'guest', redirect: false })
        : await signIn('credentials', { email, password, otp, redirect: false });

      if (!result?.ok || result.error) {
        setMessage(result?.error === 'CredentialsSignin' ? 'That code is invalid or expired.' : 'Unable to verify. Request a new code and try again.');
        return;
      }

      await onAuthenticated?.();
    } catch {
      setMessage('Unable to verify. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-prompt-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <FaInfoCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="auth-prompt-title" className="text-lg font-semibold text-slate-900">
                    Sign in to interact
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Verify your email once to like and comment. You will stay on this card.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            {mode === 'signup' && (
              <form onSubmit={beginGuestSignup} className="mt-5 space-y-3">
                <input required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Your name" aria-label="Your name" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="Email address" aria-label="Email address" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                <button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50">
                  <FaUserPlus className="h-4 w-4" /> {busy ? 'Sending code…' : primaryLabel}
                </button>
                <button type="button" onClick={() => { setMode('login'); setMessage(''); }} className="w-full py-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
                  Already have an account? {secondaryLabel}
                </button>
              </form>
            )}

            {mode === 'login' && (
              <form onSubmit={beginLogin} className="mt-5 space-y-3">
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="Email address" aria-label="Email address" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="Password" aria-label="Password" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
                <button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50">
                  <FaSignInAlt className="h-4 w-4" /> {busy ? 'Sending code…' : 'Continue to verification'}
                </button>
                <button type="button" onClick={() => { setMode('signup'); setMessage(''); }} className="w-full py-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
                  New here? {primaryLabel}
                </button>
              </form>
            )}

            {(mode === 'signup-code' || mode === 'login-code') && (
              <form onSubmit={finishAuthentication} className="mt-5 space-y-3">
                <input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} autoComplete="one-time-code" placeholder="6-digit email code" aria-label="6-digit email code" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm tracking-[0.25em] outline-none focus:border-emerald-500" />
                <button type="submit" disabled={busy || otp.length !== 6} className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50">
                  {busy ? 'Verifying…' : 'Verify and continue'}
                </button>
                <button type="button" onClick={() => { setMode(mode === 'signup-code' ? 'signup' : 'login'); setOtp(''); setMessage(''); }} className="w-full py-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">Back</button>
              </form>
            )}

            {message && <p role="status" className="mt-3 text-sm text-slate-600">{message}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
