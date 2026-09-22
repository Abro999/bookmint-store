import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   STORE DESIGN TOKENS
   The store itself has its own quiet, editorial identity —
   deep ink + warm brass. Individual books bring their OWN
   accent color (book.accent) for their own detail page, so the
   catalog reads like a real publisher's list, not one product's
   palette stretched over everything.
   ============================================================ */
const C = {
  ink: "#151412",      // matches the near-black in your real cover art
  ink2: "#1C1A17",
  ink3: "#262320",
  brass: "#F2F0EA",    // pure off-white — the shell itself carries no hue at all, so it can never clash with any future book's own cover colors
  brassDeep: "#D9D6CC",
  white: "#F2F0EA",
  muted: "#ADA89C",
  mutedFaint: "#7C776C",
  border: "rgba(242,240,234,0.20)",
  borderSoft: "rgba(242,240,234,0.08)",
};

// Two clearly distinct type families: a serif with real character for
// headlines (the thing a reader should notice first), a plain, quiet
// sans for everything else — body copy, labels, buttons.
const FONT_SERIF = "'Fraunces', ui-serif, Georgia, serif";
const FONT_SANS = "'Inter', ui-sans-serif, system-ui, sans-serif";

const STORE_NAME = "Bookmint";
const STORE_TAGLINE = "Practical guides, built to be used.";
const CONTACT_EMAIL = "a1mauryaaman@gmail.com";

// Backend now lives in this same project as Vercel Serverless
// Functions under /api, so calls are same-origin — no base URL,
// no CORS, no separate deployment to keep in sync.

/* ============================================================
   CATALOG — every book you sell lives here.
   Add a new one any time: copy the shape, give it a unique id
   (must match the "id" you add to products.js on the backend),
   pick its own "accent" color, and it appears in the store
   automatically — no other code needs to change.

   "content" is optional. Without it, a book still gets a clean,
   complete detail page (cover, description, purchase card) —
   just without the extra chapter-by-chapter sections.
   ============================================================ */
