"use client";

import React from 'react';
import { MdHandshake } from 'react-icons/md';

export default function CTASection() {
  return (
    <section className="bg-white py-6 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto grid items-center gap-3 px-4 sm:gap-6 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="md:col-span-2 rounded-lg overflow-hidden">
          <div className="relative h-36 w-full sm:h-48 md:h-60">
            <img
              src="https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779728664/481203668_1049816653844274_6869822423782969566_n_crtku6.jpg"
              alt="Volunteers"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/100 via-white/90 to-transparent" />
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 shadow sm:p-6">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#008000] text-white sm:h-12 sm:w-12">
              <MdHandshake size={20} />
            </div>
            <h3 className="mt-2 text-lg font-bold sm:mt-3 sm:text-xl">Be a part of something bigger</h3>
            <p className="mt-1.5 text-sm text-gray-600 sm:mt-2">Your time, skills and support can create a lasting impact.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-4 sm:gap-3">
              <button className="rounded bg-[#008000] px-3 py-1.5 text-sm text-white sm:px-4 sm:py-2">Volunteer With Us</button>
              <button className="rounded border border-[#ff6600] px-3 py-1.5 text-sm text-[#ff6600] sm:px-4 sm:py-2">Donate Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
