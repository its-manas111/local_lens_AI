// Shared type → colour mappings used across ExperienceCard and LocalHostCard.
// Single source of truth; update here to cascade to both components.

export const EXPERIENCE_TYPE_BADGE = {
  Cultural: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  Culinary: 'bg-red-500/10 text-red-700 border-red-500/20',
  Nature:   'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  Social:   'bg-blue-500/10 text-blue-700 border-blue-500/20',
  Heritage: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
};

export const EXPERIENCE_TYPE_CHIP = {
  Cultural: 'bg-amber-500/10 text-amber-700',
  Culinary: 'bg-red-500/10 text-red-700',
  Nature:   'bg-emerald-500/10 text-emerald-700',
  Social:   'bg-blue-500/10 text-blue-700',
  Heritage: 'bg-purple-500/10 text-purple-700',
};

export const EXPERIENCE_TYPES = Object.keys(EXPERIENCE_TYPE_BADGE);