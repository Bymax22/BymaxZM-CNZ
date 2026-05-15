import Link from 'next/link';

export default function ChildrenStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Our Stories — Children</h1>
      <p className="mb-6 max-w-xl text-center">Stories about child rights, school clubs, and youth-led environmental education.</p>
      <Link href="/our-stories" className="text-[var(--primary-green)] font-semibold">Back to Our Stories</Link>
    </div>
  );
}
