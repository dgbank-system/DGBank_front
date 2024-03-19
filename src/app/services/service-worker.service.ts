import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor() { }
  static readonly CACHE_NAME = 'my_cache';
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    
  }

  cacheFirstStrategy(request: Request): Promise<Response> {
    return caches.open(ServiceWorkerService.CACHE_NAME)
      .then((cache) => {
        return cache.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse; // Serve from cache if available
            } else {
              return fetch(request)
                .then((networkResponse) => {
                  // Cache the network response for future use
                  cache.put(request, networkResponse.clone());
                  return networkResponse;
                });
            }
          });
      });
  }
  
}
