// QuizMode.jsx - Quiz mode with difficulty levels and hints

import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle, XCircle, Star, Trophy } from 'lucide-react';
import { soundsData, getSoundsByCategory, getAllSounds } from '../data/soundsData';
import { playSound } from '../utils/soundUtils';


function QuizMode({ category, progress, updateProgress, goHome }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Difficulty settings
  const difficultySettings = {
    easy: { name: 'Easy', options: 4, questions: 5, color: 'from-green-500 to-emerald-600' },
    medium: { name: 'Medium', options: 6, questions: 8, color: 'from-yellow-500 to-orange-600' },
    hard: { name: 'Hard', options: 8, questions: 10, color: 'from-red-500 to-pink-600' }
  };

  // Category Selection Screen
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
          <h1 className="text-5xl font-black text-slate-800 mb-4">Choose Quiz Category</h1>
          <p className="text-xl text-slate-600">Select a category to test your knowledge</p>
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
                onClick={() => setSelectedCategory(cat)}
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

  // Difficulty Selection Screen
  if (!difficulty) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
          >
            <ArrowLeft size={20} />
            Back to Categories
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 mb-4">Choose Difficulty</h1>
          <p className="text-xl text-slate-600">Select your challenge level</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(difficultySettings).map(([key, diff]) => (
            <button
              key={key}
              onClick={() => {
                setDifficulty(key);
                generateQuestions(key);
              }}
              className={`bg-gradient-to-br ${diff.color} text-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105 transform`}
            >
              <h3 className="text-4xl font-black mb-3">{diff.name}</h3>
              <p className="text-lg font-semibold mb-2">{diff.options} Options</p>
              <p className="text-base opacity-90">{diff.questions} Questions</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Generate quiz questions
  function generateQuestions(diff) {
    const settings = difficultySettings[diff];
    const categorySounds = getSoundsByCategory(selectedCategory);
    const allSounds = getAllSounds();
    const quizQuestions = [];

    for (let i = 0; i < settings.questions; i++) {
      const correctSound = categorySounds[Math.floor(Math.random() * categorySounds.length)];
      const wrongSounds = allSounds
        .filter(s => s.id !== correctSound.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, settings.options - 1);
      
      const options = [...wrongSounds, correctSound].sort(() => Math.random() - 0.5);
      
      quizQuestions.push({
        correctSound,
        options,
        category: selectedCategory
      });
    }

    setQuestions(quizQuestions);
  };

  // Handle answer selection
  const handleAnswer = (sound) => {
    if (showResult) return;

    setSelectedAnswer(sound);
    const correct = sound.id === questions[currentQuestion].correctSound.id;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  // Next question
  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Quiz complete
      const stars = Math.ceil((score / questions.length) * 5);
      const updatedProgress = { ...progress };
      updatedProgress.quizzesCompleted += 1;
      updatedProgress.starsEarned += stars;
      updatedProgress.totalScore += score;
      updateProgress(updatedProgress);
      setQuizComplete(true);
    }
  };

  // Play current question sound
  const playQuestionSound = () => {
    if (questions[currentQuestion]) {
      playSound(questions[currentQuestion].correctSound.sound);
    }
  };

  // Quiz complete screen
  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const stars = Math.ceil((score / questions.length) * 5);

    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-12 text-white shadow-2xl">
          <Trophy size={80} className="mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Quiz Complete!</h1>
          <p className="text-3xl font-bold mb-8">
            You scored {score} out of {questions.length}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={40}
                className={i < stars ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'}
              />
            ))}
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-2xl font-bold">Accuracy: {percentage}%</p>
            <p className="text-lg mt-2">+{stars} Stars Earned! 🌟</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setDifficulty(null);
                setCurrentQuestion(0);
                setScore(0);
                setQuestions([]);
                setQuizComplete(false);
              }}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Try Again
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

  // Quiz in progress
  if (questions.length === 0) return <div>Loading...</div>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setDifficulty(null)}
          className="flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="text-center">
          <p className="text-lg font-bold text-slate-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-sm text-slate-500">Score: {score}</p>
        </div>

        <button
          onClick={goHome}
          className="px-5 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
        >
          Home
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-10 text-white mb-8 shadow-2xl">
        <h2 className="text-3xl font-black mb-6 text-center">
          What sound is this?
        </h2>
        
        <button
          onClick={playQuestionSound}
          className="w-full bg-white/20 backdrop-blur-sm border-4 border-white/40 rounded-2xl p-8 hover:bg-white/30 transition-all mb-6"
        >
          <div className="text-7xl mb-4">🔊</div>
          <p className="text-2xl font-black">Click to Play Sound</p>
        </button>

        {/* Hint Button */}
        {!showResult && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-xl font-bold transition-all"
          >
            <HelpCircle size={20} />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}

        {/* Hint Display */}
        {showHint && (
          <div className="mt-4 bg-yellow-400 text-slate-900 rounded-xl p-4 font-bold text-center">
            💡 Hint: This is from the "{currentQ.category}" category
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className={`grid grid-cols-2 ${difficultySettings[difficulty].options > 4 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 mb-8`}>
        {currentQ.options.map(sound => {
          let cardClass = `${sound.color} border-4 border-slate-300 rounded-2xl p-6 transition-all cursor-pointer`;
          
          if (showResult) {
            if (sound.id === currentQ.correctSound.id) {
              cardClass = 'bg-green-100 border-4 border-green-500 rounded-2xl p-6';
            } else if (selectedAnswer && sound.id === selectedAnswer.id) {
              cardClass = 'bg-red-100 border-4 border-red-500 rounded-2xl p-6';
            } else {
              cardClass += ' opacity-50';
            }
          } else {
            cardClass += ' hover:shadow-xl hover:scale-105 transform';
          }

          return (
            <button
              key={sound.id}
              onClick={() => handleAnswer(sound)}
              disabled={showResult}
              className={cardClass}
            >
              <div className="text-5xl mb-3">{sound.emoji}</div>
              <p className="text-lg font-black text-slate-800">{sound.name}</p>
              
              {showResult && sound.id === currentQ.correctSound.id && (
                <div className="mt-2">
                  <CheckCircle className="text-green-600 mx-auto" size={32} />
                </div>
              )}
              {showResult && selectedAnswer && sound.id === selectedAnswer.id && sound.id !== currentQ.correctSound.id && (
                <div className="mt-2">
                  <XCircle className="text-red-600 mx-auto" size={32} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Result Message & Next Button */}
      {showResult && (
        <div className="text-center">
          <div className={`inline-block ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white rounded-2xl px-8 py-4 mb-6 shadow-xl`}>
            <p className="text-3xl font-black">
              {isCorrect ? '✓ Correct!' : '✗ Wrong!'}
            </p>
            <p className="text-lg font-semibold mt-2">
              The answer was: {currentQ.correctSound.name}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-black text-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {currentQuestion + 1 < questions.length ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizMode;