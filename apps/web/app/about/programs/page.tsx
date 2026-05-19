import { Metadata } from 'next';
import Link from 'next/link';
import { strategicPlan } from '../../components/sections/strategicPlanData';

export const metadata: Metadata = {
  title: 'Our Programs - Care for Nature Zambia',
  description: 'Explore our four thematic areas: Nature Conservation, Child Rights, Sustainable Mining, and Organization Development.',
};

export default function ProgramsPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-4">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[#029346] hover:text-[#0C4726] font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to About Us
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Strategic Programs</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Strategic Plan 2023-2027: Nature Based Action for a Just and Prosperous Nation
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="space-y-20">
          {strategicPlan.thematicAreas.map((program, idx) => (
            <div key={program.id} className={`grid md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl font-bold text-[#F79021] opacity-30">{program.number}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#029346] uppercase tracking-wide">Program {program.number}</p>
                    <h2 className="text-3xl font-bold text-gray-900">{program.title}</h2>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Actions & Change We Hope to See</h3>
                  <ul className="space-y-3">
                    {program.actions.map((action, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700">
                        <span className="text-[#029346] font-bold flex-shrink-0 mt-1">→</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {program.sdgs.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Aligned with SDGs:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.sdgs.map((sdg) => (
                        <span key={sdg} className="bg-[#029346]/10 text-[#029346] px-3 py-1 rounded-full text-sm font-semibold">
                          SDG {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className={idx % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-lg h-80 bg-gradient-to-br from-[#F0F9F4] to-[#E0F0EB] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <p className="text-6xl mb-2">🌍</p>
                    <p className="text-sm">Program Imagery</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Groups */}
      <section className="bg-[#F0F9F4] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicPlan.targetGroups.map((group) => (
              <div key={group.name} className="bg-white rounded-xl p-8 shadow-md border-l-4 border-[#029346]">
                <h3 className="text-2xl font-bold text-[#029346] mb-4">{group.name}</h3>
                <p className="text-gray-700 leading-relaxed">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Areas */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Where We Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {strategicPlan.workAreas.map((area, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#029346]/10 to-[#F79021]/10 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[#029346] mb-2">{area.province}</h3>
              <p className="text-gray-700 font-semibold mb-3">{area.location}</p>
              <p className="text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Theory of Change */}
      <section className="bg-white border-t border-gray-200 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Theory of Change</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#029346] mb-4">📋 The Premise</h3>
              <p className="text-gray-700 leading-relaxed">
                People need to understand the significant role that natural resources play in sustaining 
                livelihoods and that each person is born with inherent and inalienable rights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF5E6] to-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#F79021] mb-4">🎯 Key Assumptions</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {[
                  'Sustainable resource management reduces poverty',
                  'Stakeholder participation is essential',
                  'Communities must understand their rights',
                  'Collective action drives change',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#F79021] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#E8F5E9] to-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#029346] mb-4">🌿 Desired Outcome</h3>
              <p className="text-gray-700 leading-relaxed">
                A just and equitable nation where all people care for nature and participate in 
                conservation for resilient livelihoods and prosperous communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Our Mission & Vision', href: '/about/mission-vision', icon: '🎯' },
            { title: 'Our Team', href: '/about/team', icon: '👥' },
            { title: 'Impact Reports', href: '/about/reports', icon: '📊' },
          ].map((page) => (
            <Link key={page.href} href={page.href}>
              <div className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-xl p-8 text-center border border-gray-100 hover:border-[#029346] hover:shadow-lg transition-all cursor-pointer">
                <div className="text-5xl mb-4">{page.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 hover:text-[#029346] transition-colors">{page.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#029346] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="bg-[#F79021] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e1a] transition">
              Get Involved
            </Link>
            <Link href="/projects" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/50">
              Our Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
