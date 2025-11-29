import React, { useState } from 'react';
import { generateMysticalMessage } from '../services/geminiService';
import { MysticalMessageResponse, LoadingState } from '../types';
import { Button } from './Button';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';

export const MysticalMessageGenerator: React.FC = () => {
  const [state, setState] = useState<LoadingState>(LoadingState.IDLE);
  const [data, setData] = useState<MysticalMessageResponse | null>(null);

  const handleGenerate = async () => {
    setState(LoadingState.LOADING);
    try {
      const result = await generateMysticalMessage();
      setData(result);
      setState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setState(LoadingState.ERROR);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4">
      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-2xl shadow-stone-200/50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-mystic-gold to-transparent opacity-60"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="p-8 md:p-16 text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="p-3 rounded-full bg-stone-50 border border-stone-100 shadow-sm">
              <Sparkles className="w-6 h-6 text-mystic-gold animate-pulse" />
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display text-stone-800 mb-4 font-medium">
            Seek a Word for Your Heart
          </h3>
          <p className="text-stone-500 font-serif text-lg mb-10 max-w-xl mx-auto">
            Experience the gentle wisdom you'll receive in your inbox. 
            Ask for a sign, and let the message find you.
          </p>

          {state === LoadingState.IDLE && (
            <Button onClick={handleGenerate} className="mx-auto">
              Receive a Sample Message
            </Button>
          )}

          {state === LoadingState.LOADING && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 border-4 border-stone-100 border-t-mystic-gold rounded-full animate-spin mb-4"></div>
              <p className="text-stone-500 font-display animate-pulse">Listening to the silence...</p>
            </div>
          )}

          {state === LoadingState.SUCCESS && data && (
            <div className="animate-fade-in-up">
              <div className="relative bg-[#fafaf9] p-8 md:p-12 rounded-lg border border-[#e7e5e4] mb-8 shadow-inner">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-[#e7e5e4]" />
                <p className="font-serif text-2xl md:text-3xl text-stone-800 italic leading-relaxed relative z-10">
                  "{data.message}"
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <span className="h-px flex-1 max-w-[40px] bg-stone-300"></span>
                  <span className="text-mystic-goldDark font-display text-sm tracking-widest uppercase font-semibold">
                    {data.scriptureReference}
                  </span>
                  <span className="h-px flex-1 max-w-[40px] bg-stone-300"></span>
                </div>
              </div>
              <Button onClick={handleGenerate} variant="secondary" className="mx-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Receive Another
              </Button>
            </div>
          )}

          {state === LoadingState.ERROR && (
            <div className="text-stone-500 font-serif">
              <p className="mb-4">The winds are quiet. Please try again later.</p>
              <Button onClick={handleGenerate} variant="secondary">Try Again</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};