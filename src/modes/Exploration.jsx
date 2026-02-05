// Exploration.jsx - Free exploration learning mode

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { soundsData, getSoundsByCategory } from '../data/soundsData';
import SoundCard from '../components/SoundCard';
import CategoryCard from '../components/CategoryCard';

function Exploration({ category, progress, updateProgress, goHome, customCards }) {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [playedSounds, setPlayedSounds] = useState([]);

  // If no category selected, show category chooser
  if (!selectedCategory) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={goHome}
            className="flex items-center gap-2 px-4 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 mb-4">
            Choose a Category to Explore
          </h1>
          <p className="text-xl text-slate-600">
            Click on any category to start listening to sounds
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.keys(soundsData).map(cat => (
            <CategoryCard
              key={cat}
              category={cat}
              onSelect={setSelectedCategory}
              isCompleted={progress.explorationComplete[cat]}
            />
          ))}
        </div>
      </div>
    );
  }

  // Get sounds for selected category
  const sounds = getSoundsByCategory(selectedCategory);

  // Handle sound play
  const handleSoundPlay = (sound) => {
    if (!playedSounds.includes(sound.id)) {
      setPlayedSounds([...playedSounds, sound.id]);
    }

    // If all sounds played, mark category as complete
    if (playedSounds.length + 1 === sounds.length) {
      const updatedProgress = { ...progress };
      updatedProgress.explorationComplete[selectedCategory] = true;
      updatedProgress.starsEarned += 5;
      updateProgress(updatedProgress);
    }
  };

  const completionPercentage = Math.round((playedSounds.length / sounds.length) * 100);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
        >
          <ArrowLeft size={20} />
          Back to Categories
        </button>

        <button
          onClick={goHome}
          className="px-5 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
        >
          Home
        </button>
      </div>

      {/* Title & Progress */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Explore {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Sounds
            </h1>
            <p className="text-xl font-semibold text-blue-50">
              Click on any card to hear the sound!
            </p>
          </div>
          <div className="text-7xl hidden md:block">
            {selectedCategory === 'animals' ? '🦁' :
              selectedCategory === 'vehicles' ? '🚗' :
                selectedCategory === 'nature' ? '🌊' :
                  selectedCategory === 'household' ? '🏠' : '👤'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">Progress: {playedSounds.length} / {sounds.length} sounds</span>
            <span className="text-sm font-bold">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-blue-900/30 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <div className="mt-4 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-bold">
            <CheckCircle size={20} />
            <span>Category Completed! +5 Stars! 🌟</span>
          </div>
        )}
      </div>

      {/* Sound Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sounds.map(sound => (
          <SoundCard
            key={sound.id}
            sound={sound}
            onPlay={handleSoundPlay}
          />
        ))}
      </div>

      {/* Custom Cards Section (Only if they exist) */}
      {customCards && customCards.length > 0 && selectedCategory === 'animals' && (
        <div className="mt-12">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">✨</span> My Custom Cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {customCards.map(sound => (
              <SoundCard
                key={sound.id}
                sound={sound}
                // Custom cards don't track progress to avoid messing up the math
                onPlay={() => { }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="mt-8 bg-slate-100 border-4 border-slate-200 rounded-2xl p-6 text-center">
        <p className="text-lg font-bold text-slate-700">
          💡 Tip: Listen to each sound carefully. Try to remember what each one sounds like!
        </p>
      </div>
    </div>
  );
}

export default Exploration;