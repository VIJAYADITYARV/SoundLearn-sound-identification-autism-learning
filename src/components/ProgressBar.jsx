// ProgressBar.jsx - Visual progress bar component

import React from 'react';

function ProgressBar({ current, total, color = 'blue' }) {
  const percentage = Math.round((current / total) * 100);
  
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-pink-600',
    orange: 'from-orange-500 to-red-600',
    yellow: 'from-yellow-500 to-orange-600'
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-slate-700">
          Progress: {current} / {total}
        </span>
        <span className="text-sm font-bold text-slate-700">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
        <div 
          className={`bg-gradient-to-r ${colorClasses[color]} h-4 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;