import React, { useState, useId } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, MapPin, Smile, Hourglass, Calendar, Users, Search } from 'lucide-react';
import { destinations, moods, paces, timesOfDay, companions } from '../data/formOptions';
import { sanitizeDestination, isValidDestination } from '../utils/sanitize';

const TOTAL_STEPS = 3;

export default function ExperienceForm({ onSubmit, onBack }) {
  const [formStep, setFormStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedPace, setSelectedPace] = useState('slow');
  const [selectedTime, setSelectedTime] = useState('Dusk');
  const [selectedCompanion, setSelectedCompanion] = useState('Solo traveler');

  const customInputId = useId();
  const progressId = useId();

  const progress = Math.round((formStep / TOTAL_STEPS) * 100);

  const canProceed =
    formStep === 1
      ? destination && (destination !== 'custom' || isValidDestination(customDestination))
      : formStep === 2
      ? Boolean(selectedMood)
      : true;

  const handleNext = () => {
    if (formStep < TOTAL_STEPS) {
      setFormStep((s) => s + 1);
    } else {
      onSubmit({
        destination: destination === 'custom' ? sanitizeDestination(customDestination) : destination,
        mood: selectedMood,
        pace: selectedPace,
        time: selectedTime,
        companion: selectedCompanion,
      });
    }
  };

  const handlePrev = () => {
    if (formStep > 1) {
      setFormStep((s) => s - 1);
    } else {
      onBack();
    }
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto bg-card border border-border rounded-lg shadow-premium p-6 md:p-10 flex flex-col gap-8 animate-scale-up"
      role="form"
      aria-label="Experience preferences form"
    >
      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div
          className="flex justify-between items-center text-xs font-semibold tracking-wider text-muted-foreground uppercase"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>Step {formStep} of {TOTAL_STEPS}</span>
          <span id={progressId}>{progress}% Complete</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-labelledby={progressId}
          className="w-full bg-muted h-1.5 rounded-full overflow-hidden"
        >
          <div
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1 — Destination */}
      {formStep === 1 && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="text-primary w-6 h-6" aria-hidden="true" />
              Where does your story take place?
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-1">
              Select one of our preset heritage hubs or type your own destination below.
            </p>
          </div>

          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Select a preset destination</legend>
            <div className="grid md:grid-cols-2 gap-4">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => { setDestination(dest.name); setCustomDestination(''); }}
                  aria-pressed={destination === dest.name}
                  className={`p-5 rounded-lg border text-left flex flex-col gap-2 transition-all duration-300 cursor-pointer ${
                    destination === dest.name
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border/60 hover:border-border hover:bg-muted/10'
                  }`}
                >
                  <span className="font-bold text-lg">{dest.name}</span>
                  <span className="text-primary text-xs font-semibold italic">{dest.tagline}</span>
                  <span className="text-muted-foreground text-xs font-light leading-relaxed">{dest.description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="border-t border-border/40 pt-6 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Or wander somewhere else
            </span>
            <div className="relative">
              <label htmlFor={customInputId} className="sr-only">
                Custom destination city or country
              </label>
              <input
                id={customInputId}
                type="text"
                placeholder="Enter any destination city/country…"
                value={customDestination}
                maxLength={100}
                onChange={(e) => {
                  setDestination('custom');
                  setCustomDestination(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 bg-muted/40 border border-border rounded-lg focus:outline-none focus:border-primary text-sm transition-colors text-foreground"
                aria-describedby="custom-dest-hint"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <p id="custom-dest-hint" className="sr-only">
              Type any city or country name (maximum 100 characters)
            </p>
          </div>
        </div>
      )}

      {/* Step 2 — Mood */}
      {formStep === 2 && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Smile className="text-primary w-6 h-6" aria-hidden="true" />
              How do you want to feel today?
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-1">
              Our experience engine creates routes designed to capture these emotions.
            </p>
          </div>

          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Select your mood</legend>
            <div className="grid md:grid-cols-2 gap-4">
              {moods.map((moodOpt) => (
                <button
                  key={moodOpt.id}
                  type="button"
                  onClick={() => setSelectedMood(moodOpt.label)}
                  aria-pressed={selectedMood === moodOpt.label}
                  className={`p-6 rounded-lg border text-left flex flex-col gap-3 transition-all duration-300 cursor-pointer ${
                    selectedMood === moodOpt.label
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border/60 hover:border-border hover:bg-muted/10'
                  }`}
                >
                  <span className="font-bold text-lg text-foreground flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        moodOpt.color === 'amber'   ? 'bg-amber-500' :
                        moodOpt.color === 'emerald' ? 'bg-emerald-600' :
                        moodOpt.color === 'indigo'  ? 'bg-indigo-600' : 'bg-primary'
                      }`}
                      aria-hidden="true"
                    />
                    {moodOpt.label}
                  </span>
                  <span className="text-muted-foreground text-xs font-light leading-relaxed">
                    {moodOpt.feeling}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* Step 3 — Preferences */}
      {formStep === 3 && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-primary w-6 h-6" aria-hidden="true" />
              Tune your experience pace &amp; vibe
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-1">
              Add details to fit the experience closer to your rhythm.
            </p>
          </div>

          {/* Pace */}
          <fieldset className="border-0 p-0 m-0 flex flex-col gap-3">
            <legend className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5" aria-hidden="true" />
              Pace &amp; Depth
            </legend>
            <div className="grid md:grid-cols-2 gap-3">
              {paces.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPace(p.id)}
                  aria-pressed={selectedPace === p.id}
                  className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedPace === p.id ? 'border-primary bg-primary/5' : 'border-border/60 hover:bg-muted/10'
                  }`}
                >
                  <div className="font-bold text-sm">{p.label}</div>
                  <div className="text-muted-foreground text-xs font-light mt-0.5">{p.description}</div>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Time of Day */}
          <fieldset className="border-0 p-0 m-0 flex flex-col gap-3">
            <legend className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              Time of Day
            </legend>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Time of day options">
              {timesOfDay.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  aria-pressed={selectedTime === time}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                    selectedTime === time
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border/80 text-muted-foreground hover:border-border'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Companions */}
          <fieldset className="border-0 p-0 m-0 flex flex-col gap-3">
            <legend className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              Who are you sharing this with?
            </legend>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Companion options">
              {companions.map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setSelectedCompanion(comp)}
                  aria-pressed={selectedCompanion === comp}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                    selectedCompanion === comp
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border/80 text-muted-foreground hover:border-border'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center border-t border-border/40 pt-6 mt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="px-5 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-semibold flex items-center gap-2 hover:text-foreground transition-all cursor-pointer"
          aria-label={formStep === 1 ? 'Go back to home' : `Go back to step ${formStep - 1}`}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          aria-disabled={!canProceed}
          className={`px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
            canProceed
              ? 'cursor-pointer hover:bg-primary/95 hover:shadow-sm'
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          {formStep === TOTAL_STEPS ? 'Generate Journey' : 'Continue'}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}