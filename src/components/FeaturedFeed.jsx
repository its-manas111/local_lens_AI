import React, { memo } from 'react';
import { featuredExperiences } from '../data/featuredExperiences';
import { Sparkles, MapPin, User } from 'lucide-react';

function FeaturedFeed() {
  return (
    <section aria-labelledby="featured-heading" className="py-12 flex flex-col gap-8">
      <div className="text-center md:text-left">
        <h2 id="featured-heading" className="text-3xl font-bold tracking-tight">Immersive Previews</h2>
        <p className="text-muted-foreground font-light mt-1">A glimpse into stories waiting to be lived.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {featuredExperiences.map((exp) => (
          <article
            key={exp.id}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
            aria-label={exp.title}
          >
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  {exp.mood}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {exp.destination}
                </span>
              </div>

              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {exp.title}
              </h3>

              <p className="text-muted-foreground text-sm font-light leading-relaxed italic">
                "{exp.quote}"
              </p>
            </div>

            <div className="p-6 pt-0 mt-auto border-t border-border/40 bg-muted/20">
              <div className="flex items-center gap-3 mt-4">
                <div
                  className={`w-8 h-8 rounded-full ${exp.host.avatarColor} flex items-center justify-center text-white text-xs font-semibold`}
                  aria-hidden="true"
                >
                  {exp.host.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                    Hosted by {exp.host.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{exp.host.bio}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(FeaturedFeed);