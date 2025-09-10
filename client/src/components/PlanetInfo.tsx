import { useSolarSystem } from "../lib/stores/useSolarSystem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Moon, Thermometer, Clock, Palette } from "lucide-react";

export default function PlanetInfo() {
  const { selectedPlanet, selectPlanet, timeScale, setTimeScale, isPaused, togglePause, showOrbits, toggleOrbits, showLabels, toggleLabels } = useSolarSystem();

  if (!selectedPlanet) {
    return (
      <div className="absolute top-4 right-4 z-10">
        <Card className="w-80 bg-black/80 text-white border-gray-600">
          <CardHeader>
            <CardTitle className="text-lg">Solar System Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Animation:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={togglePause}
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                {isPaused ? "Play" : "Pause"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Time Scale:</span>
              <div className="flex gap-1">
                {[0.5, 1, 2, 5].map((scale) => (
                  <Button
                    key={scale}
                    variant={timeScale === scale ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeScale(scale)}
                    className="px-2 py-1 text-xs"
                  >
                    {scale}x
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Orbits:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleOrbits}
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                {showOrbits ? "Hide" : "Show"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Labels:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLabels}
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                {showLabels ? "Hide" : "Show"}
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-4">
              Click on any planet to view detailed information
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-10">
      <Card className="w-96 bg-black/90 text-white border-gray-600 max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{selectedPlanet.name}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectPlanet(null)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-gray-700">
              <Palette className="h-3 w-3 mr-1" />
              {selectedPlanet.type}
            </Badge>
            
            {selectedPlanet.moons !== undefined && (
              <Badge variant="secondary" className="bg-gray-700">
                <Moon className="h-3 w-3 mr-1" />
                {selectedPlanet.moons} moon{selectedPlanet.moons !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-gray-300 leading-relaxed">
            {selectedPlanet.description}
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-200">Interesting Facts:</h4>
            <ul className="space-y-1">
              {selectedPlanet.facts.map((fact, index) => (
                <li key={index} className="text-xs text-gray-400 flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Click anywhere else or press the X to close this panel
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
