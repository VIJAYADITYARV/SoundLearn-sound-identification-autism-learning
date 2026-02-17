// Analytics.jsx - Comprehensive Learning Analytics Dashboard
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Target, Clock, Zap, Award, BarChart3, PieChart, Activity } from 'lucide-react';

function Analytics({ goHome, progress }) {
    const [analyticsData] = useState(() => {
        const saved = localStorage.getItem('analyticsData');
        return saved ? JSON.parse(saved) : {
            totalAttempts: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            timeSpent: 0, // in minutes
            sessionHistory: [],
            categoryPerformance: {
                animals: { attempts: 0, correct: 0 },
                vehicles: { attempts: 0, correct: 0 },
                nature: { attempts: 0, correct: 0 },
                household: { attempts: 0, correct: 0 },
                human: { attempts: 0, correct: 0 }
            },
            gameModeStats: {
                exploration: { sessions: 0, timeSpent: 0 },
                quiz: { sessions: 0, timeSpent: 0 },
                matching: { sessions: 0, timeSpent: 0 },
                memory: { sessions: 0, timeSpent: 0 },
                'maths-learning': { sessions: 0, timeSpent: 0 }
            },
            dailyActivity: []
        };
    });

    const successRate = analyticsData.totalAttempts > 0
        ? Math.round((analyticsData.correctAnswers / analyticsData.totalAttempts) * 100)
        : 0;

    const averageSessionTime = analyticsData.sessionHistory.length > 0
        ? Math.round(analyticsData.timeSpent / analyticsData.sessionHistory.length)
        : 0;

    // Calculate category performance percentages
    const getCategoryPerformance = () => {
        return Object.entries(analyticsData.categoryPerformance).map(([category, data]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            percentage: data.attempts > 0 ? Math.round((data.correct / data.attempts) * 100) : 0,
            attempts: data.attempts,
            icon: {
                animals: '🦁',
                vehicles: '🚗',
                nature: '🌊',
                household: '🏠',
                human: '👤'
            }[category]
        }));
    };

    // Get game mode distribution
    const getGameModeDistribution = () => {
        const total = Object.values(analyticsData.gameModeStats).reduce((sum, mode) => sum + mode.sessions, 0);
        return Object.entries(analyticsData.gameModeStats).map(([mode, data]) => ({
            mode: mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            sessions: data.sessions,
            percentage: total > 0 ? Math.round((data.sessions / total) * 100) : 0,
            color: {
                exploration: 'bg-blue-500',
                quiz: 'bg-emerald-500',
                matching: 'bg-violet-500',
                memory: 'bg-amber-500',
                'maths-learning': 'bg-pink-500'
            }[mode]
        }));
    };

    const categoryPerformance = getCategoryPerformance();
    const gameModeDistribution = getGameModeDistribution();

    return (
        <div className="max-w-7xl mx-auto pb-12 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={goHome}
                        className="p-3 bg-slate-200 hover:bg-slate-300 rounded-xl transition-all"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-800">Learning Analytics</h1>
                        <p className="text-slate-600 font-semibold">Track progress and performance insights</p>
                    </div>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Attempts */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <Target size={32} />
                        <div className="text-5xl font-black">{analyticsData.totalAttempts}</div>
                    </div>
                    <p className="text-blue-100 font-bold text-lg">Total Attempts</p>
                    <p className="text-blue-200 text-sm mt-1">All learning activities</p>
                </div>

                {/* Success Rate */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <TrendingUp size={32} />
                        <div className="text-5xl font-black">{successRate}%</div>
                    </div>
                    <p className="text-emerald-100 font-bold text-lg">Success Rate</p>
                    <p className="text-emerald-200 text-sm mt-1">{analyticsData.correctAnswers} correct answers</p>
                </div>

                {/* Time Spent */}
                <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <Clock size={32} />
                        <div className="text-5xl font-black">{Math.round(analyticsData.timeSpent)}</div>
                    </div>
                    <p className="text-violet-100 font-bold text-lg">Minutes Played</p>
                    <p className="text-violet-200 text-sm mt-1">Avg: {averageSessionTime} min/session</p>
                </div>

                {/* Stars Earned */}
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <Award size={32} />
                        <div className="text-5xl font-black">{progress.starsEarned}</div>
                    </div>
                    <p className="text-amber-100 font-bold text-lg">Stars Earned</p>
                    <p className="text-amber-200 text-sm mt-1">Achievement unlocked!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Performance Chart */}
                <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <BarChart3 size={28} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">Category Performance</h2>
                    </div>

                    <div className="space-y-4">
                        {categoryPerformance.map((cat, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl">{cat.icon}</span>
                                        <span className="font-bold text-slate-700">{cat.category}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-black text-2xl text-slate-800">{cat.percentage}%</span>
                                        <p className="text-xs text-slate-500">{cat.attempts} attempts</p>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${cat.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Game Mode Distribution */}
                <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <PieChart size={28} className="text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">Game Mode Usage</h2>
                    </div>

                    <div className="space-y-4">
                        {gameModeDistribution.map((mode, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-700">{mode.mode}</span>
                                    <div className="text-right">
                                        <span className="font-black text-xl text-slate-800">{mode.sessions}</span>
                                        <span className="text-slate-500 text-sm ml-2">sessions</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`${mode.color} h-full rounded-full transition-all duration-500`}
                                        style={{ width: `${mode.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <Activity size={32} />
                    <h2 className="text-2xl font-black">Performance Insights</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-white/80 text-sm font-bold mb-2">STRONGEST CATEGORY</p>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl">
                                {categoryPerformance.reduce((max, cat) => cat.percentage > max.percentage ? cat : max, categoryPerformance[0])?.icon}
                            </span>
                            <div>
                                <p className="text-2xl font-black">
                                    {categoryPerformance.reduce((max, cat) => cat.percentage > max.percentage ? cat : max, categoryPerformance[0])?.category}
                                </p>
                                <p className="text-white/80 text-sm">
                                    {categoryPerformance.reduce((max, cat) => cat.percentage > max.percentage ? cat : max, categoryPerformance[0])?.percentage}% success
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-white/80 text-sm font-bold mb-2">FAVORITE MODE</p>
                        <div>
                            <p className="text-2xl font-black">
                                {gameModeDistribution.reduce((max, mode) => mode.sessions > max.sessions ? mode : max, gameModeDistribution[0])?.mode}
                            </p>
                            <p className="text-white/80 text-sm">
                                {gameModeDistribution.reduce((max, mode) => mode.sessions > max.sessions ? mode : max, gameModeDistribution[0])?.sessions} sessions played
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-white/80 text-sm font-bold mb-2">LEARNING STREAK</p>
                        <div className="flex items-center gap-2">
                            <Zap size={32} className="text-yellow-300" />
                            <div>
                                <p className="text-2xl font-black">{progress.gamesWon} Days</p>
                                <p className="text-white/80 text-sm">Keep it up!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
                <p className="text-blue-800 font-bold">
                    💡 Analytics are tracked locally and update in real-time as the child learns!
                </p>
            </div>
        </div>
    );
}

export default Analytics;
