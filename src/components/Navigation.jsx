// Navigation.jsx - Friendly Professional Balance

import React from 'react';
import { Home, Volume2, Info } from 'lucide-react';

function Navigation({ goHome, toggleSettings, volume, currentPage, navigateTo }) {
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
            {/* About Button - NEW */}
            <button
              onClick={() => navigateTo('product-info')}
              className="flex items-center gap-2 px-5 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl font-bold text-base shadow-sm hover:shadow-md transition-all duration-200 border-2 border-purple-200"
            >
              <Info size={20} strokeWidth={2.5} />
              <span className="hidden sm:inline">About</span>
            </button>

            {/* Home Button - Clear purpose */}
            <button
              onClick={goHome}
              className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 border-2 border-blue-600"
            >
              <Home size={20} strokeWidth={2.5} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;