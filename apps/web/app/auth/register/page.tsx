// app/auth/register/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUsers, FaHeart, FaHandshake, FaChild } from 'react-icons/fa';

const ROLE_CARDS = [
  {
    key: 'member',
    label: 'Community Member',
    description: 'General access to portal news, events, and community resources.',
    icon: FaUsers,
    accent: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  },
  {
    key: 'donor',
    label: 'Donor',
    description: 'Manage donations, receipts, and donor giving details.',
    icon: FaHeart,
    accent: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100',
  },
  {
    key: 'partner',
    label: 'Partner',
    description: 'Collaborate on projects and work with CNZ initiatives.',
    icon: FaHandshake,
    accent: 'bg-sky-50 text-sky-700 ring-sky-100',
  },
  {
    key: 'youth',
    label: 'Youth',
    description: 'Join youth programs, training, and community events.',
    icon: FaChild,
    accent: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/30 sm:p-12"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-700">
              Select a role
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Register or sign in to the right CNZ portal.
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Choose the account type that matches your connection to the organization, then continue with either register or login.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {ROLE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.key} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${card.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Role
                    </span>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-slate-900">{card.label}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href={{ pathname: '/auth/register/[role]', query: { role: card.key } }}
                      className="inline-flex min-w-[110px] flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Register
                    </Link>
                    <Link
                      href={{ pathname: '/auth/login', query: { role: card.key } }}
                      className="inline-flex min-w-[110px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
