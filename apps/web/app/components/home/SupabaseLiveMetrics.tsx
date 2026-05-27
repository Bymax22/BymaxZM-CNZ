'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase, supabaseEnabled } from '../../../lib/supabaseClient';

const formatCount = (count: number | null) => (count === null ? '—' : count.toLocaleString());

export default function SupabaseLiveMetrics() {
  const [projectsCount, setProjectsCount] = useState<number | null>(null);
  const [impactMetricsCount, setImpactMetricsCount] = useState<number | null>(null);
  const [status, setStatus] = useState('idle');
  const [events, setEvents] = useState<string[]>([]);

  const projectChannelName = useMemo(() => 'realtime-projects', []);

  useEffect(() => {
    if (!supabaseEnabled || !supabase) {
      setStatus('Supabase client is not configured.');
      return;
    }

    let unsubscribe = () => {};

    const loadCounts = async () => {
      setStatus('fetching counts');
      try {
        const projectRes = await supabase
          .from('projects')
          .select('id', { count: 'exact', head: true });

        const metricsRes = await supabase
          .from('impact_metrics')
          .select('id', { count: 'exact', head: true });

        setProjectsCount(projectRes.count ?? null);
        setImpactMetricsCount(metricsRes.count ?? null);
        setStatus('connected');
      } catch (error) {
        console.error('Supabase LiveMetrics load error:', error);
        setStatus('error reading Supabase data');
      }
    };

    const subscribeToChanges = async () => {
      const channel = supabase
        .channel(projectChannelName)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'projects' },
          async (payload) => {
            setEvents((current) => [
              `Projects ${payload.eventType}: ${payload.new?.id ?? payload.old?.id ?? 'unknown'}`,
              ...current.slice(0, 4),
            ]);
            await loadCounts();
          }
        )
        .subscribe();

      unsubscribe = async () => {
        await supabase.removeChannel(channel);
      };
    };

    loadCounts();
    subscribeToChanges();

    return () => {
      unsubscribe();
    };
  }, [projectChannelName]);

  return (
    <section className="relative overflow-hidden py-12 bg-slate-950 text-white">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-8 sm:flex sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Realtime Supabase DB</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Live database status from Supabase
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Verifies Supabase connectivity and listens for project updates in real time.
            </p>
          </div>
          <div className="mt-5 sm:mt-0">
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 ring-1 ring-emerald-200/10">
              {status}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Projects</p>
            <p className="mt-5 text-4xl font-semibold text-white">{formatCount(projectsCount)}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Impact metrics</p>
            <p className="mt-5 text-4xl font-semibold text-white">{formatCount(impactMetricsCount)}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 col-span-2">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Recent realtime events</p>
            <div className="mt-5 space-y-3 text-sm text-slate-200">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <div key={`${event}-${index}`} className="rounded-2xl bg-slate-900/80 p-3">
                    {event}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-slate-900/80 p-3 text-slate-400">
                  Waiting for updates...
                </div>
              )}
            </div>
          </div>
        </div>

        {!supabaseEnabled && (
          <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6 text-sm text-amber-100">
            <p className="font-medium">Supabase is not configured for the frontend.</p>
            <p className="mt-2 text-amber-200">Set <code className="rounded bg-slate-950 px-1 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="rounded bg-slate-950 px-1 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in production.</p>
          </div>
        )}
      </div>
    </section>
  );
}
