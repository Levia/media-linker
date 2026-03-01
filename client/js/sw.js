// ============================================
// PWA Functionality
// ============================================

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/js/sw.js')
          .then((registration) => {
              console.log('ServiceWorker registered:', registration.scope);
          })
          .catch((error) => {
              console.log('ServiceWorker registration failed:', error);
          });
  });
}
