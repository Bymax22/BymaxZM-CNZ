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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            profile: true
          }
        });

        if (!user || !user.isActive) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          avatar: user.avatar
        };
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