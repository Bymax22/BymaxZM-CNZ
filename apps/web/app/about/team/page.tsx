import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team & Leadership - Care for Nature Zambia',
  description: 'Meet the board, leadership team, and staff driving our mission for environmental conservation and sustainable development.',
};

export default function TeamPage() {
  const lessonsLearnt = [
    'Strong working relationships with Government, Traditional leaders, and Civil Society have helped attain a strong voice for the environment and children.',
    'Creating safe spaces for children and building their capacity to develop child-led initiatives is critical to achieving our goals.',
    'Children are change makers and given opportunity to participate in decision making, they can contribute significantly to environmental awareness.',
    'Community wealth is in natural resources; local knowledge plays a significant role in conservation.',
    'Collective engagement in Nature Based Actions helps communities respond to climate change impacts and humanitarian challenges.',
  ];

  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Team & Leadership</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Dedicated professionals working towards environmental conservation and community development
          </p>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Organizational Structure</h2>
        
        <div className="bg-[#F0F9F4] rounded-2xl p-12 mb-12">
          <div className="flex flex-col items-center gap-8">
            {/* Level 1 */}
            <div className="text-center">
              <div className="inline-block bg-[#029346] text-white px-8 py-4 rounded-xl font-bold">
                GENERAL ASSEMBLY
              </div>
            </div>

            <div className="w-1 h-8 bg-gradient-to-b from-[#029346] to-[#F79021]"></div>

            {/* Level 2 */}
            <div className="text-center">
              <div className="inline-block bg-[#0C4726] text-white px-8 py-4 rounded-xl font-bold">
                GOVERNING BODY (Board of Directors)
              </div>
            </div>

            <div className="w-1 h-8 bg-gradient-to-b from-[#F79021] to-[#029346]"></div>

            {/* Level 3 */}
            <div className="text-center">
              <div className="inline-block bg-[#F79021] text-white px-8 py-4 rounded-xl font-bold">
                EXECUTIVE DIRECTOR
              </div>
            </div>

            <div className="w-1 h-8 bg-gradient-to-b from-[#029346] to-[#0C4726]"></div>

            {/* Level 4 - Leadership Team */}
            <div className="grid md:grid-cols-4 gap-4 w-full mt-4">
              {[
                'Programmes Manager',
                'Finance/HR Manager',
                'Partnerships Officer',
                'Admin Officer',
              ].map((position) => (
                <div key={position} className="bg-white rounded-lg p-4 text-center border-l-4 border-[#029346]">
                  <p className="font-semibold text-gray-900">{position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Executive Leadership</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#F79021] p-8">
            <div className="flex gap-6 items-center">
              <div className="text-6xl flex-shrink-0">👔</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">NSAMA MUSONDA</h3>
                <p className="text-[#029346] font-semibold mb-4">Executive Director</p>
                <p className="text-gray-700 leading-relaxed">
                  Leading Care for Nature Zambia's strategic vision and implementation of environmental conservation, 
                  children's rights and sustainable development programs across Zambia since 2010.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="bg-[#F0F9F4] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Journey & Key Learnings</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Over a decade of experience in environmental conservation and community development has taught us valuable lessons
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {lessonsLearnt.map((lesson, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md border-t-4 border-[#029346]">
                <p className="text-gray-700 leading-relaxed">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Progress */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Impact (2018-2022)</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white rounded-xl p-8">
            <h3 className="text-3xl font-bold mb-6">What We Achieved</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>Established 8 cooperatives in Mansa District</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>6 cooperatives working in extractive industry</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>1 agriculture cooperative</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>Indigenous seeds and craft initiatives</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>Launched Luapula Mining Insaka (2019)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>MOU with National Heritage Conservation Commission</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#F79021]">✓</span>
                <span>Strong civil society partnerships</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#F79021] to-[#AA5D26] text-white rounded-xl p-8">
            <h3 className="text-3xl font-bold mb-6">Moving Forward (2023-2027)</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Expand to all 10 provinces</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Establish school clubs nationwide</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Empower 100,000+ children in conservation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Strengthen sustainable mining practices</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Build climate-resilient communities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Promote green jobs and livelihoods</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">→</span>
                <span>Increase organizational capacity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="bg-[#F0F9F4] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Partners & Networks</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#029346] mb-6">Institutional Partners</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Save the Children International</li>
                <li>✓ United Nations Development Programme (UNDP)</li>
                <li>✓ Action Aid Zambia</li>
                <li>✓ Civil Society Environment Fund (CSEF)</li>
                <li>✓ World Wide Fund for Nature (WWF)</li>
                <li>✓ Caritas Zambia</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#029346] mb-6">Civil Society Networks</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Civil Society for Poverty Reduction</li>
                <li>✓ Zambia Climate Change Network</li>
                <li>✓ Community Based Natural Resources Management</li>
                <li>✓ Civil Society Organization Environment Hub</li>
                <li>✓ Mansa District Land Alliance</li>
                <li>✓ Council of Churches in Zambia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#029346] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Help us build resilient communities and protect Zambia's natural resources for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="bg-[#F79021] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e1a] transition">
              Get Involved
            </Link>
            <Link href="/contact" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/50">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}