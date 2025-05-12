import { motion } from "framer-motion";
import HoveredTrack from "./HoveredTrack";

interface InterfaceProps {
  itemsCount: number;
}

const Interface: React.FC<InterfaceProps> = ({ itemsCount }) => {
  return (
    <>
      {/* HOVERED TRACK */}
      <HoveredTrack />
    </>
  );
};

export default Interface; 