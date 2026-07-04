// TODO: Build reusable EmptyState component with customizable icon, title, description,
// and optional CTA button. Used when lists or feeds have no data to show.
import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', description = '', action = null }) {
  // TODO: Add subtle animation and premium styling
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="p-4 bg-muted rounded-full text-muted-foreground">
        <Icon className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground font-light">{description}</p>}
      </div>
      {action}
    </div>
  );
}
