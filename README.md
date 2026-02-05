# SoundLearn: Autism-Friendly Sound Identification Platform 🎧

**SoundLearn** is an interactive, web-based educational application designed specifically for children with **Autism Spectrum Disorder (ASD)**. The platform addresses the challenge of auditory processing and sound-object association by providing a safe, structured, and sensory-friendly environment.

## 🌟 Key Features

### 🧠 Core Learning Modes
*   **Exploration Mode**: Stress-free discovery of sounds across categories (Animals, Vehicles, Nature, Household).
*   **Quiz Mode**: Test knowledge by identifying the correct sound from options.
*   **Memory Game**: Flip cards to find matching pairs of sounds and images.
*   **Matching Game**: Drag and drop visual cards to their corresponding sounds.

### 🚀 Advanced Extension (Lab Evaluation Feature)
*   **Custom Card Creator**: A fully functional **Class Component** based form that empowers parents/teachers to create personalized learning materials.
*   **Audio Integration**: Users can select real sound effects from the library to attach save to their custom cards.
*   **Data Persistence**: All created cards are saved permanently using `localStorage`, ensuring the learning content grows with the child.
*   **Live Preview**: Real-time rendering of the card while editing.

### ♿ Accessibility First
*   **High Contrast Mode**: For better visibility.
*   **Text Resizing**: Adjustable font sizes for readability.
*   **Reduced Motion**: Toggle animations to prevent sensory overload.

## 🛠️ Technology Stack

*   **Frontend**: React.js (v18)
*   **Styling**: Tailwind CSS (v3)
*   **Icons**: Lucide React
*   **State Management**: React Hooks (`useState`, `useEffect`) & Class Components (`this.state`)
*   **Persistence**: Browser LocalStorage

## 📸 Concepts Implemented

This project demonstrates mastery of the following React concepts:
1.  **Function Components**: Used for the majority of the UI (Home, Exploration, Games).
2.  **Class Components**: Implemented in the complex `CreateSoundCard` form module.
3.  **State Management**: Handling complex game states, progress tracking, and user settings.
4.  **Event Handling**: managing user interactions, clicks, and drag-and-drop events.
5.  **Conditional Rendering**: Dynamic UI updates based on game state and user customization.
6.  **Forms**: Controlled inputs with validation and live previews.

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/VIJAYADITYARV/SoundLearn-sound-identification-autism-learning.git
    cd sound-learning-platform
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the application**:
    ```bash
    npm start
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---
*Created for Full Stack Lab Evaluation 1*
