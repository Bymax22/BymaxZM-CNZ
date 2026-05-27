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
    <section className="relative overflow-hidden py-12">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-[url('https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779726699/410798998_750008060491803_5601703772940240462_n_q1t08s.jpg')] bg-cover bg-right-center bg-no-repeat opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="max-w-[360px]">
            <p className="text-sm uppercase tracking-[0.25em] text-[#bfe8c9]">OUR IMPACT</p>
            <h3 className="text-2xl font-bold leading-tight mt-4">
              Numbers that reflect the change we create together.
            </h3>
            <button className="mt-6 inline-flex items-center px-4 py-2 bg-white text-[#006400] rounded-lg font-semibold shadow-lg shadow-black/10 transition hover:bg-slate-50">
              View Impact Report
            </button>
          </div>

          <div className="squared-[32px] bg-white/10 p-2 backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`p-4 text-center ${index === 0 ? '' : 'pl-5'}`}>
                    <div
                      className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: stat.bg }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="text-3xl font-bold leading-none">{stat.value}</div>
                    <div className="mt-2 text-sm text-white/80">{stat.label}</div>
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
