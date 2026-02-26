// TV Shows Page - TMDB API Integration
document.addEventListener('DOMContentLoaded', async function() {
    console.log('TV Shows page loaded');
    
    // Get containers
    const popularContainer = document.getElementById('popular-series');
    const airingContainer = document.getElementById('airing-now');
    const topRatedContainer = document.getElementById('top-rated-shows');
    
    // Show loading
    showLoading([popularContainer, airingContainer, topRatedContainer]);

    try {
        if (window.MovieBoxAPI) {
            // Fetch TV shows
            const popularData = await window.MovieBoxAPI.getPopularTVShows(1);
            const popularShows = popularData.results || [];
            
            const trendingData = await window.MovieBoxAPI.getTrendingTVShows('week');
            const trendingShows = trendingData.results || [];
            
            const topRatedData = await window.MovieBoxAPI.getTopRatedTVShows(1);
            const topRatedShows = topRatedData.results || [];
            
            // Render TV shows
            if (popularContainer && window.MovieCard) {
                window.MovieCard.renderGrid(popularShows.slice(0, 8), popularContainer);
            }
            
            if (airingContainer && window.MovieCard) {
                window.MovieCard.renderGrid(trendingShows.slice(0, 8), airingContainer);
            }
            
            if (topRatedContainer && window.MovieCard) {
                window.MovieCard.renderGrid(topRatedShows.slice(0, 8), topRatedContainer);
            }
            
            console.log('TV shows loaded successfully!');
        } else {
            showError('API not available');
        }
    } catch (error) {
        console.error('Failed to load TV shows:', error);
        showError('Failed to load TV shows');
    }
});

function showLoading(containers) {
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '<p style="color: #fff; text-align: center; padding: 40px;">Loading...</p>';
        }
    });
}

function showError(message) {
    const containers = ['popular-series', 'airing-now', 'top-rated-shows'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #a0a0a0;">
                    <p>${message}</p>
                    <button onclick="location.reload()" class="cta-button" style="margin-top: 20px;">Retry</button>
                </div>
            `;
        }
    });
}