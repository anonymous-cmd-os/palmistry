import React from 'react';
import { OracleResult } from '../types';

interface ResultsViewProps {
  result: OracleResult;
  onReset: () => void;
}

// Helper to split English ||| Hindi
const BilingualText: React.FC<{ text: string; className?: string; highlightHindi?: boolean }> = ({ text, className = '', highlightHindi = false }) => {
  if (!text) return null;
  const parts = text.split('|||');
  const english = parts[0]?.trim();
  const hindi = parts[1]?.trim();

  return (
    <div className={className}>
      <p className="mb-2 text-white leading-relaxed font-medium tracking-wide">{english}</p>
      {hindi && (
        <p className={`font-hindi mt-1 text-lg leading-relaxed ${highlightHindi ? 'text-mystic-gold font-semibold' : 'text-purple-200/90'}`}>
          {hindi}
        </p>
      )}
    </div>
  );
};

const Card: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; className?: string }> = ({ title, subtitle, children, className = '' }) => (
  <div className={`glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors duration-500 ${className}`}>
    <div className="mb-6 border-b border-white/10 pb-4">
      <h3 className="text-2xl font-serif text-mystic-gold">{title}</h3>
      {subtitle && <p className="text-sm text-purple-300 font-hindi mt-1">{subtitle}</p>}
    </div>
    <div className="leading-relaxed">
      {children}
    </div>
  </div>
);

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-10 animate-fade-in-up pb-20">
      
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-mystic-accent/30 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-mystic-gold to-white mb-6 leading-tight drop-shadow-sm">
          <BilingualText text={result.zodiacSign} className="flex flex-col items-center gap-2" highlightHindi={true} />
        </h1>
        <div className="text-2xl text-purple-200 font-light tracking-widest uppercase mb-4">
          <BilingualText text={result.element} />
        </div>
        <div className="inline-block bg-white/5 px-4 py-1 rounded-full border border-white/10">
            <p className="text-sm text-slate-300 font-medium">Birth Date: {result.dateOfBirth}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Personality & Behaviour */}
        <Card title="The Soul's Essence" subtitle="आत्मा का सार" className="md:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
                <strong className="text-mystic-gold block mb-3 uppercase tracking-wider text-sm border-l-2 border-mystic-accent pl-3">Personality (व्यक्तित्व)</strong>
                <BilingualText text={result.personality} />
            </div>
            <div>
                <strong className="text-mystic-gold block mb-3 uppercase tracking-wider text-sm border-l-2 border-mystic-accent pl-3">Behaviour (व्यवहार)</strong>
                <BilingualText text={result.behavior} />
            </div>
          </div>
        </Card>

        {/* Palmistry Analysis */}
        <Card title="Lines of Fate" subtitle="हस्तरेखा विश्लेषण">
          <ul className="space-y-8">
            <li className="bg-black/20 p-4 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-mystic-gold block mb-2 font-bold">Heart Line (हृदय रेखा)</span>
              <BilingualText text={result.palmAnalysis.heartLine} />
            </li>
            <li className="bg-black/20 p-4 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-mystic-gold block mb-2 font-bold">Head Line (मस्तिष्क रेखा)</span>
              <BilingualText text={result.palmAnalysis.headLine} />
            </li>
            <li className="bg-black/20 p-4 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-mystic-gold block mb-2 font-bold">Life Line (जीवन रेखा)</span>
              <BilingualText text={result.palmAnalysis.lifeLine} />
            </li>
            <li className="bg-black/20 p-4 rounded-lg">
              <span className="text-xs uppercase tracking-widest text-mystic-gold block mb-2 font-bold">Fate Line (भाग्य रेखा)</span>
              <BilingualText text={result.palmAnalysis.fateLine} />
            </li>
          </ul>
        </Card>

        {/* Life Aspects */}
        <div className="space-y-8">
          <Card title="Cosmic Alignments" subtitle="ब्रह्मांडीय संयोग">
            <div className="space-y-8">
              <div>
                <h4 className="text-mystic-gold font-bold mb-3 uppercase text-sm tracking-widest flex items-center gap-2">
                    <span>❤️</span> Love & Relationships (प्रेम जीवन)
                </h4>
                <div className="bg-black/20 p-4 rounded-lg">
                    <BilingualText text={result.loveLife} />
                </div>
              </div>
              <div>
                <h4 className="text-mystic-gold font-bold mb-3 uppercase text-sm tracking-widest flex items-center gap-2">
                    <span>💼</span> Career & Ambition (आजीविका)
                </h4>
                <div className="bg-black/20 p-4 rounded-lg">
                    <BilingualText text={result.career} />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Strengths & Challenges" subtitle="ताकत और चुनौतियां">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h4 className="text-green-400 text-sm font-bold uppercase mb-3 tracking-widest">Strengths (शक्तियाँ)</h4>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500">
                       <BilingualText text={s} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 text-sm font-bold uppercase mb-3 tracking-widest">Challenges (चुनौतियाँ)</h4>
                <ul className="space-y-3">
                  {result.challenges.map((s, i) => (
                    <li key={i} className="bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500">
                      <BilingualText text={s} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Spiritual Guidance */}
      <div className="glass-panel p-10 rounded-2xl text-center border-mystic-gold/40 border-2 mt-12 bg-gradient-to-br from-mystic-900 to-mystic-800 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
        <h3 className="text-3xl font-serif text-mystic-gold mb-2">Maharishi's Verdict & Remedies</h3>
        <p className="text-purple-300 font-hindi text-xl mb-8">महर्षि का अंतिम निर्णय और वैदिक उपाय</p>
        <div className="text-xl text-white/95 leading-relaxed max-w-4xl mx-auto">
          <BilingualText text={result.spiritualGuidance} highlightHindi={true} className="font-serif italic" />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center pt-10">
        <button
          onClick={onReset}
          className="group relative px-8 py-3 overflow-hidden rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/20"
        >
          <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors font-hindi text-lg">
            Consult for another soul / किसी और के लिए पूछें
          </span>
        </button>
      </div>
    </div>
  );
};