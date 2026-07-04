// TODO: Build reusable Badge component with variants (mood, type, status, destination)
// and size support. Should match the color system in ExperienceResult.jsx.
import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  // TODO: Map variant to color tokens from index.css
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${className}`}>
      {children}
    </span>
  );
}
