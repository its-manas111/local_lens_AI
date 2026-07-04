import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import LandingHero from './components/LandingHero';
import LandingPhilosophy from './components/LandingPhilosophy';
import FeaturedFeed from './components/FeaturedFeed';
import ExperienceForm from './components/ExperienceForm';

function App() {
  const [step, setStep] = useState('landing');
  const [journeyParams, setJourneyParams] = useState(null);

  const startJourney = () => {
    setStep('form');
  };

  const handleFormSubmit = (params) => {
    setJourneyParams(params);
    setStep('generating');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground animate-fade-in">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStep('landing')}>
            <div className="p-2.5 bg-primary/10 rounded-full text-primary animate-pulse">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">local_lens_AI</span>
          </div>
          {step !== 'landing' && (
            <button 
              onClick={() => setStep('landing')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Main Screen Router */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">
        {step === 'landing' && (
          <div className="flex flex-col gap-12">
            <LandingHero onBegin={startJourney} />
            <LandingPhilosophy />
            <FeaturedFeed />
          </div>
        )}

        {step === 'form' && (
          <ExperienceForm 
            onSubmit={handleFormSubmit}
            onBack={() => setStep('landing')}
          />
        )}

        {step === 'generating' && (
          <div className="text-center py-20 bg-card rounded-lg border border-border p-8 max-w-md mx-auto shadow-premium flex flex-col gap-6 items-center animate-scale-up">
            <div className="p-4 bg-primary/10 rounded-full text-primary animate-spin" style={{ animationDuration: '3s' }}>
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Crafting your story...</h2>
              <p className="text-muted-foreground text-sm font-light mt-2">
                Consulting the local lens in <span className="text-primary font-semibold">{journeyParams?.destination}</span> for a <span className="font-semibold italic text-accent">{journeyParams?.mood?.toLowerCase()}</span> journey.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-left text-xs font-mono w-full flex flex-col gap-1.5 border border-border/40">
              <p><span className="text-primary font-semibold">Pace:</span> {journeyParams?.pace === 'slow' ? 'Deep & Slow' : 'Active Explorer'}</p>
              <p><span className="text-primary font-semibold">Time:</span> {journeyParams?.time}</p>
              <p><span className="text-primary font-semibold">Vibe:</span> {journeyParams?.companion}</p>
            </div>
            <button 
              onClick={() => setStep('form')}
              className="px-5 py-2 border border-border text-muted-foreground font-semibold rounded-lg text-xs cursor-pointer hover:text-foreground hover:bg-muted/10 transition-all"
            >
              Adjust settings
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 p-6 text-center text-xs text-muted-foreground bg-muted/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} local_lens_AI. GenAI Hackathon MVP.</p>
          <p className="font-light">Designed for immersive, culture-first memories.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
