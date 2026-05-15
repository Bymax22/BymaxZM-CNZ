import Link from 'next/link';

export default function CommunityStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Our Stories — Community Engagement</h1>
      <p className="mb-6 max-w-xl text-center">Stories showcasing community engagement, clean-ups, and local impact.</p>
      <Link href="/our-stories" className="text-[var(--primary-green)] font-semibold">Back to Our Stories</Link>
    </div>
  );
}
