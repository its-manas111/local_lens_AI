import React from 'react';
import { Lightbulb } from 'lucide-react';

const TYPE_COLORS = {
  Cultural: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  Culinary: 'bg-red-500/10 text-red-700 border-red-500/20',
  Nature: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  Social: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  Heritage: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
};

export default function ExperienceCard({ exp, index }) {
  return (
    <div
      className="group bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-premium-hover transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {exp.time}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${TYPE_COLORS[exp.type] || TYPE_COLORS.Cultural}`}>
            {exp.type}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors">
        {exp.title}
      </h3>

      <p className="text-muted-foreground font-light text-sm leading-relaxed">
        {exp.description}
      </p>

      <div className="flex items-start gap-2.5 bg-accent/8 border border-accent/15 rounded-lg p-3.5">
        <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80 font-light leading-relaxed italic">
          {exp.localTip}
        </p>
      </div>
    </div>
  );
}