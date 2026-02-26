// API Module - TMDB API Integration
(function() {
    'use strict';

    // Get config from global object or use fallback
    const config = window.MovieBoxConfig || {};
    const API_KEY = config.TMDB_API_KEY || '8f1d563e5a25c5e808a9229d44258385';
    const BASE_URL = config.BASE_URL || 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = config.IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
    
    const IMAGE_SIZES = {
        poster: 'w500',
        backdrop: 'w1280',
        profile: 'w185'
    };

    const API = {
        // Utility: Build image URL
        getImageUrl(path, type = 'poster') {
            if (!path) return 'https://via.placeholder.com/500x750/333333/FFFFFF?text=No+Image';
            const size = IMAGE_SIZES[type] || 'w500';
            return `${IMAGE_BASE_URL}/${size}${path}`;
        },

        // Utility: Make API request
        async request(endpoint, params = {}) {
            const url = new URL(`${BASE_URL}${endpoint}`);
            url.searchParams.append('api_key', API_KEY);
            
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error('[API] Request failed:', error);
                throw error;
            }
        },

        // Get popular movies
        async getPopularMovies(page = 1) {
            return await this.request('/movie/popular', { page });
        },

        // Get trending movies
        async getTrendingMovies(timeWindow = 'week') {
            return await this.request(`/trending/movie/${timeWindow}`);
        },

        // Get top rated movies
        async getTopRatedMovies(page = 1) {
            return await this.request('/movie/top_rated', { page });
        },

        // Get now playing movies
        async getNowPlayingMovies(page = 1) {
            return await this.request('/movie/now_playing', { page });
        },

        // Get movie details
        async getMovieDetails(movieId) {
            return await this.request(`/movie/${movieId}`, {
                append_to_response: 'videos,credits,similar'
            });
        },

        // Search movies
        async searchMovies(query, page = 1) {
            return await this.request('/search/movie', { query, page });
        },

        // Get popular TV shows
        async getPopularTVShows(page = 1) {
            return await this.request('/tv/popular', { page });
        },

        // Get trending TV shows
        async getTrendingTVShows(timeWindow = 'week') {
            return await this.request(`/trending/tv/${timeWindow}`);
        },

        // Get top rated TV shows
        async getTopRatedTVShows(page = 1) {
            return await this.request('/tv/top_rated', { page });
        },

        // Search TV shows
        async searchTVShows(query, page = 1) {
            return await this.request('/search/tv', { query, page });
        },

        // Get movie by genre
        async getMoviesByGenre(genreId, page = 1) {
            return await this.request('/discover/movie', {
                with_genres: genreId,
                page
            });
        },

        // Get genres list
        async getMovieGenres() {
            return await this.request('/genre/movie/list');
        },

        async getTVGenres() {
            return await this.request('/genre/tv/list');
        }
    };

    // Make API globally available
    window.MovieBoxAPI = API;

    console.log('[API] API module loaded');
})();