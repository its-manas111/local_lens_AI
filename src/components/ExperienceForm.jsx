import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, MapPin, Smile, Hourglass, Calendar, Users, Search } from 'lucide-react';
import { destinations, moods, paces, timesOfDay, companions } from '../data/formOptions';

export default function ExperienceForm({ onSubmit, onBack }) {
  const [formStep, setFormStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedPace, setSelectedPace] = useState('slow');
  const [selectedTime, setSelectedTime] = useState('Dusk');
  const [selectedCompanion, setSelectedCompanion] = useState('Solo traveler');

  const handleNext = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      onSubmit({
        destination: destination === 'custom' ? customDestination : destination,
        mood: selectedMood,
        pace: selectedPace,
        time: selectedTime,
        companion: selectedCompanion
      });
    }
  };

  const handlePrev = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    } else {
      onBack();
    }
  };

  const getStepProgress = () => {
    return (formStep / 3) * 100;
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border rounded-lg shadow-premium p-6 md:p-10 flex flex-col gap-8 animate-scale-up">
      {/* Progress indicators */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          <span>Step {formStep} of 3</span>
          <span>{Math.round(getStepProgress())}% Complete</span>
        </div>
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${getStepProgress()}%` }}
          />
        </div>
      </div>

      {/* Step 1: Destination */}
      {formStep === 1 && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="text-primary w-6 h-6" />
              Where does your story take place?
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-1">
              Select one of our preset heritage hubs or type your own destination below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => {
                  setDestination(dest.name);
                  setCustomDestination('');
                }}
                className={`p-5 rounded-lg border text-left flex flex-col gap-2 transition-all duration-300 cursor-pointer ${destination === dest.name
                    ? `border-primary bg-primary/5 shadow-sm`
                    : `border-border/60 hover:border-border hover:bg-muted/10`
                  }`}
              >
                <span className="font-bold text-lg">{dest.name}</span>
                <span className="text-primary text-xs font-semibold italic">{dest.tagline}</span>
                <span className="text-muted-foreground text-xs font-light leading-relaxed">{dest.description}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Or wander somewhere else</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter any destination city/country..."
                value={customDestination}
                onChange={(e) => {
                  setDestination('custom');
                  setCustomDestination(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 bg-muted/40 border border-border rounded-lg focus:outline-none focus:border-primary text-sm transition-colors text-foreground"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Mood selection */}
      {formStep === 2 && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Smile className="text-primary w-6 h-6" />
              How do you want to feel today?
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-1">
              Our experience engine creates routes designed to capture these emotions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {moods.map((moodOpt) => (
              <button
                key={moodOpt.id}
                onClick={() => setSelectedMood(moodOpt.label)}
                className={`p-6 rounded-lg border text-left flex flex-col gap-3 transition-all duration-300 cursor-pointer ${selectedMood === moodOpt.label
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 hover:border-border hover:bg-muted/10'
                  }`}
              >
                <span className="font-bold text-lg text-foreground flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${moodOpt.color === 'amber' ? 'bg-amber-500' :
                      moodOpt.color === 'emerald' ? 'bg-emerald-600' :
                        moodOpt.color === 'indigo' ? 'bg-indigo-600' : 'bg-primary'
                    }`} />
                  {moodOpt.label}
                </span>
                <span className="text-muted-foreground text-xs font-light leading-relaxed">
                  {moodOpt.feeling}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Preferences */}
      {formStep === 3 && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-primary w-6 h-6" />
              Tune your experience pace & vibe
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-1">
              Add details to fit the experience closer to your rhythm.
            </p>
          </div>

          {/* Pace */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5" />
              Pace & Depth
            </span>
            <div className="grid md:grid-cols-2 gap-3">
              {paces.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPace(p.id)}
                  className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${selectedPace === p.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border/60 hover:bg-muted/10'
                    }`}
                >
                  <div className="font-bold text-sm">{p.label}</div>
                  <div className="text-muted-foreground text-xs font-light mt-0.5">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time of Day */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Time of Day
            </span>
            <div className="flex flex-wrap gap-2.5">
              {timesOfDay.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${selectedTime === time
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border/80 text-muted-foreground hover:border-border'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Companions */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Who are you sharing this with?
            </span>
            <div className="flex flex-wrap gap-2.5">
              {companions.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompanion(comp)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${selectedCompanion === comp
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border/80 text-muted-foreground hover:border-border'
                    }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center border-t border-border/40 pt-6 mt-2">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-semibold flex items-center gap-2 hover:text-foreground transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={
            (formStep === 1 && !destination) ||
            (formStep === 1 && destination === 'custom' && !customDestination) ||
            (formStep === 2 && !selectedMood)
          }
          className={`px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${((formStep === 1 && !destination) ||
              (formStep === 1 && destination === 'custom' && !customDestination) ||
              (formStep === 2 && !selectedMood))
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-primary/95 hover:shadow-sm'
            }`}
        >
          {formStep === 3 ? 'Generate Journey' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
