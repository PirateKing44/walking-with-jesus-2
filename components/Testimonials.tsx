import React from 'react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Teacher",
    quote: "I was tired of the noise and the anger in modern religion. This newsletter feels like sitting by a fire with an old friend who loves you deeply.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Artist",
    quote: "The mystical perspective opened my eyes. It's not about rules; it's about a presence. 'Walking with Jesus' helps me find that presence every morning.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Hospice Nurse",
    quote: "In my line of work, I need deep wells of strength. These daily letters are my water. They are simple, profound, and incredibly holding.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=100&auto=format&fit=crop"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#f8f6f4] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-transparent to-transparent"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-stone-800 mb-4">Voices from the Path</h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-sm shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] border border-stone-100 hover:border-mystic-gold/30 transition duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border border-stone-200 object-cover" 
                />
                <div>
                  <h4 className="font-display text-stone-800 font-semibold">{t.name}</h4>
                  <p className="text-xs font-serif text-mystic-goldDark uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              <p className="font-serif text-lg text-stone-600 italic leading-relaxed">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};