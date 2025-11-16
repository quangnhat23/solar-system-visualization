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
  showHUD: boolean;
  isRealTime: boolean;
  realTimePositions: Map<string, {x: number, y: number, z: number}>;
  lastRealTimeUpdate: number;
  isFetchingRealTime: boolean;
  lastError: string | null;
  
  // Actions
  selectPlanet: (planet: PlanetData | null) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setTimeScale: (scale: number) => void;
  togglePause: () => void;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  toggleHUD: () => void;
  toggleRealTime: () => void;
  updateRealTimePositions: (positions: Map<string, {x: number, y: number, z: number}>) => void;
  setFetchingRealTime: (isFetching: boolean) => void;
  setLastError: (error: string | null) => void;
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
    showHUD: true,
    isRealTime: false,
    realTimePositions: new Map(),
    lastRealTimeUpdate: 0,
    isFetchingRealTime: false,
    lastError: null,
    
    selectPlanet: (planet) => set({ selectedPlanet: planet }),
    setCameraTarget: (target) => set({ cameraTarget: target }),
    setTimeScale: (scale) => set({ timeScale: scale }),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),
    toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),
    toggleHUD: () => set((state) => ({ showHUD: !state.showHUD })),
    toggleRealTime: () => set((state) => ({ isRealTime: !state.isRealTime })),
    updateRealTimePositions: (positions) => set({ 
      realTimePositions: positions, 
      lastRealTimeUpdate: Date.now(),
      isFetchingRealTime: false,
      lastError: null
    }),
    setFetchingRealTime: (isFetching) => set({ isFetchingRealTime: isFetching }),
    setLastError: (error) => set({ lastError: error, isFetchingRealTime: false }),
    reset: () => set({
      selectedPlanet: null,
      cameraTarget: [0, 0, 0],
      timeScale: 1,
      isPaused: false,
      showOrbits: true,
      showLabels: false,
      showHUD: true,
      isRealTime: false,
      realTimePositions: new Map(),
      lastRealTimeUpdate: 0,
      isFetchingRealTime: false,
      lastError: null
    })
  }))
);
