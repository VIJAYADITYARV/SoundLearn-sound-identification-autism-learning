// Home.jsx - Friendly Professional Balance

import React from 'react';
import { BookOpen, Brain, Layers, Zap, Award, Target, TrendingUp, BarChart3, Calculator } from 'lucide-react';

function Home({ progress, navigateTo }) {

  const categories = [
    {
      id: 'animals',
      name: 'Animals',
      icon: '🦁',
      description: 'Dogs, Cats, Birds & More',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      icon: '🚗',
      description: 'Cars, Trains, Planes',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'nature',
      name: 'Nature',
      icon: '🌊',
      description: 'Rain, Wind, Thunder',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'household',
      name: 'Household',
      icon: '🏠',
      description: 'Doorbell, Clock, Phone',
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200'
    },
    {
      id: 'human',
      name: 'Human Sounds',
      icon: '👤',
      description: 'Laughing, Crying, Clapping',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ];

  const modes = [
    {
      id: 'exploration',
      name: 'Explore Sounds',
      description: 'Listen and learn at your pace',
      icon: <BookOpen size={32} strokeWidth={2} />,
      gradient: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      id: 'quiz',
      name: 'Take Quiz',
      description: 'Test your sound knowledge',
      icon: <Brain size={32} strokeWidth={2} />,
      gradient: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      id: 'matching',
      name: 'Match Game',
      description: 'Connect sounds to pictures',
      icon: <Layers size={32} strokeWidth={2} />,
      gradient: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-700'
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Find matching sound pairs',
      icon: <Zap size={32} strokeWidth={2} />,
      gradient: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    {
      id: 'maths-learning',
      name: 'Maths Learning',
      description: 'Count and add with pictures',
      icon: <Calculator size={32} strokeWidth={2} />,
      gradient: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700'
    }
  ];

  const stats = [
    { label: 'Stars Earned', value: progress.starsEarned, icon: <Award size={24} />, color: 'bg-yellow-500' },
    { label: 'Quizzes Done', value: progress.quizzesCompleted, icon: <Target size={24} />, color: 'bg-green-500' },
    { label: 'Games Won', value: progress.gamesWon, icon: <TrendingUp size={24} />, color: 'bg-blue-500' },
    { label: 'Total Score', value: progress.totalScore, icon: <BarChart3 size={24} />, color: 'bg-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">

      {/* Welcome Hero */}
      <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-10 text-white shadow-2xl mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black mb-3">Welcome Back!</h1>
            <p className="text-xl font-semibold text-blue-50">Ready to learn some sounds today?</p>
          </div>
          <div className="text-8xl hidden md:block">🎧</div>
        </div>
      </div>

      {/* Stats Cards - Clear and Motivating */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Your Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border-4 border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all hover:shadow-lg">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
              <p className="text-sm font-bold text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Modes - Big, Clear Buttons */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Choose Your Learning Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map(mode => (
            <button
              key={mode.id}
              onClick={() => navigateTo(mode.id, 'animals')}
              className={`group ${mode.bgColor} border-4 ${mode.borderColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-200 text-left hover:scale-105 transform relative overflow-hidden`}
            >
              {mode.id === 'maths-learning' && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-md">
                  NEW!
                </div>
              )}
              <div className={`inline-flex p-4 bg-gradient-to-br ${mode.gradient} rounded-2xl text-white mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                {mode.icon}
              </div>
              <h3 className={`text-2xl font-black ${mode.textColor} mb-2`}>
                {mode.name}
              </h3>
              <p className="text-base font-semibold text-slate-600">
                {mode.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Create Custom Card Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between mt-8">
        <div>
          <h2 className="text-3xl font-black mb-2">Create Your Own Card!</h2>
          <p className="text-lg opacity-90">Design a custom sound card for your child.</p>
        </div>
        <button
          onClick={() => navigateTo('create-card')}
          className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg transform hover:scale-105"
        >
          Create Custom Card
        </button>
      </div>

      {/* Sound Categories - Clean Grid */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Sound Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map(category => (
            <div
              key={category.id}
              className={`${category.bgColor} border-4 ${category.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group hover:scale-105 transform`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="text-lg font-black text-slate-800 mb-1">{category.name}</h3>
              <p className="text-xs font-semibold text-slate-600 mb-3">{category.description}</p>
              {progress.explorationComplete[category.id] && (
                <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Completed!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-8 text-center shadow-xl">
        <p className="text-3xl font-black text-white">
          Keep Learning! You're Doing Great!
        </p>
      </div>
    </div>
  );
}

export default Home;