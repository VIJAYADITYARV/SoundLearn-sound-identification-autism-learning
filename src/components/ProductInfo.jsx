// ProductInfo.jsx - Product Description and Team Details
import React from 'react';
import { User, Github, Mail, Building, BookOpen, Award, ExternalLink } from 'lucide-react';

function ProductInfo({ goHome }) {
    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-12 animate-fade-in">
            {/* Header with Glassmorphism */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white shadow-2xl text-center border border-slate-700">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        Product Description & Team
                    </h1>
                    <p className="text-xl text-slate-300 font-light tracking-wide uppercase">Lab Evaluation 2 Submission</p>
                    <button
                        onClick={goHome}
                        className="mt-8 px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Back to App
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Product Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Product Details Card */}
                    <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 p-8 hover:border-blue-200 transition-colors">
                        <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                <Award size={32} />
                            </div>
                            Product Details
                        </h2>
                        <div className="space-y-6 text-lg text-slate-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Product Name</p>
                                    <p className="font-black text-slate-800 text-xl">SoundLearn</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Version</p>
                                    <p className="font-black text-slate-800 text-xl">2.0 <span className="text-sm font-normal text-slate-500">(Lab 2 Extension)</span></p>
                                </div>
                            </div>

                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p className="text-emerald-800 font-bold mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Extension Feature
                                </p>
                                <p className="text-emerald-900">
                                    Maths-based learning module specifically designed for autism accessibility, featuring visual counting, patterns, and comparison games.
                                </p>
                            </div>

                            <p className="leading-relaxed">
                                This platform provides a sensory-friendly environment for children to learn sound identification
                                and basic mathematical concepts through interactive visualizations and gamification.
                            </p>
                        </div>
                    </div>

                    {/* Repository Card */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>

                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10">
                            <Github size={28} /> Repository & Collaboration
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider text-xs">Product Page</h3>
                                <a
                                    href="https://github.com/VIJAYADITYARV/SoundLearn-sound-identification-autism-learning"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold underline text-lg break-all"
                                >
                                    View on GitHub <ExternalLink size={16} />
                                </a>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-slate-400 mb-1 uppercase tracking-wider text-xs">Collaborator - Academic</h3>
                                    <p className="font-bold flex items-center gap-2 text-white">
                                        <Building size={16} className="text-emerald-400" /> Amrita Vishwa Vidyapeetham
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-400 mb-1 uppercase tracking-wider text-xs">Collaborator - Industry</h3>
                                    <p className="font-bold flex items-center gap-2 text-white">
                                        <Building size={16} className="text-orange-400" /> Open Source Community
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Team Info */}
                <div className="space-y-8">
                    {/* Student Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-1 text-white shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                        <div className="bg-white/10 backdrop-blur-xl rounded-[22px] p-8 h-full flex flex-col items-center text-center">
                            <div className="w-32 h-32 bg-white rounded-full mb-6 flex items-center justify-center shadow-lg border-4 border-white/20">
                                <User size={64} className="text-indigo-600" />
                            </div>
                            <h3 className="text-3xl font-black mb-2">Vijay Aditya R V</h3>
                            <div className="inline-block px-4 py-1 bg-white/20 rounded-full font-mono text-sm mb-6 border border-white/30">
                                CB.SC.U4CSE23657
                            </div>
                            <div className="w-full h-px bg-white/20 mb-6"></div>
                            <p className="font-medium opacity-90">Student Collaborator</p>
                            <p className="text-sm opacity-75 mt-1">Full Stack Development</p>
                        </div>
                    </div>

                    {/* Professor Card */}
                    <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 p-8 h-fit">
                        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                            <BookOpen size={24} className="text-purple-600" /> Course Details
                        </h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Course Code</p>
                                <p className="font-black text-slate-800 text-lg">20CSE313</p>
                            </div>

                            <div>
                                <p className="font-black text-slate-900 text-lg mb-1">Dr. T. Senthil Kumar</p>
                                <p className="text-sm font-bold text-indigo-600 mb-2">Associate Professor</p>
                                <div className="text-sm text-slate-500 space-y-1">
                                    <p>Amrita School of Computing</p>
                                    <p>Amrita Vishwa Vidyapeetham</p>
                                    <p>Coimbatore - 641112</p>
                                </div>
                                <a href="mailto:t_senthilkumar@cb.amrita.edu" className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline p-2 rounded-lg bg-blue-50 transition-colors">
                                    <Mail size={16} /> t_senthilkumar@cb.amrita.edu
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;
