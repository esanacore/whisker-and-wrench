// Tiny static server for dist/, used by the browser tests (tests/browser/).
// Serves /some/dir/ as /some/dir/index.html and unknown paths as 404.html,
// the same way Cloudflare Pages does. Local testing only; not deployed.
//
// Usage: node scripts/serve-dist.mjs [port]   (default 4173)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../dist", import.meta.url)));
const port = Number(process.argv[2] || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

// Map a URL path to a file inside dist/, or null if it isn't there.
async function findFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  let file = join(root, clean);
  // Never serve anything outside dist/.
  if (!file.startsWith(root)) return null;
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const path = new URL(req.url, "http://localhost").pathname;
  const file = await findFile(path);
  const status = file ? 200 : 404;
  const body = await readFile(file || join(root, "404.html"));
  res.writeHead(status, { "Content-Type": types[extname(file || ".html")] || "application/octet-stream" });
  res.end(body);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving dist/ at http://127.0.0.1:${port}/`);
});
