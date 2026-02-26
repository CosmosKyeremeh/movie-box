// Modal Component
(function() {
    'use strict';

    const Modal = {
        // Create modal HTML
        create(content, title = '') {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        ${title ? `<h2>${title}</h2>` : ''}
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            `;

            // Add event listeners
            modal.querySelector('.modal-close').addEventListener('click', () => this.close(modal));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.close(modal);
            });

            return modal;
        },

        // Show modal
        show(content, title = '') {
            const modal = this.create(content, title);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Fade in
            setTimeout(() => modal.classList.add('active'), 10);
            
            return modal;
        },

        // Close modal
        close(modal) {
            if (!modal) {
                modal = document.querySelector('.modal-overlay');
            }
            
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        },

        // Show movie details modal
        async showMovieDetails(movieId) {
            console.log('[Modal] Showing movie details for:', movieId);
            
            const loadingContent = '<div class="loading">Loading movie details...</div>';
            const modal = this.show(loadingContent, 'Movie Details');

            try {
                // Fetch movie details if API is available
                if (window.MovieBoxAPI) {
                    const movie = await window.MovieBoxAPI.getMovieDetails(movieId);
                    const content = this.createMovieDetailsContent(movie);
                    modal.querySelector('.modal-body').innerHTML = content;
                } else {
                    modal.querySelector('.modal-body').innerHTML = 
                        '<p>Movie details API not available.</p>';
                }
            } catch (error) {
                console.error('[Modal] Failed to load movie details:', error);
                modal.querySelector('.modal-body').innerHTML = 
                    '<p>Failed to load movie details. Please try again.</p>';
            }
        },

        // Create movie details content
        createMovieDetailsContent(movie) {
            const poster = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450/333333/FFFFFF?text=No+Image';

            return `
                <div class="movie-details">
                    <div class="movie-details-poster">
                        <img src="${poster}" alt="${movie.title}">
                    </div>
                    <div class="movie-details-info">
                        <h3>${movie.title}</h3>
                        <p class="movie-meta">
                            <span>${movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                            <span>★ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                            ${movie.runtime ? `<span>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m</span>` : ''}
                        </p>
                        <p class="movie-overview">${movie.overview || 'No description available.'}</p>
                        ${movie.genres ? `
                            <div class="movie-genres">
                                ${movie.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('')}
                            </div>
                        ` : ''}
                        <div class="movie-actions">
                            <button class="btn-primary">▶ Watch Now</button>
                            <button class="btn-secondary" onclick="window.MovieCard?.handleAddToList(${movie.id})">+ Add to List</button>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    // Make Modal globally available
    window.MovieBoxModal = Modal;

    // Add modal styles if not present
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .modal-overlay.active {
                opacity: 1;
            }

            .modal-container {
                background: #1a1f2e;
                border-radius: 8px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            }

            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #2a2f3e;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-close {
                background: none;
                border: none;
                color: #fff;
                font-size: 30px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                line-height: 1;
            }

            .modal-body {
                padding: 20px;
            }

            .movie-details {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 30px;
            }

            .movie-details-poster img {
                width: 100%;
                border-radius: 8px;
            }

            .movie-actions {
                margin-top: 20px;
                display: flex;
                gap: 10px;
            }

            .genre-tag {
                display: inline-block;
                background: #2a2f3e;
                padding: 5px 10px;
                border-radius: 4px;
                margin-right: 5px;
                margin-top: 5px;
                font-size: 14px;
            }

            @media (max-width: 768px) {
                .movie-details {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('[Modal] Component loaded');
})();