const catalog = [
  {
    id: "no-code-ai-automation-small-business",
    isNew: true,
    title: "No-Code AI Automation for Small Businesses",
    subtitle:
      "A Practical Guide to Saving Time, Cutting Costs, and Scaling Without Writing a Single Line of Code",
    description:
      "Learn how to use AI and no-code automation to save time, reduce repetitive work, and streamline customer service, marketing, and daily business operations.",
    category: "Business & AI",
    author: "Aman Maurya",
    authorPositioning: "AI & Automation for Business Owners",
    price: 19,
    currency: "USD",
    format: "EPUB / PDF",
    language: "English",
    pages: 12,
    accent: "#E8871E",
    coverImage: "/covers/no-code-ai-automation.png",
    purchaseProvider: "custom_checkout",
    content: {
      chapters: [
        { n: "01", title: "Why AI Automation Matters for Small Business", desc: "The case for removing repetitive work so you can focus on decisions and relationships." },
        { n: "02", title: "Understanding the No-Code AI Toolkit", desc: "The three kinds of tools that make automation possible — and how they fit together." },
        { n: "03", title: "Automating Customer Service", desc: "AI-drafted replies, chatbots, and automatic message routing." },
        { n: "04", title: "Automating Marketing and Content Creation", desc: "Workflows for social captions, newsletters, ad copy, and product descriptions." },
        { n: "05", title: "Automating Admin and Daily Operations", desc: "Scheduling, invoice tracking, and weekly reporting on autopilot." },
        { n: "06", title: "Build Your First Automation — Step by Step", desc: "A beginner-friendly walkthrough you can finish in under an hour." },
        { n: "07", title: "Choosing the Right Tools", desc: "How to pick between automation platforms, AI assistants, and purpose-built apps." },
        { n: "08", title: "Common Mistakes to Avoid", desc: "The habits that make automation backfire, and how to sidestep them." },
        { n: "09", title: "A Real-World Example", desc: "One business's before-and-after, and where the saved time went." },
        { n: "10", title: "Your Next Steps", desc: "A 30-day plan for turning the book into a working system." },
      ],
      outcomes: [
        { label: "Foundations", title: "Understand the basics", desc: "How no-code AI automation actually works, in plain terms." },
        { label: "Tooling", title: "Choose the right tools", desc: "The role of AI assistants, automation platforms, and purpose-built apps." },
        { label: "Customer service", title: "Automate customer service", desc: "AI-drafted responses, chatbots, and automatic message routing." },
        { label: "Marketing", title: "Automate marketing", desc: "Workflows for social captions, newsletters, ad copy, and product descriptions." },
        { label: "Operations", title: "Automate admin", desc: "Scheduling, invoice and expense workflows, and weekly reporting." },
        { label: "Hands-on", title: "Build your first workflow", desc: "A step-by-step process for an automated contact-form reply." },
      ],
      buildSteps: [
        { n: "01", title: "Create an automation account", desc: "Set up a free account with an automation platform." },
        { n: "02", title: "Connect your contact form or inbox", desc: "This becomes the trigger for the workflow." },
        { n: "03", title: "Add an AI step", desc: "Write a short prompt describing the tone and content of the reply." },
        { n: "04", title: "Connect email or CRM", desc: "This is where the drafted reply lands for review." },
        { n: "05", title: "Test the workflow", desc: "Run it with a sample submission and check the output." },
        { n: "06", title: "Turn it on and monitor", desc: "Watch it for the first week, then let it run." },
      ],
      toolkit: [
        { title: "AI \u201Cbrains\u201D", items: ["ChatGPT", "Claude"], desc: "The tools that read, write, and reason." },
        { title: "Automation \u201Cglue\u201D", items: ["Zapier", "Make"], desc: "The tools that connect apps together." },
        { title: "Purpose-built AI apps", items: ["AI chatbots", "AI scheduling assistants", "AI writing tools"], desc: "Ready-made tools for one specific job." },
      ],
      mistakes: [
        "Automating a broken process",
        "Removing human review too soon",
        "Trying to automate everything at once",
        "Ignoring data privacy",
        "Writing vague AI prompts",
        "Forgetting to monitor automations",
      ],
      plan: [
        { week: "Week 1", title: "Set up and build", desc: "Create accounts and build your first automation." },
        { week: "Week 2", title: "Monitor and refine", desc: "Fix issues and improve your AI prompts." },
        { week: "Week 3", title: "Add a second automation", desc: "Expand into a new part of the business." },
        { week: "Week 4", title: "Review and plan", desc: "Check the time saved and choose the next workflow." },
      ],
      audienceFor: [
        "Small business owners", "Solopreneurs", "Freelancers and consultants",
        "Marketing and operations teams", "People curious about AI but unsure where to start", "Non-technical beginners",
      ],
      audienceNotFor: [
        "A programming textbook", "An advanced AI engineering manual", "A coding course", "A promise of guaranteed business results",
      ],
      realWorldExample: {
        before: { label: "Before", stat: "~10 hrs/week", desc: "spent answering repetitive customer questions and writing social captions." },
        after: { label: "After", stat: "~2 hrs/week", desc: "mostly spent reviewing and approving AI drafts." },
        note: "The saved time was redirected toward sourcing products and building supplier relationships.",
      },
      previewPages: [
        { label: "Table of Contents", kind: "toc" },
        {
          label: "Chapter 1", kind: "text", heading: "Why AI Automation Matters for Small Business",
          paragraphs: [
            "Every small business owner faces the same core problem: too much work, not enough hours. Customer emails pile up, social media posts need writing, invoices need chasing, and leads need following up — all while you're also trying to run the actual business.",
            "This isn't about replacing your business with robots. It's about removing the repetitive, low-value tasks that eat your time so you can focus on the things only you can do.",
          ],
        },
        {
          label: "Chapter 6", kind: "list", heading: "Build Your First Automation — Step by Step",
          intro: "Goal: Auto-draft replies to website contact form submissions.",
          items: [
            "Create a free automation account", "Connect your contact form or inbox", "Add an AI step with a short prompt",
            "Connect email or CRM to save the draft", "Test with a sample submission", "Turn it on and monitor",
          ],
        },
      ],
      faqs: [
        { q: "Who is this book for?", a: "Small business owners, solopreneurs, freelancers, consultants, and marketing or operations teams who want to reduce repetitive work — no technical background required." },
        { q: "Do I need coding experience?", a: "No. The book is built entirely around no-code tools. If you can use email and a web browser, you can follow along." },
        { q: "What will I learn?", a: "How no-code AI automation works, which tools to use, and how to build automated workflows for customer service, marketing, and daily operations." },
        { q: "Which types of business tasks can I automate?", a: "Customer replies, social captions and newsletters, scheduling, invoice and expense tracking, and weekly reporting are all covered." },
        { q: "Does the book teach a practical automation workflow?", a: "Yes. Chapter 6 is a step-by-step build for an automated contact-form reply, and Chapter 10 lays out a 30-day plan for expanding from there." },
        { q: "Which tools are discussed?", a: "ChatGPT and Claude as AI assistants, Zapier and Make as automation platforms, and purpose-built AI apps for specific tasks like scheduling and chat." },
        { q: "Is the book suitable for beginners?", a: "Yes — it's written for people with no technical background who are overwhelmed by where to start." },
        { q: "Where can I buy it?", a: "Right here on this site. Use the \u201CBuy Now\u201D button to pay securely and get an instant download link by email." },
      ],
    },
  },

  // Add your next book here whenever it's ready — copy this shape.
  // "content" is optional; omit it for a simple, clean detail page
  // until you're ready to write the full chapter-by-chapter version.
  // Give it its OWN "accent" color so the catalog stays visually rich
  // as it grows — don't reuse another book's color.
  //
  // {
  //   id: "your-next-book-id",              // must match products.js on the backend
  //   title: "Your Next Book Title",
  //   subtitle: "A one-line description of the book",
  //   description: "A short paragraph describing what readers get.",
  //   category: "Marketing",                 // shown as a small tag on its card
  //   author: "Aman Maurya",
  //   authorPositioning: "...",
  //   price: 14,
  //   currency: "USD",
  //   format: "EPUB / PDF",
  //   language: "English",
  //   pages: 10,
  //   accent: "#4F86C6",
  //   purchaseProvider: "custom_checkout",
  // },
];

function getBookById(id) {
  return catalog.find((b) => b.id === id) || null;
}

// Currency-aware price display. Uses the browser's own Intl API,
// so it formats correctly for any currency code — no hand-kept
// symbol table to maintain as the catalog grows into new currencies.
function formatPrice(book) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: book.currency, maximumFractionDigits: book.price % 1 === 0 ? 0 : 2 }).format(book.price);
  } catch {
    return `${book.price} ${book.currency}`;
  }
}

