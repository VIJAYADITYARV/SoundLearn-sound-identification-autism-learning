// routes/analyticsRoutes.js - API routes for analytics data
const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Get analytics for a user
router.get('/user/:userId', async (req, res) => {
    try {
        let analytics = await Analytics.findOne({ userId: req.params.userId });

        // Create analytics if doesn't exist
        if (!analytics) {
            analytics = new Analytics({ userId: req.params.userId });
            await analytics.save();
        }

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Track an attempt
router.post('/track-attempt', async (req, res) => {
    try {
        const { userId, isCorrect, category, gameMode } = req.body;

        let analytics = await Analytics.findOne({ userId });
        if (!analytics) {
            analytics = new Analytics({ userId });
        }

        // Update totals
        analytics.totalAttempts++;
        if (isCorrect) {
            analytics.correctAnswers++;
        } else {
            analytics.incorrectAnswers++;
        }

        // Update category performance
        if (category && analytics.categoryPerformance[category]) {
            analytics.categoryPerformance[category].attempts++;
            if (isCorrect) {
                analytics.categoryPerformance[category].correct++;
            }
        }

        await analytics.save();
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Track a session
router.post('/track-session', async (req, res) => {
    try {
        const { userId, gameMode, durationMinutes } = req.body;

        let analytics = await Analytics.findOne({ userId });
        if (!analytics) {
            analytics = new Analytics({ userId });
        }

        // Update game mode stats
        const modeKey = gameMode === 'maths-learning' ? 'mathsLearning' : gameMode;
        if (analytics.gameModeStats[modeKey]) {
            analytics.gameModeStats[modeKey].sessions++;
            analytics.gameModeStats[modeKey].timeSpent += durationMinutes;
        }

        analytics.timeSpent += durationMinutes;

        // Add to session history
        analytics.sessionHistory.push({
            gameMode,
            duration: durationMinutes,
            timestamp: new Date()
        });

        await analytics.save();
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get performance summary
router.get('/summary/:userId', async (req, res) => {
    try {
        const analytics = await Analytics.findOne({ userId: req.params.userId });

        if (!analytics) {
            return res.json({
                successRate: 0,
                totalAttempts: 0,
                timeSpent: 0,
                favoriteMode: 'None'
            });
        }

        const successRate = analytics.totalAttempts > 0
            ? Math.round((analytics.correctAnswers / analytics.totalAttempts) * 100)
            : 0;

        // Find favorite game mode
        let favoriteMode = 'exploration';
        let maxSessions = 0;
        Object.entries(analytics.gameModeStats).forEach(([mode, stats]) => {
            if (stats.sessions > maxSessions) {
                maxSessions = stats.sessions;
                favoriteMode = mode;
            }
        });

        res.json({
            successRate,
            totalAttempts: analytics.totalAttempts,
            timeSpent: analytics.timeSpent,
            favoriteMode
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
