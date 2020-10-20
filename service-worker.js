const CACHE_NAME = 'YoBskt';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/nav.html',
    '/index.html',
    '/pages/home.html',
    '/pages/players.html',
    '/pages/about.html',
    '/pages/contact.html',
    '/css/materialize.min.css',
    '/css/style.css',
    '/js/materialize.min.js',
    '/js/script.js',
    '/asset/1.jpg',
    '/asset/2.jpg',
    '/asset/3.jpg',
    '/asset/4.jpg',
    '/asset/5.jpg',
    '/asset/6.jpg',
    '/asset/7.jpg',
    '/asset/8.jpg',
    '/asset/9.jpg',
    '/asset/bg1.jpg',
    '/asset/curry.png',
    '/asset/profil.jpg',
    '/icon.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    );
});