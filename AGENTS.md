# 🤖 AI Agent Guidelines & Project Context

Welcome, agent. You are working on a universal, high-performance **Multi-tenant / White-Label e-commerce platform engine** built with Next.js 15. The first brand being deployed on this core is **"Velvet Secrets"** (premium lingerie store).

Strictly adhere to the rules, architecture, and design tokens specified below.

---

## 🏗️ Architectural Rules (Feature-Sliced Design)

This project strictly follows the **Feature-Sliced Design (FSD)** methodology. All code must be strictly isolated into layers inside `src/`.

### 1. Layer Directory Structure
* `app/` — Global configs, providers, styles, and Next.js App Router folders.
* `pages/` — *Not used or minimal* (App Router handling pages routing inside `app/`).
* `widgets/` — Independent, self-contained layout blocks (e.g., `Header`, `Footer`, `ProductGrid`).
* `features/` — User interactions with business value (e.g., `AddToCartButton`, `SearchCatalog`).
* `entities/` — Business models, slices, and data cards (e.g., `product`, `cart`, `user`).
* `shared/` — Reusable infrastructure, UI-kit (Shadcn), API clients, and utils.

### 2. Isolation & Public APIs
* **Strict Imports Direction:** Higher layers can import from lower layers, but lower layers **MUST NEVER** import from higher layers (e.g., `entities` cannot import from `features` or `widgets`).
* **Public API Enforcement:** You are only allowed to cross-import modules via their respective layer entry point (`index.ts`). **NEVER** deeply import like `@/shared/ui/button`. Use `@/shared/ui` instead.
* **Path Aliases:** Use defined tsconfig mappings (`@/app/*`, `@/widgets/*`, `@/entities/*`, `@/shared/*`). Global alias `@/*` is restricted for cross-layer imports.

---

## 🎨 Design Tokens & Styling (Tailwind v4 Strict Standards)

We use **Tailwind v4** with a central CSS-only configuration directive inside `src/app/globals.css`.
* **NO LEGACY CONFIGS:** Do not generate or look for `tailwind.config.js` or `postcss.config.js`. Tailwind v4 does not use them.
* **NO HARDCODED COLORS OR RAW HEX:** Never use utility classes like `bg-black`, `text-pink-600`, or explicit hex strings like `bg-[#C31F5C]` inside components. Always use our semantic tokens.
* **NO ILLEGAL HEIGHT ARBITRARY VALUES:** Never use invalid syntax like `min-h-[400px]` or `min-h-400px` which fail in v4 compiler. Always use spacing-scale tokens (e.g., `min-h-112`, `min-h-128`) or valid arbitrary layouts `min-h-[400px]`.
* **V4 GRADIENTS SYNTAX:** Use pure v4 syntax for background gradients: `bg-linear-to-r` or `bg-linear-to-br` instead of legacy `bg-gradient-to-r`.

### Core Semantic Tokens
* `--color-background` — Base viewport canvas (White `#ffffff`).
* `--color-foreground` — Main high-contrast text (`GREY6` `#121212`).
* `--color-primary` — Brand core structural base (`#121212`).
* `--color-accent` — Luxury brand highlight identity (`PINK5` `#C31F5C`).
* `--color-muted` — Inactive, neutral elements background (`#f5f5f5`).

### Typography
* **Font Family:** `Manrope` (`font-sans`) is used globally for everything: Headers, Body text, Buttons, and Inputs. No serif alternatives allowed for this tenant.

---

## ⚙️ Tech Stack Configuration

* **Framework:** Next.js 15 (App Router, Turbopack default builder).
* **State Management:** Redux Toolkit (`src/app/store/store.ts`). Use decoupled layout client providers.
* **Backend Integration:** Native Supabase SSR JavaScript SDK clients (`@/shared/api/supabase`).
* **Dynamic Routing Parameters:** Next.js 15 dynamic segments are asynchronous. Always unwrap `params` or `searchParams` via async/await or React's `use()` hook before accessing properties (e.g., `const { id } = await params;`).

---

## 🚫 Restricted Actions

1. Do not reinstall or roll back Tailwind to v3 configuration files.
2. Do not bypass the `suppressHydrationWarning` on the root `<html>` layer.
3. Do not modify global layout wrappers without validating state provider nesting boundaries.
4. Do not use legacy arbitrary utility syntaxes that are deprecated or unsupported in the Tailwind v4 compilation pipeline.