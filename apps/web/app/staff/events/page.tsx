"use client";

import { useEffect, useState } from 'react';

type EventItem = {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  image?: string;
};

type EventForm = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
};

const defaultEventForm: EventForm = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  imageUrl: '',
};

export default function StaffEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [form, setForm] = useState<EventForm>(defaultEventForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/events?limit=50');
      const data = await res.json();
      if (res.ok) {
        setEvents((data.events || []).map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          image: event.imageUrl,
        })));
      }
    } catch (error) {
      console.error('Failed to load events', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEvents();
  }, []);

  useEffect(() => {
    const source = new EventSource('/api/staff/updates');
    source.onmessage = async (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload?.resource === 'event') {
          await loadEvents();
          setMessage(`Event ${payload.action} successfully.`);
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
    setSelectedEvent(null);
    setForm(defaultEventForm);
    setShowModal(true);
  };

  const startEdit = (eventItem: EventItem) => {
    setSelectedEvent(eventItem);
    setForm({
      title: eventItem.title,
      description: eventItem.description || '',
      startDate: eventItem.startDate ? eventItem.startDate.slice(0, 16) : '',
      endDate: eventItem.endDate ? eventItem.endDate.slice(0, 16) : '',
      location: eventItem.location || '',
      imageUrl: eventItem.image || '',
    });
    setShowModal(true);
  };

  const saveEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const method = selectedEvent ? 'PUT' : 'POST';
      const endpoint = selectedEvent ? `/api/staff/events/${encodeURIComponent(selectedEvent.id)}` : '/api/staff/events';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          startDate: form.startDate,
          endDate: form.endDate,
          location: form.location,
          imageUrl: form.imageUrl || undefined,
          type: 'IN_PERSON',
          isOnline: false,
          isPublic: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Failed to save event');
        return;
      }
      await loadEvents();
      setShowModal(false);
      setSelectedEvent(null);
      setForm(defaultEventForm);
      setMessage(selectedEvent ? 'Event updated.' : 'Event created.');
      window.setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try {
      const res = await fetch(`/api/staff/events/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Failed to delete event');
        return;
      }
      await loadEvents();
      setMessage('Event deleted.');
      window.setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Staff Event Management</h1>
            <p className="mt-2 text-sm text-slate-600">Review, create, and update events using staff proxy routes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={openNew} className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">New Event</button>
          </div>
        </div>

        {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Events</h2>
            <span className="text-sm text-slate-500">{events.length} events</span>
          </div>
          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="py-8 text-center text-slate-500">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No events available.</div>
            ) : (
              events.map((eventItem) => (
                <div key={eventItem.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{eventItem.title}</h3>
                      <p className="text-sm text-slate-500">{eventItem.location || 'No location provided'} • {eventItem.startDate ? new Date(eventItem.startDate).toLocaleString() : 'No start date'}</p>
                      <p className="mt-2 text-sm text-slate-600">{eventItem.description || 'No description yet.'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => startEdit(eventItem)} className="rounded-2xl border border-emerald-600 px-4 py-2 text-sm text-emerald-600">Edit</button>
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
                <h2 className="text-xl font-semibold text-slate-900">{selectedEvent ? 'Edit Event' : 'New Event'}</h2>
                <p className="text-sm text-slate-500">Create or update event details for the staff portal.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-sm text-slate-600">Close</button>
            </div>
            <form onSubmit={saveEvent} className="mt-6 space-y-4">
              <label className="block text-sm text-slate-700">
                Title
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </label>
              <label className="block text-sm text-slate-700">
                Description
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-700">
                  Start Date
                  <input type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
                </label>
                <label className="block text-sm text-slate-700">
                  End Date
                  <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
                </label>
              </div>
              <label className="block text-sm text-slate-700">
                Location
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </label>
              <label className="block text-sm text-slate-700">
                Image URL
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm text-slate-700">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">{saving ? 'Saving...' : selectedEvent ? 'Update Event' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
