// This is the SERVER's source of truth for what each book costs and
// which file it unlocks. It's intentionally separate from the big
// display catalog in src/BookLandingPage.jsx (which has chapters,
// descriptions, cover art, etc. — none of that matters to payment
// or download logic).
//
// TO ADD A NEW BOOK:
//   1. Add it to the `catalog` array in src/BookLandingPage.jsx as
//      you already do (title, chapters, cover, price for display).
//   2. Add ONE matching entry below, using the exact same `id`.
//   3. Upload its file into private-files/.
//   4. Commit and push. That's it — no Vercel/environment variable
//      changes needed, ever, no matter how many books you add.
export const catalog = {
  "no-code-ai-automation-small-business": {
    name: "No-Code AI Automation for Small Businesses",
    priceMinorUnits: 1900, // amount in the smallest currency unit — cents for USD ($19.00)
    currency: "USD",
    fileName: "No-Code-AI-Automation-for-Small-Businesses.epub",
  },

  // Example for the next book you add — copy this shape:
  // "your-next-book-id": {
  //   name: "Your Next Book's Title",
  //   priceMinorUnits: 1400, // $14.00
  //   currency: "USD",
  //   fileName: "your-next-book-file.epub",
  // },
};

export function getCatalogEntry(productId) {
  return catalog[productId] || null;
}
