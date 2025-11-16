import { useSolarSystem } from "../lib/stores/useSolarSystem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Moon, Thermometer, Clock, Palette, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function PlanetInfo() {
  const { 
    selectedPlanet, 
    selectPlanet, 
    timeScale, 
    setTimeScale, 
    isPaused, 
    togglePause, 
    showOrbits, 
    toggleOrbits, 
    showLabels, 
    toggleLabels, 
    showHUD,
    toggleHUD,
    isRealTime, 
    toggleRealTime,
    isFetchingRealTime,
    lastError,
    lastRealTimeUpdate
  } = useSolarSystem();

  if (!showHUD) {
    return (
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={toggleHUD}
          className="bg-black/80 text-white border border-gray-600 hover:bg-black/90 px-3 py-2"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Show HUD
        </Button>
      </div>
    );
  }

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
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Real-Time Mode:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRealTime}
                className={`border-gray-600 text-white hover:bg-gray-700 ${
                  isRealTime ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800"
                }`}
              >
                {isRealTime ? "ON" : "OFF"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-600">
              <span className="text-sm">HUD Visibility:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleHUD}
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                <EyeOff className="w-4 h-4 mr-1" />
                Hide
              </Button>
            </div>
            
            {isRealTime && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  {isFetchingRealTime ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                      <span className="text-xs text-blue-300">Fetching NASA JPL data...</span>
                    </>
                  ) : lastError ? (
                    <>
                      <AlertCircle className="h-3 w-3 text-red-400" />
                      <span className="text-xs text-red-300">Connection failed</span>
                    </>
                  ) : lastRealTimeUpdate > 0 ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-300">Real-time data active</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-yellow-300">Connecting to NASA JPL...</span>
                    </>
                  )}
                </div>
                
                {lastError && (
                  <div className="text-xs text-red-300 bg-red-900/20 p-2 rounded border border-red-800">
                    <strong>Error:</strong> {lastError}
                  </div>
                )}
                
                {lastRealTimeUpdate > 0 && !lastError && (
                  <div className="text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Last updated: {new Date(lastRealTimeUpdate).toLocaleTimeString()}</span>
                    </div>
                    <div className="mt-1 text-gray-500">
                      Planets show real astronomical positions
                    </div>
                  </div>
                )}
                
                {!lastError && !isFetchingRealTime && lastRealTimeUpdate === 0 && (
                  <div className="text-xs text-blue-300">
                    🌌 Initializing real-time synchronization with NASA JPL Horizons API...
                  </div>
                )}
              </div>
            )}
            
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
