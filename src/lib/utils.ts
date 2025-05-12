import { motionValue } from "framer-motion";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export const scrollOffset = motionValue(0);
export const cameraSpeed = motionValue(0);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 