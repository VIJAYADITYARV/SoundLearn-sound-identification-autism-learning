// MemoryGame.jsx - Memory card flip game with sounds

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock } from 'lucide-react';
import { soundsData, getSoundsByCategory } from '../data/soundsData';
import { playSound } from '../utils/soundUtils';

function MemoryGame({ category, progress, updateProgress, goHome }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

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
          <p className="text-xl text-slate-600">Test your memory with sounds!</p>
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
    
    // Create pairs: each sound appears twice
    const gameSounds = sounds.map((sound) => ({
      ...sound,
      pairId: sound.id,
      uniqueId: `${sound.id}-A`
    }));
    
    const gameSoundsPairs = sounds.map((sound) => ({
      ...sound,
      pairId: sound.id,
      uniqueId: `${sound.id}-B`
    }));
    
    const allCards = [...gameSounds, ...gameSoundsPairs].sort(() => Math.random() - 0.5);
    
    setCards(allCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setGameComplete(false);
    setIsTimerRunning(true);
  };

  // Handle card click
  const handleCardClick = (card) => {
    // Ignore if already flipped or matched
    if (flippedCards.find(f => f.uniqueId === card.uniqueId) || matchedCards.includes(card.pairId)) {
      return;
    }

    // Ignore if 2 cards already flipped
    if (flippedCards.length === 2) {
      return;
    }

    // Play sound
    playSound(card.sound);

    // Flip card
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    // Check for match if 2 cards flipped
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      const card1 = newFlipped[0];
      const card2 = newFlipped[1];

      if (card1.pairId === card2.pairId) {
        // Match found
        setTimeout(() => {
          setMatchedCards([...matchedCards, card1.pairId]);
          setFlippedCards([]);
          
          // Check if game complete
          if (matchedCards.length + 1 === cards.length / 2) {
            setIsTimerRunning(false);
            const stars = 5;
            const updatedProgress = { ...progress };
            updatedProgress.gamesWon += 1;
            updatedProgress.starsEarned += stars;
            updatedProgress.totalScore += Math.max(100 - moves * 2, 20);
            updateProgress(updatedProgress);
            setGameComplete(true);
          }
        }, 500);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Game complete screen
  if (gameComplete) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-12 text-white shadow-2xl">
          <Trophy size={80} className="mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Memory Master!</h1>
          <p className="text-3xl font-bold mb-8">
            You found all {cards.length / 2} pairs!
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-2xl font-bold">Moves: {moves}</p>
            <p className="text-2xl font-bold mt-2">Time: {formatTime(timer)}</p>
            <p className="text-lg mt-3">+5 Stars Earned! 🌟</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setGameComplete(false);
              }}
              className="px-8 py-4 bg-white text-orange-600 rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-lg"
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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsTimerRunning(false);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center gap-6">
          <div className="bg-white border-4 border-slate-300 rounded-xl px-6 py-3">
            <p className="text-sm text-slate-600 font-bold">Moves</p>
            <p className="text-3xl font-black text-slate-800">{moves}</p>
          </div>
          <div className="bg-white border-4 border-slate-300 rounded-xl px-6 py-3 flex items-center gap-2">
            <Clock size={24} className="text-blue-500" />
            <p className="text-3xl font-black text-slate-800">{formatTime(timer)}</p>
          </div>
        </div>

        <button
          onClick={goHome}
          className="px-5 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
        >
          Home
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl text-center">
        <h1 className="text-4xl font-black mb-3">Memory Game</h1>
        <p className="text-xl font-semibold">Find matching sound pairs! Click cards to flip and listen.</p>
        <p className="text-lg mt-2 opacity-90">Matched: {matchedCards.length}/{cards.length / 2}</p>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map(card => {
          const isFlipped = flippedCards.find(f => f.uniqueId === card.uniqueId);
          const isMatched = matchedCards.includes(card.pairId);
          
          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`aspect-square rounded-2xl p-4 font-bold text-lg transition-all transform ${
                isMatched
                  ? 'bg-green-100 border-4 border-green-500 opacity-50 cursor-not-allowed'
                  : isFlipped
                  ? `${card.color} border-4 border-slate-400 shadow-xl scale-105`
                  : 'bg-gradient-to-br from-slate-600 to-slate-800 border-4 border-slate-700 hover:shadow-xl hover:scale-105 cursor-pointer'
              }`}
            >
              {isFlipped || isMatched ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-4xl mb-2">{card.emoji}</div>
                  <p className="text-xs font-black text-slate-800">{card.name}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-5xl">❓</div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Helper Text */}
      <div className="mt-8 bg-purple-50 border-4 border-purple-200 rounded-2xl p-6 text-center">
        <p className="text-lg font-bold text-slate-700">
          💡 Tip: Try to remember where each sound is located!
        </p>
      </div>
    </div>
  );
}

export default MemoryGame;