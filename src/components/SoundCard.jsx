// SoundCard.jsx - Display individual sound with play button

import React, { useState } from 'react';
import { Volume2, Play } from 'lucide-react';
import { playSound } from '../utils/soundUtils';

function SoundCard({ sound, onPlay, size = 'normal' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    playSound(sound.sound);
    if (onPlay) onPlay(sound);

    setTimeout(() => setIsPlaying(false), 2000);
  };

  const cardSize = size === 'large' ? 'p-8' : 'p-6';
  const emojiSize = size === 'large' ? 'text-7xl' : 'text-6xl';
  const buttonSize = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';

  return (
    <div
      className={`${sound.color} border-4 border-slate-200 rounded-2xl ${cardSize}
      hover:shadow-xl transition-all hover:scale-105 transform group`}
    >
      <div className="text-center">
        {/* Emoji */}
        <div className={`${emojiSize} mb-4 group-hover:scale-110 transition-transform`}>
          {sound.emoji}
        </div>

        {/* Name */}
        <h3 className="text-2xl font-black text-slate-800 mb-2">
          {sound.name}
        </h3>

        {/* Description (AUTISM-FRIENDLY) */}
        <p className="text-sm font-semibold text-slate-600 mb-4">
          {sound.description}
        </p>

        {/* Play Button */}
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`${buttonSize} bg-gradient-to-br from-blue-500 to-cyan-600
          hover:from-blue-600 hover:to-cyan-700 rounded-full flex items-center
          justify-center mx-auto text-white shadow-lg hover:shadow-xl transition-all
          ${isPlaying ? 'animate-pulse scale-110' : ''}`}
        >
          {isPlaying ? <Volume2 size={24} /> : <Play size={24} />}
        </button>
      </div>
    </div>
  );
}

export default SoundCard;
