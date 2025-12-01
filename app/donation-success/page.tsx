'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function DonationSuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId] = useState(searchParams.get('session_id'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FaCheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your donation has been successfully processed. We appreciate your support!
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            A receipt has been sent to your email address. Please check your inbox (and spam folder).
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/get-involved"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Explore More Ways to Help
          </Link>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-400 mt-6">Session ID: {sessionId.slice(0, 10)}...</p>
        )}
      </motion.div>
    </div>
  );
}
