// movie data 
const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX600_.jpg",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX600_.jpg",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        id: 3,
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX600_.jpg",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        id: 5,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX600_.jpg",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
    {
        id: 6,
        title: "Fight Club",
        year: 1999,
        rating: 8.8,
        poster: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX600_.jpg",
        overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
    },
    {
        id: 7,
        title: "Forrest Gump",
        year: 1994,
        rating: 8.8,
        poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX600_.jpg",
        overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    {
        id: 8,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX600_.jpg",
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

// search Function 
function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const query = searchInput.value.toLowerCase();
    
    if (query.trim() === '') {
        loadInitialContent();
        return;
    }
    
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(query)
    );
    
    if (filteredMovies.length > 0) {
        document.getElementById('trending-movies').innerHTML = '';
        document.getElementById('popular-movies').innerHTML = '';
        document.getElementById('top-rated-movies').innerHTML = '';
        
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
    renderMovies('popular-movies', movies.slice(4, 8));
    
    // Reset section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = 'Trending Now';
    }
}

// When the page loads, render the movies
document.addEventListener('DOMContentLoaded', function() {
    loadInitialContent();

    //click event to movie cards
    document.addEventListener('click', function(e) {
        const movieCard = e.target.closest('.movie-card');
        if (movieCard) {
            const movieId = movieCard.getAttribute('data-id');
            alert(`You clicked on ${movies.find(m => m.id == movieId).title}. In a real app, this would open a movie details page.`);
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

// Array of reliable cinema background images
const heroBackgrounds = [
    'https://images.unsplash.com/photo-1489599809925-8c26cb13d6bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2050&q=80',
    'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80',
    'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
];

// Function to set random hero background
function setRandomHeroBackground() {
    const randomIndex = Math.floor(Math.random() * heroBackgrounds.length);
    const heroSection = document.querySelector('.hero');
    heroSection.style.background = 
        `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
         url('${heroBackgrounds[randomIndex]}') no-repeat center center/cover`;
}

// Update your existing DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
    // Set random hero background
    setRandomHeroBackground();
    
    // Your existing code
    loadInitialContent();
    
    // Add click event to movie cards
    document.addEventListener('click', function(e) {
        const movieCard = e.target.closest('.movie-card');
        if (movieCard) {
            const movieId = movieCard.getAttribute('data-id');
            alert(`You clicked on movie with ID: ${movieId}`);
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