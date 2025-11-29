import React from 'react';
import { Hero } from './components/Hero';
import { MysticalMessageGenerator } from './components/MysticalMessageGenerator';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { NewsletterForm } from './components/NewsletterForm';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-mystic-gold selection:text-white">
      <Hero />
      
      <div className="relative z-10 bg-white shadow-xl shadow-stone-200/50">
        <Features />
      </div>

      <div className="bg-gradient-to-b from-stone-50 to-white">
        <MysticalMessageGenerator />
      </div>

      <Testimonials />

      <section className="py-24 px-4 bg-white relative overflow-hidden text-center border-t border-stone-100">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display text-stone-900 mb-6 font-medium">
            Begin Your Walk Today
          </h2>
          <p className="text-xl font-serif text-stone-600 mb-10">
            Join us. It costs nothing but an open heart.
          </p>
          <div className="flex justify-center">
             <NewsletterForm />
          </div>
        </div>
      </section>

      <footer className="py-12 bg-stone-900 text-center text-stone-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h4 className="font-display text-stone-200 tracking-widest text-lg mb-4">WALKING WITH JESUS</h4>
          <div className="flex gap-6 text-stone-500 text-sm font-serif mb-8">
            <a href="#" className="hover:text-stone-300 transition">About</a>
            <a href="#" className="hover:text-stone-300 transition">Beliefs</a>
            <a href="#" className="hover:text-stone-300 transition">Contact</a>
            <a href="#" className="hover:text-stone-300 transition">Privacy</a>
          </div>
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Walking with Jesus. All rights reserved.<br/>
            Made with love and reverence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;