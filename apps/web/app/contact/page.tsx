import Link from 'next/link';
export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">This page will provide contact information and a form.</p>
      <Link href="/" className="text-green-600 hover:underline">Back to Home</Link>
    </div>
  );
}