export const getProductColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    // Base & Pastels (з чіткими рамками для дуже світлих)
    "White": "bg-product-white border border-zinc-300",
    "Beige": "bg-product-beige",
    "Nude": "bg-product-nude",
    "Smoky White": "bg-product-smoky-white border border-zinc-200",
    "Lavender": "bg-product-lavender",
    "Creamy Yellow": "bg-product-creamy-yellow border border-zinc-200",
    "Cream": "bg-product-creamy border border-zinc-200",
    "Creamy Velvet": "bg-product-creamy-velvet",
    "Peach": "bg-product-peach",

    // Pinks & Purples
    "Cotton Candy": "bg-product-cotton-candy",
    "Pale Purple": "bg-product-pale-purple",
    "Eggplant": "bg-product-eggplant",
    "Cherry": "bg-product-cherry",
    "Dark Violet": "bg-product-dark-violet",
    "Plum": "bg-product-plum",

    // Reds & Darks
    "Ruby": "bg-product-ruby",
    "Wine Red": "bg-product-wine-red",
    "Magenta": "bg-product-magenta",
    "Red": "bg-product-red",
    "Mahogany Brown": "bg-product-mahogany-brown",

    // Greens & Blues
    "Magic Mint": "bg-product-magic-mint",
    "Emerald": "bg-product-emerald",
    "Pearl Green": "bg-product-pearl-green border border-zinc-200",
    "Azure Blue": "bg-product-azure-blue",
    "Denim Blue": "bg-product-denim-blue",
    "Midnight Blue": "bg-product-midnight-blue",

    // Shades & Deep Neutrals
    "Raw Umber": "bg-product-raw-umber",
    "Dark": "bg-product-dark",
    "Black": "bg-product-black",
  };

  return colorMap[color] || "bg-product-white border border-zinc-300";
};