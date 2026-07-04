import React from 'react';
import { BookmarkCheck, MapPin, Trash2, ArrowRight } from 'lucide-react';

function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function SavedJourneys({ saved, onLoad, onDelete }) {
  if (!saved.length) return null;

  return (
    <section className="flex flex-col gap-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BookmarkCheck className="w-6 h-6 text-primary" />
          My Saved Journeys
        </h2>
        <p className="text-muted-foreground font-light text-sm mt-1">
          {saved.length} journey{saved.length !== 1 ? 's' : ''} waiting to be re-lived.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saved.map((journey) => (
          <div
            key={journey.id}
            className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:shadow-premium-hover transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                {journey.params.destination}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground/60">
                  {timeAgo(journey.savedAt)}
                </span>
                <button
                  onClick={() => onDelete(journey.id)}
                  className="text-muted-foreground/40 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Remove saved journey"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-base leading-snug line-clamp-2 font-serif">
              {journey.data.title}
            </h3>

            <p className="text-muted-foreground text-xs italic font-light line-clamp-1">
              "{journey.data.tagline}"
            </p>

            <button
              onClick={() => onLoad(journey)}
              className="mt-auto pt-2 border-t border-border/40 flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-200 cursor-pointer"
            >
              Re-live this journey
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}