"use client";

import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  location?: string;
  province?: string;
  image?: string;
};

type ProjectForm = {
  title: string;
  description: string;
  status: string;
  location: string;
  province: string;
  image: string;
};

const defaultProjectForm: ProjectForm = {
  title: '',
  description: '',
  status: 'PLANNING',
  location: 'Zambia',
  province: 'Lusaka',
  image: '',
};

export default function StaffProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectForm>(defaultProjectForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/projects?limit=50');
      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  useEffect(() => {
    const source = new EventSource('/api/staff/updates');
    source.onmessage = async (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload?.resource === 'project') {
          await loadProjects();
          setMessage(`Project ${payload.action} successfully.`);
          window.setTimeout(() => setMessage(null), 4000);
        }
      } catch {
        // ignore
      }
    };
    source.onerror = () => source.close();
    return () => {
      source.close();
    };
  }, []);

  const openNew = () => {
    setSelectedProject(null);
    setForm(defaultProjectForm);
    setShowModal(true);
  };

  const startEdit = (project: Project) => {
    setSelectedProject(project);
    setForm({
      title: project.title,
      description: project.description || '',
      status: project.status || 'PLANNING',
      location: project.location || 'Zambia',
      province: project.province || 'Lusaka',
      image: project.image || '',
    });
    setShowModal(true);
  };

  const saveProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const method = selectedProject ? 'PUT' : 'POST';
      const endpoint = selectedProject ? `/api/staff/projects/${encodeURIComponent(selectedProject.id)}` : '/api/staff/projects';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Failed to save project');
        return;
      }
      await loadProjects();
      setShowModal(false);
      setSelectedProject(null);
      setForm(defaultProjectForm);
      setMessage(selectedProject ? 'Project updated.' : 'Project created.');
      window.setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Staff Project Management</h1>
            <p className="mt-2 text-sm text-slate-600">Create and update project summaries using staff-level proxy routes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={openNew} className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              New Project
            </button>
          </div>
        </div>

        {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
            <span className="text-sm text-slate-500">{projects.length} projects</span>
          </div>
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="py-8 text-center text-slate-500">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No projects available yet.</div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="h-16 w-24 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-slate-200 text-xs text-slate-500">No image</div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-500">{project.description || 'No description provided.'}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => startEdit(project)} className="rounded-2xl border border-emerald-600 px-4 py-2 text-sm text-emerald-600">Edit</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-6">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{selectedProject ? 'Edit Project' : 'New Project'}</h2>
                <p className="text-sm text-slate-500">Fill in the project details and save via the staff proxy.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-sm text-slate-600">Close</button>
            </div>
            <form onSubmit={saveProject} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-700">
                  Title
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
                </label>
                <label className="block text-sm text-slate-700">
                  Status
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                    <option value="PLANNING">Planning</option>
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </label>
              </div>
              <label className="block text-sm text-slate-700">
                Description
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-700">
                  Location
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
                </label>
                <label className="block text-sm text-slate-700">
                  Province
                  <input value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
                </label>
              </div>
              <label className="block text-sm text-slate-700">
                Image URL
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm text-slate-700">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">{saving ? 'Saving...' : selectedProject ? 'Update Project' : 'Create Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
