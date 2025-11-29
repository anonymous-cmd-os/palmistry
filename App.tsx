import React, { useState } from 'react';
import { UserInput, AppState, OracleResult } from './types';
import { InputForm } from './components/InputForm';
import { LoadingOracle } from './components/LoadingOracle';
import { ResultsView } from './components/ResultsView';
import { analyzeDestiny } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<OracleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [userInput, setUserInput] = useState<UserInput>({
    dob: '',
    leftHand: null,
    rightHand: null,
  });

  const handleInputChange = (field: keyof UserInput, value: any) => {
    setUserInput(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = !!(userInput.dob && userInput.leftHand && userInput.rightHand);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const data = await analyzeDestiny(userInput.leftHand!, userInput.rightHand!, userInput.dob);
      setResult(data);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      setError(err.message || "An unknown mystical error occurred.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setError(null);
    setUserInput({ dob: '', leftHand: null, rightHand: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mystic-900 via-mystic-800 to-black text-white relative overflow-x-hidden selection:bg-mystic-accent selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mystic-gold/10 rounded-full blur-[120px]"></div>
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      <header className="relative z-10 p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✋✨</span>
          <h1 className="text-2xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-white">
            MYSTIC ORACLE
          </h1>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        
        {appState === AppState.IDLE && (
          <div className="flex flex-col items-center">
            <div className="text-center mb-12 max-w-2xl animate-float">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                Unlock the Secrets Written in Your Hands & Stars
              </h2>
              <p className="text-lg text-slate-300 font-light">
                Upload images of your palms and share your birth date. 
                Our AI Oracle will decipher the cosmic code of your existence.
              </p>
            </div>
            <InputForm 
              input={userInput} 
              onChange={handleInputChange} 
              onSubmit={handleSubmit}
              isFormValid={isFormValid}
            />
          </div>
        )}

        {appState === AppState.ANALYZING && <LoadingOracle />}

        {appState === AppState.SUCCESS && result && (
          <ResultsView result={result} onReset={handleReset} />
        )}

        {appState === AppState.ERROR && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="text-6xl mb-4">🌑</div>
            <h3 className="text-2xl font-serif text-red-400 mb-2">The Stars Are Clouded</h3>
            <p className="text-slate-300 mb-8 max-w-md">{error}</p>
            <button 
              onClick={() => setAppState(AppState.IDLE)}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all"
            >
              Try Again
            </button>
          </div>
        )}

      </main>

      <footer className="relative z-10 py-6 text-center text-slate-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Mystic Palm Oracle. Powered by Gemini Nano Banana.</p>
      </footer>
    </div>
  );
};

export default App;