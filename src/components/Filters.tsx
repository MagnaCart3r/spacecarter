import React from 'react';
import { FilterState } from '../types';
import { Filter, Calendar, Camera } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-red-500" />
          <select
            value={filters.rover}
            onChange={(e) => onFilterChange('rover', e.target.value)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 w-full"
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
            <option value="perseverance">Perseverance</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange('date', e.target.value)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-red-500" />
          <select
            value={filters.camera}
            onChange={(e) => onFilterChange('camera', e.target.value)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 w-full"
          >
            <option value="">All Cameras</option>
            <option value="FHAZ">Front Hazard</option>
            <option value="RHAZ">Rear Hazard</option>
            <option value="MAST">Mast</option>
            <option value="CHEMCAM">Chemistry and Camera</option>
            <option value="MAHLI">Mars Hand Lens</option>
            <option value="MARDI">Mars Descent</option>
            <option value="NAVCAM">Navigation</option>
            <option value="PANCAM">Panoramic</option>
            <option value="MINITES">Mini-TES</option>
          </select>
        </div>
      </div>
    </div>
  );
};