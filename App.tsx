
import React, { useState, useCallback } from 'react';
import { UserInput, BrandStrategy, LoadingState } from './types';
import { generateBrandStrategy, generateBrandImage } from './services/geminiService';
import BrandForm from './components/BrandForm';
import ArchetypeChart from './components/ArchetypeChart';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [strategy, setStrategy] = useState<BrandStrategy | null>(null);
  const [brandImage, setBrandImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (input: UserInput) => {
    try {
      setError(null);
      setLoadingState(LoadingState.GENERATING_TEXT);
      setStrategy(null);
      setBrandImage(null);

      const strategyData = await generateBrandStrategy(input);
      setStrategy(strategyData);
      
      setLoadingState(LoadingState.GENERATING_IMAGE);
      const image = await generateBrandImage(strategyData.visualPrompt);
      setBrandImage(image);
      
      setLoadingState(LoadingState.COMPLETED);
    } catch (err) {
      console.error(err);
      setError("An error occurred while building your brand identity. Please try again later.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-1/2 h-1/2 bg-indigo-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-1/2 h-1/2 bg-rose-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-rose-500 rounded-lg"></div>
          <span className="font-display text-xl font-bold tracking-tight">AURA</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Case Studies</a>
          <a href="#" className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 text-white transition-all">Support</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Input & Intro */}
          <div className="lg:col-span-5 space-y-8">
            <header className="space-y-4">
              <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">
                Architect Your <span className="gradient-text">Digital Legacy.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-md">
                Aura uses advanced Gemini AI to synthesize your experience into a powerful personal brand strategy and visual identity.
              </p>
            </header>

            <div className="glass rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 text-indigo-300">Brand Parameters</h2>
              <BrandForm onSubmit={handleFormSubmit} isLoading={loadingState !== LoadingState.IDLE && loadingState !== LoadingState.COMPLETED && loadingState !== LoadingState.ERROR} />
              {error && (
                <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            {strategy ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Brand Visual */}
                <div className="glass rounded-3xl overflow-hidden relative group">
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    {brandImage ? (
                      <img src={brandImage} alt="Brand Concept" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center flex-col gap-4 text-slate-500">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent animate-spin rounded-full"></div>
                        <span>Rendering visual concept...</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-sm font-medium text-indigo-400 mb-1 uppercase tracking-widest">Core Tagline</p>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                        "{strategy.tagline}"
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Identity & Bio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Professional Bio
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {strategy.bio}
                    </p>
                  </div>
                  <div className="glass rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Archetype Matrix
                      </h3>
                      <ArchetypeChart data={strategy.archetypes} />
                    </div>
                  </div>
                </div>

                {/* Growth Strategy */}
                <div className="glass rounded-2xl p-8 space-y-6">
                  <h3 className="text-2xl font-display font-bold text-white">Execution Roadmap</h3>
                  <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                    {strategy.strategySteps.map((step, idx) => (
                      <div key={idx} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-slate-400 text-sm">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : loadingState === LoadingState.IDLE ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                <div className="w-32 h-32 rounded-full border border-dashed border-slate-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-xl font-display text-slate-500">
                  Ready to manifest your identity.<br/>Enter your details to begin the synthesis.
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-pulse">
                <div className="glass h-64 rounded-3xl"></div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="glass h-48 rounded-2xl"></div>
                  <div className="glass h-48 rounded-2xl"></div>
                </div>
                <div className="glass h-80 rounded-2xl"></div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Persistent CTA or Footer */}
      <footer className="mt-20 border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 bg-slate-500 rounded-sm"></div>
            <span className="font-display font-bold tracking-tight">AURA AI</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 Aura Intelligence. Powered by Gemini 3.0 & Nano Banana.
          </p>
          <div className="flex gap-4">
            <button className="text-slate-400 hover:text-white transition-colors">Privacy</button>
            <button className="text-slate-400 hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