/* ============================================================
   LOCAL CURRENCY HINT
   Visitors anywhere in the world see an approximate price in
   their own currency, purely so the number means something to
   them at a glance. The actual charge always happens in the
   book's own listed currency (book.currency) — that's what the
   payment account is configured to accept — so this is clearly
   labelled "approx." and never used for the real transaction.
   Fails completely silently: if geolocation or the exchange-rate
   lookup doesn't work (offline, blocked, rate-limited), only the
   official price shows and nothing looks broken.
   ============================================================ */
function useLocalPriceHint(book) {
  const [hint, setHint] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const geoRes = await fetch("https://ipwho.is/");
        const geo = await geoRes.json();
        const code = geo && geo.currency && geo.currency.code;
        if (!code || code === book.currency || cancelled) return;
        const rateRes = await fetch(`https://api.frankfurter.app/latest?from=${book.currency}&to=${code}`);
        const rateData = await rateRes.json();
        const rate = rateData && rateData.rates && rateData.rates[code];
        if (!rate || cancelled) return;
        const amount = book.price * rate;
        const formatted = new Intl.NumberFormat(undefined, { style: "currency", currency: code, maximumFractionDigits: amount >= 100 ? 0 : 2 }).format(amount);
        if (!cancelled) setHint(formatted);
      } catch (e) {
        // silent by design — see comment above
      }
    })();
    return () => { cancelled = true; };
  }, [book.price, book.currency]);
  return hint;
}

function LocalPriceHint({ book, className = "" }) {
  const hint = useLocalPriceHint(book);
  if (!hint) return null;
  return <p className={className} style={{ color: C.mutedFaint }}>&asymp; {hint}</p>;
}

/* ============================================================
   ANALYTICS (event-only, no credentials)
   ============================================================ */
function track(event, payload = {}) {
  if (typeof window !== "undefined" && window.dataLayer) window.dataLayer.push({ event, ...payload });
}

/* ============================================================
   SIMPLE HASH ROUTER
   ============================================================ */
function useRoute() {
  const parse = () => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (hash.startsWith("book/")) return { view: "detail", id: hash.slice(5) };
    return { view: "store" };
  };
  const [route, setRoute] = useState(parse());
  useEffect(() => {
    const onHashChange = () => { setRoute(parse()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return {
    route,
    goToBook: (id) => { window.location.hash = `#/book/${id}`; },
    goToStore: () => { window.location.hash = "#/"; },
  };
}

/* ============================================================
   REVEAL (restrained, section-level)
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>{children}</div>;
}

/* ============================================================
   LOGOMARK — bold monogram badge, designed to double as a
   future app icon (not a generic open-book outline)
   ============================================================ */
function Logomark({ size = 34 }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, borderRadius: size * 0.28, backgroundColor: C.brass }}
    >
      <span style={{ fontSize: size * 0.56, fontWeight: 700, color: C.ink, letterSpacing: "-1px", lineHeight: 1, fontFamily: FONT_SERIF }}>B</span>
    </div>
  );
}

/* ============================================================
   CHECKOUT — per-product modal, reused across the whole store
   ============================================================ */
const CheckoutContext = React.createContext(null);

function CheckoutProvider({ children }) {
  const [product, setProduct] = useState(null);
  return (
    <CheckoutContext.Provider value={{ open: (p) => setProduct(p) }}>
      {children}
      {product && <CheckoutModal product={product} onClose={() => setProduct(null)} />}
    </CheckoutContext.Provider>
  );
}

