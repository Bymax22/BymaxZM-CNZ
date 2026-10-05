"use client";

import React from 'react';
import { Users, HeartHandshake, UserCheck, CalendarDays } from 'lucide-react';

const STATS = [
  { label: 'Our Initiatives', value: '4+', icon: Users, bg: '#0b8d4c' },
  { label: 'Completed Projects', value: '12+', icon: HeartHandshake, bg: '#ff7800' },
  { label: 'Active Volunteers', value: '15+', icon: UserCheck, bg: '#7b3d1f' },
  { label: 'Programs Running', value: '23+', icon: CalendarDays, bg: '#029346' },
];

export default function ImpactBand() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-10 lg:py-12">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-[url('https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg')] bg-cover bg-right-center bg-no-repeat opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:items-center">
          <div className="max-w-[360px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#bfe8c9] sm:text-sm sm:tracking-[0.25em]">OUR IMPACT</p>
            <h3 className="mt-2 text-xl font-bold leading-tight sm:mt-4 sm:text-2xl">
              Numbers that reflect the change we create together.
            </h3>
            <button className="mt-3 inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#006400] shadow-lg shadow-black/10 transition hover:bg-slate-50 sm:mt-6 sm:px-4 sm:py-2">
              View Impact Report
            </button>
          </div>

          <div className="bg-white/10 p-1.5 backdrop-blur-sm sm:p-2">
            <div className="grid grid-cols-2 divide-x divide-white/20 sm:grid-cols-4">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`p-2.5 text-center sm:p-4 ${index % 2 === 1 ? 'border-l border-white/20 sm:border-l-0' : ''}`}>
                    <div
                      className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-white sm:mb-3 sm:h-11 sm:w-11"
                      style={{ backgroundColor: stat.bg }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="text-2xl font-bold leading-none sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-white/80 sm:mt-2 sm:text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
