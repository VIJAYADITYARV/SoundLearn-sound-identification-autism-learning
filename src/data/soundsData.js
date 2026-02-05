// soundsData.js - All sound data for the application

export const soundsData = {
  animals: [
    {
      id: 1,
      name: 'Dog',
      sound: process.env.PUBLIC_URL + '/sounds/animals/dog.mp3',
      emoji: '🐕',
      color: 'bg-amber-100',
      description: 'Dogs bark to communicate'
    },
    {
      id: 2,
      name: 'Cat',
      sound: process.env.PUBLIC_URL + '/sounds/animals/cat.mp3',
      emoji: '🐱',
      color: 'bg-orange-100',
      description: 'Cats meow when they want attention'
    },
    {
      id: 3,
      name: 'Bird',
      sound: process.env.PUBLIC_URL + '/sounds/animals/bird.mp3',
      emoji: '🐦',
      color: 'bg-blue-100',
      description: 'Birds sing beautiful songs'
    },
    {
      id: 4,
      name: 'Cow',
      sound: process.env.PUBLIC_URL + '/sounds/animals/cow.mp3',
      emoji: '🐄',
      color: 'bg-green-100',
      description: 'Cows moo on the farm'
    },
    {
      id: 5,
      name: 'Sheep',
      sound: process.env.PUBLIC_URL + '/sounds/animals/sheep.mp3',
      emoji: '🐑',
      color: 'bg-gray-100',
      description: 'Sheep bleat in the fields'
    },
    {
      id: 6,
      name: 'Horse',
      sound: process.env.PUBLIC_URL + '/sounds/animals/horse.mp3',
      emoji: '🐴',
      color: 'bg-yellow-100',
      description: 'Horses neigh and gallop'
    }
  ],

  vehicles: [
    {
      id: 7,
      name: 'Car',
      sound: process.env.PUBLIC_URL + '/sounds/vehicles/car.mp3',
      emoji: '🚗',
      color: 'bg-red-100',
      description: 'Cars drive on roads'
    },
    {
      id: 8,
      name: 'Train',
      sound: process.env.PUBLIC_URL + '/sounds/vehicles/train.mp3',
      emoji: '🚂',
      color: 'bg-gray-200',
      description: 'Trains run on tracks'
    },
    {
      id: 9,
      name: 'Airplane',
      sound: process.env.PUBLIC_URL + '/sounds/vehicles/airplane.mp3',
      emoji: '✈️',
      color: 'bg-sky-100',
      description: 'Airplanes fly in the sky'
    },
    {
      id: 10,
      name: 'Boat',
      sound: process.env.PUBLIC_URL + '/sounds/vehicles/boat.mp3',
      emoji: '⛵',
      color: 'bg-blue-200',
      description: 'Boats sail on water'
    },
    {
      id: 11,
      name: 'Motorcycle',
      sound: process.env.PUBLIC_URL + '/sounds/vehicles/motorcycle.mp3',
      emoji: '🏍️',
      color: 'bg-orange-200',
      description: 'Motorcycles are fast'
    },
    {
      id: 12,
      name: 'Ambulance',
      sound: process.env.PUBLIC_URL + '/sounds/vehicles/ambulance.mp3',
      emoji: '🚑',
      color: 'bg-red-200',
      description: 'Ambulances help people'
    }
  ],

  nature: [
    {
      id: 13,
      name: 'Rain',
      sound: process.env.PUBLIC_URL + '/sounds/nature/rain.mp3',
      emoji: '🌧️',
      color: 'bg-blue-100',
      description: 'Rain falls from clouds'
    },
    {
      id: 14,
      name: 'Thunder',
      sound: process.env.PUBLIC_URL + '/sounds/nature/thunder.mp3',
      emoji: '⛈️',
      color: 'bg-gray-300',
      description: 'Thunder comes with lightning'
    },
    {
      id: 15,
      name: 'Wind',
      sound: process.env.PUBLIC_URL + '/sounds/nature/wind.mp3',
      emoji: '💨',
      color: 'bg-cyan-100',
      description: 'Wind blows through the air'
    },
    {
      id: 16,
      name: 'Ocean Waves',
      sound: process.env.PUBLIC_URL + '/sounds/nature/waves.mp3',
      emoji: '🌊',
      color: 'bg-blue-200',
      description: 'Waves crash on the beach'
    },
    {
      id: 17,
      name: 'Fire',
      sound: process.env.PUBLIC_URL + '/sounds/nature/fire.mp3',
      emoji: '🔥',
      color: 'bg-orange-100',
      description: 'Fire crackles and burns'
    },
    {
      id: 18,
      name: 'Bee',
      sound: process.env.PUBLIC_URL + '/sounds/nature/bee.mp3',
      emoji: '🐝',
      color: 'bg-yellow-200',
      description: 'Bees buzz around flowers'
    }
  ],

  household: [
    {
      id: 19,
      name: 'Doorbell',
      sound: process.env.PUBLIC_URL + '/sounds/household/doorbell.mp3',
      emoji: '🔔',
      color: 'bg-yellow-100',
      description: 'Doorbell rings when someone visits'
    },
    {
      id: 20,
      name: 'Phone Ring',
      sound: process.env.PUBLIC_URL + '/sounds/household/phone.mp3',
      emoji: '📱',
      color: 'bg-green-100',
      description: 'Phone rings for calls'
    },
    {
      id: 21,
      name: 'Clock',
      sound: process.env.PUBLIC_URL + '/sounds/household/clock.mp3',
      emoji: '⏰',
      color: 'bg-blue-100',
      description: 'Clocks tell us the time'
    },
    {
      id: 22,
      name: 'Vacuum',
      sound: process.env.PUBLIC_URL + '/sounds/household/vacuum.mp3',
      emoji: '🧹',
      color: 'bg-purple-100',
      description: 'Vacuum cleans the floor'
    },
    {
      id: 23,
      name: 'Microwave',
      sound: process.env.PUBLIC_URL + '/sounds/household/microwave.mp3',
      emoji: '📟',
      color: 'bg-gray-200',
      description: 'Microwave beeps when food is ready'
    },
    {
      id: 24,
      name: 'Door Knock',
      sound: process.env.PUBLIC_URL + '/sounds/household/door.mp3',
      emoji: '🚪',
      color: 'bg-brown-100',
      description: 'Someone knocks on the door'
    }
  ],

  human: [
    {
      id: 25,
      name: 'Laughing',
      sound: process.env.PUBLIC_URL + '/sounds/human/laughing.mp3',
      emoji: '😄',
      color: 'bg-yellow-100',
      description: 'People laugh when happy'
    },
    {
      id: 26,
      name: 'Crying',
      sound: process.env.PUBLIC_URL + '/sounds/human/crying.mp3',
      emoji: '😢',
      color: 'bg-blue-100',
      description: 'People cry when sad'
    },
    {
      id: 27,
      name: 'Sneezing',
      sound: process.env.PUBLIC_URL + '/sounds/human/sneezing.mp3',
      emoji: '🤧',
      color: 'bg-green-100',
      description: 'People sneeze when ticklish'
    },
    {
      id: 28,
      name: 'Clapping',
      sound: process.env.PUBLIC_URL + '/sounds/human/clap.mp3',
      emoji: '👏',
      color: 'bg-pink-100',
      description: 'People clap to show appreciation'
    },
    {
      id: 29,
      name: 'Coughing',
      sound: process.env.PUBLIC_URL + '/sounds/human/coughing.mp3',
      emoji: '😷',
      color: 'bg-red-100',
      description: 'People cough to clear throat'
    },
    {
      id: 30,
      name: 'Baby Crying',
      sound: process.env.PUBLIC_URL + '/sounds/human/baby.mp3',
      emoji: '👶',
      color: 'bg-purple-100',
      description: 'Babies cry when they need something'
    }
  ]
};

// Helper function to get all sounds as a flat array
export const getAllSounds = () => {
  return [
    ...soundsData.animals,
    ...soundsData.vehicles,
    ...soundsData.nature,
    ...soundsData.household,
    ...soundsData.human
  ];
};

// Helper function to get sounds by category
export const getSoundsByCategory = (category) => {
  return soundsData[category] || [];
};

// Helper function to get a random sound from a category
export const getRandomSound = (category) => {
  const sounds = getSoundsByCategory(category);
  return sounds[Math.floor(Math.random() * sounds.length)];
};