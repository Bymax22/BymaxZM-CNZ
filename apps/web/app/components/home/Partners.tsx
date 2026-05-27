"use client";

import React from 'react';

const PARTNERS = [
  { name: 'The Government', logo: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779754575/Coat_of_arms_of_Zambia.svg_1_vwp1du.png' },
  { name: 'Sweden', logo: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779754574/sweden_dz9ihi.png' },
  { name: 'Save the Children Zambia', logo: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779754603/Save_the_Children_New_logo_c28d4d.png' },
  { name: 'Keepers Foundation Zambia', logo: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779754575/keepers-foundation_scgbs8.png' },
  { name: 'SAT', logo: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779754849/logo_xgv20b.png' },
  { name: 'GCSE', logo: 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779754880/GCSE_logo_updated-02_nxm9ig.png' },
];

export default function Partners() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[32px] bg-slate-50 p-8">
            <h4 className="text-2xl font-semibold text-slate-950">Our Partners</h4>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We work with trusted organizations to extend our reach.
            </p>
          </div>

          <div className="rounded-[32px] bg-white p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
              {PARTNERS.map((p) => (
                <div
                  key={p.name}
                  className="flex h-20 items-center justify-center rounded-3xl bg-slate-50 p-3 shadow-sm"
                >
                  <img src={p.logo} alt={p.name} className="max-h-12 w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
