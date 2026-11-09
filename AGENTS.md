# 🤖 AI Agent Guidelines & Project Context

Welcome, agent. You are working on a universal, high-performance **Multi-tenant / White-Label e-commerce platform engine** built with Next.js 16.2.6 (App Router) and React 19.2.4. The first brand being deployed on this core is **"Velvet Secrets"** (premium lingerie store).

Strictly adhere to the rules, architecture, state structures, and design tokens specified below.

---

## 🏗️ Architectural Rules (Feature-Sliced Design)

This project follows the **Feature-Sliced Design (FSD)** methodology. All application code must be organized into layers inside `src/`.

### 1. Layer Directory Structure & Reference Tree

#### `app/` — Layer 1: Routing and application configuration

Contains Next.js App Router configuration, layouts, route handlers, global styles, and metadata.

- `(shop)/` — Storefront routing boundary.
- Route pages should be lightweight entry points that delegate page composition to the `views/` layer.
- Route components may unwrap route parameters and pass them to views.
- Do not place business logic, complex UI composition, or feature state management inside route files.

#### `views/` — Layer 2: Full-page compositions

Views combine widgets and features into complete pages.

Current structure:

- `about/` — About page.
- `blog/` — Blog page.
- `cart/` — Cart page.
- `catalog/` — Catalog page and server-side data orchestration.
- `checkout/` — Checkout page composition.
- `home/` — Home page.
- `product-details/` — Product details page.

Each view should expose its public API through `index.ts`.

#### `widgets/` — Layer 3: Composite UI sections

Widgets combine entities, features, and shared UI into reusable page sections.

Current structure:

- `cart/` — Cart interface.
- `catalog-view/` — Interactive catalog layout.
- `checkout-form/` — Checkout form and order summary.
- `discount-banner/` — Discount banner section.
- `footer/` — Global footer.
- `header/` — Global header.
- `hero-slider/` — Hero slider.
- `product-card/` — Product card composition.
- `product-details-block/` — Product details composition.
- `product-grid/` — Product grid.
- `product-size-guide/` — Product size guide.
- `promo-look/` — Promotional look section.
- `reviews/` — Reviews section.

Each widget should expose its public API through `index.ts`.

#### `features/` — Layer 4: User interactions and business actions

Features implement interactions that provide distinct business value.

Current structure:

- `cart/` — Cart state and add-to-cart interaction.
- `checkout/` — Checkout calculations, validation, order payload construction, submission, and delivery integration.
- `filters/` — Catalog filtering and sorting.
- `product-quick-view/` — Product quick-view interaction.
- `product-size-calculator/` — Product size calculation.
- `search/` — Search functionality.
- `wishlist/` — Wishlist functionality.

Feature state and business logic must remain inside the corresponding feature.

Global catalog filters must be URL-driven rather than stored in local React state or Zustand.

Each feature should expose its cross-layer public API through `index.ts`.

#### `entities/` — Layer 5: Domain models and data access

Entities contain domain types, data access, transformations, and reusable domain-level UI.

Current structure:

- `cart/` — Cart item model and types.
- `category/` — Category model, API, and category UI.
- `hero-slide/` — Hero slide model and API.
- `order/` — Order model and order creation API.
- `product/` — Product model, types, UI, and product data access.
- `user/` — User domain.

**Product entity API boundaries:**

- `@/entities/product` (`index.ts`) exports client-safe domain types and UI components.
- `@/entities/product/server` (`server.ts`) exports server-side product data access, including product queries and server-only types.
- Do not import server-only product API through the client-safe `index.ts`.
- Do not import internal entity modules directly from other layers when a public API entry point exists.

Other entities should expose their cross-layer API through `index.ts`.

#### `shared/` — Layer 6: Infrastructure and reusable primitives

Contains reusable infrastructure, generic UI components, utilities, and shared types.

Current structure includes:

- `api/` — Shared API infrastructure, including Supabase and Nova Poshta integrations.
- `lib/` — Generic utility functions.
- `types/` — Shared TypeScript types.
- `ui/` — Reusable UI primitives and components.

Shared modules must not depend on higher FSD layers or application-specific business features.

---

### 2. Isolation, Cross-Imports & Public APIs

- **Strict Import Direction:** Higher layers can import from lower layers, but lower layers MUST NEVER import from higher layers.
  - `shared` must not import from `entities`, `features`, `widgets`, or `views`.
  - `entities` must not import from `features`, `widgets`, or `views`.
  - `features` must not import from `widgets` or `views`.
  - `widgets` must not import from `views`.
- **Same-Layer Isolation:** Slices inside the same layer must not cross-import from each other unless an explicitly justified architectural exception exists.
- **Public API Enforcement:** Cross-slice imports must use the corresponding slice public API (`index.ts`).
- **Server API Exception:** The product entity exposes server-only functionality through `@/entities/product/server`. This is an intentional public entry point, not a deep import.
- **No Deep Imports:** Avoid importing internal modules across slice boundaries.
  - Incorrect: `@/features/cart/model/cartStore`
  - Correct: `@/features/cart`
  - Incorrect: `@/widgets/header/ui/Header`
  - Correct: `@/widgets/header`
  - Incorrect: `@/entities/product/api/getProducts`
  - Correct: `@/entities/product/server`
