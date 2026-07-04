// TODO: Build reusable Avatar component that renders initials from a name string,
// supports image URL fallback, configurable sizes (sm, md, lg, xl), and color themes.
import React from 'react';

export default function Avatar({ name = '', imageUrl = null, size = 'md', className = '' }) {
  // TODO: Extract initials from name, map size to Tailwind dimensions
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold ${className}`}>
      {imageUrl ? <img src={imageUrl} alt={name} className="rounded-full w-full h-full object-cover" /> : initials}
    </div>
  );
}
