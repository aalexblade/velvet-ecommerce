# 🤖 AI Agent Guidelines & Project Context

Welcome, agent. You are working on a universal, high-performance **Multi-tenant / White-Label e-commerce platform engine** built with Next.js 15/16 (App Router). The first brand being deployed on this core is **"Velvet Secrets"** (premium lingerie store).

Strictly adhere to the rules, architecture, state structures, and design tokens specified below.

---

## 🏗️ Architectural Rules (Feature-Sliced Design)

This project strictly follows the **Feature-Sliced Design (FSD)** methodology. All code must be strictly isolated into layers inside `src/`.

### 1. Layer Directory Structure & Reference Tree

- `app/` — Layer 1: Global routing configurations, root styles (`globals.css`), and metadata.
  - `(shop)/` — Isolated storefront routing boundary containing pure, lightweight server entries: `page.tsx` (Home), `catalog/[[...slug]]/page.tsx` (Dynamic Catalog Router), `product/[id]/`, `cart/`, and `checkout/`.
  - **Rule:** App router components must contain ZERO business logic, layouts, or states. They unwrap parameters and return the corresponding page from the `views/` layer.
- `views/` (or `pages/`) — Layer 2: Compositions of widgets and features that represent a full page layout.
  - `catalog/ui/CatalogPage.tsx` — Server Component orchestrator that captures route params/searchParams, fetches public datasets, and feeds them into the widgets layer.
- `widgets/` — Layer 3: Composite, autonomous, self-contained layout sections of a page.
  - `catalog-view/ui/CatalogView.tsx` — The interactive core layout view component for the catalogue.
  - `header/`, `footer/`, `hero-slider/`, `product-grid/`, `cart-summary/`, `checkout-form/`.
  - `recommendations/` — Core composite widgets for recommendations (banners, reviews, etc.).
- `features/` — Layer 4: User interactions with distinct business value and dynamic state operations.
  - `cart/` — Holds the decentralized Zustand state store (`model/cartStore.ts`) and interaction elements (`ui/AddToCartButton.tsx`).
  - `filters/` — Handles client filter changes. Must map inputs directly into URL Query Strings.
  - `product-size-calculator/` — Independent size form orchestrating math inputs via callbacks.
  - `wishlist/`, `search/`, `checkout/`, `auth/`.
- `entities/` — Layer 5: Pure domain business models, lightweight data transformations, and basic presentation dumb-cards.
  - `product/` — Holds clean relative components (`ui/ProductCard.tsx`), TS types (`model/types.ts`), and strict data requests mock API layer (`api/getProducts.ts`).
  - `category/`, `order/`, `user/`, `review/`.
- `shared/` — Layer 6: Reusable infrastructure, generic UI primitives (Shadcn kit), cross-domain utilities, and global assets (`api`, `ui`, `lib`, `types`, `hooks`, `constants`).

### 2. Isolation, Cross-Imports & Public APIs

- **Strict Imports Direction:** Higher layers can import from lower layers, but lower layers **MUST NEVER** cross-import from higher layers (e.g., components under `entities/` cannot import anything from `features/` or `widgets/`).
- **Same-Layer Isolation:** Slices inside the same layer cannot cross-import from each other (e.g., `features/checkout` cannot directly import hooks/selectors from `features/cart`). Interactions must be orchestrated from the layer above (`widgets/` or `views/`).
- **Public API Enforcement:** Cross-importing modules across layers is **ONLY** allowed through their respective slice entry point (`index.ts`). Deep reference patterns like `@/shared/ui/button.tsx` are forbidden. Use `@/shared/ui` instead.
- **Path Aliases:** Use tsconfig mapped paths (`@/app/*`, `@/views/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*`).

---

## 💾 State Management & Next.js Hydration Rules (Zustand)

Global state stores like Redux are completely forbidden. Client interaction state must be decentralized into local feature stores using **Zustand**.

### 1. Cart Zustand Store Schema (`@/features/cart/model/cartStore.ts`)

The shopping cart utilizing Zustand's `persist` middleware must safely isolate data syncing into `localStorage`.

### 2. Next.js Hydration Mismatch Guard

- **The Risk:** Since Zustand's `persist` reads from `localStorage` on the client side, initial Server-Side Render (SSR) HTML will always output an empty state while the client has items stored, throwing a Next.js Hydration Mismatch crash.
- **The Rule:** Any client component or widget reading from the cart store (e.g., `AddToCartButton.tsx`, or cart badges in `Header.tsx`) **MUST** use a client-side gate (e.g., `useEffect` or a custom `isMounted` state tracking flag) to guarantee that localStorage-dependent values are only evaluated and rendered after mounting on the client.

### 3. URL-Driven Global Filters Strategy

- **The Rule:** Global filtering parameters (e.g., inside `CatalogFilters.tsx`) must never be written to local React states or Zustand. To ensure 100% SEO-shareable state indexation, all filters **MUST** be written directly into URL Query Strings (`?size=M&color=Black`) via Next.js `useRouter` and navigation states.

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

### Typography & Price Formatting

- **Font Family:** `Manrope` (`font-sans`) is applied globally. No alternative serif systems allowed.
- **Price & Locale Hydration:** Enforce standard localization when string-formatting prices (`price.toLocaleString('uk-UA')`) and apply `suppressHydrationWarning` on the text wrapper node when necessary to prevent SSR/CSR validation discrepancies.

---

## ⚙️ Relational Data Models & Static Caching (Supabase Integration)

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
