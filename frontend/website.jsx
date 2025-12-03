import React, { useState, useRef, useEffect } from 'react';
import { Eye, Brain, Activity, AlertTriangle, Play, Pause, Upload, Users, TrendingUp, Target } from 'lucide-react';

export default function DrowsinessDetectionSite() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [animateMetrics, setAnimateMetrics] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'metrics') {
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">DrowsyGuard</span>
          </div>
          <div className="flex gap-6">
            {['home', 'demo', 'how-it-works', 'metrics', 'team'].map((section) => (
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

      {/* Hero Section */}
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

      {/* Demo Section */}
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

      {/* How It Works */}
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

      {/* Metrics Section */}
      <section id="metrics" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Performance Metrics</h2>
            <p className="text-gray-400">Video-level evaluation with temporal smoothing</p>
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

      {/* Team Section */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-400">Computer Vision • Machine Learning • Safety Engineering</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-12 border border-purple-500/20 text-center">
            <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Group Project</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              This drowsiness detection system was developed as a collaborative computer vision project, 
              combining expertise in machine learning, real-time video processing, and safety systems.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-2 text-sm">
                Python • OpenCV
              </div>
              <div className="bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-2 text-sm">
                dlib • Facial Landmarks
              </div>
              <div className="bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-2 text-sm">
                SciPy • NumPy
              </div>
              <div className="bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-2 text-sm">
                Real-time Detection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20 bg-slate-900/80">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p>Driver Drowsiness Detection System • Computer Vision Project 2024</p>
          <p className="mt-2">Built with React • Powered by dlib & OpenCV</p>
        </div>
      </footer>
    </div>
  );
}

function MetricCard({ icon, label, value, color, animate }) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/40',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/40',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/40',
    green: 'from-green-500/20 to-green-600/20 border-green-500/40'
  };

  const textClasses = {
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    blue: 'text-blue-400',
    green: 'text-green-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 transform transition-all duration-700 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className={`${textClasses[color]} mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}