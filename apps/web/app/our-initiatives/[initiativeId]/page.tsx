import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInitiativeById, initiatives } from '../../components/sections/initiativesData';
import { ContentActions } from '../../components/ui/ContentActions';

export async function generateStaticParams() {
  return initiatives.map((initiative) => ({ initiativeId: initiative.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ initiativeId: string }> }) {
  const resolvedParams = await params;
  const initiative = getInitiativeById(resolvedParams.initiativeId);

  return {
    title: initiative ? `${initiative.title} | Our Initiatives` : 'Initiative not found',
    description: initiative?.overview || 'Learn more about our initiative work across Zambia.',
  };
}

export default async function InitiativeDetailPage({ params }: { params: Promise<{ initiativeId: string }> }) {
  const resolvedParams = await params;
  const initiative = getInitiativeById(resolvedParams.initiativeId);

  if (!initiative) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--gray-50)] text-slate-900">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(2,147,70,0.15),_transparent_55%)] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#029346] mb-4">Our Initiatives</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                {initiative.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                {initiative.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-[#029346] px-4 py-2 text-sm font-semibold text-white">
                  {initiative.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  Status: {initiative.status}
                </span>
              </div>
            </div>
            <div className="rounded-[32px] bg-white p-8 shadow-xl border border-slate-200">
              <div className="overflow-hidden rounded-3xl">
                <img src={initiative.image} alt={initiative.title} className="h-full w-full object-cover" />
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Why it matters</h2>
                  <p className="mt-3 text-slate-700">This initiative helps communities build stronger, safer futures while reducing harmful mining impacts.</p>
                </div>
                <Link
                  href="/our-initiatives"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Back to initiatives
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-10">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-slate-900 mb-6">Core outcomes</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Impact highlights</h3>
                  <ul className="space-y-3 text-slate-700 list-disc list-inside">
                    {initiative.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Strategic goals</h3>
                  <ul className="space-y-3 text-slate-700 list-disc list-inside">
                    {initiative.goals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ContentActions contextLabel={initiative.title} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Featured highlights</h3>
              <div className="space-y-4">
                {initiative.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-3xl bg-slate-50 p-4 text-slate-700">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Get involved</h3>
              <p className="text-slate-600 mb-6">
                Help us advance this initiative by sharing updates, joining advocacy actions, or supporting community resilience.
              </p>
              <div className="grid gap-3">
                <Link href="/contact" className="rounded-full bg-[#029346] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#027437]">
                  Contact our team
                </Link>
                <Link href="/get-involved/donate" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                  Support this work
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
