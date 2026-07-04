// TODO: Extract Header into a reusable layout component with:
// - Logo + navigation links
// - Sticky + blur backdrop
// - Conditional "Back to Home" button based on current step
// - Future: user avatar + saved experiences count
import React from 'react';
import { Compass } from 'lucide-react';

export default function Header({ onLogoClick, showBack = false, onBack }) {
  // TODO: Accept activeStep prop and derive navigation state
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick}>
          <div className="p-2.5 bg-primary/10 rounded-full text-primary">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">local_lens_AI</span>
        </div>
        {showBack && (
          <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Back to Home
          </button>
        )}
      </div>
    </header>
  );
}
