import NextAuth from 'next-auth';
import { authOptions } from '../../../lib/auth';

// App Router API route for NextAuth
// Exposes /api/auth/* endpoints used by next-auth client and middleware.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
