'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/user/projects?limit=100');
        const data = await res.json();
        if (res.ok) setProjects(data.projects || []);
      } catch (err) {
        console.error('Failed to load user projects', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') fetchProjects();
  }, [status]);

  if (status === 'loading' || isLoading) return <div className="p-8">Loading projects...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {p.status}</p>
            </div>
          ))}
          {projects.length === 0 && <p className="text-sm text-gray-500">No projects found.</p>}
        </div>
      </div>
    </div>
  );
}
