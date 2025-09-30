// Sample movie data
const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        poster: "https://source.unsplash.com/random/300x450/?batman",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        poster: "https://source.unsplash.com/random/300x450/?dream",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        id: 3,
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        poster: "https://source.unsplash.com/random/300x450/?pulp",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        poster: "https://source.unsplash.com/random/300x450/?prison",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        id: 5,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        poster: "https://source.unsplash.com/random/300x450/?mafia",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
    {
        id: 6,
        title: "Fight Club",
        year: 1999,
        rating: 8.8,
        poster: "https://source.unsplash.com/random/300x450/?fight",
        overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
    },
    {
        id: 7,
        title: "Forrest Gump",
        year: 1994,
        rating: 8.8,
        poster: "https://source.unsplash.com/random/300x450/?running",
        overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    {
        id: 8,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        poster: "https://source.unsplash.com/random/300x450/?matrix",
        overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    }
];

// Function to create movie card HTML
function createMovieCard(movie) {
    return `
        <div class="movie-card" data-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-rating">★ ${movie.rating}</span>
                </div>
                <p class="movie-overview">${movie.overview}</p>
            </div>
        </div>
    `;
}

// Function to render movies in a specific section
function renderMovies(sectionId, movies) {
    const section = document.getElementById(sectionId);
    section.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}

// Function to perform search
function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const query = searchInput.value.toLowerCase();
    
    if (query.trim() === '') {
        // If search is empty, reload the original content
        loadInitialContent();
        return;
    }
    
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(query)
    );
    
    if (filteredMovies.length > 0) {
        // Clear all sections and show search results in trending section
        document.getElementById('trending-movies').innerHTML = '';
        document.getElementById('popular-movies').innerHTML = '';
        document.getElementById('top-rated-movies').innerHTML = '';
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        sectionTitle.textContent = `Search Results for "${query}"`;
        
        renderMovies('trending-movies', filteredMovies);
    } else {
        alert('No movies found matching your search.');
        loadInitialContent();
    }
}

// Function to load initial content
function loadInitialContent() {
    renderMovies('trending-movies', movies.slice(0, 4));
    renderMovies('popular-movies', movies.slice(2, 6));
    renderMovies('top-rated-movies', movies.slice(4, 8));
    
    // Reset section title
    const sectionTitle = document.querySelector('.section-title');
    sectionTitle.textContent = 'Trending Now';
}

// When the page loads, render the movies
document.addEventListener('DOMContentLoaded', function() {
    loadInitialContent();

    // Add click event to movie cards
    document.addEventListener('click', function(e) {
        const movieCard = e.target.closest('.movie-card');
        if (movieCard) {
            const movieId = movieCard.getAttribute('data-id');
            alert(`You clicked on movie with ID: ${movieId}. In a real app, this would open a movie details page.`);
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});