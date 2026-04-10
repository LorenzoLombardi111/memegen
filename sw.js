const CACHE_NAME = 'memegen-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/og-image.svg',
    '/favicon.svg',
    '/pages/vs-imgflip.html',
    '/pages/vs-kapwing.html',
    '/pages/meme-maker.html',
    '/pages/custom-meme.html',
    '/pages/meme-templates.html'
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
