// PWA Module - Service Worker Registration and Installation
(function() {
    'use strict';

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            registerServiceWorker();
        });
    }

    // Register service worker
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });

            console.log('[PWA] Service Worker registered successfully:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('[PWA] New service worker found, installing...');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('[PWA] New content is available; please refresh.');
                        showUpdateNotification();
                    }
                });
            });

        } catch (error) {
            console.error('[PWA] Service Worker registration failed:', error);
        }
    }

    // Show update notification
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <p>New version available!</p>
            <button onclick="window.location.reload()">Update</button>
        `;
        document.body.appendChild(notification);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }

    // Handle install prompt
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('[PWA] Install prompt fired');
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });

    // Show install button
    function showInstallButton() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', installApp);
        }
    }

    // Install app
    async function installApp() {
        if (!deferredPrompt) {
            console.log('[PWA] No install prompt available');
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('[PWA] User response:', outcome);

        deferredPrompt = null;
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }

    // Log installation
    window.addEventListener('appinstalled', () => {
        console.log('[PWA] App installed successfully');
        deferredPrompt = null;
    });

    console.log('[PWA] PWA module loaded');
})();
