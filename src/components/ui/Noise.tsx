'use client'; // This component uses browser APIs, needs to be client-side

import { useRef, useEffect } from 'react';

// Interface not strictly needed for this debug version
interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

function Noise({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 4, // Slower refresh for less distraction
  patternAlpha = 20, // Subtle alpha
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Restore original useEffect logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animationFrameId: number;

    // --- Pattern Setup Restored ---
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return;
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;
    // ----------------------------

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      // No need to fill with solid color anymore
    };

    // --- updatePattern Restored ---
    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };
    // ---------------------------

    // --- drawGrain Restored ---
    const drawGrain = () => {
      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        console.error("Noise: Failed to create pattern");
      }
    };
    // -----------------------

    // --- loop Restored ---
    const loop = () => {
      // Only update and draw if needed
      if (frame % patternRefreshInterval === 0) { 
        updatePattern();
        drawGrain();
      }
      frame++;
      animationFrameId = window.requestAnimationFrame(loop);
    };
    // -------------------

    window.addEventListener('resize', resize);
    resize(); // Initial resize needed to set canvas size
    loop(); // Start animation loop

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  // Ensure all dependencies are included
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]); 

  return (
    <canvas 
      // Keep z-40, but make fully opaque and remove blend mode
      className="fixed inset-0 w-full h-full pointer-events-none z-[60] opacity-100" 
      ref={canvasRef} 
    />
  );
};

export { Noise }; 