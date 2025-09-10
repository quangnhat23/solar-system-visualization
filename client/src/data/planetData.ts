export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  description: string;
  facts: string[];
  moons?: number;
  type: string;
}

export const planetData: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.4,
    distance: 8,
    speed: 0.02,
    color: "#8C7853",
    type: "Terrestrial",
    moons: 0,
    description: "The closest planet to the Sun and the smallest in our solar system.",
    facts: [
      "One day on Mercury lasts 59 Earth days",
      "Temperature ranges from -290°F to 800°F",
      "Has no atmosphere to speak of",
      "Named after the Roman messenger god"
    ]
  },
  {
    name: "Venus",
    radius: 0.7,
    distance: 12,
    speed: 0.015,
    color: "#FFC649",
    type: "Terrestrial",
    moons: 0,
    description: "The hottest planet in our solar system due to its thick atmosphere.",
    facts: [
      "Surface temperature is about 900°F",
      "Has a thick, toxic atmosphere",
      "Rotates backwards compared to most planets",
      "Often called Earth's twin due to similar size"
    ]
  },
  {
    name: "Earth",
    radius: 0.8,
    distance: 16,
    speed: 0.01,
    color: "#6B93D6",
    type: "Terrestrial",
    moons: 1,
    description: "Our home planet, the only known planet with life.",
    facts: [
      "71% of the surface is covered by water",
      "Has a strong magnetic field",
      "Only planet known to harbor life",
      "Has one natural satellite: the Moon"
    ]
  },
  {
    name: "Mars",
    radius: 0.6,
    distance: 20,
    speed: 0.008,
    color: "#CD5C5C",
    type: "Terrestrial",
    moons: 2,
    description: "The red planet, known for its iron oxide surface.",
    facts: [
      "Has the largest volcano in the solar system",
      "A day on Mars is 24 hours and 37 minutes",
      "Has polar ice caps made of frozen CO2 and water",
      "Has two small moons: Phobos and Deimos"
    ]
  },
  {
    name: "Jupiter",
    radius: 2.5,
    distance: 32,
    speed: 0.005,
    color: "#D8CA9D",
    type: "Gas Giant",
    moons: 79,
    description: "The largest planet in our solar system.",
    facts: [
      "Has a Great Red Spot storm larger than Earth",
      "Made mostly of hydrogen and helium",
      "Has at least 79 known moons",
      "Acts as a cosmic vacuum cleaner for asteroids"
    ]
  },
  {
    name: "Saturn",
    radius: 2.0,
    distance: 45,
    speed: 0.003,
    color: "#FAD5A5",
    type: "Gas Giant",
    moons: 82,
    description: "Famous for its spectacular ring system.",
    facts: [
      "Has the most extensive ring system",
      "Less dense than water",
      "Has at least 82 known moons",
      "Takes 29.5 Earth years to orbit the Sun"
    ]
  },
  {
    name: "Uranus",
    radius: 1.5,
    distance: 60,
    speed: 0.002,
    color: "#4FD0E4",
    type: "Ice Giant",
    moons: 27,
    description: "An ice giant that rotates on its side.",
    facts: [
      "Rotates on its side at a 98-degree angle",
      "Made of water, methane, and ammonia ices",
      "Has faint rings",
      "Has 27 known moons"
    ]
  },
  {
    name: "Neptune",
    radius: 1.4,
    distance: 75,
    speed: 0.001,
    color: "#4169E1",
    type: "Ice Giant",
    moons: 14,
    description: "The windiest planet with speeds up to 1,200 mph.",
    facts: [
      "Has the fastest winds in the solar system",
      "Takes 165 Earth years to orbit the Sun",
      "Has 14 known moons",
      "Made of water, methane, and ammonia ices"
    ]
  }
];
