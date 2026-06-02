import { MeasurementField, BandBoundary, CupBoundary } from './types';

export const measurementFields: MeasurementField[] = [
  {
    key: 'overbust',
    label: "Об'єм грудей(см)",
    placeholder: "Об'єм грудей(см)",
    min: 70,
    max: 140,
    step: 1,
    unit: 'см',
  },
  {
    key: 'underbust',
    label: "Об'єм під груддю(см)",
    placeholder: "Об'єм під груддю(см)",
    min: 60,
    max: 120,
    step: 1,
    unit: 'см',
  },
  {
    key: 'hips',
    label: "Об'єм стегон(см)",
    placeholder: "Об'єм стегон(см)",
    min: 70,
    max: 150,
    step: 1,
    unit: 'см',
  },
];

export const BAND_BOUNDARIES: BandBoundary[] = [
  { min: 63, max: 67, value: '65' },
  { min: 68, max: 72, value: '70' },
  { min: 73, max: 77, value: '75' },
  { min: 78, max: 82, value: '80' },
  { min: 83, max: 87, value: '85' },
  { min: 88, max: 92, value: '90' },
  { min: 93, max: 97, value: '95' },
  { min: 98, max: 102, value: '100' },
];

export const CUP_BOUNDARIES: CupBoundary[] = [
  { minDiff: 10, maxDiff: 12, value: 'AA' },
  { minDiff: 12, maxDiff: 14, value: 'A' },
  { minDiff: 14, maxDiff: 16, value: 'B' },
  { minDiff: 16, maxDiff: 18, value: 'C' },
  { minDiff: 18, maxDiff: 20, value: 'D' },
  { minDiff: 20, maxDiff: 22, value: 'E' },
  { minDiff: 22, maxDiff: 24, value: 'F' },
  { minDiff: 24, maxDiff: 26, value: 'G' },
];

export const sizeOrder = ['65A', '65B', '70A', '70B', '70C', '75A', '75B', '75C', '75D', '80B', '80C', '80D', '85B', '85C', '85D'];
