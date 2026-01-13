// Navigation.jsx - Friendly Professional Balance

import React from 'react';
import { Home, Settings, Volume2 } from 'lucide-react';

function Navigation({ goHome, toggleSettings, volume, currentPage }) {
  return (
    <nav className="bg-white border-b-4 border-blue-500 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand - Professional but friendly */}
          <button
            onClick={goHome}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-200">
              <Volume2 size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">SoundLearn</h1>
              <p className="text-xs text-slate-500 font-medium">Audio Learning Platform</p>
            </div>
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Volume Display - Clear and accessible */}
            

            {/* Home Button - Clear purpose */}
            <button
              onClick={goHome}
              className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 border-2 border-blue-600"
            >
              <Home size={20} strokeWidth={2.5} />
              <span>Home</span>
            </button>

            {/* Settings Button - Friendly icon */}
            {/*<button
              onClick={toggleSettings}
              className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Settings size={20} strokeWidth={2.5} />
              <span>Settings</span>
            </button>*/}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;