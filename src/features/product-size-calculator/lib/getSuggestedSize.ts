import { BAND_BOUNDARIES, CUP_BOUNDARIES } from '../model/config';
import { SuggestedSize } from '../model/types';

/**
 * Calculates suggested bra size based on underbust and overbust measurements.
 * Uses a boundary-based lookup matrix for band and cup sizes.
 * 
 * @param underbust - Measurement in cm
 * @param overbust - Measurement in cm
 * @returns {SuggestedSize} - Formatted size (e.g., "75B") or null if measurements are out of range
 */
export const getSuggestedSize = (underbust: number, overbust: number): SuggestedSize => {
  if (!underbust || !overbust || overbust <= underbust) {
    return null;
  }

  // 1. Find Band Size
  const band = BAND_BOUNDARIES.find(
    (b) => underbust >= b.min && underbust <= b.max
  );

  if (!band) return null;

  // 2. Find Cup Size
  const diff = overbust - underbust;
  const cup = CUP_BOUNDARIES.find(
    (c) => diff >= c.minDiff && diff < c.maxDiff
  );

  if (!cup) return null;

  return `${band.value}${cup.value}`;
};
