import Link from 'next/link';

export default function WebinarPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Webinar</p>
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">Upcoming webinars and online events</h1>
        <p className="mt-3 text-sm text-gray-600">
          Join our events to learn more about conservation, climate action, children&apos;s rights, and community development in Zambia.
        </p>

        <div className="mt-8 space-y-6">
          <article className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">No upcoming webinars yet</h2>
            <p className="mt-2 text-sm text-gray-600">Please check back soon or sign up for updates from Care for Nature Zambia.</p>
          </article>
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center rounded-full bg-[#029346] px-5 py-3 text-sm font-semibold text-white hover:bg-[#027437] transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
