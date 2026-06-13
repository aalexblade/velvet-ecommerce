import { ProductColor } from "@/entities/product/model/types";

/**
 * Maps ProductColor labels to their corresponding Tailwind CSS theme tokens.
 * These tokens are defined in src/app/globals.css under the @theme block.
 *
 * @param color - The color label from the product data.
 * @returns The CSS class string for the background color.
 */
export const getProductColorClass = (color: string): string => {
  const colorMap: Record<ProductColor | string, string> = {
    "White": "bg-product-white",
    "Smoky White": "bg-product-smoky-white",
    "Lavender": "bg-product-lavender",
    "Creamy Yellow": "bg-product-creamy-yellow",
    "Cream": "bg-product-creamy",
    "Creamy Velvet": "bg-product-milky-creamy",
    "Peach": "bg-product-peach",
    "Cotton Candy": "bg-product-cotton-candy",
    "Pale Purple": "bg-product-pale-purple",
    "Eggplant": "bg-product-eggplant",
    "Cherry": "bg-product-cherry",
    "Dark Violet": "bg-product-dark-purple",
    "Plum": "bg-product-plum",
    "Ruby": "bg-product-ruby",
    "Wine Red": "bg-product-wine-red",
    "Magenta": "bg-product-red-purple",
    "Red": "bg-product-red",
    "Mahogany Brown": "bg-product-mahogany",
    "Magic Mint": "bg-product-magic-mint",
    "Emerald": "bg-product-emerald",
    "Pearl Green": "bg-product-pearly-green",
    "Azure Blue": "bg-product-azure-blue",
    "Denim Blue": "bg-product-denim-blue",
    "Midnight Blue": "bg-product-night-blue",
    "Raw Umber": "bg-product-grey-umbra",
    "Dark": "bg-product-dark",
    "Black": "bg-product-black",
  };

  return colorMap[color as ProductColor] || "bg-product-white";
};
