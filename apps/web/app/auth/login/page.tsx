// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import AuthErrorModal from '../../components/AuthErrorModal';
import { useAuthError } from '../../hooks/useAuthError';
import { roleConfigMap, type RoleKey } from '@/components/RegisterForm';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get('role') || undefined;
  const selectedRoleKey = selectedRole && roleConfigMap[selectedRole as RoleKey] ? (selectedRole as RoleKey) : undefined;
  const selectedRoleLabel = selectedRoleKey
    ? roleConfigMap[selectedRoleKey].title.replace(/ Registration$/, '')
    : selectedRole
      ? selectedRole.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
      : undefined;
  const { error, isOpen, showError, showSuccess, clearError } = useAuthError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        showError(result.error === 'CredentialsSignin' ? 'Invalid email or password' : result.error);
        setIsLoading(false);
        return;
      }

      if (!result?.ok) {
        showError('Login failed. Please try again.');
        setIsLoading(false);
        return;
      }

      showSuccess('Login successful! Redirecting...');

      const redirectByRole = (role: string | undefined) => {
        switch (role) {
          case 'SUPER_ADMIN':
          case 'ADMIN':
            return '/admin/dashboard';
          case 'STAFF':
          case 'PROJECT_MANAGER':
          case 'FINANCE_OFFICER':
          case 'VOLUNTEER_COORDINATOR':
          case 'FIELD_OFFICER':
            return '/staff/dashboard';
          case 'DONOR':
            return '/donor/dashboard';
          case 'CLUB_LEADER':
            return '/club/dashboard';
          default:
            return '/portal/dashboard';
        }
      };

      const getSessionRole = async (): Promise<string | undefined> => {
        const maxAttempts = 6;
        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
          try {
            const response = await fetch('/api/auth/session', { cache: 'no-store' });
            if (!response.ok) {
              continue;
            }
            const session = await response.json();
            const userRole = session?.user?.role;
            if (userRole) {
              return userRole;
            }
          } catch {
            // swallow error and retry
          }

          await new Promise((resolve) => setTimeout(resolve, 400));
        }
        return undefined;
      };

      const userRole = await getSessionRole();
      router.push(redirectByRole(userRole));
    } catch (err) {
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthErrorModal
        type={error?.type}
        title={error?.title}
        message={error?.message || ''}
        isOpen={isOpen}
        onClose={clearError}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4"
          >
            <Image
              src="/Care for Nature logo d-site-01.png"
              alt="Care for Nature Zambia"
              width={60}
              height={60}
              priority
            />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedRole ? `Login as ${selectedRoleLabel}` : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {selectedRole ? `Sign in to your ${selectedRoleLabel} account` : 'Sign in to your CNZ Portal account'}
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
              <button
                type="button"
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                disabled={isLoading}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href={selectedRole ? `/auth/register/${selectedRole}` : '/auth/register'}
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Sign up now
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login (Optional) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isLoading}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Google
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Facebook
          </button>
        </div>
      </motion.div>
    </div>
  );
}
