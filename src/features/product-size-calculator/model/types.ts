import { StaticImageData } from 'next/image';

export type MeasurementKey = 'underbust' | 'overbust' | 'hips';

export interface MeasurementField {
  key: MeasurementKey;
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  image?: string | StaticImageData;
}

export interface BandBoundary {
  min: number;
  max: number;
  value: string;
}

export interface CupBoundary {
  minDiff: number;
  maxDiff: number;
  value: string;
}

export type SuggestedSize = string | null;