function PurchaseButton({ product, label = "Buy Now", variant = "primary", event = "purchase_click", className = "" }) {
  const checkout = React.useContext(CheckoutContext);
  const handleClick = () => {
    track(event, { provider: product.purchaseProvider, id: product.id });
    if (product.purchaseProvider === "custom_checkout" && checkout) checkout.open(product);
    else if (product.productUrl) window.open(product.productUrl, "_blank", "noopener,noreferrer");
  };
  const base = "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-transform duration-150 active:scale-[0.98] px-7 py-3.5 rounded-sm";
  const styles = variant === "primary" ? { backgroundColor: product.accent || C.brass, color: C.ink } : { backgroundColor: "transparent", color: C.white, border: `1px solid ${C.borderSoft}` };
  return <button onClick={handleClick} className={`${base} ${className}`} style={styles}>{label}</button>;
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutModal({ product, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePay = async () => {
    if (!email || !email.includes("@")) { setErrorMsg("Enter a valid email — that's where your download link goes."); return; }
    setErrorMsg(""); setStatus("loading");
    const ok = await loadRazorpayScript();
    if (!ok) { setStatus("error"); setErrorMsg("Could not load the payment window. Check your connection and try again."); return; }
    try {
      const orderRes = await fetch(`/api/orders`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: product.id }),
      });
      if (!orderRes.ok) throw new Error("order_failed");
      const order = await orderRes.json();
      const rzp = new window.Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, order_id: order.orderId,
        name: product.title, description: "Ebook purchase", prefill: { email }, theme: { color: product.accent || C.brass },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`/api/verify`, {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, email }),
            });
            if (!verifyRes.ok) throw new Error("verify_failed");
            const result = await verifyRes.json();
            setDownloadUrl(result.downloadUrl); setStatus("paid");
            track("purchase_completed", { id: product.id });
          } catch (e) {
            setStatus("error");
            setErrorMsg("Payment succeeded but verification failed. Contact support with your payment ID: " + response.razorpay_payment_id);
          }
        },
        modal: { ondismiss: () => setStatus("idle") },
      });
      rzp.open(); setStatus("idle");
    } catch (e) {
      setStatus("error"); setErrorMsg("Could not start checkout. Please try again in a moment.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-sm p-8" style={{ backgroundColor: C.ink2, border: `1px solid ${C.border}` }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-sm" style={{ color: C.mutedFaint }}>&times;</button>
        {status !== "paid" ? (
          <>
            <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: product.accent || C.brass }}>CHECKOUT</p>
            <h3 className="font-black text-lg mb-1" style={{ color: C.white }}>{product.title}</h3>
            <p className="text-2xl font-black" style={{ color: C.white }}>{formatPrice(product)}</p>
            <LocalPriceHint book={product} className="text-xs mb-5" />
            <label className="text-xs mb-2 block" style={{ color: C.muted }}>Email (for your download link)</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full px-4 py-3 mb-3 rounded-sm text-sm outline-none" style={{ backgroundColor: C.ink, color: C.white, border: `1px solid ${C.borderSoft}` }} />
            {errorMsg && <p className="text-xs mb-3" style={{ color: "#E06A6A" }}>{errorMsg}</p>}
            <button onClick={handlePay} disabled={status === "loading"} className="w-full font-semibold px-6 py-3.5 rounded-sm disabled:opacity-60" style={{ backgroundColor: product.accent || C.brass, color: C.ink }}>
              {status === "loading" ? "Opening secure payment\u2026" : `Pay ${formatPrice(product)} securely`}
            </button>
            <p className="text-xs mt-4 text-center" style={{ color: C.mutedFaint }}>Charged in {product.currency} &mdash; processed securely by Razorpay.</p>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: product.accent || C.brass }}>PAYMENT SUCCESSFUL</p>
            <h3 className="font-black text-lg mb-4" style={{ color: C.white }}>Your book is ready</h3>
            <p className="text-sm mb-6" style={{ color: C.muted }}>We&rsquo;ve also emailed this link to {email}. It works for a few days, so it&rsquo;s safe on more than one device.</p>
            <a href={downloadUrl} className="w-full inline-flex items-center justify-center font-semibold px-6 py-3.5 rounded-sm" style={{ backgroundColor: product.accent || C.brass, color: C.ink }}>Download your book</a>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   STORE POLICIES
   ============================================================ */
const policies = {
  privacy: {
    title: "Privacy Policy",
    body: `We collect only what's needed to deliver your purchase: your email address (to send your download link and receipt) and payment details, which are processed securely by Razorpay — we never see or store your card, UPI, or bank information ourselves.

Your email is used only to send your download link and purchase-related communication. We do not sell, rent, or share your information with third parties for marketing.

Download links are time-limited and tied to your specific order. To show an approximate price in your local currency, we look up your general region from your IP address via a third-party service (ipwho.is) — this is used only to pick a currency and is never stored. If you'd like your data removed from our records, email ${CONTACT_EMAIL}.`,
  },
  terms: {
    title: "Terms & Conditions",
    body: `By purchasing any book from ${STORE_NAME}, you're buying a personal-use digital license to read it. You may not resell, redistribute, or publicly share the file.

Prices are listed in the currency shown at checkout and may be updated at any time without affecting orders already placed. Payment is processed securely via Razorpay.

Content is provided as general educational material — not a guarantee of specific results.

Questions: ${CONTACT_EMAIL}`,
  },
  refund: {
    title: "Refund & Cancellation Policy",
    body: `Because these are instantly-delivered digital products, we're unable to offer refunds once a download link has been issued and used.

If something goes wrong on our end — payment succeeded but you never received a working download link, or the file is corrupted — email ${CONTACT_EMAIL} within 7 days of purchase with your payment ID, and we'll fix it or refund you in full.

Approved refunds are issued to your original payment method via Razorpay and typically reflect within 5–7 business days.`,
  },
  contact: {
    title: "Contact",
    body: `Questions about an order, a book, or anything else — reach out any time.

Email: ${CONTACT_EMAIL}

We aim to respond within 1–2 business days.`,
  },
};

const PolicyContext = React.createContext(null);

function PolicyProvider({ children }) {
  const [open, setOpen] = useState(null);
  return (
    <PolicyContext.Provider value={{ open: (key) => setOpen(key) }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={() => setOpen(null)}>
          <div className="w-full max-w-lg rounded-sm p-8 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: C.ink2, border: `1px solid ${C.border}` }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="float-right text-lg" style={{ color: C.mutedFaint }}>&times;</button>
            <h3 className="font-black text-lg mb-5" style={{ color: C.white }}>{policies[open].title}</h3>
            {policies[open].body.split("\n\n").map((p, i) => <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{p}</p>)}
          </div>
        </div>
      )}
    </PolicyContext.Provider>
  );
}
function PolicyLink({ policyKey, children }) {
  const ctx = React.useContext(PolicyContext);
  return <button onClick={() => ctx.open(policyKey)} className="text-xs" style={{ color: C.muted }}>{children}</button>;
}

/* ============================================================
   COVER MOCKUP — each book's own accent, store shell stays neutral
   ============================================================ */
