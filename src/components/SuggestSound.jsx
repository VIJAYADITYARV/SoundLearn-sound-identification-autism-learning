// SuggestSound.jsx - Form to request new sounds
import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle } from 'lucide-react';

function SuggestSound({ goHome }) {
    const [formData, setFormData] = useState({
        parentName: '',
        email: '',
        category: 'animals',
        soundName: '',
        description: '',
        priority: 'medium'
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Form Submitted:', formData);
        setSubmitted(true);

        // Reset form isn't strictly necessary if showing success message, but good practice
        // setTimeout(() => {
        //   setSubmitted(false);
        //   goHome();
        // }, 3000);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto mt-10 text-center">
                <div className="bg-green-50 border-4 border-green-200 rounded-3xl p-10 shadow-xl">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Request Received!</h2>
                    <p className="text-xl text-slate-600 mb-8">
                        Thank you for helping us grow SoundLearn. We'll review your feedback and try to add the
                        <span className="font-bold text-slate-800"> {formData.soundName} </span>
                        sound soon!
                    </p>
                    <button
                        onClick={goHome}
                        className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-slate-100">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <MessageSquare size={32} />
                        <h1 className="text-3xl font-black">Suggest a New Sound</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        Is there a sound missing? Let us know what would help your child learn best!
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Parent Name */}
                        <div>
                            <label className="block text-slate-700 font-bold mb-2" htmlFor="parentName">
                                Parent/Teacher Name
                            </label>
                            <input
                                type="text"
                                id="parentName"
                                name="parentName"
                                required
                                value={formData.parentName}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium text-slate-800"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-slate-700 font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category Select */}
                        <div>
                            <label className="block text-slate-700 font-bold mb-2" htmlFor="category">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium text-slate-800 appearance-none"
                                >
                                    <option value="animals">Animals 🦁</option>
                                    <option value="vehicles">Vehicles 🚗</option>
                                    <option value="nature">Nature 🌊</option>
                                    <option value="household">Household 🏠</option>
                                    <option value="human">Human Sounds 👤</option>
                                    <option value="other">Other / New Category ❓</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Sound Name */}
                        <div>
                            <label className="block text-slate-700 font-bold mb-2" htmlFor="soundName">
                                Suggested Sound
                            </label>
                            <input
                                type="text"
                                id="soundName"
                                name="soundName"
                                required
                                value={formData.soundName}
                                onChange={handleChange}
                                placeholder="e.g., Elephant Trumpet"
                                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-slate-700 font-bold mb-2" htmlFor="description">
                            Why is this sound important?
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell us how this sound would help..."
                            className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium text-slate-800 resize-none"
                        ></textarea>
                    </div>

                    {/* Priority Radio Buttons */}
                    <div>
                        <span className="block text-slate-700 font-bold mb-3">Priority Level</span>
                        <div className="flex gap-4">
                            {['low', 'medium', 'high'].map((level) => (
                                <label key={level} className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={level}
                                        checked={formData.priority === level}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    <div className="text-center p-3 rounded-xl border-2 border-slate-200 bg-slate-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 font-bold capitalize transition-all hover:bg-slate-100">
                                        {level}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t-2 border-slate-100">
                        <button
                            type="button"
                            onClick={goHome}
                            className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            <Send size={20} />
                            Submit Request
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SuggestSound;
