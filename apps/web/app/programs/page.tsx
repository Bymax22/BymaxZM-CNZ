import Link from 'next/link';
import { PROGRAMS } from '../components/home/programsData';

export default function ProgramsPage() {
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
              <p className="text-sm uppercase tracking-[0.32em] text-[#bfe8c9]">Our Programs</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore our programs and learn how we deliver impact across communities.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                Practical support across human rights, alternative mining, capacity building, and climate resilience.
              </p>
            </div>

       
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PROGRAMS.map((program) => (
            <div key={program.slug} className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-44 md:h-56 w-full object-cover transition duration-500 group-hover:opacity-0"
                />
                <img
                  src={program.hoverImage}
                  alt={program.title}
                  className="absolute inset-0 h-44 md:h-56 w-full object-cover transition duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 flex flex-1 flex-col">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Program
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{program.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 flex-1 overflow-hidden">{program.description}</p>
                <div className="mt-6">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-2 text-[#008000] font-semibold hover:text-[#026730] transition"
                  >
                    Learn More <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
