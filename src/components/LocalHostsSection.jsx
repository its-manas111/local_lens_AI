import React from 'react';
import { Users } from 'lucide-react';
import LocalHostCard from './LocalHostCard';
import { useLocalHosts } from '../hooks/useLocalHosts';

export default function LocalHostsSection() {
  const { hosts, loading } = useLocalHosts();

  if (loading || !hosts.length) return null;

  return (
    <section className="flex flex-col gap-8 py-4">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 md:justify-start justify-center mb-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Community
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Hosted by Locals</h2>
        <p className="text-muted-foreground font-light mt-1">
          Real people. Real stories. Real places.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hosts.map((host, i) => (
          <div
            key={host.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <LocalHostCard host={host} />
          </div>
        ))}
      </div>
    </section>
  );
}