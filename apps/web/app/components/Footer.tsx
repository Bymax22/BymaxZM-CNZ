"use client";

import React, { useState, type FormEvent } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, source: 'footer' }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! You are subscribed to our newsletter.' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Unable to subscribe right now. Please try again later.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to subscribe right now. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#441f01] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h5 className="font-bold">Care for Nature Zambia</h5>
          <p className="text-sm text-white/80 mt-2">
            Care for Nature Zambia (CNZ) is a local not-for-profit Non-Governmental Organization working with diverse groups of people and institutions to promote nature conservation and human rights for the attainment of sustainable development in Zambia.
          </p>
        </div>
        <div>
          <h6 className="font-semibold">Quick Links</h6>
          <ul className="mt-2 text-sm space-y-1 text-white/90">
            <li>About Us</li>
            <li>Programs</li>
            <li>Impact</li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold">Programs</h6>
          <ul className="mt-2 text-sm space-y-1 text-white/90">
            <li>Nature Conservation Program-NCP</li>
            <li>Sustainable Mining Program -SMP</li>
            <li>Child Rights and Development Program-CRDP</li>
            <li>Organization Development Program - ODP</li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold">Subscribe to our Newsletter</h6>
          <p className="text-sm text-white/80 mt-2">Stay updated with our latest stories and initiatives.</p>
          <form onSubmit={handleSubscribe} className="mt-3 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 rounded text-black"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#ff6600] text-white rounded disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status.message ? (
            <p className={`mt-3 text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-amber-200'}`}>
              {status.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="bg-[#036b14] text-white text-sm py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div>© 2026 CaNZ. All rights reserved. Developed by Bymax Zambia</div>
          <div className="space-x-4">Privacy Policy • Terms of Use • Refund Policy</div>
        </div>
      </div>
    </footer>
  );
}
