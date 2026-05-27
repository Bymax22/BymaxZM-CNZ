import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROGRAMS } from '../../components/home/programsData';

interface ProgramPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const resolvedParams = await params;
  const program = PROGRAMS.find((item) => item.slug === resolvedParams.slug);
  if (!program) {
    notFound();
  }

  return (
    <main className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-sm text-slate-700">
          <Link href="/programs" className="text-[#008000] hover:text-[#026730] font-semibold">
            ← Back to Programs
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-semibold">Program Overview</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">{program.title}</h1>
            <p className="mt-5 text-base leading-8 text-slate-600">{program.detail}</p>
            <div className="mt-8 space-y-4">
              {program.features.map((feature) => (
                <div key={feature} className="flex gap-3 text-slate-700">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-emerald-700" />
                  <p className="text-sm leading-7">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="relative h-96 w-full">
              <Image src={program.image} alt={program.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">More features</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore how this program builds lasting capacity and supports communities through practical services and partnerships.
              </p>
              <ul className="mt-6 space-y-3">
                {program.features.map((feature) => (
                  <li key={feature} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
