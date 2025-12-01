'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
          
          <p className="text-gray-600">
            {email ? (
              <>
                A verification link has been sent to <span className="font-medium text-gray-900">{decodeURIComponent(email)}</span>
              </>
            ) : (
              'A verification link has been sent to your email'
            )}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Email verification is currently in development. 
              You can proceed to login with your credentials.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <Link
            href="/auth/login"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition text-center block"
          >
            Go to Login
          </Link>
          
          <Link
            href="/"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg transition text-center block"
          >
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Didn't receive the email? Check your spam folder or{' '}
          <Link href="/auth/register" className="text-green-600 hover:text-green-700 font-medium">
            try again
          </Link>
        </p>
      </div>
    </div>
  );
}
