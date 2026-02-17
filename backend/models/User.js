// models/User.js - User schema for storing child profiles and progress
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    childName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 1,
        max: 18
    },
    parentEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    progress: {
        starsEarned: { type: Number, default: 0 },
        quizzesCompleted: { type: Number, default: 0 },
        gamesWon: { type: Number, default: 0 },
        totalScore: { type: Number, default: 0 },
        explorationComplete: {
            animals: { type: Boolean, default: false },
            vehicles: { type: Boolean, default: false },
            nature: { type: Boolean, default: false },
            household: { type: Boolean, default: false },
            human: { type: Boolean, default: false }
        }
    },
    settings: {
        volume: { type: Number, default: 70 },
        highContrast: { type: Boolean, default: false },
        reducedMotion: { type: Boolean, default: false },
        textSize: { type: String, default: 'medium' }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastActive on save
userSchema.pre('save', function (next) {
    this.lastActive = new Date();
    next();
});

module.exports = mongoose.model('User', userSchema);
