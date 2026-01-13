// SoundVisualizer.jsx - Sound wave visualization

import React from 'react';

function SoundVisualizer({ isPlaying }) {
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full transition-all ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            height: isPlaying ? `${Math.random() * 60 + 20}%` : '20%',
            animationDelay: `${i * 0.1}s`
          }}
        ></div>
      ))}
    </div>
  );
}

export default SoundVisualizer;