import React from 'react';
import { notFound } from 'next/navigation';
import { storyTopics, type StoryTopic } from '../../components/sections/storyData';
import StoryInteractions from '../../components/stories/StoryInteractions';

type Props = {
  params: Promise<{ id: string }>;
};

function isVideoUrl(url?: string) {
  return !!url && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

async function fetchRemoteStory(id: string): Promise<StoryTopic | undefined> {
  try {
    const res = await fetch(`/api/communications/card/${encodeURIComponent(id)}`);
    if (!res.ok) return undefined;
    const card = await res.json();
    if (!card) return undefined;

    const gallerySource = Array.isArray(card.metadata?.gallery)
      ? card.metadata.gallery
      : Array.isArray(card.gallery)
      ? card.gallery
      : [];

    const imageUrl =
      card.imageUrl || gallerySource.find((item: any) => item?.type === 'image')?.url || '';
    const videoUrl =
      gallerySource.find((item: any) => item?.type === 'video')?.url ||
      (isVideoUrl(card.imageUrl) ? card.imageUrl : undefined);

    const heroMedia = videoUrl || imageUrl || '';
    const highlight = card.subtitle || card.description || card.metadata?.summary || '';
    const summary = card.description || card.subtitle || card.metadata?.summary || '';
    const contentText = card.description || card.body || card.summary || '';
    const content = contentText
      ? contentText.split(/\n{2,}/).map((paragraph: string) => paragraph.trim()).filter(Boolean)
      : [];

    const gallery = gallerySource
      .filter((item: any) => item?.url && item.type === 'image')
      .map((item: any) => item.url);

    return {
      id: card.slug || card.id || id,
      category: card.category || 'Other',
      theme: (card.metadata?.theme || 'Other') as StoryTopic['theme'],
      title: card.title || card.name || '',
      description: card.description || card.subtitle || '',
      summary,
      highlight,
      mediaType: videoUrl ? 'video' : 'image',
      media: heroMedia,
      gallery,
      content: content.length ? content : [card.description || card.body || ''],
    };
  } catch (error) {
    console.error('Failed to fetch story card', error);
    return undefined;
  }
}

export async function generateStaticParams() {
  return storyTopics.map((s) => ({ id: s.id }));
}

export default async function StoryDetail({ params }: Props) {
  const resolvedParams = await params;
  let story = storyTopics.find((s) => s.id === resolvedParams.id);

  if (!story) {
    story = await fetchRemoteStory(resolvedParams.id);
  }

  if (!story) return notFound();

  return (
    <main className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <a href="/stories" className="text-sm text-[#008000] font-semibold hover:text-[#026730]">
          ← Back to Stories
        </a>
      </div>

      <section className="mx-auto max-w-6xl px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-slate-900">{story.title}</h1>
        <p className="mt-4 text-slate-600">{story.highlight}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {story.mediaType === 'video' ? (
              <video controls className="w-full rounded-lg shadow">
                <source src={story.media} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={story.media} alt={story.title} className="w-full rounded-lg object-cover" />
            )}

            <article className="mt-6 prose max-w-none text-slate-800">
              {story.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-lg border bg-white p-4 shadow">
              <h3 className="text-sm font-semibold text-slate-900">Story details</h3>
              <dl className="mt-3 text-sm text-slate-600">
                <div className="flex justify-between py-2 border-t">
                  <dt>Category</dt>
                  <dd>{story.category}</dd>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <dt>Theme</dt>
                  <dd>{story.theme}</dd>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <dt>Media</dt>
                  <dd>{story.mediaType}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {story.gallery && story.gallery.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-2">
            {story.gallery.map((g, i) => (
              <img key={i} src={g} className="h-40 w-full object-cover rounded" />
            ))}
          </div>
        )}

        <div className="mt-8">
          <StoryInteractions storyId={story.id} initialComments={[]} initialLikes={0} />
        </div>
      </section>
    </main>
  );
}
