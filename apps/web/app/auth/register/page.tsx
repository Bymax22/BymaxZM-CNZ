// app/auth/register/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HeartHandshake, Handshake, Users, UserCheck, X } from 'lucide-react';

const ROLE_CARDS = [
  {
    key: 'member',
    label: 'Community Member',
    description: 'Community access to news, events and portal resources.',
    icon: Users,
  },
  {
    key: 'donor',
    label: 'Donor',
    description: 'Give and manage donations in one place.',
    icon: HeartHandshake,
  },
  {
    key: 'partner',
    label: 'Partner',
    description: 'Connect with CNZ on programs and projects.',
    icon: Handshake,
  },
  {
    key: 'youth',
    label: 'Youth',
    description: 'Youth access for programs and event participation.',
    icon: UserCheck,
  },
];

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-10 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close register modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Select your CaNZ account
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Pick the right access type, then register or sign in.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {ROLE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">{card.label}</h2>
                    <p className="mt-1 text-sm leading-5 text-slate-600">{card.description}</p>
                  </div>
                </div>

                <div className="mt-5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:pointer-events-none lg:group-hover:pointer-events-auto transition-opacity duration-200">
                  <div className="flex gap-2">
                    <Link
                      href={`/auth/register/${card.key}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#ff6600] px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
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
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
