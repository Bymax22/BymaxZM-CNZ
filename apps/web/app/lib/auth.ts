// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

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

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              profile: true
            }
          });

          if (!user) {
            console.debug('[next-auth] No user found for', credentials.email);
            return null;
          }

          if (!user.isActive) {
            console.debug('[next-auth] User not active:', credentials.email);
            return null;
          }

          if (!user.password) {
            console.debug('[next-auth] User has no password set (possible SSO user):', credentials.email);
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (!passwordMatch) {
            console.debug('[next-auth] Password mismatch for', credentials.email);
            return null;
          }

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