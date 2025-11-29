import React, { useState } from 'react';
import { Button } from './Button';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center animate-fade-in shadow-sm max-w-md mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-display text-green-800 mb-2">Welcome to the Journey</h3>
        <p className="text-green-700 font-serif text-lg">Your first letter of wisdom is on its way.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-mystic-gold/30 via-sky-200 to-mystic-gold/30 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
      
      <div className="relative flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-lg border border-stone-200 shadow-xl shadow-stone-200/50">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-md focus:ring-1 focus:ring-mystic-gold focus:border-mystic-gold text-stone-800 placeholder-stone-400 font-serif text-lg focus:outline-none transition-all"
            required
          />
        </div>
        <Button type="submit" disabled={status === 'loading'} className="sm:w-auto min-w-[140px]">
          {status === 'loading' ? <Loader2 className="animate-spin h-5 w-5" /> : 'Begin the Walk'}
        </Button>
      </div>
      <p className="mt-4 text-stone-600 text-sm text-center font-serif italic drop-shadow-sm">
        Join 10,000+ others walking the path. No spam, only grace.
      </p>
    </form>
  );
};