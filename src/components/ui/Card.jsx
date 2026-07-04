// TODO: Build reusable Card component with hover state, shadow levels,
// optional image header, clickable behavior, and border styles.
import React from 'react';

export default function Card({ children, onClick, className = '', hoverable = false }) {
  // TODO: Apply shadow-premium and hover:shadow-premium-hover based on hoverable prop
  return (
    <div
      onClick={onClick}
      className={`bg-card border border-border rounded-lg p-6 ${hoverable ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
