import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-purple-500/20 bg-slate-900/80">
      <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
        <p>Driver Drowsiness Detection System • Computer Vision Project Fall 2025</p>
        <p className="mt-2">Built with React • Powered by dlib & OpenCV</p>
      </div>
    </footer>
  );
}