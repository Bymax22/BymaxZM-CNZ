import { Metadata } from 'next';
import Link from 'next/link';
import { strategicPlan, organizationInfo } from '../../components/sections/strategicPlanData';

export const metadata: Metadata = {
  title: 'Our Mission & Vision - Care for Nature Zambia',
  description: 'Our mission, vision, core values and strategic objectives for environmental conservation and community development.',
};

export default function MissionVisionPage() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Mission & Vision</h1>
          <p className="text-xl text-white/90">What drives us to create lasting change</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#029346] mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {strategicPlan.mission}
              </p>
              <p className="text-gray-600 mb-8">
                We believe that communities can create wealth and maintain a safe, clean and healthy 
                environment if they use natural resources responsibly. Through citizen participation in 
                conservation, we build resilient livelihoods and prosperous communities.
              </p>
              <div className="bg-[#F79021]/10 border-l-4 border-[#F79021] pl-6 py-4">
                <p className="text-gray-700 font-semibold">
                  "When people care for nature, they can willingly participate in conservation and 
                  make better decisions towards sustainable development."
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-2xl p-12 shadow-lg">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Key Objectives</h3>
                {strategicPlan.mainObjectives.map((obj, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#029346] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-20 py-16 border-t border-b border-gray-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-[#FFF5E6] to-white rounded-2xl p-12 shadow-lg order-2 md:order-1">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Zambia We Envision</h3>
                <ul className="space-y-4">
                  {[
                    'A nation where all people care for nature',
                    'Thriving ecosystems and empowered communities',
                    'Environmental stewardship at all levels',
                    'Sustainable livelihoods and green economies',
                    'Children leading conservation efforts',
                    'Responsible extractives management',
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <span className="text-[#F79021] font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-[#F79021] mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {strategicPlan.vision}
              </p>
              <p className="text-gray-600 mb-8">
                We envision a Zambia where thriving ecosystems and empowered communities coexist 
                in harmony. Where every citizen—especially children—is an active steward of the 
                environment, and where sustainable development ensures prosperity for generations to come.
              </p>
              <p className="text-gray-600">
                This vision is grounded in the belief that environmental conservation is both a 
                fundamental human right and responsibility. By promoting nature-based actions, we 
                create pathways to a just, green, and prosperous nation.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicPlan.coreValues.map((value) => (
              <div key={value.id} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition border-t-4 border-[#029346]">
                <h3 className="text-2xl font-bold text-[#029346] mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Organization Info */}
        <div className="bg-[#F0F9F4] rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Our Organization</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#029346] mb-4">Registration & Status</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Registration Number:</strong> {organizationInfo.registrationNumber}</li>
                <li><strong>Status:</strong> {organizationInfo.status}</li>
                <li><strong>Established:</strong> {organizationInfo.established}</li>
                <li><strong>Headquarters:</strong> Mansa District, Luapula Province</li>
                <li><strong>Field Offices:</strong> Samfya & Mwense Districts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#029346] mb-4">Our Mandate</h3>
              <p className="text-gray-700 mb-4">
                We believe that conserving the environment and its natural resources is both a basic 
                fundamental human right and responsibility of all people.
              </p>
              <p className="text-gray-700">
                We view it as a strategic response to managing climate change, and we believe that 
                collective engagement in Nature Based Actions helps communities effectively respond to 
                climate challenges, disasters and humanitarian crises.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-300">
            <h3 className="text-xl font-bold text-[#029346] mb-4">Our Identity</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p><strong>Logo:</strong> Symbolizes nature in its simplest form</p>
                <p className="mt-3"><strong>Colors:</strong></p>
                <ul className="ml-4 mt-2 space-y-1">
                  <li>• Green: Symbolizes nature (fauna and flora)</li>
                  <li>• Orange: Symbolizes humanity and the earth</li>
                </ul>
              </div>
              <div>
                <p><strong>Acronym:</strong> CNZ</p>
                <ul className="ml-4 mt-2 space-y-1">
                  <li>• C for Care</li>
                  <li>• N for Nature</li>
                  <li>• Z for Zambia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Our Programs', href: '/about/programs', icon: '🌱' },
            { title: 'Our Team', href: '/about/team', icon: '👥' },
            { title: 'Governance', href: '/about/governance', icon: '⚖️' },
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
      <section className="bg-[#029346] text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Learn More About Our Work</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about/programs" className="bg-[#F79021] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e1a] transition">
              Our Programs
            </Link>
            <Link href="/about/team" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/50">
              Our Team
            </Link>
            <Link href="/get-involved" className="bg-white text-[#029346] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
