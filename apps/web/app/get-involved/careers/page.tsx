import Link from 'next/link';
export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Careers</h1>
      <p className="mb-6">This page will list open positions and career opportunities.</p>
      <Link href="/" className="text-green-600 hover:underline">Back to Home</Link>
    </div>
  );
}