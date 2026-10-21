# Velvet Secrets — E-commerce

Інтернет-магазин бренду Velvet Secrets. Проєкт побудований на Next.js App Router і TypeScript; каталог та замовлення працюють із Supabase, кошик зберігається на клієнті, а сповіщення про нові замовлення надсилаються в Telegram.

## Стек

- **Next.js 16** (App Router)
- **React 19 + TypeScript**
- **Supabase** — база даних та клієнтський доступ через `@supabase/ssr`
- **Zustand** — стан кошика з persist
- **Tailwind CSS 4**
- **Radix UI / shadcn** — UI-примітиви
- **Telegram Bot API** — повідомлення про замовлення

## Функціональність

- Каталог товарів і категорій
- Сторінка товару та швидкий перегляд
- Кошик із керуванням кількістю товарів
- Оформлення замовлення з доставкою Новою поштою
- Розрахунок вартості доставки та суми замовлення
- Сповіщення про замовлення через Telegram
- Адміністративні маршрути для роботи із замовленнями

> Наявність окремих можливостей залежить від налаштування Supabase та змінних середовища.

## Початок роботи

### 1. Вимоги

- Node.js LTS
- npm
- Проєкт Supabase із налаштованими таблицями та правами доступу
- Telegram-бот і chat ID для сповіщень про замовлення

### 2. Встановлення

```bash
git clone https://github.com/aalexblade/velvet-ecommerce.git
cd velvet-ecommerce
npm install
```

### 3. Змінні середовища

Створіть файл `.env.local` у корені проєкту:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

Замініть приклади на власні значення з налаштувань Supabase і Telegram. Не додавайте `.env.local` до Git і не публікуйте секрети. Змінні `NEXT_PUBLIC_*` доступні клієнтському коду; використовуйте лише публічний anon/publishable key і належно налаштуйте RLS у Supabase. **Не використовуйте service-role key у клієнтських змінних.**

### 4. Запуск у режимі розробки

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

### 5. Перевірки та production-запуск

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run start
```

`npm run start` запускає production-збірку, тому спочатку виконайте `npm run build`.

## Структура проєкту

Основний код розташований у `src/`:

```text
src/
├── app/        # маршрути Next.js App Router, layout та API routes
├── views/      # сторінкові композиції, що ще перебувають у процесі реорганізації
├── widgets/    # великі частини інтерфейсу: header, footer, catalog, cart, checkout
├── features/   # користувацькі дії та сценарії: cart, checkout, filters
├── entities/   # доменні сутності та їхні API/model/ui
└── shared/     # спільна інфраструктура, API-клієнти та UI
```

Проєкт поступово приводиться до **Feature-Sliced Design (FSD)**. Під час рефакторингу дотримуйтеся напрямку залежностей від шарів верхнього рівня до нижчого: `app → pages/views → widgets → features → entities → shared`. Уникайте циклічних залежностей і імпортів між сусідніми слайсами одного шару; використовуйте публічні API слайсів.

## Важливі маршрути

- `/` — головна сторінка
- `/catalog` — каталог товарів
- `/product/[id]` — сторінка товару
- `/cart` — кошик
- `/checkout` — оформлення замовлення
- `/admin/orders` — адміністративна сторінка замовлень

Фактичні доступність маршрутів і поведінка залежать від актуального коду та конфігурації середовища.

## API та інтеграції

- `src/app/api/telegram/route.ts` — серверний endpoint для відправлення повідомлень у Telegram.
- `src/shared/api/supabase/` — клієнти Supabase.
- `src/entities/` — доменні API та типи для сутностей.

Переконайтеся, що схема Supabase відповідає очікуванням застосунку, а RLS-політики дозволяють лише потрібні операції. Перед production-релізом окремо перевірте атомарність створення замовлення та його позицій.

## Робота над проєктом

Перед комітом рекомендовано запускати:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Посилання

- [Репозиторій GitHub](https://github.com/aalexblade/velvet-ecommerce)
- [Документація Next.js](https://nextjs.org/docs)
- [Документація Supabase](https://supabase.com/docs)
