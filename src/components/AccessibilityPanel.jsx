// AccessibilityPanel.jsx - Accessibility settings component

import React from 'react';
import { Eye, Type, Zap } from 'lucide-react';

function AccessibilityPanel({ settings, onSettingsChange }) {
  return (
    <div className="space-y-6">
      {/* High Contrast Toggle */}
      <div>
        <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Eye size={24} className="text-slate-600" />
            <div>
              <p className="font-bold text-slate-800">High Contrast Mode</p>
              <p className="text-sm text-slate-600">Increase visual clarity</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => onSettingsChange({ highContrast: e.target.checked })}
            className="w-6 h-6 cursor-pointer"
          />
        </label>
      </div>

      {/* Text Size */}
      <div>
        <label className="block mb-3 font-bold text-slate-800 flex items-center gap-2">
          <Type size={24} />
          Text Size
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => onSettingsChange({ textSize: size })}
              className={`p-3 rounded-lg font-bold capitalize transition-all ${
                settings.textSize === size
                  ? 'bg-blue-500 text-white border-2 border-blue-600'
                  : 'bg-slate-100 text-slate-700 border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Reduced Motion */}
      <div>
        <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-slate-600" />
            <div>
              <p className="font-bold text-slate-800">Reduced Motion</p>
              <p className="text-sm text-slate-600">Minimize animations</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => onSettingsChange({ reducedMotion: e.target.checked })}
            className="w-6 h-6 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}

export default AccessibilityPanel;