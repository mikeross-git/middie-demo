import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://middie.app";
const routes = ["", "terms", "privacy", "analyzer", "blog"];
const output = "site";

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, "site-assets"), { recursive: true });

const pages = new Map();
const assetUrls = new Set();
const assetPattern = /https:\/\/(?:framerusercontent\.com\/(?:images|assets)\/|fonts\.gstatic\.com\/)[^\s"'()<>\\]+/g;

for (const route of routes) {
  const url = `${origin}/${route}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to download ${url}: ${response.status}`);
  const html = await response.text();
  pages.set(route, html);
  for (const match of html.matchAll(assetPattern)) {
    assetUrls.add(match[0].replaceAll("&amp;", "&"));
  }
}

const localForUrl = new Map();
for (const assetUrl of assetUrls) {
  const parsed = new URL(assetUrl);
  const ext = path.extname(parsed.pathname) || ".bin";
  const hash = createHash("sha256").update(assetUrl).digest("hex").slice(0, 20);
  const filename = `${hash}${ext}`;
  const response = await fetch(assetUrl);
  if (!response.ok) throw new Error(`Unable to download ${assetUrl}: ${response.status}`);
  await writeFile(path.join(output, "site-assets", filename), Buffer.from(await response.arrayBuffer()));
  localForUrl.set(assetUrl, `/site-assets/${filename}`);
}

for (const [route, source] of pages) {
  let html = source;
  for (const [assetUrl, localUrl] of localForUrl) {
    html = html.replaceAll(assetUrl, localUrl).replaceAll(assetUrl.replaceAll("&", "&amp;"), localUrl);
  }
  const directory = route ? path.join(output, route) : output;
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

for (const filename of ["robots.txt", "sitemap.xml"]) {
  const response = await fetch(`${origin}/${filename}`);
  if (!response.ok) throw new Error(`Unable to download ${filename}: ${response.status}`);
  await writeFile(path.join(output, filename), await response.text());
}

console.log(`Archived ${pages.size} Framer pages and ${assetUrls.size} visual assets.`);
