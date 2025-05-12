'use client';

import { Track } from '@/lib/types';
import { OrthographicCamera, useTexture } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import RecordItem from './RecordItem';
import useDimensions from '@/hooks/useDimensions';
import { useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { cameraSpeed, lerp, scrollOffset } from '@/lib/utils';
import { useFrame } from '@react-three/fiber';

interface RecordsSceneProps {
  trackList: Track[];
  scrollProgress: number;
}

const RecordsScene: React.FC<RecordsSceneProps> = ({ 
  trackList,
  scrollProgress
}) => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const alphaMapTexture = useTexture('/textures/alphaMap.webp');
  const previousZRef = useRef<number | null>(null);
  
  // WINDOW DIMENSIONS
  const { width } = useDimensions();
  const [innerWidth, setInnerWidth] = useState<number>(width.get());

  useMotionValueEvent(width, "change", (latest) => {
    setInnerWidth(latest);
  });
  
  // Filter out any undefined tracks and ensure all tracks have an ID
  const validTracks = trackList.filter(track => track && typeof track === 'object')
    .map((track, i) => ({
      ...track,
      id: track.id || `fallback-id-${i}`
    }));
  
  // POSITION INITIALE DE LA CAMERA - Adjusted for mobile
  const isMobile = innerWidth < 768;
  const isSmallMobile = innerWidth < 480;
  
  // Adjust camera position based on screen size
  // For mobile, move camera right and higher for better framing
  const cameraX = isMobile ? (isSmallMobile ? 5.0 : 5.2) : 5.0; // Adjusted further for better mobile centering
  const cameraY = isMobile ? 7 : 6; // Higher viewpoint on mobile
  const cameraZ = isMobile ? 7 : 6; // Further back on mobile

  // Set scroll offset for other components to use
  useEffect(() => {
    scrollOffset.set(scrollProgress);
  }, [scrollProgress]);

  // Camera movement based on scroll - adjusted for mobile
  useFrame((state, delta) => {
    if (cameraRef.current) {
      const maxZ = isMobile ? 2.5 : 3; // Start from a lower Z position on mobile
      // Reduce the multiplier to slow down the scroll effect - even more on mobile
      const scrollMovementMultiplier = isMobile ? 0.8 : 0.5; // Higher value means more records visible at once
      const minZ = maxZ - scrollMovementMultiplier * (validTracks.length - 1); 
      const factor = isMobile ? 0.12 : 0.08; // Slightly faster lerp on mobile for quicker scrolling

      const targetZ = lerp(maxZ, minZ, scrollProgress);
      const z = cameraRef.current.position.z;
      const newZ = lerp(z, targetZ, factor);

      cameraRef.current.position.z = newZ;

      if (previousZRef.current !== null && delta > 0) {
        const velocityZ = (newZ - previousZRef.current) / delta;
        cameraSpeed.set(velocityZ);
      }
      previousZRef.current = newZ;
    }
  });

  // If no valid tracks, don't render anything
  if (validTracks.length === 0) {
    console.warn("No valid tracks available to render");
    return null;
  }

  // Get appropriate zoom level based on screen size
  const getZoomLevel = () => {
    if (isSmallMobile) return 200; // Much more zoomed out for small phones
    if (isMobile) return 240; // More zoomed out for regular mobile
    if (innerWidth > 1500) return 400; // Large screens
    return 375; // Default for tablets and medium screens
  };

  // Calculate the group position with better mobile adjustments
  // We explicitly return a tuple [number, number, number]
  const getGroupPosition = (): [number, number, number] => {
    if (isSmallMobile) {
      // Smaller phones need more adjustment to the *left* (to appear right)
      return [-1.2, -0.5, -2]; // Moved further left on small mobile
    } else if (isMobile) {
      // Regular mobile needs moderate adjustment to the *left*
      return [-0.8, -0.5, -2]; // Moved left on regular mobile
    } else {
      // Desktop position remains unchanged
      return [0, 0, -2]; 
    }
  };

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        // More zoomed out on mobile screens
        zoom={getZoomLevel()}
        near={2}
        far={20} // Increased far plane for more records
        position={[cameraX, cameraY, cameraZ]}
        rotation-order="YXZ"
        rotation-y={Math.PI / 4}
        rotation-x={Math.atan(-1 / Math.sqrt(2))}
      />

      {/* Lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={60}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <directionalLight position={[-10, -10, 5]} intensity={0.3} color="#57DCAD" />

      {/* Records Group - Adjusted position for better mobile view */}
      <group position={getGroupPosition()}>
        {validTracks.map((track, index) => (
          <RecordItem
            key={track.id}
            track={track}
            index={index}
            alphaMapTexture={alphaMapTexture}
            viewportWidth={innerWidth} 
          />
        ))}
      </group>
    </>
  );
};

export default RecordsScene; 