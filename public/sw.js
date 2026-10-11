// Service worker: makes the portfolio work offline and open instantly on
// repeat visits. __BUILD_ID__ is stamped by scripts/postbuild.mjs, so each
// deploy gets a fresh cache and old ones are cleaned up.

const VERSION = "__BUILD_ID__";
const CACHE = `ep-${VERSION}`;
// Hugging Face static Spaces only serve the explicit index.html form of a page.
const INDEX = self.location.hostname.endsWith(".hf.space") ? "index.html" : "";
const HOME = `/${INDEX}`;
const SHELL = ["/", "/projects/", "/about/", "/shipped/", "/photos/"]
  .map((p) => p + INDEX)
  .concat(["/manifest.webmanifest", "/icon.svg"]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // One page failing to cache must not stop the worker from installing.
      .then((cache) => Promise.allSettled(SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("ep-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const putInCache = (request, response) => {
  if (response.ok && response.type === "basic") {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Hashed build assets never change: cache first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => putInCache(request, res))));
    return;
  }

  // Pages: network first so content is fresh, cache when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => putInCache(request, res))
        .catch(() => caches.match(request).then((hit) => hit || caches.match(HOME))),
    );
    return;
  }

  // Everything else (RSC payloads, icons, fonts): stale-while-revalidate.
  event.respondWith(
    caches.match(request, { ignoreSearch: url.pathname.endsWith(".txt") }).then((hit) => {
      const network = fetch(request)
        .then((res) => putInCache(request, res))
        .catch(() => hit);
      return hit || network;
    }),
  );
});
