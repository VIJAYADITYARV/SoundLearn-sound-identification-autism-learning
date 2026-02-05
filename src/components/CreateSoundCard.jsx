// CreateSoundCard.jsx - specific form to creating a custom learning card
// Refactored to Class Component for Lab Requirement
import React, { Component } from 'react';
import { Palette, Type, Smile, Save, Layout, Volume2 } from 'lucide-react';
import SoundCard from './SoundCard';
import { getAllSounds } from '../data/soundsData';

class CreateSoundCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                emoji: '⭐',
                description: '',
                color: 'bg-white',
                sound: getAllSounds()[0].sound // Default to first sound
            },
            submitted: false
        };

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
        this.handleColorSelect = this.handleColorSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle Input Changes
    handleChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    }

    // Handle Color Selection
    handleColorSelect(colorClass) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                color: colorClass
            }
        }));
    }

    // Handle Icon Selection
    handleIconSelect(emoji) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                emoji: emoji
            }
        }));
    }

    // Handle Submission
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.addCustomCard) {
            this.props.addCustomCard(this.state.formData);
        }
        this.setState({ submitted: true });
    }

    render() {
        const { goHome } = this.props;
        const { formData, submitted } = this.state;
        const availableSounds = getAllSounds();

        // Preview Data (Real-time updates)
        const previewCard = {
            id: 'preview',
            name: formData.name || 'Your Card Name',
            emoji: formData.emoji,
            description: formData.description || 'Description will appear here...',
            color: formData.color,
            sound: formData.sound
        };

        if (submitted) {
            return (
                <div className="max-w-2xl mx-auto mt-10 text-center">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-10 text-white shadow-2xl">
                        <h2 className="text-4xl font-black mb-4">Card Created! 🎉</h2>
                        <p className="text-xl opacity-90 mb-8">
                            Your custom card has been saved successfully.
                        </p>

                        <div className="flex justify-center mb-8 transform scale-110">
                            <div className="w-64 text-left font-normal text-slate-800">
                                <SoundCard sound={previewCard} size="normal" />
                            </div>
                        </div>

                        <button
                            onClick={goHome}
                            className="px-8 py-3 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Layout className="text-blue-600" size={32} />
                    <h1 className="text-3xl font-black text-slate-800">Create a Custom Learning Card</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT COLUMN: THE FORM */}
                    <div className="bg-white rounded-3xl shadow-xl border-4 border-slate-100 p-8">
                        <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <Type size={20} /> Card Details
                        </h2>

                        <form onSubmit={this.handleSubmit} className="space-y-6">

                            {/* Name Input */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Card Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    maxLength="15"
                                    value={formData.name}
                                    onChange={this.handleChange}
                                    placeholder="e.g., My Cat"
                                    required
                                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-bold text-slate-800 transition-colors"
                                />
                            </div>

                            {/* Emoji Selection */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Choose an Icon</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['🐶', '🐱', '🦜', '🚗', '🚂', '🌟', '🎸', '🍎', '🏠', '👤'].map(emoji => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => this.handleIconSelect(emoji)}
                                            className={`text-2xl p-2 rounded-xl border-2 transition-all ${formData.emoji === emoji
                                                ? 'bg-blue-100 border-blue-500 scale-110'
                                                : 'bg-white border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Card Color</label>
                                <div className="flex gap-3">
                                    {[
                                        { class: 'bg-blue-50', border: 'border-blue-200', name: 'Blue' },
                                        { class: 'bg-green-50', border: 'border-green-200', name: 'Green' },
                                        { class: 'bg-purple-50', border: 'border-purple-200', name: 'Purple' },
                                        { class: 'bg-orange-50', border: 'border-orange-200', name: 'Orange' },
                                    ].map((c) => (
                                        <button
                                            key={c.name}
                                            type="button"
                                            onClick={() => this.handleColorSelect(c.class)}
                                            className={`w-12 h-12 rounded-full border-4 ${c.class} ${c.border} transition-transform ${formData.color === c.class ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110'
                                                }`}
                                            title={c.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    rows="2"
                                    value={formData.description}
                                    onChange={this.handleChange}
                                    placeholder="Short text for the card..."
                                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium text-slate-800 resize-none"
                                ></textarea>
                            </div>

                            {/* Sound Selection */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-2 flex items-center gap-2">
                                    <Volume2 size={20} /> Select Sound Effect
                                </label>
                                <select
                                    name="sound"
                                    value={formData.sound}
                                    onChange={this.handleChange}
                                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-bold text-slate-800"
                                >
                                    {availableSounds.map(s => (
                                        <option key={s.id} value={s.sound}>
                                            {s.emoji} {s.name} Sound
                                        </option>
                                    ))}
                                </select>
                                <p className="text-sm text-slate-500 mt-1 pl-1">
                                    Choose a real sound effect for your card!
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={goHome}
                                    className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                                >
                                    <Save size={20} />
                                    Create Card
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: PREVIEW */}
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-xl font-bold text-slate-400 mb-6 uppercase tracking-wider">
                            Live Preview
                        </h2>
                        <div className="w-full max-w-sm transform hover:scale-105 transition-transform duration-500">
                            <SoundCard
                                sound={previewCard}
                                size="large"
                            />
                        </div>
                        <p className="mt-8 text-slate-400 text-sm text-center max-w-xs">
                            This is how the card will look to the student in Exploration Mode.
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}

export default CreateSoundCard;