- Internal imports within the same slice may use relative paths.
- Use configured TypeScript path aliases for cross-layer imports.

---

## 💾 State Management & Next.js Hydration Rules (Zustand)

Global state stores such as Redux are not used in this project. Client interaction state should be decentralized into local feature stores using Zustand when shared state is required.

### 1. Cart Zustand Store

The shopping cart uses Zustand's `persist` middleware to synchronize cart data with `localStorage` under the name `'cart-storage'`.

The cart domain model is defined in:

`@/entities/cart`

The cart store is implemented in:

`@/features/cart`

Expected cart item structure:

```typescript
export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}
```

Cart state:

```typescript
interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}
```

### 2. Next.js Hydration Mismatch Guard

- **The Risk:** Zustand's `persist` middleware reads from `localStorage` on the client. The server-rendered HTML may contain an empty cart while the browser already has persisted cart items.
- **The Rule:** Components that read localStorage-dependent cart values must prevent server/client hydration mismatches.
- Use a client-side mounting or hydration strategy where necessary.
- Do not render persisted values in a way that causes the initial server and client renders to differ.

### 3. URL-Driven Global Filters Strategy

Catalog filters must be represented in URL query parameters.

Examples:

- `?size=M`
- `?color=Black`
- `?size=M&color=Black&sort=price-asc`

Use Next.js navigation APIs (`useRouter`, `useSearchParams`, and related APIs) to read and update filter parameters.

Do not duplicate URL-driven filter state in local React state or Zustand unless there is a clearly justified temporary UI state.

---

## 🎨 Design Tokens & Styling (Tailwind CSS v4)

The project uses **Tailwind CSS v4**, configured through CSS-first directives in `src/app/globals.css`.

- Do not introduce legacy Tailwind configuration files unless the project architecture explicitly requires them.
- Avoid hardcoded colors and raw hexadecimal values.
- Prefer semantic theme tokens defined in the global CSS theme.
- Use the existing spacing scale and project conventions.
- Use modern Tailwind v4 gradient syntax, such as `bg-linear-to-r` and `bg-linear-to-br`.

### Core UI Semantic Tokens

- `bg-background` / `text-foreground` — Base viewport background and text.
- `bg-card` / `text-card-foreground` — Card surfaces.
- `bg-primary` — Primary brand color.
- `bg-accent` / `text-accent-foreground` — Accent surfaces and text.

### Extended Product Colors

Available product color tokens include:

- `white`, `smoky-white`, `lavender`, `creamy-yellow`, `creamy`, `creamy-velvet`, `peach`
- `cotton-candy`, `pale-purple`, `eggplant`, `cherry`, `dark-violet`, `plum`
- `ruby`, `wine-red`, `magenta`, `red`, `mahogany-brown`
- `magic-mint`, `emerald`, `pearl-green`, `azure-blue`, `denim-blue`, `midnight-blue`
- `raw-umber`, `dark`, `black`

Always verify that a token exists in `globals.css` before using it.

### Typography & Price Formatting

- **Font Family:** `Manrope` (`font-sans`) is applied globally.
- Use consistent typography and existing project conventions.
- Format prices with the Ukrainian locale where appropriate:

```typescript
price.toLocaleString("uk-UA");
```

- Use `suppressHydrationWarning` only when there is a known and justified server/client formatting difference. Do not use it to hide unrelated hydration errors.

---

## ⚙️ Relational Data Models & Supabase Integration

Product data follows a relational model where prices and presentation swatches are stored in variants, and images are associated with products and optionally with variants.

Supabase integration uses `@supabase/ssr` with separate server and browser clients.

### 1. Supabase Clients

Located in `src/shared/api/supabase/`:

- `browserClient.ts` — Exports `createSupabaseBrowserClient()` initialized with public environment variables.
- `serverClient.ts` — Exports asynchronous `createSupabaseServerClient()` and supports Next.js cookie handling.

Use the appropriate client depending on the execution environment.

- Never expose service-role credentials to the browser.
- Never import server-only Supabase functionality into Client Components.
- Keep database access and server-only logic within the appropriate server-side modules.

### 2. Product Interface Schema

The canonical product model is defined in:

`src/entities/product/model/types.ts`

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

Always treat the actual TypeScript definitions in the repository as the source of truth. Update this documentation when the domain model changes.

---

## 🧭 General Development Guidelines

1. **Preserve Existing Behavior:** Refactoring must not change business behavior unless explicitly requested.
2. **Small, Focused Changes:** Prefer incremental changes over large rewrites.
3. **Type Safety:** Avoid `any`. Use explicit types and narrow unknown values safely.
4. **Server/Client Boundaries:** Keep server-only modules separate from Client Components. Add `"use client"` only when required.
5. **Public APIs:** Update slice `index.ts` files when exposing functionality across layers.
6. **No Unnecessary Abstractions:** Introduce abstractions only when they improve reuse, clarity, or separation of responsibilities.
7. **Verify Changes:** Run relevant checks after modifications:
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build` when appropriate
8. **Do Not Claim Checks Passed Unless They Were Actually Run:** Report failures and warnings honestly.
9. **Keep Documentation Current:** Update this file when the directory structure, public APIs, or architectural conventions change.
10. **Avoid Unrelated Changes:** Do not combine architectural refactoring with unrelated styling or business-logic changes.
