export const planets = [
  {
    id: 'about',
    name: 'About',
    description: 'Learn more about me',
    color: '#4A90E2', // Deep Blue
    glowColor: '#6BB6FF',
    size: 1.2,
    distance: 8,
    speed: 0.012,
    type: 'terrestrial',
    atmosphere: true
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Explore my work',
    color: '#E74C3C', // Vibrant Red
    glowColor: '#FF6B6B',
    size: 1.6,
    distance: 12,
    speed: 0.009,
    type: 'gas-giant',
    atmosphere: true
  },
  {
    id: 'experience',
    name: 'Experience',
    description: 'My professional journey',
    color: '#27AE60', // Emerald Green
    glowColor: '#58D68D',
    size: 1.4,
    distance: 16,
    speed: 0.007,
    type: 'terrestrial',
    atmosphere: true
  },
  {
    id: 'skills',
    name: 'Skills',
    description: 'Technologies I work with',
    color: '#F39C12', // Golden Orange
    glowColor: '#F7DC6F',
    size: 1.3,
    distance: 20,
    speed: 0.006,
    type: 'gas-giant',
    atmosphere: true
  },
  {
    id: 'education',
    name: 'Education',
    description: 'My academic background',
    color: '#8E44AD', // Royal Purple
    glowColor: '#BB8FCE',
    size: 1.1,
    distance: 24,
    speed: 0.005,
    type: 'terrestrial',
    atmosphere: false
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Get in touch',
    color: '#17A2B8', // Cyan Teal
    glowColor: '#5DADE2',
    size: 1.0,
    distance: 28,
    speed: 0.004,
    type: 'ice-giant',
    atmosphere: true
  }
]

// Enhanced solar system configuration
export const solarSystemConfig = {
  sun: {
    size: 3.5,
    color: '#FFA500',
    intensity: 2.5,
    coronaSize: 4.2,
    glowSize: 5.5
  },
  lighting: {
    ambient: {
      intensity: 0.1,
      color: '#1a1a2e'
    },
    directional: {
      intensity: 0.3,
      color: '#ffffff',
      position: [50, 50, 50]
    }
  },
  effects: {
    bloom: {
      intensity: 0.3,
      threshold: 0.2,
      smoothing: 0.9
    },
    chromatic: {
      offset: [0.0005, 0.0012]
    }
  }
}