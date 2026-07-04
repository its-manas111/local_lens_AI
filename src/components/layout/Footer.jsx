// TODO: Extract Footer into a reusable layout component with:
// - Copyright + tagline
// - Future: social links, newsletter signup, sitemap links
import React from 'react';

export default function Footer() {
  // TODO: Add social icon row and hackathon attribution
  return (
    <footer className="border-t border-border/40 p-6 text-xs text-muted-foreground bg-muted/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} local_lens_AI. GenAI Hackathon MVP.</p>
        <p className="font-light">Designed for immersive, culture-first memories.</p>
      </div>
    </footer>
  );
}
