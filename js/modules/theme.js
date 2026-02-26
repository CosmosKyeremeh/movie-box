// Theme Module - Dark/Light theme switching
(function() {
    'use strict';

    const THEME_KEY = 'moviebox-theme';
    const THEMES = {
        DARK: 'dark',
        LIGHT: 'light'
    };

    const Theme = {
        current: THEMES.DARK, // Default theme

        // Initialize theme
        init() {
            // Load saved theme or default to dark
            const savedTheme = localStorage.getItem(THEME_KEY);
            this.current = savedTheme || THEMES.DARK;
            this.apply(this.current);
            console.log('[Theme] Theme initialized:', this.current);
        },

        // Apply theme
        apply(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.current = theme;
            localStorage.setItem(THEME_KEY, theme);
        },

        // Toggle theme
        toggle() {
            const newTheme = this.current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
            this.apply(newTheme);
            console.log('[Theme] Theme toggled to:', newTheme);
            return newTheme;
        },

        // Set specific theme
        setTheme(theme) {
            if (THEMES[theme.toUpperCase()]) {
                this.apply(theme);
            } else {
                console.error('[Theme] Invalid theme:', theme);
            }
        },

        // Get current theme
        getTheme() {
            return this.current;
        },

        // Check if dark mode
        isDark() {
            return this.current === THEMES.DARK;
        }
    };

    // Initialize theme on load
    Theme.init();

    // Make Theme globally available
    window.MovieBoxTheme = Theme;

    console.log('[Theme] Theme module loaded');
})();
