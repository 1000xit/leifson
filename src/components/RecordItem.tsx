'use client';

import { useTrackContext } from '@/context/TrackContext';
import useDimensions from '@/hooks/useDimensions';
import { Track } from '@/lib/types';
import { cameraSpeed } from '@/lib/utils';
import { fragmentShader, vertexShader } from '@/shaders/shader';
import { useFrame } from '@react-three/fiber';
import { useMotionValueEvent } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RecordItemProps {
  track: Track;
  index: number;
  alphaMapTexture: THREE.Texture;
  viewportWidth: number;
}

const RecordItem: React.FC<RecordItemProps> = ({
  track,
  index,
  alphaMapTexture,
  viewportWidth,
}) => {
  // STATES
  const [isHover, setIsHover] = useState(false);

  // DISABLE HOVER EFFECT ON MOBILE
  const { width } = useDimensions();
  const [hoverDisabled, setHoverDisabled] = useState(false);

  useMotionValueEvent(width, "change", (latest) => {
    if (latest < 768) {
      setHoverDisabled(true);
    } else {
      setHoverDisabled(false);
    }
  });

  // MOTION VALUES
  const variants = {
    initial: { x: 0, y: 0 },
    appear: { x: 0, y: 0.5 },
    hover: { x: 0.2, y: 0.5 },
  };

  // CONTEXT FUNCTIONS
  const { setHoveredTrack, setSelectedTrack } = useTrackContext();

  // LOADING TEXTURE
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    track.album.images[0].url,
    () => { /* console.log(`Texture loaded for record ${index}`) */ },
    undefined,
    () => console.error(`Texture FAILED to load for record ${index}: ${track.album.images[0].url}`)
  );
  texture.colorSpace = THREE.SRGBColorSpace;

  // UNIFORMS
  const uniforms = useRef({
    uTexture: { value: texture },
    uOpacity: { value: 0 },
    uCameraSpeed: { value: cameraSpeed.get() || 0 },
    uAlphaMapTexture: { value: alphaMapTexture },
  });

  // ANIMATION de l'uOpacity au montage du composant
  useEffect(() => {
    uniforms.current.uOpacity.value = 0;
    setTimeout(() => {
      const duration = 1000;
      const start = performance.now();
      function easeInOutQuad(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
      function animate(time: number) {
        const elapsed = time - start;
        const t = Math.min(elapsed / duration, 0.85);
        uniforms.current.uOpacity.value = easeInOutQuad(t);
        if (t < 1) { requestAnimationFrame(animate); }
      }
      requestAnimationFrame(animate);
    }, index * 75);
  }, [index]);

  useFrame(() => {
    uniforms.current.uCameraSpeed.value = cameraSpeed.get();
  });

  return (
    <>
      <motion.mesh
        key={track.id}
        position={[0, 0.5, -index * 0.5]}
        variants={variants}
        initial="initial"
        animate={
          isHover && uniforms.current.uOpacity.value >= 0.85 && !hoverDisabled
            ? "hover"
            : "appear"
        }
        transition={{
          x: { type: "spring", stiffness: 300, damping: 20 },
          y: {
            duration: 1,
            delay: index * 0.05,
            type: "spring",
            damping: 10,
          },
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (uniforms.current.uOpacity.value >= 0.85) {
            document.body.style.cursor = "pointer";
            setIsHover(true);
            setHoveredTrack(track);
          }
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          setIsHover(false);
          setHoveredTrack(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedTrack(track);
        }}
      >
        <planeGeometry args={[1, 1, 8, 8]} />
        <shaderMaterial
          transparent
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms.current}
          side={THREE.DoubleSide}
        />
      </motion.mesh>

      {/* HELPER MESH FOR HOVER DETECTION */}
      <mesh
        position={[0, 0.5, -index * 0.5]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setIsHover(true);
          setHoveredTrack(track);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          setIsHover(false);
          setHoveredTrack(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedTrack(track);
        }}
      >
        <planeGeometry args={[1, 1, 8, 8]} />
        <material visible={false} />
      </mesh>
    </>
  );
};

export default RecordItem; 