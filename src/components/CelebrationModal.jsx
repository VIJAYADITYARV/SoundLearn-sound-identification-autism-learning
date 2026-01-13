// CelebrationModal.jsx - Success celebration popup

import React from 'react';
import { Trophy, Star, X } from 'lucide-react';

function CelebrationModal({ isOpen, onClose, title, message, stars = 0 }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative animate-bounce">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <Trophy size={80} className="text-yellow-500 mx-auto mb-6" />
          
          <h2 className="text-4xl font-black text-slate-800 mb-4">{title}</h2>
          <p className="text-xl text-slate-600 mb-6">{message}</p>

          {stars > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(stars)].map((_, i) => (
                <Star key={i} size={32} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-black text-lg hover:shadow-xl transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default CelebrationModal;