function CoverMockup({ book, size = 1 }) {
  const accent = book.accent;
  const spine = 12 * size;

  // If this book has its own real cover artwork, show that —
  // the typographic layout below is only a fallback for books
  // added later that don't have one yet.
  if (book.coverImage) {
    return (
      <div style={{ width: 300 * size, height: 460 * size, transform: "perspective(1400px) rotateY(-8deg) rotateX(1.5deg)", transformStyle: "preserve-3d" }} className="relative">
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ border: `1px solid ${C.border}`, boxShadow: "26px 42px 76px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.35)" }}
        />
        <div className="absolute top-1.5" style={{ right: -8 * size, bottom: -8 * size, width: 8 * size, background: "#DCD5C4", transform: "skewY(20deg)" }} />
      </div>
    );
  }

  return (
    <div style={{ width: 300 * size, height: 460 * size, transform: "perspective(1400px) rotateY(-8deg) rotateX(1.5deg)", transformStyle: "preserve-3d" }} className="relative">
      <div className="absolute inset-0 overflow-hidden flex flex-col justify-between"
        style={{ backgroundColor: C.ink, border: `1px solid ${C.border}`, boxShadow: "26px 42px 76px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.35)" }}>
        {/* spine strip — this book's own color, store shell stays neutral */}
        <div className="absolute left-0 top-0 bottom-0" style={{ width: spine, backgroundColor: accent }} />
        <div className="flex-1 flex flex-col justify-center" style={{ paddingLeft: spine + 22 * size, paddingRight: 22 * size }}>
          {book.category && (
            <p className="mb-5" style={{ color: accent, fontSize: 10.5 * size, letterSpacing: "0.16em", fontWeight: 600 }}>{book.category}</p>
          )}
          <p className="leading-[1.15]" style={{ color: C.white, fontSize: 24 * size, fontFamily: FONT_SERIF, fontWeight: 600 }}>{book.title}</p>
        </div>
        <div style={{ paddingLeft: spine + 22 * size, paddingRight: 22 * size, paddingBottom: 26 * size }}>
          <div style={{ height: 1, backgroundColor: C.borderSoft, marginBottom: 14 * size }} />
          <p style={{ color: C.mutedFaint, fontSize: 10 * size, letterSpacing: "0.16em" }}>{book.author.toUpperCase()}</p>
        </div>
      </div>
      <div className="absolute top-1.5" style={{ right: -8 * size, bottom: -8 * size, width: 8 * size, background: "#DCD5C4", transform: "skewY(20deg)" }} />
    </div>
  );
}

/* ============================================================
   NAVBAR — neutral store chrome, brass accent
   ============================================================ */
