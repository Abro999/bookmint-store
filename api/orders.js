import Razorpay from "razorpay";
import { getCatalogEntry } from "../lib/catalog.js";
import { saveOrder } from "../lib/db.js";

/* ------------------------------------------------------------
   Create a Razorpay order.
   Frontend calls this first, before opening the Razorpay popup.
   The price is looked up HERE, server-side, from lib/catalog.js —
   never trusted from the browser, so nobody can tamper with what
   they pay by editing the request. Works for any number of books:
   the browser only ever sends WHICH book (productId), never a price.

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
    const { email, productId } = req.body || {};

    const product = getCatalogEntry(productId);
    if (!product) {
      return res.status(400).json({ error: "Unknown product" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: product.priceMinorUnits,
      currency: product.currency,
      receipt: `receipt_${Date.now()}`,
      notes: { email: email || "", productId },
    });

    // Remember, server-side, exactly which book and price this
    // order was for. api/verify.js trusts THIS record later —
    // never whatever the browser might claim at that point.
    await saveOrder({
      razorpayOrderId: order.id,
      productId,
      email: email || "",
      amount: order.amount,
      currency: order.currency,
      paidAt: null,
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
