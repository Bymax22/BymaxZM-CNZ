// app/auth/register/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUsers, FaHeart, FaHandshake, FaChild, FaArrowRight } from 'react-icons/fa';

const ROLE_CARDS = [
  {
    key: 'member',
    label: 'Community Member',
    description: 'Access programs, news, events, and community resources.',
    icon: FaUsers,
    color: 'from-emerald-500 to-green-600',
  },
  {
    key: 'donor',
    label: 'Donor',
    description: 'Manage donations, receipts, and donor benefits.',
    icon: FaHeart,
    color: 'from-fuchsia-500 to-red-500',
  },
  {
    key: 'partner',
    label: 'Partner',
    description: 'Collaborate on projects, campaigns, and partnerships.',
    icon: FaHandshake,
    color: 'from-sky-500 to-indigo-600',
  },
  {
    key: 'youth',
    label: 'Youth',
    description: 'Join youth programs, training, and community events.',
    icon: FaChild,
    color: 'from-cyan-500 to-blue-600',
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl rounded-[40px] border border-emerald-200 bg-white/95 p-6 shadow-2xl shadow-emerald-200/10 backdrop-blur-md sm:p-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
            Choose your account type
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Select the right portal access
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Pick the account type that best matches how you want to use the CNZ portal. Hover a card on desktop to sign in or sign up.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${card.color} text-white shadow-lg shadow-slate-200/50`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                    <FaArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-slate-900">{card.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </div>

                <div className="mt-6 grid gap-3 sm:hidden">
                  <Link
                    href={`/auth/register/${card.key}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Register
                  </Link>
                  <Link
                    href={`/auth/login?role=${card.key}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:text-emerald-700"
                  >
                    Login
                  </Link>
                </div>

                <div className="pointer-events-none absolute inset-0 hidden rounded-[32px] bg-white/95 opacity-0 transition duration-300 group-hover:block group-hover:opacity-100 group-hover:pointer-events-auto sm:block">
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[32px] bg-white/95 p-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Ready?</p>
                    <div className="grid w-full gap-3">
                      <Link
                        href={`/auth/register/${card.key}`}
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                      >
                        Register
                      </Link>
                      <Link
                        href={`/auth/login?role=${card.key}`}
                        className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:text-emerald-700"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
}
