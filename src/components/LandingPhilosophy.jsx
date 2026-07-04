import React, { memo } from 'react';
import { Eye, Heart } from 'lucide-react';

function LandingPhilosophy() {
  return (
    <section aria-labelledby="philosophy-heading" className="py-12 border-y border-border my-8">
      <h2 id="philosophy-heading" className="sr-only">Our philosophy: local lens vs tourist lens</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-6 bg-card rounded-lg border border-border/65 flex flex-col gap-4">
          <div className="p-3 bg-muted text-muted-foreground rounded-full w-fit" aria-hidden="true">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-muted-foreground">The Tourist Lens</h3>
          <p className="text-muted-foreground/80 text-sm leading-relaxed">
            Taking selfies at crowded monuments, checking off sights, eating frozen factory meals, and following standard maps that view cities as museums.
          </p>
        </div>

        <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 flex flex-col gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-full w-fit" aria-hidden="true">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-primary">The Local Lens</h3>
          <p className="text-foreground/90 text-sm leading-relaxed">
            Grinding toasted chilies in family backyards, listening to temple moss breathe at dawn, sharing story-led tea, and building genuine human connections.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(LandingPhilosophy);