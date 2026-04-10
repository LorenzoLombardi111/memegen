const CACHE_NAME = 'codebeautify-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/og-image.svg',
    '/favicon.svg',
    '/libs/beautify.min.js',
    '/libs/beautify-html.min.js',
    '/libs/beautify-css.min.js',
    '/libs/sql-formatter.min.js',
    '/pages/vs-prettier.html',
    '/pages/vs-beautifier-io.html',
    '/pages/javascript-beautifier.html',
    '/pages/html-formatter.html',
    '/pages/json-formatter-beautifier.html'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
