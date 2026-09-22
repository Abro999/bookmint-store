import crypto from "crypto";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { saveDownloadToken, saveOrder } from "../lib/db.js";

/* ------------------------------------------------------------
   Verify the payment after Razorpay's checkout popup succeeds.
   This signature check is the ONLY way to trust that a payment
   actually happened — never mark an order "paid" just because
   the frontend says so.
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

    const EXPIRY_HOURS = Number(process.env.DOWNLOAD_LINK_EXPIRY_HOURS || 72);
    const MAX_USES = Number(process.env.DOWNLOAD_MAX_USES || 5);

    // Payment is genuine. Issue a secure, time-limited download token.
    const token = nanoid(32);
    const record = {
      token,
      email: email || "",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      createdAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
      usesCount: 0,
      maxUses: MAX_USES,
    };

    await saveDownloadToken(record);
    await saveOrder({ razorpayOrderId: razorpay_order_id, email, paidAt: Date.now() });

    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;
    const downloadUrl = `${proto}://${host}/api/download/${token}`;

    // Serverless functions can be frozen the instant a response is
    // sent, so — unlike the old fire-and-forget version on Render —
    // the email is awaited here to make sure it actually goes out.
    // A failed email never blocks the download link itself.
    let emailError = null;
    if (email) {
      try {
        await sendDownloadEmail(email, downloadUrl, EXPIRY_HOURS, MAX_USES);
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

async function sendDownloadEmail(toEmail, downloadUrl, expiryHours, maxUses) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: `Your download: ${process.env.PRODUCT_NAME}`,
    html: `
      <p>Thank you for your purchase!</p>
      <p><a href="${downloadUrl}">Click here to download your ebook</a></p>
      <p>This link works for ${expiryHours} hours and can be used up to ${maxUses} times,
      so it's safe to use it on more than one device.</p>
    `,
  });
}
