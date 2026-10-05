// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'Verification code', type: 'text' },
        flow: { label: 'Authentication flow', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email) {
            console.warn('[next-auth] Missing email on authorize call');
            return null;
          }

          const isGuestFlow = credentials.flow === 'guest';
          if (isGuestFlow && !credentials.otp) return null;
          if (!isGuestFlow && !credentials.password) return null;

          const res = await fetch(`${BACKEND}/auth/${isGuestFlow ? 'guest/verify' : 'login'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(isGuestFlow
              ? { email: credentials.email, otp: credentials.otp }
              : { email: credentials.email, password: credentials.password, ...(credentials.otp ? { otp: credentials.otp } : {}) }),
          });

          if (!res.ok) {
            console.debug('[next-auth] Backend login failed for', credentials.email);
            return null;
          }

          const payload = await res.json();
          const user = payload.user;

          if (!user) return null;
          if (user.isActive === false) return null;
          console.debug('[next-auth] Authorize successful for', credentials.email);

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            avatar: user.avatar,
            isVerified: user.isVerified,
          };
        } catch (err) {
          console.error('[next-auth] authorize error:', err);
          // Returning null will cause NextAuth to return 401 — which is desired for auth failures.
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // `user` is typed via NextAuth augmentation to include `id`, `role` and `isVerified`
        token.role = ((user as unknown) as Record<string, unknown>).role as string;
        token.id = ((user as unknown) as Record<string, unknown>).id as string;
        token.isVerified = ((user as unknown) as Record<string, unknown>).isVerified as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as Record<string, unknown>).isVerified = token.isVerified as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    strategy: 'jwt'
  }
  ,
  // Provide a development fallback secret so NextAuth doesn't error during local builds
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret'
};