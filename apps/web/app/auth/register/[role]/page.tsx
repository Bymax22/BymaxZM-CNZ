import { notFound } from 'next/navigation';
import RegisterForm, { roleConfigMap, type RoleKey } from '@/components/RegisterForm';

export default function RegisterRolePage({ params }: { params: { role: string } }) {
  const roleKey = params.role as RoleKey;
  if (!roleConfigMap[roleKey]) {
    notFound();
  }

  return <RegisterForm role={roleKey} />;
}
