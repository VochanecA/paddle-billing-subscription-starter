'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';

interface TransformationSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  description?: string;
  sliderColor?: string;
}

export function TransformationSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  description = '',
  sliderColor = '#4f46e5', // Default indigo-600
}: TransformationSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove],
  );

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => {
      try {
        handleMouseMove(e);
      } catch (error) {
        console.error('Error in handleMouseMove:', error);
      }
    };

    const handleTouchMoveWrapper = (e: TouchEvent) => {
      try {
        handleTouchMove(e);
      } catch (error) {
        console.error('Error in handleTouchMove:', error);
      }
    };

    window.addEventListener('mousemove', handleMouseMoveWrapper);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMoveWrapper);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMoveWrapper);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {description && <p className="text-center text-gray-600 dark:text-gray-300 mb-4">{description}</p>}

      <div
        ref={containerRef}
        className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Before Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={beforeImage}
            alt="Before transformation"
            className="w-full h-full object-cover object-center"
            width={800}
            height={500}
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
            {beforeLabel}
          </div>
        </div>

        {/* After Image */}
        <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
          <Image
            src={afterImage}
            alt="After transformation"
            className="w-full h-full object-cover object-center"
            width={800}
            height={500}
          />
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
            {afterLabel}
          </div>
        </div>

        {/* Slider Control */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
            backgroundColor: sliderColor,
          }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg">
            <div className="flex space-x-1">
              <MoveLeft className="h-4 w-4 text-gray-700" />
              <MoveRight className="h-4 w-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Slider Position Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
          {Math.round(sliderPosition)}%
        </div>
      </div>
    </div>
  );
}
