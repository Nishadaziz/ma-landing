// Post-build step: writes a static HTML file per route in ROUTES below, cloned
// from the built dist/index.html but with route-specific <title>/meta/OG/Twitter
// tags baked in. Crawlers that don't execute JS (WhatsApp, Facebook, etc.) hit
// these static files directly; Vercel serves them ahead of the SPA catch-all
// rewrite in vercel.json because a matching file exists on disk. Once the app's
// JS loads, react-router takes over the same as any other route.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const siteUrl = "https://www.duomatebd.com";

const ROUTES = [
  {
    path: "/practice/duolingo",
    title: "Get 16% OFF on Duolingo English Test Registration | Duomate",
    description: "Claim your exclusive DET discount code through WhatsApp.",
    image: `${siteUrl}/og-duolingo-discount.png`,
  },
];

// Matches a tag whose attributes may be spread across multiple lines, e.g.
// both `<meta name="description" content="..." />` and
// `<meta\n  name="description"\n  content="..."\n/>`.
function metaTagPattern({ tag, attr, attrValue, valueAttr }) {
  return new RegExp(
    `<${tag}\\s+${attr}="${attrValue}"\\s+${valueAttr}=".*?"\\s*/?>`,
    "s"
  );
}

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`OG template tag not found in dist/index.html: ${label}`);
  }
  return html.replace(pattern, replacement);
}

function buildRouteHtml(baseHtml, route) {
  const url = `${siteUrl}${route.path}`;
  let html = baseHtml;

  html = replaceTag(
    html,
    /<title>.*?<\/title>/s,
    `<title>${route.title}</title>`,
    "<title>"
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "name", attrValue: "description", valueAttr: "content" }),
    `<meta name="description" content="${route.description}" />`,
    'meta name="description"'
  );

  html = replaceTag(
    html,
    /<link rel="canonical" href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${url}" />`,
    'link rel="canonical"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "property", attrValue: "og:url", valueAttr: "content" }),
    `<meta property="og:url" content="${url}" />`,
    'meta property="og:url"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "property", attrValue: "og:title", valueAttr: "content" }),
    `<meta property="og:title" content="${route.title}" />`,
    'meta property="og:title"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "property", attrValue: "og:description", valueAttr: "content" }),
    `<meta property="og:description" content="${route.description}" />`,
    'meta property="og:description"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "property", attrValue: "og:image", valueAttr: "content" }),
    `<meta property="og:image" content="${route.image}" />`,
    'meta property="og:image"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "name", attrValue: "twitter:title", valueAttr: "content" }),
    `<meta name="twitter:title" content="${route.title}" />`,
    'meta name="twitter:title"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "name", attrValue: "twitter:description", valueAttr: "content" }),
    `<meta name="twitter:description" content="${route.description}" />`,
    'meta name="twitter:description"'
  );

  html = replaceTag(
    html,
    metaTagPattern({ tag: "meta", attr: "name", attrValue: "twitter:image", valueAttr: "content" }),
    `<meta name="twitter:image" content="${route.image}" />`,
    'meta name="twitter:image"'
  );

  return html;
}

const baseHtml = readFileSync(join(distDir, "index.html"), "utf8");

for (const route of ROUTES) {
  const html = buildRouteHtml(baseHtml, route);
  const outDir = join(distDir, ...route.path.split("/").filter(Boolean));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  console.log(`[og] wrote dist${route.path}/index.html`);
}
