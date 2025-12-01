'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';

interface DonationForm {
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  message: string;
  isRecurring: boolean;
  projectId: string;
}

export default function DonatePage() {
  const [form, setForm] = useState<DonationForm>({
    amount: 50,
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    message: '',
    isRecurring: false,
    projectId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/donations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: form.amount,
          donorName: form.donorName,
          donorEmail: form.donorEmail,
          message: form.message,
          projectId: form.projectId || null,
          isRecurring: form.isRecurring,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to create checkout session');
        setLoading(false);
        return;
      }

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/get-involved"
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Get Involved
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <FaHeart className="text-red-500" />
            <span>Make a Donation</span>
          </h1>
          <p className="text-gray-600">
            Your generous donation helps us continue our conservation work across Zambia.
          </p>
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-green-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You for Your Donation!
              </h2>
              <p className="text-gray-600 mb-6">
                We appreciate your support. You will receive a receipt shortly.
              </p>
              <Link
                href="/get-involved"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Return to Get Involved
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Amount (ZMW)
                </label>
                <div className="flex gap-3 mb-3">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setForm({ ...form, amount: amt })}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        form.amount === amt
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ZMW {amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleInputChange}
                  min="1"
                  step="0.01"
                  placeholder="Custom amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="donorName"
                    value={form.donorName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="donorEmail"
                    value={form.donorEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="donorPhone"
                  value={form.donorPhone}
                  onChange={handleInputChange}
                  placeholder="+260 ..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="Leave a message or dedication"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Recurring Donation */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="recurring"
                  name="isRecurring"
                  checked={form.isRecurring}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-2 focus:ring-emerald-500"
                />
                <label htmlFor="recurring" className="ml-2 text-sm font-medium text-gray-700">
                  Make this a monthly recurring donation
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaHeart className="w-4 h-4" />
                    <span>Donate Now - ZMW {form.amount}</span>
                  </>
                )}
              </motion.button>

              {/* Security Notice */}
              <p className="text-xs text-gray-500 text-center">
                Your payment is secure. We use Stripe to process donations safely.
              </p>
            </form>
          )}
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
            <p className="text-gray-600">of donations go directly to conservation projects</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">Tax Deductible</div>
            <p className="text-gray-600">Your donation may be tax-deductible</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">Receipt</div>
            <p className="text-gray-600">You'll receive a receipt via email</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}