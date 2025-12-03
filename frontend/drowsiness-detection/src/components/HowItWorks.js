import React from 'react';
import { Eye, Activity, AlertTriangle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400">Advanced computer vision techniques for drowsiness detection</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="bg-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Face Detection</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Using dlib's HOG-based face detector to locate the driver's face in the video frame, 
              then identify 68 facial landmarks for precise feature extraction.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="bg-pink-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Activity className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Feature Analysis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Calculate Eye Aspect Ratio (EAR) from eye landmarks and Mouth Aspect Ratio (MAR) from mouth landmarks 
              to quantify drowsiness indicators in real-time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Classification</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Apply learned thresholds (EAR &lt; 0.17, MAR &gt; 0.69) with temporal smoothing across 5-frame sequences 
              to classify drowsiness state and trigger alerts.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-400" />
              Eye Aspect Ratio (EAR)
            </h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Measures eye openness using vertical and horizontal distances between eye landmarks:
              </p>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-purple-300 border border-purple-500/20">
                EAR = (||p2 - p6|| + ||p3 - p5||) / (2 * ||p1 - p4||)
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Normal (Alert)</p>
                  <p className="text-lg font-bold text-green-400">EAR ≥ 0.17</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Drowsy</p>
                  <p className="text-lg font-bold text-red-400">EAR &lt; 0.17</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-pink-400" />
              Mouth Aspect Ratio (MAR)
            </h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Detects yawning by measuring mouth opening using landmark distances:
              </p>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs text-pink-300 border border-pink-500/20">
                MAR = (||p51 - p59|| + ||p53 - p57||) / (2 * ||p49 - p55||)
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Normal</p>
                  <p className="text-lg font-bold text-green-400">MAR ≤ 0.69</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Yawning</p>
                  <p className="text-lg font-bold text-orange-400">MAR &gt; 0.69</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}