import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function Demo() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const toggleVideo1 = () => {
    if (video1Ref.current) {
      if (isPlaying1) {
        video1Ref.current.pause();
      } else {
        video1Ref.current.play();
      }
      setIsPlaying1(!isPlaying1);
    }
  };

  const toggleVideo2 = () => {
    if (video2Ref.current) {
      if (isPlaying2) {
        video2Ref.current.pause();
      } else {
        video2Ref.current.play();
      }
      setIsPlaying2(!isPlaying2);
    }
  };

  return (
    <section id="demo" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Detection Demo</h2>
          <p className="text-gray-400">Pre-recorded examples showing real-time drowsiness detection</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Demo 1 - Non Drowsy */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="aspect-video bg-black relative group">
              <video
                ref={video1Ref}
                className="w-full h-full object-cover"
                loop
                onEnded={() => setIsPlaying1(false)}
              >
                <source src="/videos/nondrowsy.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Overlay */}
              <div 
                className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={toggleVideo1}
              >
                <button className="bg-purple-500 hover:bg-purple-600 rounded-full p-6 transition-all transform hover:scale-110">
                  {isPlaying1 ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white ml-1" />
                  )}
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-green-400">✓ Alert State</span>
                <span className="text-xs text-gray-400">EAR: 0.28 | MAR: ~0.67</span>
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

          {/* Video Demo 2 - Drowsy */}
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="aspect-video bg-black relative group">
              <video
                ref={video2Ref}
                className="w-full h-full object-cover"
                loop
                onEnded={() => setIsPlaying2(false)}
              >
                <source src="/videos/drowsy.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Overlay */}
              <div 
                className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={toggleVideo2}
              >
                <button className="bg-red-500 hover:bg-red-600 rounded-full p-6 transition-all transform hover:scale-110">
                  {isPlaying2 ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white ml-1" />
                  )}
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-red-400">⚠ Drowsy State</span>
                <span className="text-xs text-gray-400">EAR: 0.14 | MAR: 0.72-0.99</span>
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
            <strong className="text-purple-400">Demo:</strong> These videos show our drowsiness detection system analyzing facial landmarks in real-time. 
            Click the videos to play/pause. 

          </p>
        </div>
      </div>
    </section>
  );
}