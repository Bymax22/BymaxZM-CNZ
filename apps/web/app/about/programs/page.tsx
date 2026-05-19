import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaLeaf, FaChild, FaIndustry, FaHandsHelping, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { strategicPlan } from '../../components/sections/strategicPlanData';

export const metadata: Metadata = {
  title: 'Our Programs - Care for Nature Zambia',
  description: 'Explore our four thematic areas: Nature Conservation, Child Rights, Sustainable Mining, and Organization Development.',
};

const programImages = ['/tree-planting.jpg', '/children-program.jpg', '/partnership.jpg', '/women-conservation.jpg'];

export default function ProgramsPage() {
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
          <Image src="/tree-planting.jpg" alt="Programs overview" fill className="object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300 mb-4">Strategic Programs</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">Practical programs for nature, children, mining, and communities.</h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Our thematic programs bring together environment, child rights, and governance to create lasting benefits across Zambia.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="space-y-20">
          {strategicPlan.thematicAreas.map((program, idx) => {
            const image = programImages[idx] ?? '/images/community.jpg';
            const Icon = idx === 0 ? FaLeaf : idx === 1 ? FaChild : idx === 2 ? FaIndustry : FaHandsHelping;
            return (
              <div key={program.id} className="grid gap-12 lg:grid-cols-[1fr_0.9fr] items-center">
                {idx % 2 === 0 ? (
                  <>
                    <div>
                      <div className="mb-4 inline-flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-700 text-white shadow-lg">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-semibold">Program {program.number}</p>
                          <h2 className="text-3xl font-semibold text-gray-900 mt-2">{program.title}</h2>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{program.description}</p>
                      <div className="space-y-4 mb-8">
                        {program.actions.map((action, actionIdx) => (
                          <div key={actionIdx} className="flex gap-3 text-gray-700">
                            <FaCheckCircle className="mt-1 h-4 w-4 text-emerald-700 flex-shrink-0" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                      {program.sdgs.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-3">Aligned with SDGs:</p>
                          <div className="flex flex-wrap gap-2">
                            {program.sdgs.map((sdg) => (
                              <span key={sdg} className="rounded-full border border-emerald-700 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                                SDG {sdg}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-80 bg-slate-50">
                      <Image src={image} alt={program.title} fill className="object-cover object-center" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-80 bg-slate-50">
                      <Image src={image} alt={program.title} fill className="object-cover object-center" />
                    </div>
                    <div>
                      <div className="mb-4 inline-flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-700 text-white shadow-lg">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-semibold">Program {program.number}</p>
                          <h2 className="text-3xl font-semibold text-gray-900 mt-2">{program.title}</h2>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{program.description}</p>
                      <div className="space-y-4 mb-8">
                        {program.actions.map((action, actionIdx) => (
                          <div key={actionIdx} className="flex gap-3 text-gray-700">
                            <FaCheckCircle className="mt-1 h-4 w-4 text-emerald-700 flex-shrink-0" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                      {program.sdgs.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-3">Aligned with SDGs:</p>
                          <div className="flex flex-wrap gap-2">
                            {program.sdgs.map((sdg) => (
                              <span key={sdg} className="rounded-full border border-emerald-700 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                                SDG {sdg}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Who We Serve</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {strategicPlan.targetGroups.map((group) => (
              <article key={group.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-emerald-700 mb-4">{group.name}</h3>
                <p className="text-gray-600 leading-relaxed">{group.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Where We Work</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {strategicPlan.workAreas.map((area, idx) => (
            <article key={idx} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white">
                <FaMapMarkerAlt className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{area.province}</h3>
              <p className="text-gray-600 font-semibold mb-3">{area.location}</p>
              <p className="text-gray-600 leading-relaxed">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Theory of Change</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">The Premise</h3>
              <p className="text-gray-600 leading-relaxed">
                People need to understand that natural resources are central to livelihoods, rights, and long-term resilience.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Key Assumptions</h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  'Sustainable resource management reduces poverty.',
                  'Stakeholder participation drives change.',
                  'Communities must know their rights.',
                  'Collective action amplifies impact.',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <FaCheckCircle className="mt-1 h-4 w-4 text-emerald-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Desired Outcome</h3>
              <p className="text-gray-600 leading-relaxed">
                A just and equitable Zambia where people care for nature and participate in conservation for resilient livelihoods.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Our Mission & Vision', href: '/about/mission-vision' },
            { title: 'Our Team', href: '/about/team' },
            { title: 'Impact Reports', href: '/about/reports' },
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
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to act for nature and communities?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              Get Involved
            </Link>
            <Link href="/projects" className="border border-white/20 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Our Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
