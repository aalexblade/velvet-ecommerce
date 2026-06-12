# 🤖 AI Agent Guidelines & Project Context

Welcome, agent. You are working on a universal, high-performance **Multi-tenant / White-Label e-commerce platform engine** built with Next.js 15 (App Router). The first brand being deployed on this core is **"Velvet Secrets"** (premium lingerie store).

Strictly adhere to the rules, architecture, and design tokens specified below.

---

## 🏗️ Architectural Rules (Feature-Sliced Design)

This project strictly follows the **Feature-Sliced Design (FSD)** methodology. All code must be strictly isolated into layers inside `src/`.

### 1. Layer Directory Structure & Reference Tree
* `app/` — Global routing configs, providers, styles, and Next.js App Router layout setup.
  * `(shop)/` — Isolated storefront routing boundary containing `page.tsx` (Home), `catalog/`, `product/[id]/`, `cart/`, and `checkout/`.
  * `providers/` — App state wrappers (`StoreProvider.tsx`, `store.ts`).
* `widgets/` — Composite, autonomous layout sections of a page.
  * `header/`, `footer/`, `hero-slider/`, `product-grid/` (`ProductGrid.tsx` for items list), `cart-summary/`, `checkout-form/`.
  * `recommendations/` — Composite widget layer holding product recommendations blocks: `PromoLook.tsx`, `DiscountBanner.tsx`, `Reviews.tsx`, `SizeCalculator.tsx`, and `SizeHowTo.tsx`.
* `features/` — User actions with distinct business value and interactive state operations.
  * `cart/` — Holds the **decentralized Redux slice** (`model/slice.ts`), selectors (`model/selectors.ts`), and the interaction boundary (`ui/AddToCartButton.tsx`).
  * `product-size-calculator/` — Autonomous size calculation form and math logic (`getSuggestedSize.ts`).
  * `wishlist/`, `filters/`, `search/`, `checkout/`.
* `entities/` — Pure domain business models, lightweight data transformations, and basic presentation dumb-cards.
  * `product/` — Holds clean relative components (`ui/ProductCard.tsx`), TS types (`model/types.ts`), and data requests mapping layer (`api/getProducts.ts`).
  * `category/`, `order/`, `user/`.
* `shared/` — Reusable infrastructure, UI primitives (Shadcn kit), cross-domain utilities, and global assets (`api`, `ui`, `lib`, `types`, `assets`, `constants`).

*Note: The folder `src/entities/cart/` has been completely removed. All cart-related operations live in `src/features/cart/`.*

### 2. Isolation & Public APIs
* **Strict Imports Direction:** Higher layers can import from lower layers, but lower layers **MUST NEVER** cross-import from higher layers (e.g., components under `entities/` cannot import anything from `features/` or `widgets/`).
* **Public API Enforcement:** Cross-importing modules across layers is **ONLY** allowed through their respective slice entry point (`index.ts`). Deep reference patterns like `@/shared/ui/button` are forbidden. Use `@/shared/ui` instead.
* **Path Aliases:** Use tsconfig mapped paths (`@/app/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*`). The global wild-card alias `@/*` is restricted for cross-layer deep linking.

---

## 🎨 Design Tokens & Styling (Tailwind v4 Strict Standards)

We use **Tailwind v4** driven by the central CSS-only configuration directive in `src/app/globals.css` via the `@theme` rule.
* **NO LEGACY CONFIGS:** Never generate or seek `tailwind.config.js` or `postcss.config.js`. Tailwind v4 compiles directly from CSS.
* **NO HARDCODED COLORS OR RAW HEX:** Never use raw utility overrides (`bg-black`, `text-pink-600`) or explicit strings (`bg-[#C31F5C]`, `text-[#9C2A4A]`). Always use the standardized semantic theme tokens.
* **NO ILLEGAL HEIGHT ARBITRARY VALUES:** Avoid arbitrary layouts that crash the v4 pipeline (`min-h-[512px]` or `max-w-[1268px]`). Always translate sizes to native spacing-scale metrics or exact token definitions:
  * Use **`min-h-128`** instead of `min-h-[512px]` (512px / 4 = 128)
  * Use **`max-w-317`** instead of `max-w-[1268px]` (1268px / 4 = 317)
