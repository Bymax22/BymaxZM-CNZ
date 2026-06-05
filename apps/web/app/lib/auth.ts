// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.warn('[next-auth] Missing credentials on authorize call');
            return null;
          }

          console.debug('[next-auth] Authorize attempt for:', credentials.email);

          // Proxy authentication to backend instead of using Prisma in the web package
          const res = await fetch(`${BACKEND}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
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
            avatar: user.avatar
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
        // `user` is typed via NextAuth augmentation to include `id` and `role`
        token.role = ((user as unknown) as Record<string, unknown>).role as string;
        token.id = ((user as unknown) as Record<string, unknown>).id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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