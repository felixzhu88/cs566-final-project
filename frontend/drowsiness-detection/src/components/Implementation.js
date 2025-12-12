import React from 'react';
import { Code, Database, Cpu, GitBranch, Package, FileCode } from 'lucide-react';

export default function Implementation() {
  return (
    <section id="implementation" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Implementation</h2>
          <p className="text-gray-400">Technical details and development process</p>
        </div>

        {/* tech stack used */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Technology Stack</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-bold">Core Libraries</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-purple-400">OpenCV</span> - Video processing
                </div>
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-purple-400">dlib</span> - Face detection & landmarks
                </div>
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-purple-400">imutils</span> - Image utilities
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-pink-400" />
                </div>
                <h4 className="font-bold">Deep Learning</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-pink-400">TensorFlow/Keras</span> - Model training
                </div>
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-pink-400">CNN</span> - Feature extraction
                </div>
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-pink-400">LSTM</span> - Temporal modeling
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-bold">Scientific Computing</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-green-400">NumPy</span> - Array operations
                </div>
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-green-400">SciPy</span> - Distance calculations
                </div>
                <div className="bg-slate-900 rounded px-3 py-2 border border-slate-700">
                  <span className="text-green-400">scikit-learn</span> - Metrics evaluation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* implementation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800 rounded-xl p-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold">Data Pipeline</h3>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">1. Data Acquisition</h4>
                <p className="text-gray-400 leading-relaxed">
                  Frames extracted from Real-Life Drowsiness Dataset videos using VLC. Viola-Jones algorithm 
                  applied for face region extraction.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">2. Preprocessing</h4>
                <p className="text-gray-400 leading-relaxed">
                  Images cropped to face regions, normalized, and split into train/validation/test sets 
                  with balanced drowsy/non-drowsy classes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">3. Augmentation</h4>
                <p className="text-gray-400 leading-relaxed">
                  Applied data augmentation techniques to improve model robustness and generalization.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
                <FileCode className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold">Model Architecture</h3>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Rule-Based Models</h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  Implemented EAR and MAR calculation using dlib's 68-point facial landmark detector:
                </p>
                <ul className="text-gray-400 space-y-1 ml-4">
                  <li>• Eye landmarks: Points 36-47</li>
                  <li>• Mouth landmarks: Points 49-68</li>
                  <li>• Thresholds learned from training data percentiles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">CNN-LSTM Model</h4>
                <p className="text-gray-400 leading-relaxed">
                  Sequential model with CNN layers for spatial feature extraction followed by LSTM layers 
                  for temporal pattern recognition across 5-frame sequences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* code structure/org */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-purple-500/20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold">Project Organization</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Key Modules</h4>
              <div className="space-y-2">
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="text-purple-300">EAR.py</code>
                  <p className="text-gray-400 text-xs mt-1">Eye aspect ratio calculation</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="text-purple-300">MAR.py</code>
                  <p className="text-gray-400 text-xs mt-1">Mouth aspect ratio calculation</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="text-purple-300">Drowsiness_detection_video.py</code>
                  <p className="text-gray-400 text-xs mt-1">Main inference script with mode selection (webcam or upload)</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-pink-400 mb-3">Training Notebooks</h4>
              <div className="space-y-2">
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="text-pink-300">drowsiness_detection_lstm.ipynb</code>
                  <p className="text-gray-400 text-xs mt-1">CNN-LSTM model training and evaluation</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="text-pink-300">Drowsiness_detection_landmarker_v2.ipynb</code>
                  <p className="text-gray-400 text-xs mt-1">Rule-based threshold learning</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="text-pink-300">data_preview.ipynb</code>
                  <p className="text-gray-400 text-xs mt-1">Dataset exploration and preprocessing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* development process */}
        <div className="bg-slate-800 rounded-xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Development Workflow</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-purple-500/40">
                <span className="text-2xl font-bold text-purple-400">1</span>
              </div>
              <h4 className="font-semibold mb-2">Data Preparation</h4>
              <p className="text-xs text-gray-400">Extract frames, preprocess, split dataset</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-pink-500/40">
                <span className="text-2xl font-bold text-pink-400">2</span>
              </div>
              <h4 className="font-semibold mb-2">Model Development</h4>
              <p className="text-xs text-gray-400">Implement and train detection models</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-500/40">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h4 className="font-semibold mb-2">Evaluation</h4>
              <p className="text-xs text-gray-400">Test on validation set, tune parameters</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-500/40">
                <span className="text-2xl font-bold text-green-400">4</span>
              </div>
              <h4 className="font-semibold mb-2">Deployment</h4>
              <p className="text-xs text-gray-400">Real-time inference, video processing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}