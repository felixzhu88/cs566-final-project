import React from 'react';
import { AlertCircle, Lightbulb, TrendingUp, Wrench } from 'lucide-react';

export default function Challenges() {
  return (
    <section id="challenges" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Challenges & More</h2>
          <p className="text-gray-400">Problems encountered, insights, limitations, and future plans</p>
        </div>

        {/* challenges */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-red-400" />
            Challenges Encountered
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-red-500/20">
              <h4 className="font-bold text-lg mb-3 text-red-400">1. Threshold Sensitivity</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong>Problem:</strong> Rule-based EAR/MAR thresholds varied significantly across individuals 
                due to differences in facial structure, camera angle, and distance.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong>Potential Solution:</strong> Implemented data-driven threshold learning using percentile analysis 
                on training data. For production systems, per-user calibration would be ideal.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-red-500/20">
              <h4 className="font-bold text-lg mb-3 text-red-400">2. False Positives from Blinking</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong>Problem:</strong> Single-frame detection mistakenly classified normal blinking as drowsiness, 
                leading to excessive false alarms.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong>Potential Solution:</strong> Implemented temporal smoothing with 5-frame sliding windows and majority 
                voting, requiring 3+ consecutive drowsy frames for positive classification.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-red-500/20">
              <h4 className="font-bold text-lg mb-3 text-red-400">3. Limited Dataset Diversity</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong>Problem:</strong> Training dataset had limited variation in lighting conditions, camera angles, 
                and driver demographics, affecting real-world generalization.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong>Potential Solution:</strong> Applied data augmentation (brightness, contrast, rotation). Future work 
                should include more diverse datasets like NTHU-DDD.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-red-500/20">
              <h4 className="font-bold text-lg mb-3 text-red-400">4. CNN-LSTM Overfitting</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong>Problem:</strong> Deep learning model achieved 100% test accuracy, suggesting potential 
                overfitting to the relatively simple test set.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong>Potential Solution:</strong> Added dropout layers and early stopping. The perfect score indicates 
                the model works well on similar data but requires testing on more challenging, real-world scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* key insights/numbers */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 text-yellow-400" />
            Key Insights
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl p-6 border border-purple-500/30">
              <h4 className="font-bold mb-2">Temporal Context Matters</h4>
              <p className="text-sm text-gray-300">
                Analyzing sequences of frames dramatically improved accuracy (57% → 74%) compared to 
                single-frame classification, demonstrating the importance of temporal patterns in drowsiness.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-xl p-6 border border-pink-500/30">
              <h4 className="font-bold mb-2">Deep Learning Superiority</h4>
              <p className="text-sm text-gray-300">
                CNN-LSTM achieved 100% accuracy by learning complex spatio-temporal patterns that rule-based 
                methods cannot capture, though at the cost of increased computational requirements.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-500/30">
              <h4 className="font-bold mb-2">Accuracy vs. Efficiency Trade-off</h4>
              <p className="text-sm text-gray-300">
                Different applications require different solutions: rule-based for edge devices with limited 
                power, deep learning for scenarios prioritizing accuracy over speed.
              </p>
            </div>
          </div>
        </div>

        {/* limitations */}
        <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-8 border border-orange-500/30 mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Wrench className="w-7 h-7 text-orange-400" />
            Current Limitations
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Camera Dependency:</strong> System requires consistent camera positioning and angle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Lighting Conditions:</strong> Performance degrades in very low light or direct sunlight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Individual Variation:</strong> Fixed thresholds may not work optimally for all facial structures</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Dataset Scope:</strong> Training on limited scenarios may not generalize to all real-world conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Accessories:</strong> Sunglasses and masks significantly impact detection accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Motion Blur:</strong> Fast head movements can affect landmark detection precision</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* future improvements */}
        <div className="bg-slate-800 rounded-xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-green-400" />
            Future Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-lg p-4 border border-purple-500/20">
                <h4 className="font-semibold text-purple-400 mb-2">Enhanced Robustness</h4>
                <p className="text-sm text-gray-400">
                  Test on challenging datasets (NTHU-DDD), implement attention mechanisms for better 
                  interpretability, and add multi-modal sensing (audio for yawn detection).
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-purple-500/20">
                <h4 className="font-semibold text-pink-400 mb-2">Edge Deployment</h4>
                <p className="text-sm text-gray-400">
                  Optimize models for Raspberry Pi and Jetson Nano, implement model quantization, 
                  and create lightweight variants for real-time embedded performance.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-lg p-4 border border-purple-500/20">
                <h4 className="font-semibold text-blue-400 mb-2">Alert Systems</h4>
                <p className="text-sm text-gray-400">
                  Integrate audio/visual warnings, smartphone notifications via IoT connectivity, 
                  and progressive alert levels based on drowsiness severity.
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-purple-500/20">
                <h4 className="font-semibold text-green-400 mb-2">Personalization</h4>
                <p className="text-sm text-gray-400">
                  Implement per-user calibration for threshold adaptation, learn individual baseline 
                  patterns, and adapt to different driving conditions over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}