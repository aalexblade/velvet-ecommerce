"use client";

import { Input } from "@/shared/ui";
import { MeasurementField } from "../model/types";

interface MeasurementInputProps {
  field: MeasurementField;
  value: string;
  onChange: (value: string) => void;
}

export const MeasurementInput = ({ field, value, onChange }: MeasurementInputProps) => {
  return (
    <div className="w-full">
      <Input
        id={field.key}
        type="number"
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={field.min}
        max={field.max}
        step={field.step}
        className="w-full h-12 border-border focus-visible:border-accent focus-visible:ring-accent/20"
      />
    </div>
  );
};
