import crypto from "crypto";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { saveDownloadToken, saveOrder, getOrderByRazorpayId } from "../lib/db.js";
import { getCatalogEntry } from "../lib/catalog.js";

/* ------------------------------------------------------------
   Verify the payment after Razorpay's checkout popup succeeds.
   This signature check is the ONLY way to trust that a payment
   actually happened — never mark an order "paid" just because
   the frontend says so.

   Which BOOK this download token unlocks comes from the order
   record api/orders.js saved when the order was first created —
   never from anything the browser sends at this step. That's what
   stops someone from paying for a $14 book and then claiming the
   $30 one in this request.
------------------------------------------------------------ */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body || {};

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    const pendingOrder = await getOrderByRazorpayId(razorpay_order_id);
    if (!pendingOrder) {
      return res.status(400).json({ error: "Order not found" });
    }

    const product = getCatalogEntry(pendingOrder.productId);
    if (!product) {
      return res.status(400).json({ error: "Unknown product for this order" });
    }

    const EXPIRY_HOURS = Number(process.env.DOWNLOAD_LINK_EXPIRY_HOURS || 72);
    const MAX_USES = Number(process.env.DOWNLOAD_MAX_USES || 5);

    // Payment is genuine. Issue a secure, time-limited download token
    // for the SPECIFIC file this order paid for.
    const token = nanoid(32);
    const record = {
      token,
      email: email || pendingOrder.email || "",
      productId: pendingOrder.productId,
      fileName: product.fileName,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      createdAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
      usesCount: 0,
      maxUses: MAX_USES,
    };

    await saveDownloadToken(record);
    await saveOrder({ ...pendingOrder, paidAt: Date.now() });

    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;
    const downloadUrl = `${proto}://${host}/api/download/${token}`;

    // Serverless functions can be frozen the instant a response is
    // sent, so — unlike the old fire-and-forget version on Render —
    // the email is awaited here to make sure it actually goes out.
    // A failed email never blocks the download link itself.
    let emailError = null;
    if (record.email) {
      try {
        await sendDownloadEmail(record.email, downloadUrl, EXPIRY_HOURS, MAX_USES, product.name);
      } catch (e) {
        console.error("Email send failed (order still succeeded):", e);
        emailError = "Could not send the email, but your download link below still works.";
      }
    }

    res.status(200).json({ success: true, downloadUrl, emailError });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ error: "Something went wrong verifying payment" });
  }
}

async function sendDownloadEmail(toEmail, downloadUrl, expiryHours, maxUses, productName) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: `Your download: ${productName}`,
    html: `
      <p>Thank you for your purchase!</p>
      <p><a href="${downloadUrl}">Click here to download your ebook</a></p>
      <p>This link works for ${expiryHours} hours and can be used up to ${maxUses} times,
      so it's safe to use it on more than one device.</p>
    `,
  });
}
