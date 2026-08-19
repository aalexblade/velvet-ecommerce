export const getProductColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    // Основні базові кольори
    "White": "bg-white border border-zinc-300",
    "Beige": "bg-[#E4C5A8]",
    "Black": "bg-black",
    "Red": "bg-[#D32F2F]",
    
    // Додаткові палітри
    "Smoky White": "bg-[#F5F5F0] border border-zinc-200",
    "Lavender": "bg-[#E6E6FA]",
    "Creamy Yellow": "bg-[#FFFDD0] border border-zinc-200",
    "Cream": "bg-[#FFF8DC] border border-zinc-200",
    "Creamy Velvet": "bg-[#F3E5D8]",
    "Peach": "bg-[#FFDAB9]",
    "Cotton Candy": "bg-[#FFBCD9]",
    "Pale Purple": "bg-[#DCD0FF]",
    "Eggplant": "bg-[#381A35]",
    "Cherry": "bg-[#630327]",
    "Dark Violet": "bg-[#421C52]",
    "Plum": "bg-[#4A0E2E]",
    "Ruby": "bg-[#9B111E]",
    "Wine Red": "bg-[#722F37]",
    "Magenta": "bg-[#FF007F]",
    "Mahogany Brown": "bg-[#4A2C11]",
    "Magic Mint": "bg-[#AAF0D1]",
    "Emerald": "bg-[#046307]",
    "Pearl Green": "bg-[#E8F5E9] border border-zinc-200",
    "Azure Blue": "bg-[#007FFF]",
    "Denim Blue": "bg-[#1560BD]",
    "Midnight Blue": "bg-[#191970]",
    "Raw Umber": "bg-[#826644]",
    "Dark": "bg-[#212121]",
    "Nude": "bg-[#E8C0A0]",
  };

  return colorMap[color] || "bg-zinc-200 border border-zinc-300";
};