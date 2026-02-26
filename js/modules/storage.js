// Storage Module - IndexedDB for offline storage
(function() {
    'use strict';

    const DB_NAME = 'MovieBoxDB';
    const DB_VERSION = 1;
    const STORES = {
        movies: 'movies',
        myList: 'myList',
        watchHistory: 'watchHistory',
        preferences: 'preferences'
    };

    let db = null;

    // Initialize IndexedDB
    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('[Storage] Database failed to open');
                reject(request.error);
            };

            request.onsuccess = () => {
                db = request.result;
                console.log('[Storage] IndexedDB initialized successfully');
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                db = event.target.result;
                console.log('[Storage] Upgrading database...');

                // Create object stores
                if (!db.objectStoreNames.contains(STORES.movies)) {
                    db.createObjectStore(STORES.movies, { keyPath: 'id' });
                }

                if (!db.objectStoreNames.contains(STORES.myList)) {
                    const myListStore = db.createObjectStore(STORES.myList, { keyPath: 'id' });
                    myListStore.createIndex('addedDate', 'addedDate', { unique: false });
                }

                if (!db.objectStoreNames.contains(STORES.watchHistory)) {
                    const historyStore = db.createObjectStore(STORES.watchHistory, { keyPath: 'id' });
                    historyStore.createIndex('watchedDate', 'watchedDate', { unique: false });
                }

                if (!db.objectStoreNames.contains(STORES.preferences)) {
                    db.createObjectStore(STORES.preferences, { keyPath: 'key' });
                }
            };
        });
    }

    // Storage operations
    const Storage = {
        // Initialize
        async init() {
            await initDB();
        },

        // Add to My List
        async addToMyList(movie) {
            if (!db) await initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORES.myList], 'readwrite');
                const store = transaction.objectStore(STORES.myList);
                
                const movieData = {
                    ...movie,
                    addedDate: new Date().toISOString()
                };

                const request = store.add(movieData);

                request.onsuccess = () => {
                    console.log('[Storage] Added to My List:', movie.title);
                    resolve(movieData);
                };

                request.onerror = () => {
                    console.error('[Storage] Failed to add to My List');
                    reject(request.error);
                };
            });
        },

        // Remove from My List
        async removeFromMyList(movieId) {
            if (!db) await initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORES.myList], 'readwrite');
                const store = transaction.objectStore(STORES.myList);
                const request = store.delete(movieId);

                request.onsuccess = () => {
                    console.log('[Storage] Removed from My List:', movieId);
                    resolve();
                };

                request.onerror = () => reject(request.error);
            });
        },

        // Get My List
        async getMyList() {
            if (!db) await initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORES.myList], 'readonly');
                const store = transaction.objectStore(STORES.myList);
                const request = store.getAll();

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => reject(request.error);
            });
        },

        // Check if in My List
        async isInMyList(movieId) {
            if (!db) await initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORES.myList], 'readonly');
                const store = transaction.objectStore(STORES.myList);
                const request = store.get(movieId);

                request.onsuccess = () => {
                    resolve(request.result !== undefined);
                };

                request.onerror = () => reject(request.error);
            });
        },

        // Save preference
        async savePreference(key, value) {
            if (!db) await initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORES.preferences], 'readwrite');
                const store = transaction.objectStore(STORES.preferences);
                const request = store.put({ key, value });

                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        },

        // Get preference
        async getPreference(key, defaultValue = null) {
            if (!db) await initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORES.preferences], 'readonly');
                const store = transaction.objectStore(STORES.preferences);
                const request = store.get(key);

                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result ? result.value : defaultValue);
                };

                request.onerror = () => reject(request.error);
            });
        }
    };

    // Make Storage globally available
    window.MovieBoxStorage = Storage;

    // Auto-initialize
    Storage.init().catch(err => {
        console.error('[Storage] Initialization failed:', err);
    });

    console.log('[Storage] Storage module loaded');
})();
