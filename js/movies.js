// Movies Page - TMDB API Integration
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Movies page loaded');
    
    // Get movie containers
    const featuredContainer = document.getElementById('movies-container');
    const newReleasesContainer = document.getElementById('new-releases');
    
    // Show loading state
    if (featuredContainer) {
        featuredContainer.innerHTML = '<p style="color: #fff; text-align: center; padding: 40px;">Loading movies...</p>';
    }
    if (newReleasesContainer) {
        newReleasesContainer.innerHTML = '<p style="color: #fff; text-align: center; padding: 40px;">Loading new releases...</p>';
    }

    try {
        // Fetch movies from TMDB API
        if (window.MovieBoxAPI) {
            // Get popular movies for featured section
            const popularData = await window.MovieBoxAPI.getPopularMovies(1);
            const popularMovies = popularData.results || [];
            
            // Get now playing movies for new releases
            const nowPlayingData = await window.MovieBoxAPI.getNowPlayingMovies(1);
            const newReleases = nowPlayingData.results || [];
            
            // Render movies
            if (featuredContainer && window.MovieCard) {
                window.MovieCard.renderGrid(popularMovies.slice(0, 12), featuredContainer);
            }
            
            if (newReleasesContainer && window.MovieCard) {
                window.MovieCard.renderGrid(newReleases.slice(0, 12), newReleasesContainer);
            }
            
            console.log('Movies loaded successfully!');
        } else {
            console.error('MovieBoxAPI not available');
            showError('API not loaded. Please refresh the page.');
        }
    } catch (error) {
        console.error('Failed to load movies:', error);
        showError('Failed to load movies. Please check your API key.');
    }
    
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', async function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const genre = this.textContent.trim();
            
            if (genre === 'All') {
                // Reload all movies
                location.reload();
            } else {
                // Filter by genre (simplified - you can improve this)
                await filterByGenre(genre);
            }
        });
    });
});

// Filter movies by genre
async function filterByGenre(genreName) {
    const featuredContainer = document.getElementById('movies-container');
    if (!featuredContainer) return;
    
    featuredContainer.innerHTML = '<p style="color: #fff; text-align: center; padding: 40px;">Loading ' + genreName + ' movies...</p>';
    
    try {
        // Get genre ID mapping
        const genreMap = {
            'Action': 28,
            'Comedy': 35,
            'Drama': 18,
            'Horror': 27,
            'Sci-Fi': 878,
            'Romance': 10749
        };
        
        const genreId = genreMap[genreName];
        
        if (genreId && window.MovieBoxAPI) {
            const data = await window.MovieBoxAPI.getMoviesByGenre(genreId, 1);
            const movies = data.results || [];
            
            if (window.MovieCard) {
                window.MovieCard.renderGrid(movies.slice(0, 12), featuredContainer);
            }
        }
    } catch (error) {
        console.error('Failed to filter movies:', error);
        showError('Failed to load ' + genreName + ' movies');
    }
}

// Show error message
function showError(message) {
    const container = document.getElementById('movies-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #a0a0a0;">
                <h3 style="color: #fff; margin-bottom: 15px;">⚠️ ${message}</h3>
                <button onclick="location.reload()" class="cta-button">Retry</button>
            </div>
        `;
    }
}