import React from 'react';
import { Rocket } from 'lucide-react';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
          }}
        />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-8">
          <Rocket className="w-16 h-16 text-red-500 animate-pulse" />
          <h1 className="text-6xl font-bold text-white ml-4">SpaceCarter</h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Embark on a journey through the lens of NASA's Mars Rovers. Discover the 
          mysteries and beauty of the Red Planet as captured by our robotic explorers.
        </p>
        
        <button
          onClick={onExplore}
          className="px-8 py-4 bg-red-600 text-white rounded-full text-lg font-semibold
                     hover:bg-red-700 transform hover:scale-105 transition-all
                     shadow-lg hover:shadow-red-500/50 mb-8"
        >
          Start Exploring
        </button>

        <p className="text-sm text-gray-400 animate-pulse fixed bottom-0 left-0 mb-4 ml-4">
  Data retrieved from NASA Essence
</p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};