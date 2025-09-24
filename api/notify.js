export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { productName, productPrice } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;       // tambahkan di Vercel Environment
  const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID;

  const message = `🛒 *Produk Dibeli!*\n\n📦 Produk: ${productName}\n💰 Harga: ${productPrice}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengirim notifikasi" });
  }
}
