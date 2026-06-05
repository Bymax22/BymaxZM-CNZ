import { notFound } from 'next/navigation';
import RegisterForm, { roleConfigMap, type RoleKey } from '@/components/RegisterForm';

export default async function RegisterRolePage({ params }: { params: Promise<{ role: string }> }) {
  const resolvedParams = await params;
  const roleKey = resolvedParams.role as RoleKey;

  if (!roleConfigMap[roleKey]) {
    notFound();
  }

  return <RegisterForm role={roleKey} />;
}
