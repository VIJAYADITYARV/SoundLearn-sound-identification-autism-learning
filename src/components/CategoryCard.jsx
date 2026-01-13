// CategoryCard.jsx - Reusable category selection card

import React from 'react';

function CategoryCard({ category, onSelect, isCompleted }) {
  const categoryData = {
    animals: { 
      name: 'Animals', 
      icon: '🦁', 
      gradient: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300'
    },
    vehicles: { 
      name: 'Vehicles', 
      icon: '🚗', 
      gradient: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300'
    },
    nature: { 
      name: 'Nature', 
      icon: '🌊', 
      gradient: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300'
    },
    household: { 
      name: 'Household', 
      icon: '🏠', 
      gradient: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-300'
    },
    human: { 
      name: 'Human Sounds', 
      icon: '👤', 
      gradient: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-300'
    }
  };

  const data = categoryData[category];

  return (
    <button
      onClick={() => onSelect(category)}
      className={`${data.bgColor} border-4 ${data.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all hover:scale-105 transform group`}
    >
      <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
        {data.icon}
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-2">{data.name}</h3>
      {isCompleted && (
        <div className="mt-3 inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          <span>✓</span>
          <span>Completed</span>
        </div>
      )}
    </button>
  );
}

export default CategoryCard;