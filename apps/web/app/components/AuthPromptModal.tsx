'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaTimes, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function AuthPromptModal({
  isOpen,
  onClose,
  primaryHref = '/auth/register',
  primaryLabel = 'Create account',
  secondaryHref = '/auth/login',
  secondaryLabel = 'Login',
}: AuthPromptModalProps) {
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
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200"
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
                    Likes and comments are reserved for registered users. Sharing is still available publicly.
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

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                onClick={onClose}
              >
                <FaUserPlus className="h-4 w-4" />
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-500 hover:text-emerald-700"
                onClick={onClose}
              >
                <FaSignInAlt className="h-4 w-4" />
                {secondaryLabel}
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              If you already have an account, use Login. If you are new, create an account to keep your likes and comments with your profile.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
