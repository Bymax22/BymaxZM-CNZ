"use client";

import React from 'react';
import { MdHandshake } from 'react-icons/md';

export default function CTASection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-6 items-center ">
        <div className="md:col-span-2 rounded-lg overflow-hidden">
          <div className="relative h-60 w-full">
            <img
              src="https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779728664/481203668_1049816653844274_6869822423782969566_n_crtku6.jpg"
              alt="Volunteers"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/100 via-white/90 to-transparent" />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 shadow">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#008000] mx-auto flex items-center justify-center text-white">
              <MdHandshake size={24} />
            </div>
            <h3 className="text-xl font-bold mt-3">Be a part of something bigger</h3>
            <p className="text-gray-600 mt-2">Your time, skills and support can create a lasting impact.</p>
            <div className="flex gap-3 justify-center mt-4">
              <button className="px-4 py-2 bg-[#008000] text-white rounded">Volunteer With Us</button>
              <button className="px-4 py-2 border border-[#ff6600] text-[#ff6600] rounded">Donate Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
