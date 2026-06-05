import Link from 'next/link';

type EventItem = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  meetingUrl?: string;
  platform?: string;
  host?: string;
  registrationUrl?: string;
};

async function getUpcomingWebinars() {
  const res = await fetch('/api/events?limit=10&upcoming=true&onlineOnly=true', { cache: 'no-store' });
  if (!res.ok) {
    console.error('Failed to fetch events', await res.text());
    return [] as EventItem[];
  }
  return (await res.json()) as EventItem[];
}

export default async function WebinarPage() {
  const events = await getUpcomingWebinars();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Webinar</p>
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">Upcoming webinars and online events</h1>
        <p className="mt-3 text-sm text-gray-600">
          Join our events to learn more about conservation, climate action, children&apos;s rights, and community development in Zambia.
        </p>

        <div className="mt-8 space-y-6">
          {events.length === 0 ? (
            <article className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">No upcoming webinars yet</h2>
              <p className="mt-2 text-sm text-gray-600">Please check back soon or sign up for updates from Care for Nature Zambia.</p>
            </article>
          ) : (
            events.map((event) => (
              <article key={event.id} className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{event.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{event.description}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Online webinar
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">When</p>
                    <p className="text-sm text-slate-900">{new Date(event.startDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Platform</p>
                    <p className="text-sm text-slate-900">{event.platform || 'Online meeting'}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Host</p>
                    <p className="text-sm text-slate-900">{event.host || 'Care for Nature Zambia'}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {event.registrationUrl ? (
                      <Link href={event.registrationUrl} target="_blank" className="inline-flex items-center rounded-full bg-[#029346] px-4 py-2 text-sm font-semibold text-white hover:bg-[#027437] transition-colors">
                        Register now
                      </Link>
                    ) : null}
                    {event.meetingUrl ? (
                      <Link href={event.meetingUrl} target="_blank" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-300 transition-colors">
                        Join meeting
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center rounded-full bg-[#029346] px-5 py-3 text-sm font-semibold text-white hover:bg-[#027437] transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
