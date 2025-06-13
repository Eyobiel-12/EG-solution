// This is the service worker for the EG Web Solutions PWA

const CACHE_NAME = "eg-web-solutions-v1"

// Assets to cache on install
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-icon.png",
]

// Install event - precache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        return self.clients.claim()
      }),
  )
})

// Fetch event - network-first strategy with fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response to store in cache
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // If not in cache, return the offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/")
          }

          // Otherwise return a 404
          return new Response("Not found", {
            status: 404,
            statusText: "Not found",
          })
        })
      }),
  )
})

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "contact-form-sync") {
    event.waitUntil(syncContactForm())
  }
})

// Push notification handler
self.addEventListener("push", (event) => {
  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})

// Helper function for background sync
async function syncContactForm() {
  try {
    const contactFormData = await getStoredContactFormData()

    if (!contactFormData.length) return

    for (const formData of contactFormData) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await removeStoredContactFormData(formData.id)
        }
      } catch (error) {
        console.error("Failed to sync contact form:", error)
      }
    }
  } catch (error) {
    console.error("Error in syncContactForm:", error)
  }
}

// IndexedDB helpers for offline storage
async function getStoredContactFormData() {
  // Implementation would use IndexedDB to retrieve stored form data
  return []
}

async function removeStoredContactFormData(id) {
  // Implementation would use IndexedDB to remove successfully synced form data
}
