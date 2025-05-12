'use client';

import { Track } from '@/lib/types';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Text, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';

interface SceneProps {
  trackList: Track[];
}

const Scene = ({ trackList }: SceneProps) => {
  const ref = useRef<Group>(null);
  const { height } = useThree((state) => state.viewport);
  const data = useScroll();

  useFrame(() => {
    if (!ref.current) return;
    const y = data.range(0, 1 / 3) * height * 3;
    ref.current.position.y = -y;
  });

  return (
    <group ref={ref}>
      {trackList.map((track, i) => (
        <VinylRecord 
          key={track.id} 
          track={track} 
          position={[
            i % 2 === 0 ? -2 : 2,  // Alternate left/right
            i * 2.5,               // Vertical spacing
            0
          ]} 
          index={i}
        />
      ))}
    </group>
  );
};

interface VinylRecordProps {
  track: Track;
  position: [number, number, number];
  index: number;
}

const VinylRecord = ({ track, position, index }: VinylRecordProps) => {
  const recordRef = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  
  // Animation
  useFrame((state) => {
    if (!recordRef.current) return;
    
    // Spin the record
    recordRef.current.rotation.z = state.clock.getElapsedTime() * (0.1 + (index % 3) * 0.05);
    
    // Hover effect
    const hoverY = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.05;
    recordRef.current.position.y = hoverY;
    
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={position}>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <group ref={recordRef} rotation={[Math.PI / 2, 0, 0]}>
          {/* Main record disc */}
          <mesh receiveShadow castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.05, 64]} />
            <meshStandardMaterial 
              color="#111111" 
              roughness={0.4} 
              metalness={0.1}
            />
          </mesh>
          
          {/* Grooves */}
          <mesh position={[0, 0, 0.026]} receiveShadow>
            <ringGeometry args={[0.4, 1.45, 80]} />
            <meshStandardMaterial 
              color="#222222" 
              roughness={0.75}
              metalness={0.2}
            />
          </mesh>
          
          {/* Center Label with album art */}
          <mesh ref={labelRef} position={[0, 0, 0.026]} receiveShadow>
            <circleGeometry args={[0.4, 32]} />
            <meshStandardMaterial 
              color="#57DCAD"
              roughness={0.3}
              metalness={0.1}
              emissive="#57DCAD"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Center hole */}
          <mesh position={[0, 0, 0.028]}>
            <ringGeometry args={[0.05, 0.07, 32]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
      </Float>
      
      {/* Track info text */}
      <group ref={textRef} position={[0, 0, 1.2]}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {track.name}
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.15}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {track.artists.map(artist => artist.name).join(', ')}
        </Text>
      </group>
    </group>
  );
};

export default Scene; 