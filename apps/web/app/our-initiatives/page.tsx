import Link from 'next/link';

export default function OurInitiativesPage() {
  return (
    <main className="bg-white text-gray-900">
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
              <p className="text-sm uppercase tracking-[0.32em] text-[#bfe8c9]">Our Initiatives</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Driving change through targeted action and advocacy.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                Our initiatives build on decades of practical experience in conservation, children's rights, mining accountability and community resilience.
              </p>
            </div>

       
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
          <article className="rounded-3xl bg-white border border-gray-200 p-10 shadow-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Zero Children in Mining</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2022, Zero Children in Mining is our targeted campaign to end child labour and protect children from illegal and hazardous mining activities.
            </p>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Advocates for strong enforcement of child protection laws in mining communities.</li>
              <li>Supports children&apos;s participation in climate action and rights-based initiatives.</li>
              <li>Strengthens community monitoring and alternative livelihoods for families.</li>
            </ul>
          </article>

          <article className="rounded-3xl bg-white border border-gray-200 p-10 shadow-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Luapula Alternative Mining Indaba</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Launched in 2019, this initiative convenes civil society, communities and policymakers around sustainable mining alternatives and better governance for local development.
            </p>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Creates platforms for women, youth and community voices in mining decisions.</li>
              <li>Promotes environmentally responsible practices and land rights protections.</li>
              <li>Builds momentum for reforms that benefit people and the planet.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-gray-200 p-10 shadow-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Join our work</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We welcome partners, funders and community actors who want to support safer mining, child protection, climate-resilient livelihoods and sustainable environmental stewardship.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-gray-900 bg-gray-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
