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
    <section className="bg-white py-5 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="rounded-xl bg-slate-50 p-4 sm:rounded-2xl sm:p-6 lg:p-8">
            <h4 className="text-xl font-semibold text-slate-950 sm:text-2xl">Our Partners</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
              We work with trusted organizations to extend our reach.
            </p>
          </div>

          <div className="rounded-xl bg-white p-1 sm:rounded-2xl sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
              {PARTNERS.map((p) => (
                <div
                  key={p.name}
                  className="flex h-16 items-center justify-center rounded-xl bg-slate-50 p-2 shadow-sm sm:h-20 sm:rounded-2xl sm:p-3"
                >
                  <img src={p.logo} alt={p.name} className="max-h-10 w-full object-contain sm:max-h-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
