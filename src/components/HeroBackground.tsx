'use client';

import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'; 
import RecordsScene from './RecordsScene';
import { fetchTracks } from '@/lib/fetchTracks';
import { Track } from '@/lib/types';
import { mockTracks } from '@/lib/mockTracks'; // Keep for fallback

const HeroBackground: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); 
  const [scrollProgress, setScrollProgress] = useState(0); // Actual progress for animation
  const targetScrollProgress = useRef(0); // Target progress based on user input
  const isAnimating = useRef(true); // State to control if we hijack scroll
  const animationFrameId = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load tracks
  useEffect(() => {
    async function loadTracks() {
      try {
        const fetchedTracks = await fetchTracks();
        setTracks(fetchedTracks.length > 0 ? fetchedTracks : mockTracks);
      } catch (error) {
        console.error("Error loading tracks:", error);
        setTracks(mockTracks);
      }
    }
    loadTracks();
  }, []);

  // Smooth animation loop - Restored (only for desktop)
  useEffect(() => {
    if (isMobile) return; // Don't run animation loop on mobile
    
    const animateScroll = () => {
      const current = scrollProgress;
      const target = targetScrollProgress.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.001) {
        if (current !== target) setScrollProgress(target);
      } else {
        // Using original interpolation factor
        setScrollProgress(current + diff * 0.07); 
      }
      animationFrameId.current = requestAnimationFrame(animateScroll);
    };
    animationFrameId.current = requestAnimationFrame(animateScroll);
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scrollProgress, isMobile]); // Restore dependencies
  
  // Define unlockScroll globally within the component scope
  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  // Scroll hijacking logic - Restored (only for desktop)
  useEffect(() => {
    if (isMobile) {
      // Ensure scroll is unlocked and progress is 0 on mobile
      unlockScroll(); 
      setScrollProgress(0);
      targetScrollProgress.current = 0;
      isAnimating.current = false;
      return; // Don't attach listeners on mobile
    }
    
    // --- Desktop Scroll Logic --- 
    // Restored original sensitivity values
    const scrollSensitivity = 0.0004; 
    const touchSensitivity = 0.0008; 
    let touchStartY = 0;
    let lastKnownPageScrollY = window.scrollY; 

    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    // unlockScroll is defined above using useCallback

    const updateTargetProgress = (delta: number) => {
      const currentTarget = targetScrollProgress.current;
      let newTarget = Math.min(Math.max(0, currentTarget + delta), 1);
      targetScrollProgress.current = newTarget;

      const shouldAnimate = newTarget < 1;
      
      if (shouldAnimate && !isAnimating.current) {
          // Re-locking scroll if we scroll back into the animation zone
          isAnimating.current = true;
          lockScroll();
      } else if (!shouldAnimate && isAnimating.current) {
          // Unlocking scroll when animation target reaches 1
          isAnimating.current = false;
          unlockScroll();
          // Ensure progress snaps to 1 when unlocking
          if (scrollProgress !== 1) setScrollProgress(1);
          targetScrollProgress.current = 1;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault(); 
        updateTargetProgress(e.deltaY * scrollSensitivity);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isAnimating.current) {
         touchStartY = e.touches[0].clientY;
       }
    };

    const handleTouchMove = (e: TouchEvent) => {
       if (isAnimating.current) {
         e.preventDefault(); 
         const touchY = e.touches[0].clientY;
         const deltaY = touchStartY - touchY; 
         updateTargetProgress(deltaY * touchSensitivity);
         touchStartY = touchY; 
       }
    };
    
    const handleScroll = () => {
       lastKnownPageScrollY = window.scrollY;
       if (!isAnimating.current && lastKnownPageScrollY < 5) {
          isAnimating.current = true;
          lockScroll();
       }
    }

    // Initial lock check
    if (window.scrollY < 5) {
      lockScroll();
      isAnimating.current = true;
    } else {
      isAnimating.current = false;
      setScrollProgress(1);
      targetScrollProgress.current = 1;
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      unlockScroll(); // Always ensure scroll is unlocked on cleanup
    };
  }, [isMobile, unlockScroll]); // Restore dependencies

  return (
    <div
      ref={containerRef}
      // Restore fixed positioning
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10, // Below Testimonials (z-20), below HeroContent text (z-30)
        pointerEvents: isMobile ? 'none' : 'auto', // Disable pointer events on mobile
      }}
    >
      {/* Canvas styling remains the same */}
      <Canvas 
        dpr={[1, 2]} 
        shadows
        style={{ 
          position: 'absolute',
          inset: 0,
          pointerEvents: isMobile ? 'none' : 'auto' 
        }}
        onContextMenu={(e) => e.preventDefault()} 
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#f9f9f9']} />
          
          <RecordsScene 
            trackList={tracks}
            // Pass correct progress based on mobile/desktop
            scrollProgress={isMobile ? 0 : scrollProgress} 
          />
          
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
      
      {/* Blur Mask Div - Styling remains the same */}
      <div 
         aria-hidden="true" 
         className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#f9f9f9_0%,_#f9f9f9_5%,_transparent_35%)] z-[15] pointer-events-none"
         // Removed sticky style
       ></div>
    </div>
  );
};

export default HeroBackground; 