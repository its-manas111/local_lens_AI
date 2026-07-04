import React, { memo } from 'react';
import { Lightbulb } from 'lucide-react';
import { EXPERIENCE_TYPE_BADGE } from '../constants/experienceTypes';

function ExperienceCard({ exp, index }) {
  return (
    <article
      className="group bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-premium-hover transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      aria-label={`Experience ${index + 1}: ${exp.title}`}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {exp.time}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${EXPERIENCE_TYPE_BADGE[exp.type] || EXPERIENCE_TYPE_BADGE.Cultural}`}>
            {exp.type}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-medium" aria-hidden="true">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors">
        {exp.title}
      </h3>

      <p className="text-muted-foreground font-light text-sm leading-relaxed">
        {exp.description}
      </p>

      <div
        className="flex items-start gap-2.5 bg-accent/8 border border-accent/15 rounded-lg p-3.5"
        role="note"
        aria-label="Local tip"
      >
        <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-foreground/80 font-light leading-relaxed italic">
          {exp.localTip}
        </p>
      </div>
    </article>
  );
}

export default memo(ExperienceCard);