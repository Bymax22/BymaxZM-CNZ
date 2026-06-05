import { notFound } from 'next/navigation';
import RegisterForm, { roleConfigMap, type RoleKey } from '@/components/RegisterForm';

type RegisterRoleParams = {
  role?: string;
  nxtProle?: string;
};

export default async function RegisterRolePage({ params }: { params: Promise<RegisterRoleParams> }) {
  const resolvedParams = await params;
  const roleKey = (resolvedParams.role ?? resolvedParams.nxtProle) as RoleKey;

  if (!roleKey || !roleConfigMap[roleKey]) {
    notFound();
  }

  return <RegisterForm role={roleKey} />;
}
