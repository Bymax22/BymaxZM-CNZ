import Link from 'next/link';
export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Make a Donation</h1>
      <p className="mb-6">This page will allow you to support our work.</p>
      <Link href="/" className="text-green-600 hover:underline">Back to Home</Link>
    </div>
  );
}