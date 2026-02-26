// Utils Module - Helper functions
(function() {
    'use strict';

    const Utils = {
        // Debounce function for search
        debounce(func, wait = 300) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Format date
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        },

        // Format runtime
        formatRuntime(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
        },

        // Truncate text
        truncate(text, maxLength = 150) {
            if (text.length <= maxLength) return text;
            return text.substr(0, maxLength) + '...';
        },

        // Generate random number
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Shuffle array
        shuffle(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        },

        // Check if element is in viewport
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Smooth scroll to element
        scrollTo(element, offset = 0) {
            if (!element) return;
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        },

        // Local storage helpers
        storage: {
            set(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (error) {
                    console.error('[Utils] Storage set failed:', error);
                    return false;
                }
            },

            get(key, defaultValue = null) {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch (error) {
                    console.error('[Utils] Storage get failed:', error);
                    return defaultValue;
                }
            },

            remove(key) {
                try {
                    localStorage.removeItem(key);
                    return true;
                } catch (error) {
                    console.error('[Utils] Storage remove failed:', error);
                    return false;
                }
            },

            clear() {
                try {
                    localStorage.clear();
                    return true;
                } catch (error) {
                    console.error('[Utils] Storage clear failed:', error);
                    return false;
                }
            }
        },

        // Cookie helpers
        cookie: {
            set(name, value, days = 30) {
                const expires = new Date(Date.now() + days * 864e5).toUTCString();
                document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
            },

            get(name) {
                return document.cookie.split('; ').reduce((r, v) => {
                    const parts = v.split('=');
                    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
                }, '');
            },

            remove(name) {
                this.set(name, '', -1);
            }
        },

        // Show toast notification
        showToast(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
                color: white;
                border-radius: 5px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        // Error handler
        handleError(error, message = 'An error occurred') {
            console.error('[Utils]', message, error);
            this.showToast(message, 'error');
        }
    };

    // Make Utils globally available
    window.MovieBoxUtils = Utils;

    console.log('[Utils] Utils module loaded');
})();
