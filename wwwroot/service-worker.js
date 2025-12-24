self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("liya-timer-v1").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/css/styles.css",
                "/js/timer.js",
                "/images/sun.svg",
                "/images/sunset.svg",
                "/images/moon.svg"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
