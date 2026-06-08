import { getServerSession } from 'next-auth';
import { authOptions } from '../app/lib/auth';

export const STAFF_ROLES = ['SUPER_ADMIN', 'ADMIN', 'STAFF'];

export async function requireStaffSession() {
  const session = await getServerSession(authOptions);
  return session && STAFF_ROLES.includes(session?.user?.role ?? '') ? session : null;
}
