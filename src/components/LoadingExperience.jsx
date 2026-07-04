import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

const MESSAGES = [
  'Listening to the local alleys…',
  'Finding what the guidebooks missed…',
  'Asking the people who live here…',
  'Crafting your sensory journey…',
  'Weaving hidden gems into your path…',
  'Tuning in to the soul of the place…',
];

export default function LoadingExperience({ destination }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 max-w-sm mx-auto text-center">
      {/* Rotating compass */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-60" />
        <div className="relative p-6 bg-primary/10 rounded-full text-primary">
          <Compass
            className="w-10 h-10 animate-spin"
            style={{ animationDuration: '3s' }}
          />
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          Crafting your local journey
        </h2>
        {destination && (
          <p className="text-primary font-semibold text-sm">
            in {destination}
          </p>
        )}
      </div>

      {/* Cycling message */}
      <p
        key={messageIndex}
        className="text-muted-foreground text-sm font-light leading-relaxed transition-opacity duration-500"
      >
        {MESSAGES[messageIndex]}
      </p>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
