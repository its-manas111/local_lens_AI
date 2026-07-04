import React, { memo } from 'react';
import { MapPin, Star, BadgeCheck } from 'lucide-react';
import { EXPERIENCE_TYPE_CHIP } from '../constants/experienceTypes';

function LocalHostCard({ host }) {
  const initials = host.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <article
      className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4 h-full hover:shadow-premium-hover transition-all duration-300"
      aria-label={`Local host: ${host.name}`}
    >
      {/* Avatar + identity */}
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-full ${host.avatarColor} flex items-center justify-center text-white font-bold text-lg shrink-0`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-base">{host.name}</h3>
            {host.verified && (
              <BadgeCheck
                className="w-4 h-4 text-primary shrink-0"
                aria-label="Verified host"
              />
            )}
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
            {host.location}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3 h-3 fill-accent text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold">{host.rating}</span>
            <span className="text-xs text-muted-foreground">({host.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Specialty */}
      <span className="w-fit text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/15">
        {host.specialty}
      </span>

      {/* Tagline */}
      <p className="text-sm text-muted-foreground font-light italic leading-relaxed line-clamp-2">
        "{host.tagline}"
      </p>

      {/* Experience type chips */}
      <div className="flex flex-wrap gap-1.5" aria-label="Experience types">
        {host.experienceTypes.map((type) => (
          <span
            key={type}
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${EXPERIENCE_TYPE_CHIP[type] || EXPERIENCE_TYPE_CHIP.Cultural}`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Languages */}
      <p className="text-[10px] text-muted-foreground/70 font-light">
        Speaks: {host.languages.join(' · ')}
      </p>

      {/* CTA */}
      <button
        type="button"
        className="mt-auto pt-3 border-t border-border/40 text-xs font-semibold text-primary hover:text-primary/70 transition-colors text-left cursor-pointer"
        aria-label={`View ${host.name}'s profile`}
      >
        View Profile →
      </button>
    </article>
  );
}

export default memo(LocalHostCard);