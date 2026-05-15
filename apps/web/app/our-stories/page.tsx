import Link from 'next/link';

export const metadata = {
  title: 'Our Stories | Care for Nature Zambia',
  description: 'Read authentic stories of conservation, youth leadership, and community transformation across Zambia.',
};

const stories = [
  {
    title: 'River Guardians of Lusaka',
    category: 'Community Conservation',
    summary: 'Local youth joined forces to restore riverbanks, reduce pollution, and protect critical wetland habitat.',
    highlight: '250 trees planted and 12 clean-up actions completed',
  },
  {
    title: 'Children Leading Climate Action',
    category: 'Youth Empowerment',
    summary: 'School clubs launched climate campaigns that reached hundreds of families with resilient farming skills.',
    highlight: '40 child-led climate clubs active across 3 districts',
  },
  {
    title: 'Community Engagement for Wildlife',
    category: 'Conservation Impact',
    summary: 'Village committees adopted sustainable grazing and found new sources of livelihoods aligned with conservation.',
    highlight: 'Improved habitat access across 18 protected zones',
  },
  {
    title: 'A New Voice for Nature',
    category: 'Storytelling & Advocacy',
    summary: 'Women leaders shared personal stories that inspired policy-makers and amplified conservation priorities.',
    highlight: '6 community forums and a national storytelling series',
  },
];

export default function OurStoriesPage() {
  return (
    <main className="min-h-screen bg-[var(--gray-50)]">
      <section className="py-20 bg-[var(--primary-green)] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
            Our Stories
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Real people, real action, real change</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-white/90">
            Discover the stories behind our work: youth climate champions, community conservation leaders, and partners building a stronger, greener Zambia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary-green)] transition"
            >
              Join a story
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {stories.map((story) => (
            <article key={story.title} className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition">
              <div className="px-6 py-6 bg-[var(--primary-green)] text-white">
                <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/90">
                  {story.category}
                </span>
                <h2 className="mt-5 text-2xl font-semibold leading-tight">{story.title}</h2>
              </div>
              <div className="p-6">
                <p className="text-sm leading-6 text-gray-700">{story.summary}</p>
                <div className="mt-6 rounded-lg border border-[var(--primary-green)] px-5 py-3 text-sm font-semibold text-[var(--primary-green)] bg-white">
                  {story.highlight}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900">More than progress, it’s a movement</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Each story is a step toward a Zambia where nature and people thrive together. Share your experience, support a community, and help us turn these stories into every day reality.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link href="/auth/login" className="rounded-3xl border border-emerald-900/10 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100">
              Sign in to contribute
            </Link>
            <Link href="/auth/register" className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Create an account
            </Link>
            <Link href="/get-involved/donate" className="rounded-3xl bg-emerald-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Support our work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
