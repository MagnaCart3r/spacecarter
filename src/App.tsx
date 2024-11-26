import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Hero } from './components/Hero';
import { ImageGrid } from './components/ImageGrid';
import { ImageViewer } from './components/ImageViewer';
import { Filters } from './components/Filters';
import { About } from './components/About';
import { MarsPhoto, FilterState } from './types';
import { Rocket, AlertCircle, Info, Home } from 'lucide-react';
import { usePersistedState } from './hooks/usePersistedState';

const API_KEY = 'IVVqviqvUVuRWTg2uQaa2Qtibfcw34lWa7bbPgGQ';

function App() {
  const [showExplorer, setShowExplorer] = usePersistedState('showExplorer', false);
  const [showAbout, setShowAbout] = usePersistedState('showAbout', false);
  const [selectedPhoto, setSelectedPhoto] = useState<MarsPhoto | null>(null);
  const [filters, setFilters] = usePersistedState<FilterState>('filters', {
    rover: 'curiosity',
    date: new Date().toISOString().split('T')[0],
    camera: '',
  });

  const { data, isLoading, error } = useQuery(
    ['marsPhotos', filters],
    async () => {
      const params = new URLSearchParams({
        api_key: API_KEY,
        earth_date: filters.date,
        ...(filters.camera && { camera: filters.camera }),
      });

      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${filters.rover}/photos?${params}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Mars photos');
      }

      const text = await response.text();
      if (!text) {
        return { photos: [] };
      }

      try {
        const data = JSON.parse(text);
        return data;
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid response from NASA API');
      }
    },
    {
      enabled: showExplorer && !showAbout,
      keepPreviousData: true,
      retry: 2,
    }
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (!showExplorer) {
    return <Hero onExplore={() => setShowExplorer(true)} />;
  }

  if (showAbout) {
    return <About onBack={() => setShowAbout(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Animated space background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-gray-900">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowExplorer(false)}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all duration-300
                       hover:scale-110"
              title="Home"
            >
              <Home className="w-6 h-6 text-red-500" />
            </button>
            <div className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-bold">SpaceCarter</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-80">
              <Filters filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <button
              onClick={() => setShowAbout(true)}
              className="group relative p-3 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all duration-300
                       hover:scale-110 hover:rotate-12"
              title="About SpaceCarter"
            >
              <Info className="w-6 h-6 text-red-500 group-hover:animate-pulse" />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full
                            bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap
                            opacity-0 group-hover:opacity-100 transition-opacity">
                About SpaceCarter
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="container relative z-10 mx-auto px-4 py-8">
        {error ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-400">
              Failed to load Mars photos. Please try again later.
            </p>
          </div>
        ) : data?.photos?.length === 0 && !isLoading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No photos found for the selected filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <ImageGrid
            photos={data?.photos || []}
            isLoading={isLoading}
            onImageClick={setSelectedPhoto}
          />
        )}
      </main>

      {selectedPhoto && (
        <ImageViewer
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}

export default App;