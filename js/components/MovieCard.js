// Movie Card Component
(function() {
    'use strict';

    const MovieCard = {
        // Create movie card HTML
        create(movie) {
            const poster = movie.poster || movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster}`
                : 'https://via.placeholder.com/300x450/333333/FFFFFF?text=No+Image';

            const title = movie.title || movie.name || 'Unknown Title';
            const year = movie.year || (movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A');
            const rating = movie.rating || movie.vote_average || 0;
            const overview = movie.overview || 'No description available.';

            return `
                <div class="movie-card" data-id="${movie.id}">
                    <img 
                        src="${poster}" 
                        alt="${title}" 
                        class="movie-poster" 
                        onerror="this.src='https://via.placeholder.com/300x450/333333/FFFFFF?text=Image+Not+Found'"
                        loading="lazy"
                    >
                    <div class="movie-info">
                        <h3 class="movie-title">${title}</h3>
                        <div class="movie-meta">
                            <span class="movie-year">${year}</span>
                            <span class="movie-rating">★ ${Number(rating).toFixed(1)}</span>
                        </div>
                        <p class="movie-overview">${overview}</p>
                    </div>
                    <div class="movie-overlay">
                        <button class="btn-play" data-id="${movie.id}">▶ Play</button>
                        <button class="btn-add-list" data-id="${movie.id}">+ My List</button>
                    </div>
                </div>
            `;
        },

        // Render multiple movie cards
        renderGrid(movies, container) {
            if (!container) return;
            
            if (!movies || movies.length === 0) {
                container.innerHTML = '<p class="no-results">No movies found</p>';
                return;
            }

            const html = movies.map(movie => this.create(movie)).join('');
            container.innerHTML = html;

            // Add event listeners
            this.addEventListeners(container);
        },

        // Add event listeners to movie cards
        addEventListeners(container) {
            // Play button
            container.querySelectorAll('.btn-play').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const movieId = btn.dataset.id;
                    this.handlePlay(movieId);
                });
            });

            // Add to list button
            container.querySelectorAll('.btn-add-list').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const movieId = btn.dataset.id;
                    await this.handleAddToList(movieId);
                });
            });

            // Card click
            container.querySelectorAll('.movie-card').forEach(card => {
                card.addEventListener('click', () => {
                    const movieId = card.dataset.id;
                    this.handleCardClick(movieId);
                });
            });
        },

        // Handle play button click
        handlePlay(movieId) {
            console.log('[MovieCard] Play movie:', movieId);
            // Implement play functionality or show modal
            if (window.MovieBoxModal) {
                window.MovieBoxModal.showMovieDetails(movieId);
            }
        },

        // Handle add to list
        async handleAddToList(movieId) {
            console.log('[MovieCard] Add to list:', movieId);
            
            if (window.MovieBoxStorage) {
                try {
                    const movie = this.getMovieById(movieId);
                    await window.MovieBoxStorage.addToMyList(movie);
                    
                    if (window.MovieBoxUtils) {
                        window.MovieBoxUtils.showToast('Added to My List', 'success');
                    }
                } catch (error) {
                    console.error('[MovieCard] Failed to add to list:', error);
                    if (window.MovieBoxUtils) {
                        window.MovieBoxUtils.showToast('Failed to add to list', 'error');
                    }
                }
            }
        },

        // Handle card click
        handleCardClick(movieId) {
            console.log('[MovieCard] Card clicked:', movieId);
            // Can be used to show details modal
        },

        // Get movie by ID (helper)
        getMovieById(movieId) {
            // This would need to fetch from your movie data source
            // For now, return a placeholder
            return { id: movieId, title: 'Movie ' + movieId };
        }
    };

    // Make MovieCard globally available
    window.MovieCard = MovieCard;

    console.log('[MovieCard] Component loaded');
})();