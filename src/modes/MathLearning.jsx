// MathLearning.jsx - Enhanced Maths based learning with multiple modes
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Star, Calculator, Hash, Repeat, Scale, Volume2 } from 'lucide-react';
import { trackAttempt, trackSession } from '../utils/analyticsUtils';

function MathLearning({ goHome, updateProgress, progress }) {
    const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing'
    const [gameMode, setGameMode] = useState(null); // 'counting' | 'addition' | 'patterns' | 'comparison'
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [currentProblem, setCurrentProblem] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
    const [sessionStart, setSessionStart] = useState(null);

    // Text to Speech Helper
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const startGame = (mode) => {
        setGameMode(mode);
        setGameState('playing');
        setScore(0);
        setStreak(0);
        setSessionStart(Date.now());
        generateProblem(mode);
    };

    const generateProblem = (mode) => {
        let newProblem = {};
        const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🐶', '🐱', '🚗', '⭐'];
        const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

        switch (mode) {
            case 'counting': {
                const count = Math.floor(Math.random() * 8) + 1; // 1-8
                const emoji = randomEmoji();

                // Generate options
                const options = [count];
                while (options.length < 3) {
                    const distinct = Math.floor(Math.random() * 9) + 1;
                    if (!options.includes(distinct)) options.push(distinct);
                }

                newProblem = {
                    type: 'counting',
                    question: `How many ${emoji === '🍎' ? 'apples' : 'items'} do you see?`,
                    data: { count, emoji },
                    answer: count,
                    options: options.sort(() => Math.random() - 0.5)
                };
                break;
            }

            case 'addition': {
                const num1 = Math.floor(Math.random() * 5) + 1;
                const num2 = Math.floor(Math.random() * 4) + 1;
                const answer = num1 + num2;
                const emoji = '🍎';

                const options = [answer];
                while (options.length < 3) {
                    const distinct = Math.floor(Math.random() * 10) + 1;
                    if (distinct !== answer && !options.includes(distinct)) options.push(distinct);
                }

                newProblem = {
                    type: 'addition',
                    question: `Add the apples together!`,
                    data: { num1, num2, emoji },
                    answer: answer,
                    options: options.sort(() => Math.random() - 0.5)
                };
                break;
            }

            case 'patterns': {
                // Simple A-B-A-B Pattern
                const A = randomEmoji();
                let B = randomEmoji();
                while (B === A) B = randomEmoji();

                const pattern = [A, B, A, B, A]; // Next is B
                const answer = B;

                const options = [B];
                // Wrong options need to be distinct from Answer
                while (options.length < 3) {
                    let wrong = randomEmoji();
                    if (wrong !== answer && !options.includes(wrong)) options.push(wrong);
                }

                newProblem = {
                    type: 'patterns',
                    question: 'What comes next?',
                    data: { pattern },
                    answer: answer,
                    options: options.sort(() => Math.random() - 0.5)
                };
                break;
            }

            case 'comparison': {
                const leftCount = Math.floor(Math.random() * 8) + 1;
                let rightCount = Math.floor(Math.random() * 8) + 1;
                while (rightCount === leftCount) rightCount = Math.floor(Math.random() * 8) + 1;

                const emoji = randomEmoji();
                const answer = leftCount > rightCount ? 'Left' : 'Right';

                newProblem = {
                    type: 'comparison',
                    question: 'Which side has MORE?',
                    data: { leftCount, rightCount, emoji },
                    answer: answer,
                    options: ['Left', 'Right']
                };
                break;
            }

            default: break;
        }

        setCurrentProblem(newProblem);
        speak(newProblem.question);
    };

    const handleAnswer = (selected) => {
        const isCorrect = selected === currentProblem.answer;

        // Track attempt in analytics
        trackAttempt(isCorrect, null, 'maths-learning');

        if (isCorrect) {
            setFeedback('correct');
            setScore(prev => prev + 10);
            setStreak(prev => prev + 1);

            // Bonus stars for streaks
            if (updateProgress) {
                updateProgress({ starsEarned: progress.starsEarned + 1 });
            }

            speak("Great job!");

            setTimeout(() => {
                setFeedback(null);
                generateProblem(gameMode);
            }, 1500);
        } else {
            setFeedback('incorrect');
            setStreak(0);
            speak("Try again.");
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    // Track session when leaving
    useEffect(() => {
        return () => {
            if (sessionStart) {
                const durationMinutes = (Date.now() - sessionStart) / 60000;
                trackSession('maths-learning', durationMinutes);
            }
        };
    }, [sessionStart]);

    // --- MENU COMPONENT ---
    if (gameState === 'menu') {
        return (
            <div className="max-w-5xl mx-auto pb-12">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={goHome} className="p-3 bg-slate-200 rounded-xl hover:bg-slate-300">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-4xl font-black text-slate-800">Choose a Game</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Counting */}
                    <button onClick={() => startGame('counting')} className="bg-blue-50 border-4 border-blue-200 p-8 rounded-3xl hover:scale-105 transition-all text-left group">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                            <Hash size={32} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Counting</h2>
                        <p className="text-slate-600 font-bold">Count the objects (1-10)</p>
                    </button>

                    {/* Addition */}
                    <button onClick={() => startGame('addition')} className="bg-green-50 border-4 border-green-200 p-8 rounded-3xl hover:scale-105 transition-all text-left group">
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                            <Calculator size={32} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Addition</h2>
                        <p className="text-slate-600 font-bold">Add simple numbers</p>
                    </button>

                    {/* Patterns */}
                    <button onClick={() => startGame('patterns')} className="bg-purple-50 border-4 border-purple-200 p-8 rounded-3xl hover:scale-105 transition-all text-left group">
                        <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                            <Repeat size={32} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Patterns</h2>
                        <p className="text-slate-600 font-bold">What comes next?</p>
                    </button>

                    {/* Comparison */}
                    <button onClick={() => startGame('comparison')} className="bg-orange-50 border-4 border-orange-200 p-8 rounded-3xl hover:scale-105 transition-all text-left group">
                        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                            <Scale size={32} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">More or Less</h2>
                        <p className="text-slate-600 font-bold">Which side has more?</p>
                    </button>
                </div>
            </div>
        );
    }

    // --- PLAYING COMPONENT ---
    if (!currentProblem) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border-2 border-slate-100">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setGameState('menu')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700"
                    >
                        <ArrowLeft size={20} /> Menu
                    </button>
                    <button
                        onClick={() => speak(currentProblem.question)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                        title="Read Question"
                    >
                        <Volume2 size={24} />
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-orange-500 font-black text-xl">
                        <span className="text-2xl">🔥</span> {streak}
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-black text-xl border-2 border-yellow-300">
                        <Star className="fill-yellow-500" /> {score}
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-white rounded-3xl shadow-2xl border-b-8 border-indigo-200 p-8 text-center min-h-[450px] flex flex-col justify-center relative overflow-hidden">

                {/* Feedback Overlay */}
                {feedback === 'correct' && (
                    <div className="absolute inset-0 bg-green-500/95 z-20 flex items-center justify-center animate-fadeIn backdrop-blur-sm">
                        <div className="text-white text-center transform scale-110">
                            <CheckCircle size={100} className="mx-auto mb-4 animate-bounce" />
                            <h2 className="text-6xl font-black">Awesome!</h2>
                            <p className="text-2xl mt-2 font-bold opacity-90">+10 Points</p>
                        </div>
                    </div>
                )}

                {feedback === 'incorrect' && (
                    <div className="absolute inset-0 bg-red-500/95 z-20 flex items-center justify-center animate-fadeIn backdrop-blur-sm">
                        <div className="text-white text-center">
                            <XCircle size={100} className="mx-auto mb-4" />
                            <h2 className="text-5xl font-black">Try Again!</h2>
                        </div>
                    </div>
                )}

                {/* Question Text */}
                <h2 className={`text-4xl font-black text-slate-800 mb-10 ${feedback ? 'blur-sm' : ''}`}>
                    {currentProblem.question}
                </h2>

                {/* VISUALIZATION AREA */}
                <div className={`flex flex-wrap justify-center items-center gap-6 mb-12 min-h-[160px] ${feedback ? 'blur-sm' : ''}`}>

                    {/* COUNTING MODE */}
                    {currentProblem.type === 'counting' && (
                        Array.from({ length: currentProblem.data.count }).map((_, i) => (
                            <div key={i} className="text-8xl animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
                                {currentProblem.data.emoji}
                            </div>
                        ))
                    )}

                    {/* ADDITION MODE */}
                    {currentProblem.type === 'addition' && (
                        <div className="flex items-center gap-4 text-7xl font-bold text-slate-700 bg-slate-50 p-6 rounded-3xl border-4 border-slate-100">
                            <div className="flex gap-1 bg-white p-2 rounded-xl border-2 border-slate-200">
                                {Array.from({ length: currentProblem.data.num1 }).map((_, i) => (
                                    <span key={`n1-${i}`} className="text-6xl">{currentProblem.data.emoji}</span>
                                ))}
                            </div>
                            <span className="text-slate-400">+</span>
                            <div className="flex gap-1 bg-white p-2 rounded-xl border-2 border-slate-200">
                                {Array.from({ length: currentProblem.data.num2 }).map((_, i) => (
                                    <span key={`n2-${i}`} className="text-6xl">{currentProblem.data.emoji}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PATTERNS MODE */}
                    {currentProblem.type === 'patterns' && (
                        <div className="flex items-center gap-4 bg-slate-100 p-6 rounded-full">
                            {currentProblem.data.pattern.map((emoji, i) => (
                                <div key={i} className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-md border-4 border-slate-200">
                                    {emoji}
                                </div>
                            ))}
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-4xl shadow-inner border-4 border-indigo-300 animate-pulse text-indigo-500 font-bold">
                                ?
                            </div>
                        </div>
                    )}

                    {/* COMPARISON MODE */}
                    {currentProblem.type === 'comparison' && (
                        <div className="flex items-center gap-12 w-full justify-center">
                            <div className="w-1/2 p-6 bg-orange-50 border-4 border-orange-200 rounded-3xl relative">
                                <span className="absolute -top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">Left</span>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {Array.from({ length: currentProblem.data.leftCount }).map((_, i) => (
                                        <span key={i} className="text-5xl">{currentProblem.data.emoji}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-4xl text-slate-400 font-black">VS</div>
                            <div className="w-1/2 p-6 bg-blue-50 border-4 border-blue-200 rounded-3xl relative">
                                <span className="absolute -top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Right</span>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {Array.from({ length: currentProblem.data.rightCount }).map((_, i) => (
                                        <span key={i} className="text-5xl">{currentProblem.data.emoji}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* OPTIONS AREA */}
                <div className={`grid grid-cols-3 gap-6 max-w-3xl mx-auto w-full ${feedback ? 'blur-sm' : ''}`}>
                    {currentProblem.options.map((opt, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(opt)}
                            className="bg-white border-b-8 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 text-5xl font-black py-6 rounded-2xl transform active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            {opt}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default MathLearning;
