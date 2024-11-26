import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { MarsPhoto } from '../types';

interface ImageViewerProps {
  photo: MarsPhoto;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ photo, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full h-full max-w-7xl mx-auto p-4">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  onClick={() => zoomIn()}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ZoomIn className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ZoomOut className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-6 h-6 text-white" />
                </button>
              </div>

              <TransformComponent>
                <img
                  src={photo.img_src}
                  alt={`Mars photo by ${photo.rover.name}`}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        <div className="absolute bottom-20 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
          <h2 className="text-xl font-bold mb-2">{photo.camera.full_name}</h2>
          <p>Date: {new Date(photo.earth_date).toLocaleDateString()}</p>
          <p>Rover: {photo.rover.name}</p>
          <p>Status: {photo.rover.status}</p>
          <p>Sol: {photo.sol}</p>
        </div>
      </div>
    </div>
  );
};