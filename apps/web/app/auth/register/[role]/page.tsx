import { notFound } from 'next/navigation';
import RegisterForm, { roleConfigMap, type RoleKey } from '@/components/RegisterForm';

interface RegisterRolePageProps {
  params: {
    role: string;
  };
}

export default function RegisterRolePage({ params }: RegisterRolePageProps) {
  const roleKey = params.role as RoleKey;
  if (!roleConfigMap[roleKey]) {
    notFound();
  }

  return <RegisterForm role={roleKey} />;
}
