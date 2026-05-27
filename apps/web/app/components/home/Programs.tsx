"use client";

import React from 'react';
import Link from 'next/link';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { PROGRAMS } from './programsData';

export default function Programs() {
  return (
    <section id="programs" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Left Column - Description */}
          <div className="lg:col-span-1">
            <p className="text-sm text-[#008000] font-semibold">WHAT WE DO</p>
            <h2 className="text-2xl font-bold mt-2 mb-4">Our Programs</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
             Care for Nature Zambia has four thematic areas of work as follows:
            </p>
            <Link href="/programs" className="inline-flex items-center gap-2 text-[#008000] font-semibold hover:text-[#006400] transition text-sm">
              View All Programs <FiArrowRight size={16} />
            </Link>
          </div>

          {/* Right Column - Cards Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {PROGRAMS.map((p) => (
                <div key={p.slug} className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-24 w-full object-cover transition duration-500 group-hover:opacity-0"
                    />
                    <img
                      src={p.hoverImage}
                      alt={p.title}
                      className="absolute inset-0 h-24 w-full object-cover transition duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div style={{ backgroundColor: p.color }} className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          <FiStar size={16} />
                        </div>
                        <h3 className="font-semibold text-sm">{p.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-3 max-h-[5.5rem] overflow-hidden">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/programs/${p.slug}`}
                        className="text-sm text-[#008000] font-medium hover:text-[#006400] transition inline-flex items-center gap-1"
                      >
                        Learn More <FiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
