import React from 'react';
import { Upload, AlertTriangle } from 'lucide-react';

export default function Demo() {
  return (
    <section id="demo" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Detection Demo</h2>
          <p className="text-gray-400">Pre-recorded examples showing real-time drowsiness detection</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Demo 1 */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative group">
              <div className="text-center">
                <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-400">Demo Video 1</p>
                <p className="text-sm text-gray-500 mt-2">Non-Drowsy Detection</p>
              </div>
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors"></div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-green-400">✓ Alert State</span>
                <span className="text-xs text-gray-400">EAR: 0.28 | MAR: 0.45</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-green-500/20 border border-green-500/40 rounded px-3 py-1 text-xs text-center">
                  Eyes Open
                </div>
                <div className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1 text-xs text-center">
                  No Yawning
                </div>
              </div>
            </div>
          </div>

          {/* Video Demo 2 */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative group">
              <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-gray-400">Demo Video 2</p>
                <p className="text-sm text-gray-500 mt-2">Drowsiness Detected</p>
              </div>
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors"></div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-red-400">⚠ Drowsy State</span>
                <span className="text-xs text-gray-400">EAR: 0.14 | MAR: 0.72</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-red-500/20 border border-red-500/40 rounded px-3 py-1 text-xs text-center">
                  Eyes Closing
                </div>
                <div className="flex-1 bg-orange-500/20 border border-orange-500/40 rounded px-3 py-1 text-xs text-center">
                  Yawning
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 bg-slate-800 border border-purple-500/20 rounded-lg px-6 py-4 inline-block">
            <strong className="text-purple-400">Note:</strong> Upload your demo videos to replace these placeholders. 
            The system analyzes facial landmarks in real-time to detect drowsiness indicators.
          </p>
        </div>
      </div>
    </section>
  );
}