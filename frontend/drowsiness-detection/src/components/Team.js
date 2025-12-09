import React from 'react';
import { Users } from 'lucide-react';

export default function Team() {
  return (
    <section id="team" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-400">Felix Zhu • Bin Xiao • Linda Wei</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-12 border border-purple-500/20 text-center">
          <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Group Project</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            This drowsiness detection system was developed as a collaborative computer vision project for CS566 @UW-Madison w/ Mohit Gupta.
            Combining techniques in machine learning, real-time video processing, and computer vision.
            Here is our {" "}
              <a
                href="https://github.com/felixzhu88/cs566-final-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                GitHub
              </a>
              .
          </p>
        </div>
      </div>
    </section>
  );
}