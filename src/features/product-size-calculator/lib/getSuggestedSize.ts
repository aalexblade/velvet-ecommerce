import { SuggestedSize } from "../model/types";

/**
 * Robust size calculation logic with auto-detection of overbust/underbust inputs.
 */
export const getSuggestedSize = (val1: number, val2: number): SuggestedSize => {
  if (!val1 || !val2 || isNaN(val1) || isNaN(val2)) {
    return null;
  }

  const underbust = Math.min(val1, val2);
  const overbust = Math.max(val1, val2);

  const diff = overbust - underbust;

  if (diff < 5 || diff > 35) {
    return null;
  }

  let band = "";
  if (underbust >= 63 && underbust <= 67) band = "65";
  else if (underbust >= 68 && underbust <= 72) band = "70";
  else if (underbust >= 73 && underbust <= 77) band = "75";
  else if (underbust >= 78 && underbust <= 82) band = "80";
  else if (underbust >= 83 && underbust <= 87) band = "85";
  else if (underbust >= 88 && underbust <= 92) band = "90";

  let cup = "";
  if (diff >= 9 && diff <= 11) cup = "AA";
  else if (diff >= 12 && diff <= 13) cup = "A";
  else if (diff >= 14 && diff <= 16) cup = "B";
  else if (diff >= 17 && diff <= 19) cup = "C";
  else if (diff >= 20 && diff <= 22) cup = "D";
  else if (diff >= 23 && diff <= 25) cup = "E";

  if (!band) {
    if (underbust < 68) band = "65";
    else if (underbust < 73) band = "70";
    else if (underbust < 78) band = "75";
    else if (underbust < 83) band = "80";
    else band = "85";
  }

  if (!cup) {
    if (diff < 12) cup = "A";
    else if (diff < 16) cup = "B";
    else if (diff < 19) cup = "C";
    else cup = "D";
  }

  const rawBraSize = `${band}${cup}`;

  const sizeMap: Record<string, string> = {
    "65AA": "XXS",
    "65A": "XXS",
    "65B": "XS",
    "70AA": "XS",
    "70A": "XS",
    "70B": "S",
    "70C": "S",
    "75A": "S",
    "75B": "S",
    "75C": "M",
    "75D": "M",
    "80A": "M",
    "80B": "M",
    "80C": "L",
    "80D": "L",
    "85A": "L",
    "85B": "L",
    "85C": "XL",
    "85D": "XL",
    "90B": "XL",
    "90C": "XXL",
    "90D": "XXL",
  };

  return (sizeMap[rawBraSize] || "S") as SuggestedSize;
};
