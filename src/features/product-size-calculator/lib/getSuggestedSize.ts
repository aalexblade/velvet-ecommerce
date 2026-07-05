import { BAND_BOUNDARIES, CUP_BOUNDARIES } from '../model/config';
import { SuggestedSize } from '../model/types';

/**
 * Calculates suggested bra size based on underbust and overbust measurements.
 * Uses a boundary-based lookup matrix for band and cup sizes.
 * 
 * All internal annotations and parameters are strictly in English.
 * @param underbust - Measurement under the bust in cm
 * @param overbust - Measurement across the fullest part of the bust in cm
 * @returns {SuggestedSize} - Formatted size (e.g., "75B") or null if measurements are out of range
 */ 
export const getSuggestedSize = (underbust: number, overbust: number): SuggestedSize => {
  if (!underbust || !overbust || overbust <= underbust) {
    return null;
  }

  // 1. Identify the matching band size using strict configuration limits
  const band = BAND_BOUNDARIES.find(
    (b) => underbust >= b.min && underbust <= b.max
  );

  if (!band) return null;

  // 2. Compute the exact difference and find the corresponding cup size
  const diff = overbust - underbust;
  const cup = CUP_BOUNDARIES.find(
    (c) => diff >= c.minDiff && diff < c.maxDiff
  );

  if (!cup) return null;

  // Added explicit type assertion to fix strict TypeScript template literal type matching
  return `${band.value}${cup.value}` as SuggestedSize;
};