import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentActions } from '../../components/ui/ContentActions';
import { getNewsItemBySlug, news } from '../../components/sections/newsData';

export const dynamic = 'force-dynamic';

function truncateText(text: string, maxLength: number) {
  const normalized = String(text || '').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}…`;
}

function normalizeApiNewsItem(card: any) {
  const gallery = Array.isArray(card.metadata?.gallery) ? card.metadata.gallery : [];
  const imageUrl =
    card.imageUrl ||
    gallery.find((item: any) => item.type === 'image')?.url ||
    gallery[0]?.url ||
    '';
  const videoUrl =
    card.video ||
    gallery.find((item: any) => item.type === 'video')?.url ||
    (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(imageUrl) ? imageUrl : undefined);
  const contentText = card.body || card.description || card.subtitle || '';
  const content = typeof contentText === 'string'
    ? contentText.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean)
    : Array.isArray(contentText)
    ? contentText
    : [];

  return {
    id: String(card.id || card.slug || ''),
    slug: String(card.slug || card.id || ''),
    title: card.title || card.name || 'News story',
    excerpt: card.description || card.subtitle || truncateText(contentText, 220),
    content: content.length > 0 ? content : [String(contentText)],
    image: imageUrl,
    video: videoUrl,
    category: card.category || card.cardType || 'News',
    date: card.publishedAt || card.createdAt || card.metadata?.date || '',
    author: card.author || card.metadata?.author || 'Care for Nature Zambia',
    readTime: card.readTime || '2 min',
    tags: card.tags || card.metadata?.tags || [],
  };
}

type NormalizedNewsItem = ReturnType<typeof normalizeApiNewsItem>;

async function fetchNewsItemBySlug(slug: string): Promise<NormalizedNewsItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/communications/cards?cardType=NEWS&cardType=EVENT&take=100`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const cards = Array.isArray(data) ? data : data.cards || data.contentCards || [];
    const card = cards.find(
      (item: any) => String(item.slug) === slug || String(item.id) === slug || String(item.relatedId) === slug
    );
    return card ? normalizeApiNewsItem(card) : null;
  } catch (error) {
    console.error('Failed to load news item by slug:', error);
    return null;
  }
}

export async function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let newsItem = await fetchNewsItemBySlug(resolvedParams.slug);

  if (!newsItem) {
    const fallback = getNewsItemBySlug(resolvedParams.slug);
    if (fallback) {
      newsItem = normalizeApiNewsItem(fallback);
    }
  }

  if (!newsItem) {
    return {
      title: 'News item not found',
      description: 'The requested news story could not be found.',
    };
  }

  return {
    title: `${newsItem.title} | News`,
    description: newsItem.excerpt || '',
  };
}

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const resolvedParams = await params;
  let newsItem = await fetchNewsItemBySlug(resolvedParams.slug);

  if (!newsItem) {
    const fallback = getNewsItemBySlug(resolvedParams.slug);
    if (fallback) {
      newsItem = normalizeApiNewsItem(fallback);
    }
  }

  if (!newsItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[#029346] font-semibold mb-8 hover:text-[#0C4726]"
        >
          ← Back to News
        </Link>

        <article className="rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {newsItem.image ? (
            <div className="relative h-72 sm:h-96 w-full">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover"
              />
            </div>
          ) : newsItem.video ? (
            <div className="relative h-72 sm:h-96 w-full bg-black">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                src={newsItem.video}
              />
            </div>
          ) : null}

          <div className="bg-white p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-[#029346] font-semibold uppercase tracking-[0.15em]">
                  {newsItem.category}
                </p>
                <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
                  {newsItem.title}
                </h1>
              </div>
              <div className="text-sm text-gray-500">
                <p>{new Date(newsItem.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p>{newsItem.author} · {newsItem.readTime}</p>
              </div>
            </div>

            <div className="space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
              {newsItem.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {newsItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-10">
          <ContentActions
            contentType="news"
            contentId={newsItem.id || newsItem.slug}
            initialShares={8}
            initialLikes={0}
            initialComments={0}
            contextLabel={newsItem.title}
          />
        </div>
      </div>
    </main>
  );
}
