import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.env.DIST || process.argv[2] || "dist");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(body);
}

const server = createServer((req, res) => {
  if (req.url === "/healthz") {
    send(res, 200, "ok", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Method not allowed", { Allow: "GET, HEAD" });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    send(res, 400, "Bad request");
    return;
  }

  const relative = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "").replace(/^\/+/, "");
  let file = resolve(join(root, relative));
  if (file !== root && !file.startsWith(`${root}/`)) {
    send(res, 404, "Not found");
    return;
  }

  try {
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file) && !extname(file)) file = join(root, "index.html");
    if (!existsSync(file) || !statSync(file).isFile()) {
      send(res, 404, "Not found");
      return;
    }
    const stat = statSync(file);
    const type = mime[extname(file).toLowerCase()] || "application/octet-stream";
    const range = req.headers.range;
    if (range && /^bytes=\d*-\d*$/.test(range)) {
      const [startText, endText] = range.slice(6).split("-");
      const start = startText ? Number(startText) : 0;
      const end = endText ? Math.min(Number(endText), stat.size - 1) : stat.size - 1;
      if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= stat.size) {
        send(res, 416, "", { "Content-Range": `bytes */${stat.size}` });
        return;
      }
      res.writeHead(206, {
        "Content-Type": type,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": stat.size,
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(file).pipe(res);
  } catch (error) {
    console.error(`[server] ${error.message}`);
    send(res, 500, "Internal server error");
  }
});

server.listen(port, host, () => {
  console.log(`[server] serving ${root} at http://${host}:${port}`);
});

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000).unref();
  });
}
