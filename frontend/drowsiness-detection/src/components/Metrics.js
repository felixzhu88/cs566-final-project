import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Eye, Activity } from 'lucide-react';
import MetricCard from './MetricCard';

export default function Metrics() {
  const [animateMetrics, setAnimateMetrics] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateMetrics(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const metricsSection = document.getElementById('metrics');
    if (metricsSection) observer.observe(metricsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="metrics" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Performance Metrics</h2>
          <p className="text-gray-400">Temporal rule-based method results (5-frame sequences with 3/5 voting)</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <MetricCard
            icon={<Target className="w-8 h-8" />}
            label="Accuracy"
            value="57.4%"
            color="purple"
            animate={animateMetrics}
          />
          <MetricCard
            icon={<TrendingUp className="w-8 h-8" />}
            label="F1 Score"
            value="0.51"
            color="pink"
            animate={animateMetrics}
          />
          <MetricCard
            icon={<Eye className="w-8 h-8" />}
            label="EAR Threshold"
            value="0.17"
            color="blue"
            animate={animateMetrics}
          />
          <MetricCard
            icon={<Activity className="w-8 h-8" />}
            label="MAR Threshold"
            value="0.69"
            color="green"
            animate={animateMetrics}
          />
        </div>

        <div className="bg-slate-800 rounded-xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Classification Report</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Class</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">Precision</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">Recall</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">F1-Score</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/50">
                  <td className="py-4 px-4 font-semibold">Non Drowsy</td>
                  <td className="text-center py-4 px-4 text-green-400">0.54</td>
                  <td className="text-center py-4 px-4 text-green-400">0.73</td>
                  <td className="text-center py-4 px-4 text-green-400">0.62</td>
                  <td className="text-center py-4 px-4">26</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Drowsy</td>
                  <td className="text-center py-4 px-4 text-purple-400">0.63</td>
                  <td className="text-center py-4 px-4 text-purple-400">0.43</td>
                  <td className="text-center py-4 px-4 text-purple-400">0.51</td>
                  <td className="text-center py-4 px-4">28</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <h4 className="font-semibold mb-3 text-purple-400">Confusion Matrix</h4>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="bg-green-500/20 border border-green-500/40 rounded p-3">
                  <div className="text-2xl font-bold text-green-400">19</div>
                  <div className="text-xs text-gray-400 mt-1">True Negative</div>
                </div>
                <div className="bg-red-500/20 border border-red-500/40 rounded p-3">
                  <div className="text-2xl font-bold text-red-400">7</div>
                  <div className="text-xs text-gray-400 mt-1">False Positive</div>
                </div>
                <div className="bg-red-500/20 border border-red-500/40 rounded p-3">
                  <div className="text-2xl font-bold text-red-400">16</div>
                  <div className="text-xs text-gray-400 mt-1">False Negative</div>
                </div>
                <div className="bg-green-500/20 border border-green-500/40 rounded p-3">
                  <div className="text-2xl font-bold text-green-400">12</div>
                  <div className="text-xs text-gray-400 mt-1">True Positive</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <h4 className="font-semibold mb-3 text-pink-400">Detection Parameters</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sequence Length:</span>
                  <span className="font-semibold">5 frames</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Min Drowsy Frames:</span>
                  <span className="font-semibold">3/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Test Videos:</span>
                  <span className="font-semibold">54</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Facial Landmarks:</span>
                  <span className="font-semibold">68 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}