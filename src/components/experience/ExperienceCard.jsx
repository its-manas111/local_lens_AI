// TODO: Refactor ExperienceCard out of ExperienceResult into a standalone, reusable
// component. Should receive a single experience object and render the full card
// (time badge, type badge, title, description, local tip) with hover animation.
import React from 'react';

export default function ExperienceCard({ experience }) {
  // TODO: Extract from ExperienceResult.jsx experience timeline map
  if (!experience) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* TODO: Render time, type badge, title, description, localTip */}
      <p className="text-muted-foreground text-sm">[ExperienceCard placeholder — {experience.title}]</p>
    </div>
  );
}
