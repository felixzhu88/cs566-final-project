import React from 'react';
import { Play, Eye, Brain, Activity } from 'lucide-react';

export default function Hero({ scrollToSection }) {
  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-6">
          <div className="bg-purple-500/20 border border-purple-500/40 rounded-full px-6 py-2 text-sm">
            Computer Vision • Machine Learning • Safety
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Driver Drowsiness Detection
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Real-time facial landmark analysis using Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) 
          to detect driver drowsiness and prevent accidents.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => scrollToSection('demo')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="bg-slate-800 border border-purple-500/40 px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            Learn More
          </button>
        </div>

        {/* Floating Icons Animation */}
        <div className="mt-20 relative h-32">
          <div className="absolute left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <Eye className="w-12 h-12 text-purple-400 opacity-60" />
          </div>
          <div className="absolute right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
            <Brain className="w-12 h-12 text-pink-400 opacity-60" />
          </div>
          <div className="absolute left-1/3 top-16 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
            <Activity className="w-12 h-12 text-blue-400 opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}