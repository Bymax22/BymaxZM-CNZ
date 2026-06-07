'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CloudinaryUploader from '../../components/admin/CloudinaryUploader';

interface AdminEvent {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  location?: string;
  durationMinutes?: number;
  type?: string;
  isPublic?: boolean;
  isOnline?: boolean;
  status?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

function parseMediaUrls(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function combineDateAndTime(dateString: string, timeString: string) {
  if (!dateString) return '';

  const datePart = dateString.split('T')[0] || dateString;
  const normalizedTime = timeString || '00:00';
  return `${datePart}T${normalizedTime}`;
}

function toDateTimeLocalString(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({ title: '', description: '' });
  const [imageUrl, setImageUrl] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('09:00');
  const [durationInput, setDurationInput] = useState('60');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('AWARENESS');
  const [status, setStatus] = useState('DRAFT');
  const [publishedAtInput, setPublishedAtInput] = useState('');
  const [partnerLogosInput, setPartnerLogosInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/events?limit=50');
        const data = await res.json();
        if (res.ok) {
          const eventsData = Array.isArray(data)
            ? data
            : data.events || data.items || [];
          setEvents(eventsData.map((evt: any) => ({
            id: evt.id,
            title: evt.title,
            description: evt.description,
            startDate: evt.startDate,
            endDate: evt.endDate,
            time: evt.time,
            location: evt.location,
            durationMinutes: evt.durationMinutes,
            type: evt.type,
            isPublic: evt.isPublic,
            isOnline: evt.isOnline,
            imageUrl: evt.imageUrl,
            createdAt: evt.createdAt,
            updatedAt: evt.updatedAt,
            status: evt.isPublic ? 'PUBLISHED' : 'DRAFT',
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  function startEdit(evt: AdminEvent) {
    setEditingId(evt.id);
    setForm({ title: evt.title || '', description: evt.description || '' });
    setImageUrl(evt.imageUrl || '');
    setDateInput(toDateTimeLocalString(evt.startDate || evt.createdAt || null));
    setTimeInput(evt.time || '09:00');
    setDurationInput(evt.durationMinutes?.toString() || '60');
    setLocation(evt.location || '');
    setEventType(evt.type || 'AWARENESS');
    setStatus(evt.isPublic ? 'PUBLISHED' : 'DRAFT');
    setPartnerLogosInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const startDateValue = dateInput ? new Date(combineDateAndTime(dateInput, timeInput)).toISOString() : new Date().toISOString();
      const endDateValue = new Date(new Date(startDateValue).getTime() + (Number(durationInput) || 60) * 60 * 1000).toISOString();

      const payload: any = {
        title: form.title,
        description: form.description,
        startDate: startDateValue,
        endDate: endDateValue,
        location,
        type: eventType,
        isPublic: status === 'PUBLISHED',
      };

      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/admin/events/${editingId}` : '/api/admin/events';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        const saved = data;
        if (editingId) {
          setEvents((prev) => prev.map((p) => (p.id === saved.id ? { ...p, ...saved, status: saved.isPublic ? 'PUBLISHED' : 'DRAFT' } : p)));
          setMessage('Event updated');
        } else {
          setEvents((prev) => [{ ...saved, status: saved.isPublic ? 'PUBLISHED' : 'DRAFT' }, ...prev]);
          setMessage('Event created');
        }

        // reset form
        setEditingId(null);
        setForm({ title: '', description: '' });
        setImageUrl('');
        setDateInput('');
        setTimeInput('09:00');
        setDurationInput('60');
        setLocation('');
        setEventType('AWARENESS');
        setStatus('DRAFT');
        setPublishedAtInput('');
        setPartnerLogosInput('');
      } else {
        setMessage(data.error || 'Save failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-600">Events</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Event and Webinar Management</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">Create and publish upcoming events shown on the public events pages and homepage.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">New Event</h2>
              <p className="mt-2 text-sm text-slate-500">Create an event card to appear on the public events listing and homepage.</p>
            </div>
          </div>

          {message && <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">{message}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Upload media</label>
              <div className="mt-2">
                <CloudinaryUploader onUpload={(u: string) => setImageUrl(u)} />
              </div>
              <p className="mt-2 text-xs text-slate-500">Or paste an image URL below.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Image URL</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" placeholder="https://.../image.jpg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" placeholder="Event title" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" placeholder="Location" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Type</label>
                <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                  <option value="VOLUNTEERING">Volunteering</option>
                  <option value="TRAINING">Training</option>
                  <option value="MEETING">Meeting</option>
                  <option value="FUNDRAISER">Fundraiser</option>
                  <option value="AWARENESS">Awareness</option>
                  <option value="TREE_PLANTING">Tree Planting</option>
                  <option value="CLEANUP">Cleanup</option>
                  <option value="WORKSHOP">Workshop</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Date (optional)</label>
                <input type="date" value={dateInput ? dateInput.split('T')[0] : ''} onChange={(e) => setDateInput(e.target.value ? `${e.target.value}T00:00` : '')} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Time</label>
                <input type="time" value={timeInput} onChange={(e) => setTimeInput(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Duration (minutes)</label>
                <input type="number" min="1" value={durationInput} onChange={(e) => setDurationInput(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Published date & time</label>
                <input type="datetime-local" value={publishedAtInput} onChange={(e) => setPublishedAtInput(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Partner logos (one URL per line)</label>
              <textarea value={partnerLogosInput} onChange={(e) => setPartnerLogosInput(e.target.value)} rows={3} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" placeholder="https://.../logo1.png\nhttps://.../logo2.png" />
              <p className="mt-2 text-xs text-slate-500">Optional logo URLs for partners or sponsors used on event cards.</p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={status === 'PUBLISHED'} onChange={(e) => setStatus(e.target.checked ? 'PUBLISHED' : 'DRAFT')} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                Publish immediately
              </label>

              <label className="text-sm text-slate-700">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded border-slate-300 text-sm">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            <div>
              <button disabled={saving} className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
                {saving ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent Events</h2>
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-slate-500">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-sm text-slate-500">No events created yet.</p>
            ) : (
              events.map((evt) => (
                <div key={evt.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                      {evt.imageUrl ? (
                        <img src={evt.imageUrl} alt={evt.title} className="h-16 w-24 object-cover rounded-md" />
                      ) : (
                        <div className="h-16 w-24 rounded-md bg-slate-200 flex items-center justify-center">No image</div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{evt.title}</h3>
                        <p className="text-sm text-slate-500">{evt.status === 'PUBLISHED' ? 'Published' : 'Draft'} • {evt.startDate ? new Date(evt.startDate).toLocaleString() : 'Not scheduled'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => router.push(`/admin/events/attendance?eventId=${evt.id}`)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Registrations
                      </button>
                      <button onClick={() => startEdit(evt)} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">{evt.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
