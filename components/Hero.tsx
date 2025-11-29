import React from 'react';
import { NewsletterForm } from './NewsletterForm';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop" 
          alt="Bright mountains and clouds" 
          className="w-full h-full object-cover"
        />
        {/* Light gradient overlays for text readability */}
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/40 to-[#fafaf9]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center pt-10 md:pt-20 animate-fade-in-up">
        <div className="inline-block mb-6 px-5 py-2 border border-mystic-gold/40 rounded-full bg-white/60 backdrop-blur-md shadow-sm">
          <span className="text-stone-800 text-xs font-display tracking-[0.2em] uppercase font-bold">Est. 2024 • Daily Light</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-stone-900 mb-6 leading-tight tracking-tight drop-shadow-sm">
          Walking with <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#b45309] to-[#d4af37] opacity-20 blur-xl"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d4af37] to-[#b45309]">Jesus</span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-stone-700 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          A daily journey into the mystical heart of Christ. <br/>
          Uncover the light within through love, not dogma.
        </p>

        <NewsletterForm />
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-stone-400">
        <ChevronDown className="w-8 h-8 opacity-70" />
      </div>
    </section>
  );
};