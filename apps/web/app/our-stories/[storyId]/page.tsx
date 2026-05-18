import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storyTopics } from '../../components/sections/storyData';

export async function generateStaticParams() {
  return storyTopics.map((story) => ({ storyId: story.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ storyId: string }> }) {
  const resolvedParams = await params;
  const story = storyTopics.find((item) => item.id === resolvedParams.storyId);

  return {
    title: story ? `${story.title} | Our Stories` : 'Story not found',
    description: story?.description || 'Read a full story from our story library.',
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ storyId: string }> }) {
  const resolvedParams = await params;
  const story = storyTopics.find((item) => item.id === resolvedParams.storyId);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--gray-50)] text-slate-900">
      <section className="bg-[var(--primary-green)] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
            Our Stories
          </p>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">{story.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-white/90">{story.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/our-stories"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Back to story library
            </Link>
            <span className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white/90">
              {story.category} • {story.theme}
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/10] bg-slate-100">
            {story.mediaType === 'video' ? (
              <video
                src={story.media}
                controls
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={story.media} alt={story.title} className="h-full w-full object-cover" />
            )}
          </div>
          <div className="space-y-6 p-8">
            <div className="rounded-3xl border border-[var(--primary-green)] bg-[var(--primary-green)]/5 px-5 py-4 text-sm font-semibold text-[var(--primary-green)]">
              {story.highlight}
            </div>
            <div className="space-y-5 text-slate-700">
              {story.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
