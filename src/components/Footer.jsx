// Footer.jsx - Simple class component for the footer
import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="bg-slate-800 text-white mt-auto py-6">
                <div className="container mx-auto text-center">
                    <p className="text-sm opacity-70">
                        &copy; {new Date().getFullYear()} SoundLearn | Designed for Accessibility
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
