// TODO: Build reusable Input component with label, placeholder, error state,
// leading icon support, helper text, and focus ring matching design system.
import React from 'react';

export default function Input({ label, placeholder, value, onChange, error, icon: Icon, className = '' }) {
  // TODO: Apply focus:border-primary, error state styles, icon positioning
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 pr-4 ${Icon ? 'pl-10' : 'pl-4'} bg-muted/40 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors ${className}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
