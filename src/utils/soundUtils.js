// soundUtils.js - Play real audio files

let currentAudio = null;

export const playSound = (soundPath, volume = 0.8) => {
  if (!soundPath) return;

  // Stop previous sound
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play();

  currentAudio = audio;
};

export const stopSound = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};