* **V4 GRADIENTS SYNTAX:** Use pure modern directives: `bg-linear-to-r` or `bg-linear-to-br` instead of legacy configurations.

### Core UI Semantic Tokens Mapped in `globals.css`
* `bg-background` — Base viewport background canvas.
* `text-foreground` — High-contrast text value.
* `bg-card` / `text-card-foreground` — Presentation components background elements ecosystem.
* `bg-primary` / `text-primary-foreground` — Pure dark core block structural interface base (Default: `#121212`).
* `bg-secondary` — Soft brand background block tint.
* `bg-muted` / `text-muted-foreground` — Passive background elements and text variants.
* `bg-accent` / `text-accent-foreground` — Luxury brand identity highlight and indicators.
* `border-border` — System-wide borders and lines resolution separator.

### Multi-Tenant Extended Product & UI Color Tokens
All product variant colors must strictly correspond to the `ProductColor` type defined in `@/entities/product/model/types.ts`. Use these native Tailwind v4 classes directly inside loops and selector grids:
* **Product Base & Pastels:** `bg-product-white`, `bg-product-smoky-white`, `bg-product-lavender`, `bg-product-creamy-yellow`, `bg-product-creamy`, `bg-product-creamy-velvet`, `bg-product-peach`.
* **Pinks & Purples:** `bg-product-cotton-candy`, `bg-product-pale-purple`, `bg-product-eggplant`, `bg-product-cherry`, `bg-product-dark-violet`, `bg-product-plum`.
* **Reds & Darks:** `bg-product-ruby`, `bg-product-wine-red`, `bg-product-magenta`, `bg-product-red`, `bg-product-mahogany-brown`.
* **Greens & Blues:** `bg-product-magic-mint`, `bg-product-emerald`, `bg-product-pearl-green`, `bg-product-azure-blue`, `bg-product-denim-blue`, `bg-product-midnight-blue`.
* **Shades & Deep Neutrals:** `bg-product-raw-umber`, `bg-product-dark`, `bg-product-black`.

### Typography & Hydration Rules
* **Font Family:** `Manrope` (`font-sans`) is applied globally. No alternative serif systems allowed.
* **Price & Locale Hydration:** To prevent SSR/CSR validation discrepancies, always enforce standard localization when string-formatting prices (e.g., `price.toLocaleString('uk-UA')`) or apply `suppressHydrationWarning` on the text wrapper node if dynamic formatting is necessary.

---

## ⚙️ Tech Stack Configuration

* **Framework:** Next.js 15.1.0 (App Router structure, Turbopack builder context).
* **State Management:** Redux Toolkit (`src/app/store/store.ts`) decoupled via clean providers.
* **Backend Integration:** Native Supabase SSR JavaScript SDK modules (`@/shared/api/supabase`).
* **Dynamic Routing Parameters:** Dynamic segmentation parameters are asynchronous. Always unwrap `params` or `searchParams` via async/await or React's `use()` hook before calling values (e.g., `const { id } = await params;`).
* **SEO Core Web Vitals:** Images determined as Highest Contentful Paint (LCP) elements above the fold must receive the explicit `priority` attribute.

---

## ⚖️ Restricted Actions

1. Do not re-introduce Tailwind v3 configuration files (`tailwind.config.js`).
2. Do not bypass layer architectural boundaries; components inside `entities/` (like `ProductCard.tsx`) must remain pure data views and accept action buttons solely via rendering slots (`action?: React.ReactNode`).
3. Do not deep-link items across feature/widget modules without rerouting them through a verified `index.ts` Public API boundary.