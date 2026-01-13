// MatchingGame.jsx - Match sounds to images game

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Volume2 } from 'lucide-react';
import { soundsData, getSoundsByCategory } from '../data/soundsData';
import { playSound } from '../utils/soundUtils';

function MatchingGame({ category, progress, updateProgress, goHome }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Category Selection
  if (!selectedCategory) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={goHome}
            className="flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 mb-4">Choose Category</h1>
          <p className="text-xl text-slate-600">Match sounds to their images!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.keys(soundsData).map(cat => {
            const categoryInfo = {
              animals: { icon: '🦁', bg: 'bg-amber-50', border: 'border-amber-300' },
              vehicles: { icon: '🚗', bg: 'bg-blue-50', border: 'border-blue-300' },
              nature: { icon: '🌊', bg: 'bg-emerald-50', border: 'border-emerald-300' },
              household: { icon: '🏠', bg: 'bg-violet-50', border: 'border-violet-300' },
              human: { icon: '👤', bg: 'bg-pink-50', border: 'border-pink-300' }
            };
            const info = categoryInfo[cat];
            
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  initializeGame(cat);
                }}
                className={`${info.bg} border-4 ${info.border} rounded-2xl p-8 hover:shadow-xl transition-all hover:scale-105 transform`}
              >
                <div className="text-7xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-black text-slate-800 capitalize">{cat}</h3>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Initialize game
  function initializeGame(cat){
    const sounds = getSoundsByCategory(cat);
    setCards(sounds);
    setMatchedPairs([]);
    setSelectedSound(null);
    setSelectedImage(null);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
  };

  // Handle sound card click
  const handleSoundClick = (sound) => {
    if (matchedPairs.includes(sound.id)) return;
    
    setSelectedSound(sound);
    playSound(sound.sound);

    // If image already selected, check match
    if (selectedImage) {
      checkMatch(sound, selectedImage);
    }
  };

  // Handle image card click
  const handleImageClick = (sound) => {
    if (matchedPairs.includes(sound.id)) return;
    
    setSelectedImage(sound);

    // If sound already selected, check match
    if (selectedSound) {
      checkMatch(selectedSound, sound);
    }
  };

  // Check if match is correct
  const checkMatch = (soundCard, imageCard) => {
    setAttempts(attempts + 1);

    if (soundCard.id === imageCard.id) {
      // Correct match
      setMatchedPairs([...matchedPairs, soundCard.id]);
      setScore(score + 10);
      setSelectedSound(null);
      setSelectedImage(null);

      // Check if game complete
      if (matchedPairs.length + 1 === cards.length) {
        const stars = 5;
        const updatedProgress = { ...progress };
        updatedProgress.gamesWon += 1;
        updatedProgress.starsEarned += stars;
        updatedProgress.totalScore += score + 10;
        updateProgress(updatedProgress);
        setGameComplete(true);
      }
    } else {
      // Wrong match - reset after delay
      setTimeout(() => {
        setSelectedSound(null);
        setSelectedImage(null);
      }, 1000);
    }
  };

  // Game complete screen
  if (gameComplete) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-12 text-white shadow-2xl">
          <Trophy size={80} className="mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Perfect Match!</h1>
          <p className="text-3xl font-bold mb-8">
            You matched all {cards.length} pairs!
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-2xl font-bold">Score: {score} points</p>
            <p className="text-lg mt-2">Attempts: {attempts}</p>
            <p className="text-lg mt-2">+5 Stars Earned! 🌟</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setGameComplete(false);
              }}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Play Again
            </button>
            <button
              onClick={goHome}
              className="px-8 py-4 bg-slate-800 text-white rounded-xl font-black text-lg hover:bg-slate-900 transition-all shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game in progress
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="text-center">
          <p className="text-2xl font-black text-slate-800">Score: {score}</p>
          <p className="text-sm text-slate-600">Matched: {matchedPairs.length}/{cards.length}</p>
        </div>

        <button
          onClick={goHome}
          className="px-5 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
        >
          Home
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white mb-8 shadow-xl text-center">
        <h1 className="text-4xl font-black mb-3">Match the Sounds!</h1>
        <p className="text-xl font-semibold">Click a sound button, then click the matching image</p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sound Buttons Column */}
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-4 text-center">🔊 Sounds</h2>
          <div className="space-y-3">
            {cards.map(sound => {
              const isMatched = matchedPairs.includes(sound.id);
              const isSelected = selectedSound?.id === sound.id;
              
              return (
                <button
                  key={`sound-${sound.id}`}
                  onClick={() => handleSoundClick(sound)}
                  disabled={isMatched}
                  className={`w-full p-6 rounded-2xl font-bold text-lg transition-all ${
                    isMatched 
                      ? 'bg-green-100 border-4 border-green-500 opacity-50 cursor-not-allowed' 
                      : isSelected
                      ? 'bg-blue-500 border-4 border-blue-700 text-white shadow-xl scale-105'
                      : 'bg-white border-4 border-slate-300 hover:border-blue-400 hover:shadow-lg hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Volume2 size={24} />
                    <span>{sound.sound}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Cards Column */}
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-4 text-center">🖼️ Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {cards.map(sound => {
              const isMatched = matchedPairs.includes(sound.id);
              const isSelected = selectedImage?.id === sound.id;
              
              return (
                <button
                  key={`image-${sound.id}`}
                  onClick={() => handleImageClick(sound)}
                  disabled={isMatched}
                  className={`${sound.color} p-6 rounded-2xl border-4 transition-all ${
                    isMatched 
                      ? 'border-green-500 opacity-50 cursor-not-allowed' 
                      : isSelected
                      ? 'border-blue-700 shadow-xl scale-105'
                      : 'border-slate-300 hover:border-blue-400 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <div className="text-6xl mb-2">{sound.emoji}</div>
                  <p className="text-lg font-black text-slate-800">{sound.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-8 bg-blue-50 border-4 border-blue-200 rounded-2xl p-6 text-center">
        <p className="text-lg font-bold text-slate-700">
          💡 Tip: Click the sound buttons to hear them, then find the matching image!
        </p>
      </div>
    </div>
  );
}

export default MatchingGame;