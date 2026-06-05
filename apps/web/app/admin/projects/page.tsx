'use client';

import { useEffect, useState } from 'react';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  manager?: { firstName: string; lastName: string; email: string };
}

interface ProjectForm {
  title: string;
  description: string;
  status: string;
  location: string;
  province: string;
  image?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    status: 'PLANNING',
    location: 'Zambia',
    province: 'Lusaka',
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects || []);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setProjects((prev) => [data.project, ...prev]);
        setMessage('Project created successfully.');
        setForm({ title: '', description: '', status: 'PLANNING', location: 'Zambia', province: 'Lusaka' });
      } else {
        setMessage(data.error || 'Failed to create project.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to create project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Projects</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Project Management</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Create and publish projects with real-time feedback, upload media via the upload page, and keep the project catalog up to date.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">New Project</h2>
              {message && (
                <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    rows={4}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Status</label>
                    <select
                      value={form.status}
                      onChange={(event) => setForm({ ...form, status: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="PLANNING">Planning</option>
                      <option value="ACTIVE">Active</option>
                      <option value="SUSPENDED">Suspended</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Province</label>
                    <input
                      value={form.province}
                      onChange={(event) => setForm({ ...form, province: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Location</label>
                    <input
                      value={form.location}
                      onChange={(event) => setForm({ ...form, location: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Image URL</label>
                    <input
                      value={form.image ?? ''}
                      onChange={(event) => setForm({ ...form, image: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                      placeholder="Paste Cloudinary image URL"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Create Project'}
                </button>
              </form>
              <p className="mt-4 text-sm text-slate-500">
                Need upload support? Use the <a href="/admin/upload" className="text-emerald-600 underline">upload page</a> to store images and paste the URL here.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Live Project Feed</h2>
              <p className="text-sm text-slate-500 mb-4">New projects appear here instantly after creation.</p>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-600">Status: {project.status}</p>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">{project.description}</p>
                    {project.manager && (
                      <p className="mt-3 text-xs text-slate-500">
                        Manager: {project.manager.firstName} {project.manager.lastName} ({project.manager.email})
                      </p>
                    )}
                  </div>
                ))}
                {projects.length === 0 && <p className="text-sm text-slate-500">No projects available yet.</p>}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
