import React, { useState } from 'react';
import {
  MapPin, Sparkles, Gem, User, Utensils, Clock,
  MessageCircle, RotateCcw, ArrowRight, Share2, Bookmark, BookmarkCheck,
} from 'lucide-react';
import ExperienceCard from './ExperienceCard';

const MOOD_ACCENTS = {
  'Reflective & Regal':     'border-amber-400/25 bg-amber-50/60',
  'Peaceful & Meditative':  'border-emerald-400/25 bg-emerald-50/60',
  'Connected & Warm':       'border-rose-400/25 bg-rose-50/60',
  'Curious & Mysterious':   'border-purple-400/25 bg-purple-50/60',
};

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

export default function ExperienceResult({ data, params, onReset, onSave, isSaved }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const heroAccent = MOOD_ACCENTS[params?.mood] || 'border-border bg-card';

  const handleShare = async () => {
    const text = `${data.title}\n"${data.tagline}"\n\n📍 ${params.destination} · ${params.mood}\n\nCrafted by local_lens_AI — travel by feeling, not by checklist.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: data.title, text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled share dialog
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 pb-16 animate-fade-in">

      {/* ── Hero Header ── */}
      <div className={`border rounded-lg p-8 flex flex-col gap-4 shadow-premium ${heroAccent}`}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{params.destination}</span>
          <span className="text-border">·</span>
          <span className="italic">{params.mood}</span>
          <span className="text-border">·</span>
          <span>{params.companion}</span>
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
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>

      {/* ── Hidden Gem + Food Moment ── */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6 flex flex-col gap-3">
          <SectionLabel icon={Gem} label="Hidden Gem" />
          <h3 className="font-bold text-lg font-serif">{data.hiddenGem.name}</h3>
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

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col gap-3">
          <SectionLabel icon={Utensils} label="Food Moment" />
          <h3 className="font-bold text-lg font-serif">{data.foodMoment.dish}</h3>
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
          {data.localHost.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div className="flex flex-col gap-1.5">
          <SectionLabel icon={User} label="Hosted by a Local" />
          <h3 className="font-bold text-lg -mt-2">{data.localHost.name}</h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            {data.localHost.bio}
          </p>
          <span className="w-fit mt-1 text-xs font-semibold px-2.5 py-1 rounded-full border bg-accent/10 text-accent-foreground border-accent/20">
            <Sparkles className="w-3 h-3 inline mr-1" />
            {data.localHost.specialty}
          </span>
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
          onClick={onSave}
          disabled={isSaved}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            isSaved
              ? 'bg-secondary/10 text-secondary border border-secondary/20 cursor-default'
              : 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm hover:shadow-premium'
          }`}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          {isSaved ? 'Journey Saved' : 'Save Journey'}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground rounded-lg text-sm font-semibold hover:text-foreground hover:bg-muted/10 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          {copied ? 'Copied to clipboard!' : 'Share'}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground rounded-lg text-sm font-semibold hover:text-foreground hover:bg-muted/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          New Journey
        </button>
      </div>
    </div>
  );
}