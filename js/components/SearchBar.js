// SearchBar Component
(function() {
    'use strict';

    const SearchBar = {
        // Initialize search functionality
        init(inputSelector = '.search-bar input', buttonSelector = '.search-bar button') {
            const searchInput = document.querySelector(inputSelector);
            const searchButton = document.querySelector(buttonSelector);

            if (!searchInput || !searchButton) {
                console.warn('[SearchBar] Search elements not found');
                return;
            }

            // Add event listeners
            searchButton.addEventListener('click', () => this.handleSearch(searchInput));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(searchInput);
                }
            });

            // Add debounced live search (optional)
            if (window.MovieBoxUtils && window.MovieBoxUtils.debounce) {
                const debouncedSearch = window.MovieBoxUtils.debounce((input) => {
                    if (input.value.length > 2) {
                        this.handleSearch(input, true);
                    }
                }, 500);

                searchInput.addEventListener('input', () => debouncedSearch(searchInput));
            }

            console.log('[SearchBar] Initialized');
        },

        // Handle search
        async handleSearch(input, isLiveSearch = false) {
            const query = input.value.trim();

            if (!query) {
                console.log('[SearchBar] Empty search query');
                return;
            }

            console.log('[SearchBar] Searching for:', query);

            try {
                // Show loading
                this.showLoading();

                // Perform search
                let results;
                if (window.MovieBoxAPI) {
                    // Use API if available
                    const data = await window.MovieBoxAPI.searchMovies(query);
                    results = data.results || [];
                } else {
                    // Fallback to local search
                    results = this.searchLocal(query);
                }

                // Display results
                this.displayResults(results, query);

            } catch (error) {
                console.error('[SearchBar] Search failed:', error);
                if (window.MovieBoxUtils) {
                    window.MovieBoxUtils.showToast('Search failed. Please try again.', 'error');
                }
            } finally {
                this.hideLoading();
            }
        },

        // Search local data
        searchLocal(query) {
            // Search in global movies array if available
            if (window.movies && Array.isArray(window.movies)) {
                const lowerQuery = query.toLowerCase();
                return window.movies.filter(movie => 
                    movie.title.toLowerCase().includes(lowerQuery) ||
                    (movie.overview && movie.overview.toLowerCase().includes(lowerQuery))
                );
            }
            return [];
        },

        // Display search results
        displayResults(results, query) {
            // Update section title
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.textContent = `Search Results for "${query}"`;
            }

            // Clear other sections
            const sections = ['trending-movies', 'popular-movies', 'top-rated-movies'];
            sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) section.innerHTML = '';
            });

            // Display results in first section
            const resultsContainer = document.getElementById('trending-movies');
            if (resultsContainer) {
                if (results.length === 0) {
                    resultsContainer.innerHTML = `
                        <div class="no-results">
                            <p>No movies found for "${query}"</p>
                            <button onclick="location.reload()" class="btn-secondary">
                                Clear Search
                            </button>
                        </div>
                    `;
                } else {
                    if (window.MovieCard) {
                        window.MovieCard.renderGrid(results, resultsContainer);
                    } else {
                        // Fallback rendering
                        resultsContainer.innerHTML = results.map(movie => `
                            <div class="movie-card">
                                <h3>${movie.title || movie.name}</h3>
                                <p>${movie.overview}</p>
                            </div>
                        `).join('');
                    }
                }
            }
        },

        // Show loading state
        showLoading() {
            const searchButton = document.querySelector('.search-bar button');
            if (searchButton) {
                searchButton.disabled = true;
                searchButton.textContent = '⏳';
            }
        },

        // Hide loading state
        hideLoading() {
            const searchButton = document.querySelector('.search-bar button');
            if (searchButton) {
                searchButton.disabled = false;
                searchButton.textContent = '🔍';
            }
        },

        // Clear search
        clear() {
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Reload page or reset to initial state
            if (typeof loadInitialContent === 'function') {
                loadInitialContent();
            }
        }
    };

    // Make SearchBar globally available
    window.SearchBar = SearchBar;

    // Auto-initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SearchBar.init());
    } else {
        SearchBar.init();
    }

    console.log('[SearchBar] Component loaded');
})();