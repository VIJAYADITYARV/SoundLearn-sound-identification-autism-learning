// VolumeControl.jsx - Volume control slider

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

function VolumeControl({ volume, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <VolumeX size={20} className="text-slate-600" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-32 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />
      <Volume2 size={20} className="text-slate-600" />
      <span className="text-sm font-bold text-slate-700 min-w-[3rem]">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
}

export default VolumeControl;