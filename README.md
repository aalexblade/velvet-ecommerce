# Velvet Secrets — E-commerce

An e-commerce store for the Velvet Secrets brand. The project is built with Next.js App Router and TypeScript. The product catalog and order workflows use Supabase, the shopping cart is persisted on the client, and new-order notifications are sent through Telegram.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19 + TypeScript**
- **Supabase** — database and client access via `@supabase/ssr`
- **Zustand** — persisted shopping cart state
- **Tailwind CSS 4**
- **Radix UI / shadcn** — UI primitives
- **Telegram Bot API** — order notifications

## Features

- Product and category catalog
- Product detail pages and quick view
- Shopping cart with quantity controls
- Checkout with Nova Poshta delivery
- Shipping cost and order total calculation
- Telegram order notifications
- Admin routes for order management

> Feature availability depends on the Supabase configuration and environment variables.

## Getting Started

### 1. Requirements

- Node.js LTS
- npm
- A Supabase project with the required tables and access policies configured
- A Telegram bot and chat ID for order notifications

### 2. Installation

```bash
git clone https://github.com/aalexblade/velvet-ecommerce.git
cd velvet-ecommerce
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

Replace the example values with your own Supabase and Telegram credentials. Do not commit `.env.local` or publish secrets. Variables prefixed with `NEXT_PUBLIC_*` are exposed to client-side code, so use only the public anon/publishable key and configure Supabase Row Level Security (RLS) appropriately. **Never expose a service-role key in client-side environment variables.**

### 4. Run in Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Checks and Production

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run start
```

`npm run start` runs the production build, so run `npm run build` first.

## Project Structure

The main application code lives in `src/`:

```text
src/
├── app/        # Next.js App Router routes, layouts, and API routes
├── views/      # Page compositions currently being reorganized
├── widgets/    # Large UI sections: header, footer, catalog, cart, checkout
├── features/   # User actions and scenarios: cart, checkout, filters
├── entities/   # Domain entities and their API/model/UI
└── shared/     # Shared infrastructure, API clients, and UI
```

The codebase is gradually being aligned with **Feature-Sliced Design (FSD)**. Keep dependencies flowing from higher-level layers to lower-level layers: `app → pages/views → widgets → features → entities → shared`. Avoid circular dependencies and imports between neighboring slices at the same layer; use each slice's public API.

## Key Routes

- `/` — home page
- `/catalog` — product catalog
- `/product/[id]` — product details
- `/cart` — shopping cart
- `/checkout` — checkout
- `/admin/orders` — admin order management

Actual route availability and behavior depend on the current code and environment configuration.

## API and Integrations

- `src/app/api/telegram/route.ts` — server endpoint for sending Telegram notifications.
- `src/shared/api/supabase/` — Supabase clients.
- `src/entities/` — domain APIs and entity types.

Ensure the Supabase schema matches the application's expectations and that RLS policies allow only the required operations. Before a production release, separately verify that order creation and order-item insertion are atomic.

## Development Workflow

Before committing, it is recommended to run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Links

- [GitHub Repository](https://github.com/aalexblade/velvet-ecommerce)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
