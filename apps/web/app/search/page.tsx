import Link from 'next/link';

interface SearchPageProps {
  searchParams?: {
    query?: string | string[];
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = Array.isArray(searchParams?.query) ? searchParams.query.join(' ') : searchParams?.query ?? '';

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">Search</p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-900">Search results for &ldquo;{query}&rdquo;</h1>
        <p className="mt-3 text-sm text-gray-600">
          We&apos;re searching across projects, stories, and initiatives. If you don&apos;t see what you need, try another keyword.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-700">
          Search is currently a simple query navigator. If there are no exact matches yet, explore our featured sections below.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Link href="/projects" className="rounded-2xl border border-gray-200 p-5 hover:border-[#029346] hover:bg-[#f5fbf5] transition">
            <p className="text-sm font-semibold text-gray-900">Browse Projects</p>
            <p className="mt-2 text-sm text-gray-600">Discover conservation, climate, education and community work.</p>
          </Link>
          <Link href="/our-stories" className="rounded-2xl border border-gray-200 p-5 hover:border-[#029346] hover:bg-[#f5fbf5] transition">
            <p className="text-sm font-semibold text-gray-900">Our Stories</p>
            <p className="mt-2 text-sm text-gray-600">Read stories of impact, youth leaders, and community champions.</p>
          </Link>
          <Link href="/our-initiatives" className="rounded-2xl border border-gray-200 p-5 hover:border-[#029346] hover:bg-[#f5fbf5] transition">
            <p className="text-sm font-semibold text-gray-900">Our Initiatives</p>
            <p className="mt-2 text-sm text-gray-600">Learn how we partner with communities for lasting change.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
