// App.jsx - Main application component

import React, { useState, useEffect } from 'react';
import { Volume2, Settings, Moon, Sun } from 'lucide-react';

import { resetProgress } from './utils/storageUtils';

// Import utility functions
import { loadProgress, saveProgress, updateSettings } from './utils/storageUtils';

// Import components (we'll create these next)
import Navigation from './components/Navigation';
import Home from './components/Home';
import Exploration from './modes/Exploration';
import QuizMode from './modes/QuizMode';
import MatchingGame from './modes/MatchingGame';
import MemoryGame from './modes/MemoryGame';

function App() {
  // State management
  const [currentPage, setCurrentPage] = useState('home'); // Which page are we on?
  const [selectedCategory, setSelectedCategory] = useState(null); // Which category is selected?
  const [progress, setProgress] = useState(loadProgress()); // Load saved progress
  const [showSettings, setShowSettings] = useState(false); // Show settings panel?

  // Save progress whenever it changes
  // useEffect(() => {
    // saveProgress(progress);
  // }, [progress]);

  useEffect(() => {
  resetProgress();
}, []);

  // Update progress helper function
  const updateProgress = (updates) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  // Navigate to a different page
  const navigateTo = (page, category = null) => {
    setCurrentPage(page);
    setSelectedCategory(category);
  };

  // Go back to home
  const goHome = () => {
    setCurrentPage('home');
    setSelectedCategory(null);
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Update settings
  const handleSettingsChange = (newSettings) => {
    const updatedProgress = { ...progress };
    updatedProgress.settings = { ...updatedProgress.settings, ...newSettings };
    setProgress(updatedProgress);
  };

  // Render the current page based on state
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home progress={progress} navigateTo={navigateTo} />;
      
      case 'exploration':
        return (
          <Exploration 
            category={selectedCategory}
            progress={progress}
            updateProgress={updateProgress}
            goHome={goHome}
          />
        );
      
      case 'quiz':
        return (
          <QuizMode
            category={selectedCategory}
            progress={progress}
            updateProgress={updateProgress}
            goHome={goHome}
          />
        );
      
      case 'matching':
        return (
          <MatchingGame
            category={selectedCategory}
            progress={progress}
            updateProgress={updateProgress}
            goHome={goHome}
          />
        );
      
      case 'memory':
        return (
          <MemoryGame
            category={selectedCategory}
            progress={progress}
            updateProgress={updateProgress}
            goHome={goHome}
          />
        );
      
      default:
        return <Home progress={progress} navigateTo={navigateTo} />;
    }
  };

  return (
<div className={`min-h-screen ${progress.settings.highContrast ? 'bg-white' : 'bg-slate-50'}`}>      {/* Navigation Bar */}
      <Navigation 
        goHome={goHome}
        toggleSettings={toggleSettings}
        volume={progress.settings.volume}
        currentPage={currentPage}
      />

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Settings</h2>
            
            {/* Volume Control */}
            <div className="mb-6">
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <Volume2 className="mr-2" size={24} />
                Volume: {Math.round(progress.settings.volume * 100)}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={progress.settings.volume}
                onChange={(e) => handleSettingsChange({ volume: parseFloat(e.target.value) })}
                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* High Contrast Mode */}
            <div className="mb-6">
              <button
                onClick={() => handleSettingsChange({ highContrast: !progress.settings.highContrast })}
                className={`w-full p-4 rounded-xl font-semibold text-lg transition-all ${
                  progress.settings.highContrast 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {progress.settings.highContrast ? <Moon className="inline mr-2" /> : <Sun className="inline mr-2" />}
                High Contrast: {progress.settings.highContrast ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Text Size */}
            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-700 mb-2 block">Text Size</label>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => handleSettingsChange({ textSize: size })}
                    className={`flex-1 p-3 rounded-lg font-semibold capitalize transition-all ${
                      progress.settings.textSize === size
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="mb-6">
              <button
                onClick={() => handleSettingsChange({ reducedMotion: !progress.settings.reducedMotion })}
                className={`w-full p-4 rounded-xl font-semibold text-lg transition-all ${
                  progress.settings.reducedMotion 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                Reduced Motion: {progress.settings.reducedMotion ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleSettings}
              className="w-full bg-blue-500 text-white p-4 rounded-xl font-bold text-xl hover:bg-blue-600 transition-all"
            >
              Close Settings
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`container mx-auto px-4 py-6 ${
        progress.settings.textSize === 'small' ? 'text-base' : 
        progress.settings.textSize === 'large' ? 'text-xl' : 'text-lg'
      }`}>
        {renderPage()}
      </main>

      {/* Progress Display (Bottom Right Corner) */}
      {currentPage === 'home' && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">⭐ {progress.starsEarned}</p>
            <p className="text-sm text-gray-600">Stars Earned</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;