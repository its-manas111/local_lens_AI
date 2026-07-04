import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

export default function LandingHero({ onBegin }) {
  return (
    <section className="relative py-12 md:py-20 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-2">
        <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        <span>A new way to wander</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-foreground">
        Travel by <span className="text-primary italic font-serif">feeling</span>, not by checklist.
      </h1>
      
      <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl leading-relaxed">
        We don't recommend landmarks. We handcraft emotional, sensory journeys. Experience destinations through the eyes of the locals who keep their stories alive.
      </p>
      
      <button 
        onClick={onBegin}
        className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-lg group cursor-pointer"
      >
        Begin Your Journey
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
}
