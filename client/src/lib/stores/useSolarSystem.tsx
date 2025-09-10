import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { PlanetData } from "../../data/planetData";

interface SolarSystemState {
  selectedPlanet: PlanetData | null;
  cameraTarget: [number, number, number];
  timeScale: number;
  isPaused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  
  // Actions
  selectPlanet: (planet: PlanetData | null) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setTimeScale: (scale: number) => void;
  togglePause: () => void;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  reset: () => void;
}

export const useSolarSystem = create<SolarSystemState>()(
  subscribeWithSelector((set) => ({
    selectedPlanet: null,
    cameraTarget: [0, 0, 0],
    timeScale: 1,
    isPaused: false,
    showOrbits: true,
    showLabels: false,
    
    selectPlanet: (planet) => set({ selectedPlanet: planet }),
    setCameraTarget: (target) => set({ cameraTarget: target }),
    setTimeScale: (scale) => set({ timeScale: scale }),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),
    toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),
    reset: () => set({
      selectedPlanet: null,
      cameraTarget: [0, 0, 0],
      timeScale: 1,
      isPaused: false,
      showOrbits: true,
      showLabels: false
    })
  }))
);
