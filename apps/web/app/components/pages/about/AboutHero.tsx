'use client';
import Link from 'next/link';


export function AboutHero() {
  return (
    <main className="bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
        <Link href="/" className="text-sm text-[#008000] font-semibold hover:text-[#026730]">
          ← Back to Home
        </Link>
      </div>

      <section className="relative overflow-hidden bg-[#0b4f2f]">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-[url('/children.jpg')] bg-cover bg-right-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#008000]/100 via-[#008000]/100 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-center">
            <div className="max-w-2xl text-white">
              <p className="text-sm uppercase tracking-[0.32em] text-[#bfe8c9]">About Us</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Environmental conservation, community leadership, and child-centred action for Zambia.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                We support communities through sustainable land management, youth empowerment, safe mining reform, and public accountability.
              </p>
            </div>

       
          </div>
        </div>
      </section>
      </main>
  );
}