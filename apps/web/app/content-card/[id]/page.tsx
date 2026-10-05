import { notFound } from 'next/navigation';
import { ContentActions } from '../../components/ui/ContentActions';

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');

function isVideoUrl(value?: string) {
  return !!value && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(value);
}

function getCardType(cardType?: string) {
  const type = String(cardType || 'STORY').toUpperCase();
  if (type === 'EVENT' || type === 'PROJECT' || type === 'NEWS') return type;
  return 'STORY';
}

function getBackPath(type: string) {
  if (type === 'EVENT') return '/events';
  if (type === 'PROJECT') return '/projects';
  if (type === 'NEWS') return '/news';
  return '/stories';
}

export default async function ContentCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let response: Response;

  try {
    response = await fetch(`${BACKEND}/communications/cards/${encodeURIComponent(id)}`, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch content card for public detail page:', error);
    notFound();
  }

  if (!response.ok) notFound();
  const card = await response.json();
  if (String(card.status || '').toUpperCase() !== 'PUBLISHED') notFound();
  const type = getCardType(card.cardType);
  const metadata = card.metadata && typeof card.metadata === 'object' ? card.metadata : {};
  const gallery = Array.isArray(metadata.gallery) ? metadata.gallery : [];
  const galleryUrls = Array.isArray(metadata.galleryUrls) ? metadata.galleryUrls : [];
  const galleryAssets = [
    ...gallery.filter((item: any) => item?.url),
    ...galleryUrls.map((url: string) => ({ url, type: isVideoUrl(url) ? 'video' : 'image' })),
  ];
  const videoUrl = card.video
    || (isVideoUrl(card.imageUrl) ? card.imageUrl : '')
    || gallery.find((item: any) => item?.type === 'video' && item.url)?.url
    || gallery.find((item: any) => isVideoUrl(item?.url))?.url
    || galleryUrls.find((url: string) => isVideoUrl(url));
  const imageUrl = (!videoUrl && card.imageUrl)
    || gallery.find((item: any) => item?.type === 'image' && item.url)?.url
    || gallery.find((item: any) => item?.url && !isVideoUrl(item.url))?.url
    || galleryUrls.find((url: string) => !isVideoUrl(url))
    || '';
  const publishedAt = card.publishedAt || card.createdAt;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-8">
          <a href={getBackPath(type)} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            &larr; Back to {type.toLowerCase()}
          </a>
        </div>

        {videoUrl ? (
          <video controls playsInline preload="metadata" className="max-h-[70vh] w-full bg-black" poster={metadata.thumbnailUrl}>
            <source src={videoUrl} />
          </video>
        ) : imageUrl ? (
          <img src={imageUrl} alt={card.imageAlt || card.title} className="max-h-[70vh] w-full object-cover" />
        ) : null}

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <span>{card.category || type}</span>
            {publishedAt && <time dateTime={new Date(publishedAt).toISOString()}>{new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>}
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-950 sm:text-4xl">{card.title}</h1>
          {card.subtitle && <p className="mt-3 text-lg text-slate-700">{card.subtitle}</p>}
          {card.description && <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">{String(card.description).split(/\n{2,}/).map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}</div>}

          {galleryAssets.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleryAssets.map((item: any, index: number) => item?.url && (item.type === 'video' || isVideoUrl(item.url)) ? (
                <video key={`${item.url}-${index}`} src={item.url} controls playsInline className="aspect-video w-full rounded-lg bg-black object-cover" />
              ) : item?.url ? (
                <img key={`${item.url}-${index}`} src={item.url} alt={`${card.title} gallery ${index + 1}`} className="aspect-video w-full rounded-lg object-cover" />
              ) : null)}
            </div>
          )}

          <div className="mt-8">
            <ContentActions
              contentType={type.toLowerCase()}
              contentId={card.id}
              initialLikes={0}
              initialComments={0}
              initialShares={0}
              contextLabel={card.title}
            />
          </div>
        </div>
      </article>
    </main>
  );
}