import React from 'react';
import { Eye } from 'lucide-react';

export default function Navigation({ activeSection, scrollToSection }) {
  return (
    <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">DrowsyGuard</span>
        </div>
        <div className="flex gap-6">
          {['home', 'demo', 'how-it-works', 'approaches', 'implementation', 'challenges', 'team'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize transition-colors ${
                activeSection === section ? 'text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              {section.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}