import { useTrackContext } from "@/context/TrackContext";
import { AnimatePresence, motion } from "framer-motion";

const HoveredTrack = () => {
  // Get hovered track from context
  const { hoveredTrack } = useTrackContext();

  return (
    <AnimatePresence mode="sync">
      {hoveredTrack && (
        <div
          key={hoveredTrack.id}
          className="fixed bottom-8 right-8 flex flex-col items-end z-[100] max-sm:hidden pointer-events-none"
        >
          <div className="pointer-events-auto">
            <motion.h3
              key={hoveredTrack.id + hoveredTrack.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="text-xl font-semibold max-md:text-lg text-gray-900"
            >
              {hoveredTrack.name}
            </motion.h3>
            <motion.p
              key={hoveredTrack.id + (hoveredTrack.artists?.[0]?.name || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.05, ease: "easeInOut" }}
              className="text-gray-600 max-md:text-sm"
            >
              {hoveredTrack.artists?.[0]?.name || 'Unknown Artist'} • {hoveredTrack.album?.name || 'Unknown Album'}
            </motion.p>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HoveredTrack; 