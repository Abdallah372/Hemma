import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely.
 * Handles conditional classes and merges conflicting tailwind classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
