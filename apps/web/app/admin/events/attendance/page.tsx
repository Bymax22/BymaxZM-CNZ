'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, MapPin, Users, Mail, Phone, Building2, Download, ArrowLeft } from 'lucide-react';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registrationType: 'individual' | 'organization' | 'company';
  organizationName?: string;
  companyName?: string;
  position?: string;
  industry?: string;
  registeredAt: string;
}

interface EventDetails {
  id: string;
  title: string;
  description: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  location?: string;
  registrations: Registration[];
  totalRegistrations?: number;
}

export default function EventAttendancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'organization' | 'company'>('all');

  useEffect(() => {
    if (!eventId) {
      setError('Event ID is required');
      setLoading(false);
      return;
    }

    async function loadEvent() {
      try {
        const res = await fetch(`/api/admin/events/${eventId}?includeRegistrations=true`);
        if (!res.ok) {
          throw new Error('Failed to load event');
        }
        const data = await res.json();
        setEvent({
          ...data,
          totalRegistrations: data.totalRegistrations ?? data.registrations?.length ?? 0,
          date: data.date || data.startDate || '',
          time: data.time || '',
          location: data.location || '',
        });
      } catch (err) {
        console.error('Error loading event:', err);
        setError('Unable to load event details');
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  const filteredRegistrations = event
    ? event.registrations.filter(
        (reg) => filterType === 'all' || reg.registrationType === filterType
      )
    : [];

  const handleExportCSV = () => {
    if (!event || !event.registrations.length) return;

    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Type',
      'Organization/Company',
      'Position',
      'Industry',
      'Registered At',
    ];

    const rows = event.registrations.map((reg) => [
      reg.fullName,
      reg.email,
      reg.phone,
      reg.registrationType,
      reg.organizationName || reg.companyName || '-',
      reg.position || '-',
      reg.industry || '-',
      new Date(reg.registeredAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}-registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#008000] hover:text-[#006400] mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <p className="text-red-600">{error || 'Event not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#008000] hover:text-[#006400] mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#008000]" />
              {event.startDate ? new Date(event.startDate).toLocaleString() : `${event.date} ${event.time ? `at ${event.time}` : ''}`}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#008000]" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#008000]" />
              {event.totalRegistrations} registrations
            </div>
          </div>
        </div>

        {/* Registrations Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Event Registrations</h2>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#008000] text-white rounded-lg hover:bg-[#006400] transition-colors"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 flex flex-wrap gap-3">
            {['all', 'individual', 'organization', 'company'].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setFilterType(
                    type as 'all' | 'individual' | 'organization' | 'company'
                  )
                }
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === type
                    ? 'bg-[#008000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {type !== 'all' &&
                  ` (${event.registrations.filter((r) => r.registrationType === type).length})`}
              </button>
            ))}
          </div>

          {/* Registrations List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Organization/Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {reg.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a
                          href={`mailto:${reg.email}`}
                          className="text-[#008000] hover:underline flex items-center gap-1"
                        >
                          <Mail size={16} />
                          {reg.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a
                          href={`tel:${reg.phone}`}
                          className="text-[#008000] hover:underline flex items-center gap-1"
                        >
                          <Phone size={16} />
                          {reg.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            reg.registrationType === 'individual'
                              ? 'bg-blue-100 text-blue-800'
                              : reg.registrationType === 'organization'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {reg.registrationType.charAt(0).toUpperCase() +
                            reg.registrationType.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reg.organizationName || reg.companyName ? (
                          <div className="flex items-center gap-1">
                            <Building2 size={16} className="text-gray-400" />
                            {reg.organizationName || reg.companyName}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {reg.position || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No registrations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredRegistrations.length} of {event.totalRegistrations} total
              registrations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
