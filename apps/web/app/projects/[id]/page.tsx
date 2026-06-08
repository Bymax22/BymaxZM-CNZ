import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { getProjectById } from '../../components/sections/projectsData';
import { notFound } from 'next/navigation';

async function getSiteUrl() {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host');
  const proto = headersList.get('x-forwarded-proto') || headersList.get('x-forwarded-protocol') || 'https';
  if (host) {
    return `${proto}://${host}`;
  }
  return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export async function generateStaticParams() {
  const { projects } = await import('../../components/sections/projectsData');
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let project = getProjectById(resolvedParams.id);
  if (!project) {
    try {
      const siteUrl = await getSiteUrl();
      const res = await fetch(`${siteUrl}/api/communications/card/${encodeURIComponent(resolvedParams.id)}`);
      if (res.ok) {
        const card = await res.json();
        project = {
          id: card.slug || card.id,
          name: card.title,
          category: (card.category || 'conservation') as any,
          title: card.title,
          shortDescription: card.subtitle || (card.description || '').slice(0, 160),
          description: card.description || '',
          location: card.metadata?.location || 'Zambia',
          status: card.metadata?.status || 'ongoing',
          impact: card.metadata?.impact || [],
          image: card.imageUrl || '',
          sdgs: card.metadata?.sdgs || [],
          partnerLogos: card.metadata?.partnerLogos || [],
          gallery: card.metadata?.gallery || [],
          publishedAt: card.publishedAt || card.createdAt,
        } as any;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return { title: `${project.title} - Care for Nature Zambia`, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let project = getProjectById(resolvedParams.id);

  if (!project) {
    try {
      const siteUrl = await getSiteUrl();
      const res = await fetch(`${siteUrl}/api/communications/card/${encodeURIComponent(resolvedParams.id)}`);
      if (res.ok) {
        const card = await res.json();
        project = {
          id: card.slug || card.id,
          name: card.title,
          category: (card.category || 'conservation') as any,
          title: card.title,
          shortDescription: card.subtitle || (card.description || '').slice(0, 160),
          description: card.description || '',
          location: card.metadata?.location || 'Zambia',
          status: card.metadata?.status || 'ongoing',
          impact: card.metadata?.impact || [],
          image: card.imageUrl || '',
          sdgs: card.metadata?.sdgs || [],
          partnerLogos: card.metadata?.partnerLogos || [],
          gallery: card.metadata?.gallery || [],
          publishedAt: card.publishedAt || card.createdAt,
        } as any;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/projects" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
            ← Back to Projects
          </Link>
          <div className="mt-8">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
            <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl">{project.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2">
            {/* Project Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-12 h-96 bg-gradient-to-br from-[#F0F9F4] to-[#E0F0EB] flex items-center justify-center">
              {project.image && (project.image.includes('cloudinary') || project.image.includes('http')) ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <p className="text-6xl mb-4">🌍</p>
                  <p className="text-gray-500">Project imagery</p>
                </div>
              )}
            </div>

            {/* Partner Logos */}
            {project.partnerLogos && project.partnerLogos.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Partners</h2>
                <div className="flex flex-wrap gap-4 items-center">
                  {project.partnerLogos.map((logo, idx) => (
                    <img key={idx} src={logo} alt="Partner logo" className="h-16 object-contain" />
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((item: any, idx: number) => (
                    item.type === 'video' ? (
                      <video key={idx} src={item.url} controls className="w-full h-40 object-cover rounded-lg" />
                    ) : (
                      <img key={idx} src={item.url} alt="Gallery" className="w-full h-40 object-cover rounded-lg" />
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h2>
              {project.description.split(/\n{2,}/).map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
                  {paragraph.trim()}
                </p>
              ))}
              <p className="text-gray-600 leading-relaxed">
                This project is a critical component of our Strategic Plan 2023-2027: Nature Based Action 
                for a Just and Prosperous Nation. Through collaborative efforts with communities, government, 
                partners and civil society, we are driving transformative change.
              </p>
            </div>

            {/* Impact Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.impact.map((impact, idx) => (
                  <div key={idx} className="bg-[#F0F9F4] rounded-xl p-6 border-l-4 border-[#029346]">
                    <div className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">✓</span>
                      <p className="text-gray-700 font-semibold">{impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Details */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#029346] mb-3">Location</h3>
                  <p className="text-gray-700 text-lg">{project.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#029346] mb-3">Project Status</h3>
                  <p className={`inline-block px-4 py-2 rounded-full font-semibold ${
                    project.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#029346] mb-3">UN Sustainable Development Goals</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.sdgs.map((sdg) => (
                      <div key={sdg} className="bg-[#029346] text-white px-4 py-2 rounded-lg font-semibold">
                        SDG {sdg}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Quick Facts Box */}
            <div className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-xl p-8 sticky top-24 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Category</p>
                  <p className="text-lg font-bold text-[#029346]">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Location</p>
                  <p className="text-gray-700 font-medium">{project.location}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Status</p>
                  <p className={`inline-block px-3 py-1 rounded font-bold text-sm ${
                    project.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </p>
                </div>

                {project.sdgs.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Related SDGs</p>
                    <div className="flex flex-wrap gap-2">
                      {project.sdgs.map((sdg) => (
                        <span key={sdg} className="bg-white border-2 border-[#029346] text-[#029346] px-3 py-1 rounded font-bold text-sm">
                          {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button className="w-full mt-8 bg-[#F79021] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e1a] transition">
                Get Involved with This Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="bg-[#F0F9F4] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Related Projects</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore other programs and initiatives that complement this project
          </p>
          {/* Projects will be shown in related section */}
          <div className="text-center">
            <Link href="/projects" className="inline-block bg-[#029346] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0C4726] transition">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#029346] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Support This Initiative</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your support helps us continue this critical work. Donate, volunteer, or become a partner today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved/donate" className="bg-[#F79021] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e1a] transition">
              Donate Now
            </Link>
            <Link href="/get-involved" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/50">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
