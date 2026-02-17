// models/Analytics.js - Analytics data schema for tracking learning performance
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalAttempts: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    incorrectAnswers: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 }, // in minutes

    categoryPerformance: {
        animals: {
            attempts: { type: Number, default: 0 },
            correct: { type: Number, default: 0 }
        },
        vehicles: {
            attempts: { type: Number, default: 0 },
            correct: { type: Number, default: 0 }
        },
        nature: {
            attempts: { type: Number, default: 0 },
            correct: { type: Number, default: 0 }
        },
        household: {
            attempts: { type: Number, default: 0 },
            correct: { type: Number, default: 0 }
        },
        human: {
            attempts: { type: Number, default: 0 },
            correct: { type: Number, default: 0 }
        }
    },

    gameModeStats: {
        exploration: {
            sessions: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 }
        },
        quiz: {
            sessions: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 }
        },
        matching: {
            sessions: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 }
        },
        memory: {
            sessions: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 }
        },
        mathsLearning: {
            sessions: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 }
        }
    },

    sessionHistory: [{
        gameMode: String,
        duration: Number,
        timestamp: { type: Date, default: Date.now }
    }],

    dailyActivity: [{
        date: { type: Date, default: Date.now },
        attempts: { type: Number, default: 0 },
        correctAnswers: { type: Number, default: 0 }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Analytics', analyticsSchema);
