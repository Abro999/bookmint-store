import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDownloadToken, incrementTokenUse } from "../../lib/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------
   Secure download endpoint.
   The actual file lives in /private-files, which is never routed
   to by the frontend and is only bundled into THIS function (see
   vercel.json's "includeFiles"). This is the only route that can
   serve it, and only with a valid, unexpired, not-overused token.
------------------------------------------------------------ */
export default async function handler(req, res) {
  const { token } = req.query;
  const record = await getDownloadToken(token);

  if (!record) return res.status(404).send("Invalid or unknown download link.");
  if (Date.now() > record.expiresAt) return res.status(410).send("This download link has expired.");
  if (record.usesCount >= record.maxUses) return res.status(429).send("This download link has been used too many times.");

  const fileName = record.fileName || "";
  const filePath = path.join(__dirname, "..", "..", "private-files", fileName);

  if (!fs.existsSync(filePath)) return res.status(500).send("File not found on server. Contact support.");

  await incrementTokenUse(token);

  const fileBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "application/octet-stream");
  res.status(200).send(fileBuffer);
}
