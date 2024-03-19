if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse; // Serve the cached response
          }
          return fetch(event.request) // Fetch from the network
            .then((networkResponse) => {
              return caches.open('your-cache-name')
                .then((cache) => {
                  cache.put(event.request, networkResponse.clone()); // Cache the network response
                  return networkResponse;
                });
            })
            .catch((error) => {
              // If the network request fails, you can provide a fallback or custom offline page
            });
        })
    );
  });
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request) // Fetch from the network
        .then((networkResponse) => {
          caches.open('your-cache-name')
            .then((cache) => {
              cache.put(event.request, networkResponse.clone()); // Cache the network response
            });
          return networkResponse;
        })
        .catch((error) => {
          return caches.match(event.request) // Serve from the cache if the network request fails
            .catch((cacheError) => {
              // If the resource is not in the cache, you can provide a fallback or custom offline page
            });
        })
    );
  });
  