import React from 'react';

/** WCAG 2.2 SC 2.4.1 — Bypass Blocks */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-premium"
    >
      Skip to main content
    </a>
  );
}