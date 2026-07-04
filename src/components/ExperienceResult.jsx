import React from 'react';
import {
  MapPin, Sparkles, Gem, User, Utensils, Clock,
  Lightbulb, MessageCircle, RotateCcw, ArrowRight
} from 'lucide-react';

const TYPE_COLORS = {
  Cultural: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  Culinary: 'bg-red-500/10 text-red-700 border-red-500/20',
  Nature: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  Social: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  Heritage: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
};

function Badge({ children, className = '' }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${className}`}>
      {children}
    </span>
  );
}

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

export default function ExperienceResult({ data, params, onReset }) {
  if (!data) return null;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 pb-16">

      {/* ── Hero Header ── */}
      <div className="bg-card border border-border rounded-lg p-8 flex flex-col gap-4 shadow-premium">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{params.destination}</span>
          <span className="text-border">·</span>
          <span className="italic">{params.mood}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight font-serif">
          {data.title}
        </h1>
        <p className="text-primary font-semibold text-lg italic">
          "{data.tagline}"
        </p>
        <p className="text-muted-foreground font-light leading-relaxed text-sm border-t border-border/40 pt-4">
          {data.story}
        </p>
      </div>

      {/* ── Experience Timeline ── */}
      <div className="flex flex-col gap-4">
        <SectionLabel icon={Clock} label="Your Day, Unfolded" />
        <div className="flex flex-col gap-4">
          {data.experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="group bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-premium-hover transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {exp.time}
                  </span>
                  <Badge className={TYPE_COLORS[exp.type] || TYPE_COLORS.Cultural}>
                    {exp.type}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  #{String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {exp.title}
              </h3>

              <p className="text-muted-foreground font-light text-sm leading-relaxed">
                {exp.description}
              </p>

              <div className="flex items-start gap-2.5 bg-accent/8 border border-accent/15 rounded-lg p-3.5">
                <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 font-light leading-relaxed italic">
                  {exp.localTip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hidden Gem + Food Moment (side by side on desktop) ── */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Hidden Gem */}
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6 flex flex-col gap-3">
          <SectionLabel icon={Gem} label="Hidden Gem" />
          <h3 className="font-bold text-lg">{data.hiddenGem.name}</h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            {data.hiddenGem.story}
          </p>
          <div className="flex items-start gap-2 mt-auto pt-3 border-t border-border/40">
            <ArrowRight className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-secondary font-semibold leading-relaxed">
              {data.hiddenGem.howToFind}
            </p>
          </div>
        </div>

        {/* Food Moment */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col gap-3">
          <SectionLabel icon={Utensils} label="Food Moment" />
          <h3 className="font-bold text-lg">{data.foodMoment.dish}</h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            {data.foodMoment.story}
          </p>
          <div className="flex items-start gap-2 mt-auto pt-3 border-t border-border/40">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-primary font-semibold leading-relaxed">
              {data.foodMoment.whereToFind}
            </p>
          </div>
        </div>
      </div>

      {/* ── Local Host ── */}
      <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-5">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
          {data.localHost.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div className="flex flex-col gap-1.5">
          <SectionLabel icon={User} label="Hosted by a Local" />
          <h3 className="font-bold text-lg -mt-2">{data.localHost.name}</h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            {data.localHost.bio}
          </p>
          <Badge className="w-fit mt-1 bg-accent/10 text-accent-foreground border-accent/20">
            <Sparkles className="w-3 h-3 inline mr-1" />
            {data.localHost.specialty}
          </Badge>
        </div>
      </div>

      {/* ── Community Tip ── */}
      <div className="flex items-start gap-3 bg-muted/40 border border-border/60 rounded-lg p-5">
        <MessageCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-sm font-light text-foreground/80 italic leading-relaxed">
          "{data.communityTip}"
        </p>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-border/40">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground rounded-lg text-sm font-semibold hover:text-foreground hover:bg-muted/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Start a New Journey
        </button>
      </div>
    </div>
  );
}
