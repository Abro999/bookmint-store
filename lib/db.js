// Serverless functions don't keep a persistent local disk between
// requests (each call can land on a fresh instance), so the old
// file-based orders.json approach from the Render backend won't
// reliably work here. This uses Upstash Redis instead — a simple,
// HTTP-based key-value store with a generous free tier, built for
// exactly this kind of serverless use.
//
// Setup (one-time, ~2 minutes):
//   1. Vercel Dashboard -> your project -> Storage tab -> "Browse
//      Marketplace" -> Upstash -> Redis -> Create.
//   2. Vercel automatically adds UPSTASH_REDIS_REST_URL and
//      UPSTASH_REDIS_REST_TOKEN to your project's environment
//      variables — nothing to copy-paste by hand.
//   3. That's it. Redis.fromEnv() below picks them up automatically.

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function saveOrder(order) {
  await redis.set(`order:${order.razorpayOrderId}`, order);
}

export async function getOrderByRazorpayId(razorpayOrderId) {
  return (await redis.get(`order:${razorpayOrderId}`)) || null;
}

export async function saveDownloadToken(tokenRecord) {
  await redis.set(`token:${tokenRecord.token}`, tokenRecord);
}

export async function getDownloadToken(token) {
  return (await redis.get(`token:${token}`)) || null;
}

export async function incrementTokenUse(token) {
  const key = `token:${token}`;
  const record = await redis.get(key);
  if (record) {
    record.usesCount = (record.usesCount || 0) + 1;
    await redis.set(key, record);
  }
}
