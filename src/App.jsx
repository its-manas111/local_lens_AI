import React, { useState, useEffect } from 'react';
import { Compass, AlertTriangle, RotateCcw } from 'lucide-react';
import LandingHero from './components/LandingHero';
import LandingPhilosophy from './components/LandingPhilosophy';
import FeaturedFeed from './components/FeaturedFeed';
import ExperienceForm from './components/ExperienceForm';
import LoadingExperience from './components/LoadingExperience';
import ExperienceResult from './components/ExperienceResult';
import { generateExperience } from './services/geminiService';

const ERROR_MESSAGES = {
  MISSING_API_KEY: 'No API key found. Add VITE_GEMINI_API_KEY to your .env.local file.',
  EMPTY_RESPONSE: 'Gemini returned an empty response. Please try again.',
  INVALID_RESPONSE: 'The AI response was in an unexpected format. Please try again.',
  API_ERROR: 'Could not connect to the Gemini API. Check your internet connection and try again.',
};

function App() {
  const [step, setStep] = useState('landing');
  const [journeyParams, setJourneyParams] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [error, setError] = useState(null);

  // Trigger Gemini call when entering the 'generating' step
  useEffect(() => {
    if (step !== 'generating' || !journeyParams) return;

    let cancelled = false;

    async function fetchExperience() {
      try {
        setError(null);
        const data = await generateExperience(journeyParams);
        if (!cancelled) {
          setExperienceData(data);
          setStep('result');
        }
      } catch (err) {
        if (!cancelled) {
          setError(ERROR_MESSAGES[err.message] || ERROR_MESSAGES.API_ERROR);
          setStep('error');
        }
      }
    }

    fetchExperience();
    return () => { cancelled = true; };
  }, [step, journeyParams]);

  const handleFormSubmit = (params) => {
    setJourneyParams(params);
    setExperienceData(null);
    setStep('generating');
  };

  const handleReset = () => {
    setJourneyParams(null);
    setExperienceData(null);
    setError(null);
    setStep('landing');
  };

  const handleRetry = () => {
    setError(null);
    setStep('generating');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleReset}
          >
            <div className="p-2.5 bg-primary/10 rounded-full text-primary">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">local_lens_AI</span>
          </div>
          {step !== 'landing' && (
            <button
              onClick={handleReset}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Main Router */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">

        {step === 'landing' && (
          <div className="flex flex-col gap-12">
            <LandingHero onBegin={() => setStep('form')} />
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
          <LoadingExperience destination={journeyParams?.destination} />
        )}

        {step === 'result' && experienceData && (
          <ExperienceResult
            data={experienceData}
            params={journeyParams}
            onReset={handleReset}
          />
        )}

        {step === 'error' && (
          <div className="flex flex-col items-center gap-6 py-20 max-w-md mx-auto text-center">
            <div className="p-5 bg-red-500/10 rounded-full text-red-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Something went wrong</h2>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                {error}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold cursor-pointer hover:bg-primary/95 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={() => setStep('form')}
                className="px-6 py-3 border border-border text-muted-foreground rounded-lg text-sm font-semibold cursor-pointer hover:text-foreground transition-colors"
              >
                Adjust Settings
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 p-6 text-xs text-muted-foreground bg-muted/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} local_lens_AI. GenAI Hackathon MVP.</p>
          <p className="font-light">Designed for immersive, culture-first memories.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
