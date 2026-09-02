import { cp, mkdir } from "node:fs/promises";

await cp("site", "dist", { recursive: true });
await mkdir("dist/assets", { recursive: true });
await cp("public/assets", "dist/assets", { recursive: true });

console.log("Combined the Middie marketing site and React demo in dist/.");
