// TODO: Build reusable Button component with variants (primary, secondary, ghost, danger),
// sizes (sm, md, lg), loading state, icon support, and disabled state.
import React from 'react';

export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }) {
  // TODO: Map variant and size to Tailwind classes
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
