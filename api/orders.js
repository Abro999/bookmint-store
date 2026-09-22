import Razorpay from "razorpay";

/* ------------------------------------------------------------
   Create a Razorpay order.
   Frontend calls this first, before opening the Razorpay popup.
   Amount is decided HERE on the server, never trusted from the
   browser — otherwise anyone could tamper with the price paid.

   RAZORPAY_KEY_SECRET is only ever read here, server-side. It is
   never sent to the browser and never referenced anywhere in src/,
   so Vite's client bundle never touches it (Vite only exposes env
   vars explicitly prefixed with VITE_ to the browser — as long as
   this key is never renamed to VITE_RAZORPAY_KEY_SECRET, it stays
   fully server-side, on Vercel exactly like it was on Render).
------------------------------------------------------------ */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { email } = req.body || {};

    // Amount is always in the SMALLEST unit of the currency —
    // cents for USD, paise for INR (e.g. $19.00 -> 1900).
    const PRICE_MINOR_UNITS = Number(process.env.PRODUCT_PRICE_MINOR_UNITS || 1900);
    const CURRENCY = process.env.PRODUCT_CURRENCY || "USD";

    const order = await razorpay.orders.create({
      amount: PRICE_MINOR_UNITS,
      currency: CURRENCY,
      receipt: `receipt_${Date.now()}`,
      notes: { email: email || "" },
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // public key, safe to expose
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ error: "Could not create order" });
  }
}
