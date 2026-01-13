// storageUtils.js - Utility functions for saving/loading progress

const STORAGE_KEY = 'soundlearn_progress';

// Get initial default progress structure
const getDefaultProgress = () => ({
  starsEarned: 0,
  quizzesCompleted: 0,
  gamesWon: 0,
  totalScore: 0,
  explorationComplete: {
    animals: false,
    vehicles: false,
    nature: false,
    household: false,
    human: false
  },
  settings: {
    volume: 0.8,
    highContrast: false,
    textSize: 'medium',
    reducedMotion: false
  }
});

// Save progress to localStorage
export const saveProgress = (progress) => {
  try {
    const progressString = JSON.stringify(progress);
    localStorage.setItem(STORAGE_KEY, progressString);
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
};

// Load progress from localStorage
export const loadProgress = () => {
  try {
    const progressString = localStorage.getItem(STORAGE_KEY);
    
    if (progressString) {
      const savedProgress = JSON.parse(progressString);
      // Merge with defaults to handle any new fields
      return { ...getDefaultProgress(), ...savedProgress };
    }
    
    // Return default if nothing saved
    return getDefaultProgress();
  } catch (error) {
    console.error('Error loading progress:', error);
    return getDefaultProgress();
  }
};

// Update specific progress field
export const updateProgress = (field, value) => {
  const currentProgress = loadProgress();
  currentProgress[field] = value;
  saveProgress(currentProgress);
  return currentProgress;
};

// Add stars to total
export const addStars = (stars) => {
  const currentProgress = loadProgress();
  currentProgress.starsEarned += stars;
  saveProgress(currentProgress);
  return currentProgress;
};

// Mark category as explored
export const markCategoryExplored = (category) => {
  const currentProgress = loadProgress();
  currentProgress.explorationComplete[category] = true;
  saveProgress(currentProgress);
  return currentProgress;
};

// Reset all progress (for testing or fresh start)
export const resetProgress = () => {
  const defaultProgress = getDefaultProgress();
  saveProgress(defaultProgress);
  return defaultProgress;
};

// Update settings
export const updateSettings = (newSettings) => {
  const currentProgress = loadProgress();
  currentProgress.settings = { ...currentProgress.settings, ...newSettings };
  saveProgress(currentProgress);
  return currentProgress;
};