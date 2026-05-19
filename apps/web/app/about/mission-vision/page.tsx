import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { strategicPlan, organizationInfo } from '../../components/sections/strategicPlanData';

export const metadata: Metadata = {
  title: 'Our Mission & Vision - Care for Nature Zambia',
  description: 'Our mission, vision, core values and strategic objectives for environmental conservation and community development.',
};

export default function MissionVisionPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-4">
        <Link href="/about" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to About Us
        </Link>
      </div>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image src="/children.jpg" alt="Mission and vision" fill className="object-cover object-center opacity-75" />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300 mb-4">Mission & Vision</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Work that puts people and nature at the centre of progress.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Our mission is to create impact through environmental stewardship, child participation, and accountable governance across Zambia.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{strategicPlan.mission}</p>
            <div className="space-y-4">
              {strategicPlan.mainObjectives.map((objective, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                    <FaCheckCircle className="h-4 w-4" />
                  </div>
                  <p className="text-gray-600">{objective}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{strategicPlan.vision}</p>
            <div className="space-y-4">
              {[
                'A nation where communities care for nature and benefit from sustainable ecosystems.',
                'Thriving ecosystems and empowered citizens driving local development.',
                'Environmental stewardship embedded in everyday life.',
                'Responsible extractives that protect people and the planet.',
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-1 h-8 w-8 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                    <FaCheckCircle className="h-4 w-4" />
                  </div>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Core Values</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strategicPlan.coreValues.map((value) => (
              <article key={value.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-emerald-700 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Our Organization</h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Registration & Status</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Registration Number:</strong> {organizationInfo.registrationNumber}</li>
                <li><strong>Status:</strong> {organizationInfo.status}</li>
                <li><strong>Established:</strong> {organizationInfo.established}</li>
                <li><strong>Headquarters:</strong> Mansa District, Luapula Province</li>
                <li><strong>Field Offices:</strong> Samfya & Mwense Districts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Our Mandate</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We believe that conserving the environment and its natural resources is both a fundamental human right and a shared responsibility.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Collective engagement in Nature Based Actions helps communities respond to climate impacts, disasters, and humanitarian challenges.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-emerald-700 mb-3">Logo & Identity</h3>
              <p className="text-gray-700 leading-relaxed">
                Our visual identity reflects our commitment to nature, people, and the earth.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• Green symbolizes flora and nature</li>
                <li>• Orange symbolizes humanity and the earth</li>
                <li>• CNZ stands for Care for Nature Zambia</li>
              </ul>
            </article>
            <article className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-emerald-700 mb-3">Our Identity</h3>
              <p className="text-gray-700 leading-relaxed">
                We preserve nature by centering people, respecting local knowledge, and uplifting children as future stewards of the environment.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Our Programs', href: '/about/programs' },
            { title: 'Our Team', href: '/about/team' },
            { title: 'Governance', href: '/about/governance' },
          ].map((page) => (
            <Link key={page.href} href={page.href}>
              <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Learn More About Our Work</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about/programs" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              Our Programs
            </Link>
            <Link href="/about/team" className="bg-white text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
              Our Team
            </Link>
            <Link href="/get-involved" className="border border-white/20 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