function Navbar({ context, goToStore }) {
  const [elevated, setElevated] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const detailLinks = [{ label: "Inside", href: "#chapters" }, { label: "Preview", href: "#preview" }, { label: "Author", href: "#author" }, { label: "FAQ", href: "#faq" }];
  return (
    <header className="sticky top-0 z-40 transition-colors duration-300"
      style={{ backgroundColor: elevated ? "rgba(19,18,16,0.94)" : "transparent", backdropFilter: elevated ? "blur(10px)" : "none", borderBottom: elevated ? `1px solid ${C.borderSoft}` : "1px solid transparent" }}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={goToStore} className="flex items-center gap-2.5">
          <Logomark />
          <span className="font-black tracking-tight text-sm" style={{ color: C.white }}>{STORE_NAME.toUpperCase()}</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {context === "detail" && detailLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm transition-colors" style={{ color: C.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.white)} onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{l.label}</a>
          ))}
          <button onClick={goToStore} className="text-sm font-medium" style={{ color: context === "detail" ? C.muted : C.brass }}>All Books</button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <div className="w-6 flex flex-col gap-1.5"><span className="h-0.5 w-full" style={{ backgroundColor: C.white }} /><span className="h-0.5 w-full" style={{ backgroundColor: C.white }} /></div>
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: C.ink }}>
          {context === "detail" && detailLinks.map((l) => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm" style={{ color: C.muted }}>{l.label}</a>)}
          <button onClick={() => { goToStore(); setOpen(false); }} className="text-sm text-left" style={{ color: C.brass }}>All Books</button>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   STOREFRONT
   ============================================================ */
function BookCard({ book, goToBook }) {
  return (
    <div className="rounded-sm overflow-hidden flex flex-col relative" style={{ border: `1px solid ${C.borderSoft}`, backgroundColor: C.ink2 }}>
      {book.isNew && (
        <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-sm text-[10px] font-bold tracking-wide" style={{ backgroundColor: C.brass, color: C.ink }}>NEW</span>
      )}
      <button onClick={() => goToBook(book.id)} className="flex justify-center pt-8 pb-4">
        <CoverMockup book={book} size={0.55} />
      </button>
      <div className="p-6 flex flex-col flex-1">
        {book.category && <span className="text-xs font-semibold tracking-widest mb-3" style={{ color: book.accent }}>{book.category.toUpperCase()}</span>}
        <button onClick={() => goToBook(book.id)} className="text-left">
          <h3 className="font-bold mb-2 leading-snug" style={{ color: C.white }}>{book.title}</h3>
        </button>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: C.muted }}>{book.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black block" style={{ color: C.white }}>{formatPrice(book)}</span>
            <LocalPriceHint book={book} className="text-xs" />
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => goToBook(book.id)} className="text-sm" style={{ color: book.accent }}>Details</button>
            <PurchaseButton product={book} label="Buy Now" className="px-4 py-2 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Storefront({ goToBook }) {
  useEffect(() => { document.title = `${STORE_NAME} — ${STORE_TAGLINE}`; }, []);
  const categories = ["All", ...Array.from(new Set(catalog.map((b) => b.category).filter(Boolean)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const visible = activeCategory === "All" ? catalog : catalog.filter((b) => b.category === activeCategory);

  return (
    <div style={{ backgroundColor: C.ink }}>
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="flex justify-center mb-8"><Logomark size={40} /></div>
            <h1 className="font-black leading-[1.08] mb-6" style={{ color: C.white, fontSize: "clamp(2.1rem, 4.6vw, 3.2rem)", letterSpacing: "-1px" }}>{STORE_NAME}</h1>
            <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: C.muted }}>{STORE_TAGLINE}</p>
          </Reveal>
        </div>
      </section>

      {categories.length > 1 && (
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex flex-wrap gap-8" style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="pb-3 text-sm font-medium transition-colors"
                  style={active ? { color: C.white, borderBottom: `2px solid ${C.brass}`, marginBottom: -1 } : { color: C.muted, borderBottom: "2px solid transparent", marginBottom: -1 }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((book) => <BookCard key={book.id} book={book} goToBook={goToBook} />)}
          </div>
          {visible.length === 0 && <p className="text-center py-16 text-sm" style={{ color: C.mutedFaint }}>No books in this category yet.</p>}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   BOOK DETAIL — each section takes the book's OWN accent color
   ============================================================ */
function Hero({ book }) {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: C.ink }}>
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-24 md:pt-14 md:pb-32 grid md:grid-cols-2 gap-14 items-center">
        <div>
          {book.category && <p className="text-xs font-semibold tracking-widest mb-6" style={{ color: book.accent }}>{book.category.toUpperCase()}</p>}
          <h1 className="font-black leading-[1.05] mb-6" style={{ color: C.white, fontSize: "clamp(2rem, 4.6vw, 3.1rem)", letterSpacing: "-1px" }}>{book.title}</h1>
          <p className="text-base md:text-lg mb-8 max-w-md leading-relaxed" style={{ color: C.muted }}>{book.subtitle}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <PurchaseButton product={book} label="Buy Now" />
            {book.content && <a href="#preview" className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-sm transition-colors" style={{ color: C.white, border: `1px solid ${C.borderSoft}` }} onClick={() => track("book_preview_open")}>Preview the Book</a>}
          </div>
          <div className="flex gap-6 text-xs tracking-wide" style={{ color: C.mutedFaint }}><span>{book.format.toUpperCase()}</span><span>&bull;</span><span>PRACTICAL GUIDE</span></div>
        </div>
        <div className="relative flex justify-center md:justify-end"><div style={{ animation: "float 6s ease-in-out infinite" }}><CoverMockup book={book} /></div></div>
      </div>
      <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
    </section>
  );
}

function ChapterGrid({ book }) {
  return (
    <section id="chapters" className="py-24" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>What&rsquo;s inside the book</h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {book.content.chapters.map((c) => (
            <div key={c.n} className="p-7 rounded-sm transition-transform duration-200 hover:-translate-y-1" style={{ border: `1px solid ${C.borderSoft}`, backgroundColor: C.ink }}>
              <p className="text-2xl font-black mb-4" style={{ color: book.accent }}>{c.n}</p>
              <h3 className="font-semibold mb-2 leading-snug" style={{ color: C.white }}>{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function LearningOutcomes({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>From idea to results</h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: C.borderSoft }}>
          {book.content.outcomes.map((o) => (
            <div key={o.title} className="p-7" style={{ backgroundColor: C.ink }}>
              <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: book.accent }}>{o.label}</p>
              <h3 className="font-semibold mb-2" style={{ color: C.white }}>{o.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function PracticalBuild({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-4 max-w-lg" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Don&rsquo;t just read about it. Build one.</h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {book.content.buildSteps.map((s) => (
            <div key={s.n} className="p-6">
              <p className="text-xs font-semibold mb-3" style={{ color: book.accent }}>STEP {s.n}</p>
              <h3 className="font-semibold mb-1" style={{ color: C.white }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ToolkitSection({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14 max-w-lg" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Understand the tools before you dive in</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {book.content.toolkit.map((t) => (
            <div key={t.title} className="p-8 rounded-sm" style={{ border: `1px solid ${C.borderSoft}` }}>
              <h3 className="font-semibold mb-4" style={{ color: book.accent }}>{t.title}</h3>
              <ul className="mb-4">{t.items.map((it) => <li key={it} className="text-sm py-1" style={{ color: C.white }}>{it}</li>)}</ul>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function BookPreview({ book }) {
  const pages = book.content.previewPages;
  const [idx, setIdx] = useState(0);
  const page = pages[idx];
  return (
    <section id="preview" className="py-24" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-4xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14 text-center" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Look inside</h2></Reveal>
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-sm p-8 min-h-[340px]" style={{ backgroundColor: C.white, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }} key={idx}>
            <p className="text-xs tracking-widest font-semibold mb-6" style={{ color: C.brassDeep }}>{page.label.toUpperCase()}</p>
            {page.kind === "toc" && <div className="flex flex-col gap-2">{book.content.chapters.map((c) => <p key={c.n} className="text-sm" style={{ color: C.ink2 }}>{c.n} &nbsp; {c.title}</p>)}</div>}
            {page.kind === "text" && <div><h4 className="font-bold mb-3" style={{ color: C.ink2 }}>{page.heading}</h4>{page.paragraphs.map((p, i) => <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: "#4A473F" }}>{p}</p>)}</div>}
            {page.kind === "list" && <div><h4 className="font-bold mb-3" style={{ color: C.ink2 }}>{page.heading}</h4><p className="text-sm leading-relaxed mb-3" style={{ color: "#4A473F" }}>{page.intro}</p><ol className="text-sm space-y-1 list-decimal list-inside" style={{ color: "#4A473F" }}>{page.items.map((it, i) => <li key={i}>{it}</li>)}</ol></div>}
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="text-sm disabled:opacity-30" style={{ color: C.white }}>&larr; Previous</button>
          <div className="flex gap-2">{pages.map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === idx ? book.accent : C.borderSoft }} />)}</div>
          <button onClick={() => setIdx((i) => Math.min(pages.length - 1, i + 1))} disabled={idx === pages.length - 1} className="text-sm disabled:opacity-30" style={{ color: C.white }}>Next &rarr;</button>
        </div>
        <div className="flex flex-col items-center mt-14 gap-5"><p className="text-sm" style={{ color: C.muted }}>Like the approach?</p><PurchaseButton product={book} label="Buy Now" event="book_preview_purchase_click" /></div>
      </div>
    </section>
  );
}
function RealWorldExample({ book }) {
  const ex = book.content.realWorldExample;
  return (
    <section className="py-24" style={{ backgroundColor: C.ink }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-3" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>See what changes</h2><p className="text-xs tracking-wide mb-14" style={{ color: C.mutedFaint }}>ONE EXAMPLE FEATURED IN THE BOOK</p></Reveal>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-sm" style={{ border: `1px solid ${C.borderSoft}` }}><p className="text-xs font-semibold tracking-widest mb-3" style={{ color: C.mutedFaint }}>{ex.before.label.toUpperCase()}</p><p className="text-4xl font-black mb-3" style={{ color: C.white }}>{ex.before.stat}</p><p className="text-sm leading-relaxed" style={{ color: C.muted }}>{ex.before.desc}</p></div>
          <div className="p-8 rounded-sm" style={{ border: `1px solid ${C.border}` }}><p className="text-xs font-semibold tracking-widest mb-3" style={{ color: book.accent }}>{ex.after.label.toUpperCase()}</p><p className="text-4xl font-black mb-3" style={{ color: C.white }}>{ex.after.stat}</p><p className="text-sm leading-relaxed" style={{ color: C.muted }}>{ex.after.desc}</p></div>
        </div>
        <p className="mt-10 text-sm leading-relaxed max-w-xl" style={{ color: C.muted }}>{ex.note}</p>
      </div>
    </section>
  );
}
function MistakesSection({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14 max-w-xl" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Easy to get wrong. Worth doing right.</h2></Reveal>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 max-w-3xl">
          {book.content.mistakes.map((m) => <div key={m} className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: book.accent }} /><p className="text-sm" style={{ color: C.white }}>{m}</p></div>)}
        </div>
      </div>
    </section>
  );
}
function ThirtyDayPlan({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Your first 30 days</h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {book.content.plan.map((p, i) => (
            <div key={p.week} className="pt-6" style={{ borderTop: `2px solid ${i === 0 ? book.accent : C.borderSoft}` }}>
              <p className="text-xs font-semibold tracking-widest mb-4" style={{ color: C.mutedFaint }}>{p.week.toUpperCase()}</p>
              <h3 className="font-semibold mb-2" style={{ color: C.white }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function AudienceSection({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Is this book for you?</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-10">
          <div><p className="text-xs font-semibold tracking-widest mb-6" style={{ color: book.accent }}>THIS BOOK IS FOR</p><ul className="flex flex-col gap-3">{book.content.audienceFor.map((a) => <li key={a} className="text-sm flex gap-3" style={{ color: C.white }}><span style={{ color: book.accent }}>+</span>{a}</li>)}</ul></div>
          <div><p className="text-xs font-semibold tracking-widest mb-6" style={{ color: C.mutedFaint }}>NOT DESIGNED AS</p><ul className="flex flex-col gap-3">{book.content.audienceNotFor.map((a) => <li key={a} className="text-sm flex gap-3" style={{ color: C.muted }}><span style={{ color: C.mutedFaint }}>&minus;</span>{a}</li>)}</ul></div>
        </div>
      </div>
    </section>
  );
}
function AuthorSection({ book }) {
  return (
    <section id="author" className="py-24" style={{ backgroundColor: C.ink }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal><p className="text-xs font-semibold tracking-widest mb-6" style={{ color: book.accent }}>ABOUT THE AUTHOR</p><h2 className="font-black mb-3" style={{ color: C.white, fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}>{book.author}</h2><p className="text-sm tracking-wide" style={{ color: C.muted }}>{book.authorPositioning}</p></Reveal>
      </div>
    </section>
  );
}
function PurchaseCard({ book }) {
  return (
    <section className="py-24" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-md mx-auto px-6">
        <Reveal>
          <div className="p-8 rounded-sm" style={{ border: `1px solid ${C.border}`, backgroundColor: C.ink }}>
            <div className="flex justify-center mb-8"><CoverMockup book={book} size={0.6} /></div>
            <dl className="flex flex-col gap-3 mb-8">
              {[["Title", book.title], ["Author", book.author], ["Format", book.format], ["Language", book.language], ["Pages", String(book.pages)], ["Price", `${formatPrice(book)} ${book.currency}`]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm"><dt style={{ color: C.mutedFaint }}>{k}</dt><dd className="text-right max-w-[60%]" style={{ color: C.white }}>{v}</dd></div>
              ))}
            </dl>
            <PurchaseButton product={book} label="Buy Now" className="w-full" event="purchase_card_click" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function FAQSection({ book }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="faq" className="py-24" style={{ backgroundColor: C.ink }}>
      <div className="max-w-2xl mx-auto px-6">
        <Reveal><h2 className="font-black mb-14" style={{ color: C.white, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", letterSpacing: "-0.5px" }}>Frequently asked questions</h2></Reveal>
        <div>
          {book.content.faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q} style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
                <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => { setOpenIdx(isOpen ? null : i); track("faq_open", { question: f.q }); }}>
                  <span className="text-sm font-medium pr-6" style={{ color: C.white }}>{f.q}</span>
                  <span className="text-lg flex-shrink-0" style={{ color: book.accent, transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s ease" }}>+</span>
                </button>
                <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}><p className="text-sm leading-relaxed pb-5 pr-10" style={{ color: C.muted }}>{f.a}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function FinalCTA({ book }) {
  return (
    <section className="py-28" style={{ backgroundColor: C.ink2 }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-black mb-6 leading-tight" style={{ color: C.white, fontSize: "clamp(1.9rem, 4vw, 2.8rem)", letterSpacing: "-1px" }}>Ready when you are.</h2>
          <p className="mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: C.muted }}>{book.description}</p>
          <div className="flex justify-center mb-10"><CoverMockup book={book} size={0.75} /></div>
          <PurchaseButton product={book} label="Buy Now" event="final_cta_click" />
        </Reveal>
      </div>
    </section>
  );
}
function SimpleBookDetail({ book }) {
  return (
    <div>
      <Hero book={book} />
      <section className="py-24" style={{ backgroundColor: C.ink2 }}>
        <div className="max-w-3xl mx-auto px-6 text-center"><Reveal><p className="text-base leading-relaxed mb-10" style={{ color: C.muted }}>{book.description}</p></Reveal></div>
      </section>
      <PurchaseCard book={book} />
      <AuthorSection book={book} />
    </div>
  );
}
function BookDetail({ book }) {
  useEffect(() => { document.title = `${book.title} | ${book.author}`; }, [book]);
  if (!book.content) return <SimpleBookDetail book={book} />;
  return (
    <div>
      <Hero book={book} /><ChapterGrid book={book} /><LearningOutcomes book={book} /><PracticalBuild book={book} /><ToolkitSection book={book} />
      <BookPreview book={book} /><RealWorldExample book={book} /><MistakesSection book={book} /><ThirtyDayPlan book={book} /><AudienceSection book={book} />
      <AuthorSection book={book} /><PurchaseCard book={book} /><FAQSection book={book} /><FinalCTA book={book} />
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ goToStore }) {
  return (
    <footer className="py-12" style={{ backgroundColor: C.ink, borderTop: `1px solid ${C.borderSoft}` }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5"><Logomark size={18} /><p className="text-sm font-semibold" style={{ color: C.white }}>{STORE_NAME}</p></div>
        <div className="flex flex-wrap justify-center gap-6">
          <button onClick={goToStore} className="text-xs" style={{ color: C.muted }}>All Books</button>
          <PolicyLink policyKey="contact">Contact</PolicyLink>
          <PolicyLink policyKey="privacy">Privacy Policy</PolicyLink>
          <PolicyLink policyKey="terms">Terms</PolicyLink>
          <PolicyLink policyKey="refund">Refund Policy</PolicyLink>
        </div>
        <p className="text-xs" style={{ color: C.mutedFaint }}>&copy; 2026 Aman Maurya. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ============================================================
   STICKY MOBILE BAR
   ============================================================ */
function StickyMobileBar({ book }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show || !book) return null;
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3" style={{ backgroundColor: "rgba(19,18,16,0.96)", backdropFilter: "blur(10px)", borderTop: `1px solid ${C.border}` }}>
      <p className="text-xs font-semibold truncate mr-3" style={{ color: C.white }}>{book.title}</p>
      <PurchaseButton product={book} label="Buy Now" className="text-sm px-5 py-2 flex-shrink-0" event="sticky_bar_click" />
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function BookStoreApp() {
  const { route, goToBook, goToStore } = useRoute();
  const activeBook = route.view === "detail" ? getBookById(route.id) : null;

  return (
    <CheckoutProvider>
      <PolicyProvider>
        <div style={{ backgroundColor: C.ink, fontFamily: FONT_SANS }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700;800;900&display=swap');
            html { scroll-behavior: smooth; }
            h1, h2 { font-family: ${FONT_SERIF}; }
            @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }
          `}</style>
          <Navbar context={route.view} goToStore={goToStore} />
          {route.view === "store" && <Storefront goToBook={goToBook} />}
          {route.view === "detail" && activeBook && <BookDetail book={activeBook} />}
          {route.view === "detail" && !activeBook && (
            <div className="py-32 text-center"><p style={{ color: C.muted }}>That book couldn&rsquo;t be found.</p><button onClick={goToStore} className="mt-6 text-sm underline" style={{ color: C.brass }}>Back to all books</button></div>
          )}
          <Footer goToStore={goToStore} />
          <StickyMobileBar book={activeBook} />
        </div>
      </PolicyProvider>
    </CheckoutProvider>
  );
}
