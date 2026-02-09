// Footer.jsx - Simple class component for the footer
import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="bg-slate-900 text-white mt-auto py-8 text-center border-t-4 border-slate-700">
                <div className="container mx-auto px-4">
                    <p className="font-bold text-lg mb-2">SoundLearn 🎧</p>
                    <p className="text-sm opacity-60 mb-4">
                        Designed with ❤️ for Inclusive Learning
                    </p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                        &copy; {new Date().getFullYear()} Lab Evaluation 2 | CB.SC.U4CSE23657
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
