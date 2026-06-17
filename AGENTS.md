# 🤖 AI Agent Guidelines & Project Context

Welcome, agent. You are working on a universal, high-performance **Multi-tenant / White-Label e-commerce platform engine** built with Next.js 15/16 (App Router). The first brand being deployed on this core is **"Velvet Secrets"** (premium lingerie store).

Strictly adhere to the rules, architecture, and design tokens specified below.

---

## 🏗️ Architectural Rules (Feature-Sliced Design)

This project strictly follows the **Feature-Sliced Design (FSD)** methodology. All code must be strictly isolated into layers inside `src/`.

### 1. Layer Directory Structure & Reference Tree

- `app/` — Global routing configs, providers, styles, and Next.js App Router layout setup.
  - `(shop)/` — Isolated storefront routing boundary containing `page.tsx` (Home), `catalog/[[...slug]]/page.tsx` (Catch-all Dynamic Catalog Server Page), `product/[id]/`, `cart/`, and `checkout/`.
  - `providers/` — App state wrappers (`StoreProvider.tsx`, `store.ts`).
- `widgets/` — Composite, autonomous layout sections of a page.
  - `catalog-view/` — **The interactive core catalog layout view widget** (`CatalogView.tsx`), driven by initial products server properties and dynamic routing state.
  - `header/`, `footer/`, `hero-slider/`, `product-grid/`, `cart-summary/`, `checkout-form/`.
  - `recommendations/` — Composite widget layer holding product recommendations blocks: `PromoLook.tsx`, `DiscountBanner.tsx`, `Reviews.tsx`, `SizeCalculator.tsx`, and `SizeHowTo.tsx`.
- `features/` — User actions with distinct business value and interactive state operations.
  - `cart/` — Holds the **decentralized Redux slice** (`model/slice.ts`), selectors (`model/selectors.ts`), and the interaction boundary (`ui/AddToCartButton.tsx`).
  - `product-size-calculator/` — Autonomous size calculation form and math logic (`getSuggestedSize.ts`).
  - `wishlist/`, `filters/`, `search/`, `checkout/`.
- `entities/` — Pure domain business models, lightweight data transformations, and basic presentation dumb-cards.
  - `product/` — Holds clean relative components (`ui/ProductCard.tsx`), TS types (`model/types.ts` aligned with relational Supabase schemas), and strict requests mapping layer (`api/getProducts.ts`, `api/getProductById.ts`).
  - `category/`, `order/`, `user/`.
- `shared/` — Reusable infrastructure, UI primitives (Shadcn kit), cross-domain utilities, and global assets (`api`, `ui`, `lib`, `types`, `assets`, `constants`).

### 2. Isolation & Public APIs

- **Strict Imports Direction:** Higher layers can import from lower layers, but lower layers **MUST NEVER** cross-import from higher layers (e.g., components under `entities/` cannot import anything from `features/` or `widgets/`).
- **Public API Enforcement:** Cross-importing modules across layers is **ONLY** allowed through their respective slice entry point (`index.ts`). Deep reference patterns like `@/shared/ui/button` are forbidden. Use `@/shared/ui` instead.
- **Path Aliases:** Use tsconfig mapped paths (`@/app/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*`).

---

## 🎨 Design Tokens & Styling (Tailwind v4 Strict Standards)

We use **Tailwind v4** driven by the central CSS-only configuration directive in `src/app/globals.css` via the `@theme` rule.

- **NO LEGACY CONFIGS:** Never generate or seek `tailwind.config.js` or `postcss.config.js`. Tailwind v4 compiles directly from CSS.
- **NO HARDCODED COLORS OR RAW HEX:** Never use raw utility overrides (`bg-black`, `text-pink-600`) or explicit strings (`bg-[#C31F5C]`). Always use the standardized semantic theme tokens.
- **NO ILLEGAL HEIGHT ARBITRARY VALUES:** Avoid arbitrary layouts that crash the v4 pipeline (`max-h-[500px]`). Always translate sizes to native spacing-scale metrics or exact token definitions:
  - Use **`max-h-125`** instead of `max-h-[500px]` (500px / 4 = 125)
  - Use **`w-21.25`** instead of `w-[85px]` (85px / 4 = 21.25)
  - Use **`w-27.5`** instead of `w-[110px]` (110px / 4 = 27.5)
- **V4 GRADIENTS SYNTAX:** Use pure modern directives: `bg-linear-to-r` or `bg-linear-to-br`.

### Core UI Semantic Tokens Mapped in `globals.css`

- `bg-background` / `text-foreground` — Base viewport background and high-contrast text layout.
- `bg-card` / `text-card-foreground` — Presentation components background elements.
- `bg-primary` / `bg-accent` / `text-accent-foreground` — Luxury brand identity highlights and text context indicators.

### Typography & Hydration Rules

- **Font Family:** `Manrope` (`font-sans`) is applied globally. No alternative serif systems allowed.
- **Price & Locale Hydration:** Enforce standard localization when string-formatting prices (`price.toLocaleString('uk-UA')`) and apply `suppressHydrationWarning` on the text wrapper node when necessary to prevent SSR/CSR validation discrepancies.

---

## ⚙️ Relational Data Models & Strict Typings (Supabase Architecture)

All product-related interfaces strictly follow a relational data model where prices and presentation swatches are unboxed from variants and nested image sub-arrays.

### Product Interface Schema (`@/entities/product/model/types.ts`)

```typescript
export type ProductColor =
  | "White"
  | "Smoky White"
  | "Lavender"
  | "Creamy Yellow"
  | "Cream"
  | "Creamy Velvet"
  | "Peach"
  | "Cotton Candy"
  | "Pale Purple"
  | "Eggplant"
  | "Cherry"
  | "Dark Violet"
  | "Plum"
  | "Ruby"
  | "Wine Red"
  | "Magenta"
  | "Red"
  | "Mahogany Brown"
  | "Magic Mint"
  | "Emerald"
  | "Pearl Green"
  | "Azure Blue"
  | "Denim Blue"
  | "Midnight Blue"
  | "Raw Umber"
  | "Dark"
  | "Black";

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color: ProductColor;
  size: string;
  price: number;
  old_price: number | null;
  stock: number;
}

export interface ProductImage {
  id: number;
  product_id: string;
  variant_id: string | null;
  url: string;
  is_main: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: number;
  is_active: boolean;
  created_at: string;
  variants: ProductVariant[];
  images: ProductImage[];
}
```
