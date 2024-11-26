import React from 'react';
import { useInView } from 'react-intersection-observer';
import { MarsPhoto } from '../types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ImageGridProps {
  photos: MarsPhoto[];
  isLoading: boolean;
  onImageClick: (photo: MarsPhoto) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ photos, isLoading, onImageClick }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square">
            <Skeleton height="100%" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} onClick={() => onImageClick(photo)} />
      ))}
    </div>
  );
};

const ImageCard: React.FC<{ photo: MarsPhoto; onClick: () => void }> = ({ photo, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900 cursor-pointer
                 transform transition-all duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
      {inView && (
        <>
          <img
            src={photo.img_src}
            alt={`Mars photo by ${photo.rover.name}`}
            className="object-cover w-full h-full transition-transform duration-300
                       group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{photo.camera.full_name}</h3>
              <p className="text-sm opacity-90">
                {new Date(photo.earth_date).toLocaleDateString()}
              </p>
              <p className="text-sm opacity-90">Rover: {photo.rover.name}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};