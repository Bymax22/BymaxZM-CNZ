// app/auth/register/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUsers, FaHeart, FaHandshake, FaChild } from 'react-icons/fa';

const ROLE_CARDS = [
  {
    key: 'member',
    label: 'Community Member',
    description: 'Portal access for general community participation.',
    icon: FaUsers,
  },
  {
    key: 'donor',
    label: 'Donor',
    description: 'Give and manage donations in one place.',
    icon: FaHeart,
  },
  {
    key: 'partner',
    label: 'Partner',
    description: 'Work with CNZ on programs and projects.',
    icon: FaHandshake,
  },
  {
    key: 'youth',
    label: 'Youth',
    description: 'Youth program access and event participation.',
    icon: FaChild,
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Choose your CNZ access type
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Select the correct role, then register or sign in.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ROLE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.key}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{card.label}</h2>
                      <p className="mt-1 text-sm text-slate-600">{card.description}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/auth/register/${card.key}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Register
                    </Link>
                    <Link
                      href={`/auth/login?role=${card.key}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
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
