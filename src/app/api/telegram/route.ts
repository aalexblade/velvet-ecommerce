import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, firstName, lastName, phone, city, warehouse, paymentMethod, totalPrice, shippingCost, grandTotal, items } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Помилка: Не налаштовані змінні TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Форматуємо список товарів
    const itemsList = items
      .map(
        (item: { title: string; color: string; size: string; quantity: number; price: number }) =>
          `• *${item.title}* (${item.color}, розм. ${item.size}) — ${item.quantity} шт. x ${item.price} UAH`
      )
      .join("\n");

    // Красивий шаблон повідомлення для Telegram (використовуємо Markdown v2 або стандартний HTML)
    // HTML є надійнішим для уникання помилок із екрануванням символів у Telegram
    const message = `
👑 *НОВЕ ЗАМОВЛЕННЯ VELVET SECRETS* 👑

📦 *Замовлення:* \`${orderId}\`
👤 *Клієнт:* ${firstName} ${lastName}
📞 *Телефон:* [${phone}](tel:${phone.replace("+", "")})

📍 *Доставка (Нова Пошта):*
• м. ${city}
• ${warehouse}

💳 *Оплата:* ${paymentMethod === "card" ? "💳 Картка / Apple Pay" : "💵 Накладений платіж"}

🛍️ *Товари:*
${itemsList}

💰 *Фінанси:*
• Сума: ${totalPrice} UAH
• Доставка: ${shippingCost === 0 ? "Безкоштовно" : `${shippingCost} UAH`}
• *Разом до сплати: ${grandTotal} UAH*
    `;

    // Відправляємо запит до Telegram API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown", // Дозволяє використовувати жирний шрифт, курсив та моноширинний текст
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка відправки в Telegram API:", errorData);
      return NextResponse.json({ error: "Failed to send Telegram notification" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Помилка обробки запиту сповіщення:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}