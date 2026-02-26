// Popular Page - TMDB API Integration
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Popular page loaded');
    
    // Get containers
    const trendingContainer = document.getElementById('trending-now');
    const newReleasesContainer = document.getElementById('new-releases');
    const top10Container = document.getElementById('top-10');
    
    // Show loading
    showLoading([trendingContainer, newReleasesContainer, top10Container]);

    try {
        if (window.MovieBoxAPI) {
            // Fetch trending content
            const trendingData = await window.MovieBoxAPI.getTrendingMovies('week');
            const trending = trendingData.results || [];
            
            // Fetch now playing (new releases)
            const nowPlayingData = await window.MovieBoxAPI.getNowPlayingMovies(1);
            const newReleases = nowPlayingData.results || [];
            
            // Fetch top rated (top 10)
            const topRatedData = await window.MovieBoxAPI.getTopRatedMovies(1);
            const topRated = topRatedData.results || [];
            
            // Render content
            if (trendingContainer && window.MovieCard) {
                window.MovieCard.renderGrid(trending.slice(0, 12), trendingContainer);
            }
            
            if (newReleasesContainer && window.MovieCard) {
                window.MovieCard.renderGrid(newReleases.slice(0, 12), newReleasesContainer);
            }
            
            if (top10Container && window.MovieCard) {
                window.MovieCard.renderGrid(topRated.slice(0, 10), top10Container);
            }
            
            console.log('Popular content loaded successfully!');
        } else {
            showError('API not available');
        }
    } catch (error) {
        console.error('Failed to load popular content:', error);
        showError('Failed to load content');
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
    const containers = ['trending-now', 'new-releases', 'top-10'];
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