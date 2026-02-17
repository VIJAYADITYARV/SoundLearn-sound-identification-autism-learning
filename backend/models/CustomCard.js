// models/CustomCard.js - Custom sound card schema
const mongoose = require('mongoose');

const customCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    emoji: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true
    },
    soundId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'custom'
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    usageCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CustomCard', customCardSchema);
