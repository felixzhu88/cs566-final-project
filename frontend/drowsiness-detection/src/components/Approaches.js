import React from 'react';
import { Zap, Clock, Brain, CheckCircle, XCircle } from 'lucide-react';

export default function Approaches() {
  return (
    <section id="approaches" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Detection Approaches</h2>
          <p className="text-gray-400">Comparing three drowsiness detection methods</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Approach 1 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Landmark Single</h3>
                <p className="text-xs text-gray-400">Rule-based per-frame</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Uses EAR and MAR to classify each frame independently with fixed thresholds.
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Very fast, lightweight</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">No deep model required</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Ignores temporal info</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Confused by blinking & talking</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <p className="text-gray-400">Accuracy</p>
                  <p className="text-lg font-bold text-yellow-400">57%</p>
                </div>
                <div>
                  <p className="text-gray-400">F1-Score</p>
                  <p className="text-lg font-bold text-yellow-400">0.51</p>
                </div>
              </div>
            </div>
          </div>

          {/* Approach 2 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Landmark Adjacent</h3>
                <p className="text-xs text-gray-400">Temporal smoothing</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Applies sliding window voting over recent landmark predictions for stability.
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">More stable against noise</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Better continuous monitoring</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Hard to tune thresholds</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Sensitive to individual ratios</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <p className="text-gray-400">Accuracy</p>
                  <p className="text-lg font-bold text-blue-400">74%</p>
                </div>
                <div>
                  <p className="text-gray-400">F1-Score</p>
                  <p className="text-lg font-bold text-blue-400">0.82</p>
                </div>
              </div>
            </div>
          </div>

          {/* Approach 3 */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 border-2 border-purple-500/50 hover:border-purple-500/80 transition-all relative">
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs font-bold">
              BEST
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/30 w-12 h-12 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">CNN-LSTM</h3>
                <p className="text-xs text-gray-400">Deep learning</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Spatio-temporal deep learning using 5-frame visual sequences with CNN feature extraction and LSTM temporal modeling.
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Highest accuracy</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Learns temporal patterns</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Real-time probability display</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Computationally heavier</p>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400">Requires similar camera angle</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-3 border border-purple-500/30">
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <p className="text-gray-400">Accuracy</p>
                  <p className="text-lg font-bold text-purple-400">100%</p>
                </div>
                <div>
                  <p className="text-gray-400">F1-Score</p>
                  <p className="text-lg font-bold text-purple-400">1.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-slate-800 rounded-xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Command Line Usage</h3>
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-xs text-gray-400 mb-2">Webcam with CNN-LSTM:</p>
              <code className="text-sm text-purple-300 font-mono">python drowsiness_detection.py webcam --mode cnn_lstm</code>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-xs text-gray-400 mb-2">Video file with Temporal Smoothing:</p>
              <code className="text-sm text-blue-300 font-mono">python drowsiness_detection.py ./test.mp4 --mode landmarker_adjacent</code>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-xs text-gray-400 mb-2">Single-frame Detection:</p>
              <code className="text-sm text-yellow-300 font-mono">python drowsiness_detection.py ./test.mp4 --mode landmarker_single</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}