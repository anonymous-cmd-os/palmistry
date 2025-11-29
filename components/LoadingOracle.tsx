import React from 'react';

export const LoadingOracle: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-t-mystic-gold border-r-mystic-accent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin reverse-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🔮</span>
        </div>
      </div>
      <h3 className="text-2xl font-serif text-white mb-2 animate-pulse">Consulting the Stars...</h3>
      <p className="text-slate-400 italic font-light max-w-md">
        "The lines of the hand are the rivers of destiny, flowing into the ocean of the cosmos."
      </p>
    </div>
  );
};