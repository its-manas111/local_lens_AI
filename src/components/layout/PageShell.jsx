// TODO: PageShell wraps every full-page view with consistent header + footer layout,
// max-width container, and responsive padding. Replace inline layout in App.jsx.
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function PageShell({ children, onLogoClick, showBack = false, onBack }) {
  // TODO: Accept meta props (title, description) for future per-page SEO
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onLogoClick={onLogoClick} showBack={showBack} onBack={onBack} />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
