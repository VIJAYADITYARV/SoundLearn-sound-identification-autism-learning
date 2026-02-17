// analyticsUtils.js - Utility functions for tracking learning analytics

export const trackAttempt = (isCorrect, category = null, gameMode = null) => {
    const analyticsData = JSON.parse(localStorage.getItem('analyticsData') || '{}');

    // Initialize if needed
    if (!analyticsData.totalAttempts) {
        analyticsData.totalAttempts = 0;
        analyticsData.correctAnswers = 0;
        analyticsData.incorrectAnswers = 0;
        analyticsData.timeSpent = 0;
        analyticsData.sessionHistory = [];
        analyticsData.categoryPerformance = {
            animals: { attempts: 0, correct: 0 },
            vehicles: { attempts: 0, correct: 0 },
            nature: { attempts: 0, correct: 0 },
            household: { attempts: 0, correct: 0 },
            human: { attempts: 0, correct: 0 }
        };
        analyticsData.gameModeStats = {
            exploration: { sessions: 0, timeSpent: 0 },
            quiz: { sessions: 0, timeSpent: 0 },
            matching: { sessions: 0, timeSpent: 0 },
            memory: { sessions: 0, timeSpent: 0 },
            'maths-learning': { sessions: 0, timeSpent: 0 }
        };
        analyticsData.dailyActivity = [];
    }

    // Update totals
    analyticsData.totalAttempts++;
    if (isCorrect) {
        analyticsData.correctAnswers++;
    } else {
        analyticsData.incorrectAnswers++;
    }

    // Update category performance
    if (category && analyticsData.categoryPerformance[category]) {
        analyticsData.categoryPerformance[category].attempts++;
        if (isCorrect) {
            analyticsData.categoryPerformance[category].correct++;
        }
    }

    // Save back to localStorage
    localStorage.setItem('analyticsData', JSON.stringify(analyticsData));
};

export const trackSession = (gameMode, durationMinutes) => {
    const analyticsData = JSON.parse(localStorage.getItem('analyticsData') || '{}');

    if (!analyticsData.gameModeStats) {
        analyticsData.gameModeStats = {
            exploration: { sessions: 0, timeSpent: 0 },
            quiz: { sessions: 0, timeSpent: 0 },
            matching: { sessions: 0, timeSpent: 0 },
            memory: { sessions: 0, timeSpent: 0 },
            'maths-learning': { sessions: 0, timeSpent: 0 }
        };
    }

    if (analyticsData.gameModeStats[gameMode]) {
        analyticsData.gameModeStats[gameMode].sessions++;
        analyticsData.gameModeStats[gameMode].timeSpent += durationMinutes;
    }

    analyticsData.timeSpent = (analyticsData.timeSpent || 0) + durationMinutes;

    // Add to session history
    if (!analyticsData.sessionHistory) {
        analyticsData.sessionHistory = [];
    }
    analyticsData.sessionHistory.push({
        gameMode,
        duration: durationMinutes,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem('analyticsData', JSON.stringify(analyticsData));
};

export const getAnalyticsData = () => {
    return JSON.parse(localStorage.getItem('analyticsData') || '{}');
};

export const resetAnalytics = () => {
    localStorage.removeItem('analyticsData');
};
