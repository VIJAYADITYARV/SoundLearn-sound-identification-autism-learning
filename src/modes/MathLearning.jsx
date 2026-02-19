// MathLearning.jsx - Enhanced Maths based learning with multiple modes
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Star, Calculator, Hash, Repeat, Scale, Volume2, Award, Download, Camera } from 'lucide-react';
import { trackAttempt, trackSession } from '../utils/analyticsUtils';
import html2canvas from 'html2canvas'; // Import screen capture library

function MathLearning({ goHome, updateProgress, progress }) {
    const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing' | 'certificate'
    const [gameMode, setGameMode] = useState(null); // 'counting' | 'addition' | 'patterns' | 'comparison'
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0); // Also acts as Token Economy progress (0-5)
    const [currentProblem, setCurrentProblem] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
    const [sessionStart, setSessionStart] = useState(null);
    const [optionsDisabled, setOptionsDisabled] = useState(true); // For Errorless Learning
    const certificateRef = useRef(null); // Reference for screen capture

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
        setStreak(0); // Reset token board
        setSessionStart(Date.now());
        generateProblem(mode);
    };

    const generateProblem = (mode) => {
        setOptionsDisabled(true); // Enable Errorless Learning mode initially

        // Errorless Learning: Enable full interaction after small delay
        setTimeout(() => {
            setOptionsDisabled(false);
        }, 3000); // 3 seconds of "errorless" guidance

        let newProblem = {};
        const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🐶', '🐱', '🚗', '⭐'];
        const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

        switch (mode) {
            case 'counting': {
                const count = Math.floor(Math.random() * 5) + 1; // 1-5 for simplicity
                const emoji = randomEmoji();
                const options = [count];
                while (options.length < 3) {
                    const distinct = Math.floor(Math.random() * 6) + 1;
                    if (!options.includes(distinct)) options.push(distinct);
                }
                newProblem = {
                    type: 'counting',
                    question: `How many ${emoji === '🍎' ? 'apples' : 'items'}?`,
                    items: Array(count).fill(emoji),
                    options: options.sort(() => Math.random() - 0.5),
                    answer: count,
                    speech: `Count the ${emoji === '🍎' ? 'apples' : 'items'}. How many are there?`
                };
                break;
            }
            case 'addition': {
                const num1 = Math.floor(Math.random() * 3) + 1;
                const num2 = Math.floor(Math.random() * 3) + 1;
                const sum = num1 + num2;
                const emoji = randomEmoji();
                const options = [sum];
                while (options.length < 3) {
                    const distinct = Math.floor(Math.random() * 7) + 1;
                    if (!options.includes(distinct)) options.push(distinct);
                }
                newProblem = {
                    type: 'addition',
                    question: `${num1} + ${num2} = ?`,
                    visual: { num1: Array(num1).fill(emoji), num2: Array(num2).fill(emoji) },
                    options: options.sort(() => Math.random() - 0.5),
                    answer: sum,
                    speech: `What is ${num1} plus ${num2}?`
                };
                break;
            }
            case 'patterns': {
                const seq = [randomEmoji(), randomEmoji()];
                const pattern = [seq[0], seq[1], seq[0], seq[1], seq[0], '?'];
                const answer = seq[1];
                const options = [seq[1], seq[0], randomEmoji()];
                // Ensure options are unique
                const uniqueOptions = [...new Set(options)].slice(0, 3);
                if (uniqueOptions.length < 3) uniqueOptions.push(randomEmoji());

                newProblem = {
                    type: 'patterns',
                    question: 'What comes next?',
                    pattern: pattern,
                    options: uniqueOptions.sort(() => Math.random() - 0.5),
                    answer: answer,
                    speech: "Look at the pattern. What comes next?"
                };
                break;
            }
            case 'comparison': {
                const n1 = Math.floor(Math.random() * 5) + 1;
                const n2 = Math.floor(Math.random() * 5) + 1;
                if (n1 === n2) return generateProblem(mode); // Retry if equal
                const e1 = randomEmoji();
                const answer = n1 > n2 ? 'Left' : 'Right';

                newProblem = {
                    type: 'comparison',
                    question: 'Which side has MORE?',
                    left: Array(n1).fill(e1),
                    right: Array(n2).fill(e1),
                    options: ['Left', 'Right'],
                    answer: answer,
                    speech: "Which side has more items?"
                };
                break;
            }
            default: break;
        }

        setCurrentProblem(newProblem);
        speak(newProblem.speech);
    };

    // Keyboard Interaction Logic
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameState !== 'playing' || !currentProblem) return;

            const key = e.key;
            // Map keys 1, 2, 3 to options indices 0, 1, 2
            if (['1', '2', '3'].includes(key)) {
                const index = parseInt(key) - 1;
                if (index < currentProblem.options.length) {
                    handleAnswer(currentProblem.options[index]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameState, currentProblem]);

    const handleAnswer = (selected) => {
        if (optionsDisabled && selected !== currentProblem.answer) return; // Prevent wrong clicks during guidance

        const isCorrect = selected === currentProblem.answer;

        // Track attempt
        trackAttempt(isCorrect, null, 'maths-learning');

        if (isCorrect) {
            setFeedback('correct');
            setScore(prev => prev + 10);

            // Visual Token Economy: Increment Streak/Tokens
            const newStreak = streak + 1;
            setStreak(newStreak);

            if (updateProgress) {
                updateProgress({ starsEarned: progress.starsEarned + 1 });
            }

            speak("Great job!");

            // Check if Token Board is full (e.g., 5 tokens)
            if (newStreak >= 5) {
                setTimeout(() => {
                    setGameState('certificate');
                    speak("Congratulations! You earned a certificate!");
                }, 1000);
            } else {
                setTimeout(() => {
                    setFeedback(null);
                    generateProblem(gameMode);
                }, 1500);
            }

        } else {
            setFeedback('incorrect');
            setStreak(0); // Reset tokens on error
            speak("Try again.");
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    // Screen Capture Function
    const downloadCertificate = () => {
        if (certificateRef.current) {
            html2canvas(certificateRef.current).then(canvas => {
                const link = document.createElement('a');
                link.download = 'Math-Achievement-Certificate.png';
                link.href = canvas.toDataURL();
                link.click();
            });
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
                    <button onClick={goHome} className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                        <ArrowLeft size={32} className="text-slate-700" />
                    </button>
                    <h1 className="text-4xl font-black text-slate-800">Maths Playground 123</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mode Cards */}
                    <div onClick={() => startGame('counting')} className="bg-orange-100 p-8 rounded-3xl border-4 border-orange-200 hover:scale-105 transition-transform cursor-pointer">
                        <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                            <Hash size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-orange-800">Count with Me</h2>
                        <p className="text-orange-700 font-bold mt-2">Learn numbers 1 to 10</p>
                    </div>

                    <div onClick={() => startGame('addition')} className="bg-blue-100 p-8 rounded-3xl border-4 border-blue-200 hover:scale-105 transition-transform cursor-pointer">
                        <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                            <Calculator size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-blue-800">Add It Up</h2>
                        <p className="text-blue-700 font-bold mt-2">Simple sums with pictures</p>
                    </div>

                    <div onClick={() => startGame('patterns')} className="bg-purple-100 p-8 rounded-3xl border-4 border-purple-200 hover:scale-105 transition-transform cursor-pointer">
                        <div className="bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                            <Repeat size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-purple-800">Pattern Power</h2>
                        <p className="text-purple-700 font-bold mt-2">What comes next?</p>
                    </div>

                    <div onClick={() => startGame('comparison')} className="bg-emerald-100 p-8 rounded-3xl border-4 border-emerald-200 hover:scale-105 transition-transform cursor-pointer">
                        <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                            <Scale size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-emerald-800">More or Less?</h2>
                        <p className="text-emerald-700 font-bold mt-2">Compare groups</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- CERTIFICATE SCREEN ---
    if (gameState === 'certificate') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in">
                <div ref={certificateRef} className="bg-white p-12 rounded-3xl shadow-2xl border-8 border-yellow-400 text-center max-w-2xl transform rotate-1">
                    <div className="flex justify-center mb-6">
                        <Award size={80} className="text-yellow-500" />
                    </div>
                    <h1 className="text-5xl font-black text-slate-800 mb-4 font-serif">Certificate of Mastery</h1>
                    <p className="text-2xl text-slate-600 mb-8">Awarded to the Math Superstar!</p>

                    <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 mb-8">
                        <p className="text-lg font-bold text-yellow-800">For completing 5 challenges in</p>
                        <p className="text-3xl font-black text-yellow-600 uppercase tracking-widest">{gameMode}</p>
                    </div>

                    <p className="text-slate-400 font-semibold">Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={downloadCertificate}
                        className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:scale-105"
                    >
                        <Download size={24} /> Download Certificate
                    </button>
                    <button
                        onClick={() => setGameState('menu')}
                        className="px-8 py-4 bg-slate-200 text-slate-700 rounded-full font-bold text-xl hover:bg-slate-300 transition-all"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    // --- PLAYING SCREEN ---
    return (
        <div className="max-w-4xl mx-auto pb-12">
            {/* Header with Token Board */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <button onClick={() => setGameState('menu')} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200">
                    <ArrowLeft size={24} />
                </button>

                {/* Visual Token Economy Board (5 Slots) */}
                <div className="bg-white px-6 py-3 rounded-2xl border-4 border-slate-200 flex gap-2 shadow-sm">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${i < streak ? 'bg-yellow-400 border-yellow-500' : 'bg-slate-100 border-slate-300'}`}>
                            {i < streak && <Star size={20} className="text-white fill-current" />}
                        </div>
                    ))}
                </div>

                <div className="text-2xl font-black text-slate-700 bg-white px-6 py-2 rounded-xl border-2 border-slate-100 shadow-sm">
                    Score: {score}
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-slate-100 relative min-h-[400px]">

                {/* Feedback Overlay */}
                {feedback && (
                    <div className={`absolute inset-0 flex items-center justify-center z-50 bg-white/90 backdrop-blur-sm animate-fade-in`}>
                        <div className="text-center transform scale-125">
                            {feedback === 'correct' ? (
                                <>
                                    <CheckCircle size={100} className="text-green-500 mx-auto mb-4" />
                                    <h2 className="text-5xl font-black text-green-600">Awesome!</h2>
                                </>
                            ) : (
                                <>
                                    <XCircle size={100} className="text-red-500 mx-auto mb-4" />
                                    <h2 className="text-5xl font-black text-red-600">Oops!</h2>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="p-8 text-center space-y-8">
                    <h2 className="text-4xl font-black text-slate-800">{currentProblem?.question}</h2>

                    {/* Visual Area */}
                    <div className="flex flex-wrap justify-center gap-4 py-8 min-h-[160px] items-center">
                        {gameMode === 'counting' && currentProblem?.items.map((item, i) => (
                            <span key={i} className="text-7xl animate-bounce-slow" style={{ animationDelay: `${i * 0.1}s` }}>
                                {item}
                            </span>
                        ))}

                        {gameMode === 'addition' && (
                            <div className="flex items-center gap-4 text-6xl font-black text-slate-400">
                                <div className="flex gap-2">{currentProblem?.visual.num1.map((em, i) => <span key={i} className="text-6xl">{em}</span>)}</div>
                                <span>+</span>
                                <div className="flex gap-2">{currentProblem?.visual.num2.map((em, i) => <span key={i} className="text-6xl">{em}</span>)}</div>
                            </div>
                        )}

                        {gameMode === 'patterns' && (
                            <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
                                {currentProblem?.pattern.map((item, i) => (
                                    <div key={i} className={`w-20 h-20 flex items-center justify-center text-5xl bg-white rounded-xl shadow-sm border ${item === '?' ? 'border-dashed border-4 border-blue-400 bg-blue-50' : 'border-slate-200'}`}>
                                        {item === '?' ? <span className="text-blue-400 font-bold">?</span> : item}
                                    </div>
                                ))}
                            </div>
                        )}

                        {gameMode === 'comparison' && (
                            <div className="flex w-full justify-around items-center">
                                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 grid grid-cols-3 gap-2">
                                    {currentProblem?.left.map((em, i) => <span key={i} className="text-4xl">{em}</span>)}
                                </div>
                                <div className="text-4xl font-bold text-slate-300">VS</div>
                                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 grid grid-cols-3 gap-2">
                                    {currentProblem?.right.map((em, i) => <span key={i} className="text-4xl">{em}</span>)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Options Area - Errorless Learning Implemented Here */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {currentProblem?.options.map((option, index) => {
                            const isCorrect = option === currentProblem.answer;
                            // Errorless Style: If guiding, correct is full opacity & pulses; wrong is dimmed & unclickable
                            const isDimmed = optionsDisabled && !isCorrect;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    // Disable click if guiding and not correct
                                    disabled={optionsDisabled && !isCorrect}
                                    className={`
                                        p-6 rounded-2xl text-4xl font-black transition-all transform shadow-lg
                                        ${isCorrect && optionsDisabled
                                            ? 'bg-green-500 text-white scale-110 ring-4 ring-green-300 animate-pulse shadow-green-200' // Glowing Prompt
                                            : 'bg-white text-slate-700 border-b-8 border-slate-200 hover:border-b-0 hover:translate-y-2 hover:bg-slate-50'
                                        }
                                        ${isDimmed ? 'opacity-30 cursor-not-allowed scale-90' : 'opacity-100'}
                                    `}
                                >
                                    {/* Keyboard Shortcut Hint */}
                                    <span className="absolute top-2 left-2 text-xs font-bold text-slate-300 border border-slate-200 rounded px-1.5 py-0.5">
                                        {index + 1}
                                    </span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <p className="text-center text-slate-400 mt-6 text-sm font-semibold flex items-center justify-center gap-2">
                <Camera size={16} /> Press keys 1, 2, 3 or use mouse to answer
            </p>
        </div>
    );
}

export default MathLearning;
