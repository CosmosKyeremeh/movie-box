// My List Page - Display saved movies from IndexedDB
document.addEventListener('DOMContentLoaded', async function() {
    console.log('My List page loaded');
    
    const listContainer = document.getElementById('my-list-items');
    const emptyState = document.getElementById('empty-state');
    
    await loadMyList();
    
    // Reload list when storage changes
    window.addEventListener('storage-updated', loadMyList);
});

async function loadMyList() {
    const listContainer = document.getElementById('my-list-items');
    const emptyState = document.getElementById('empty-state');
    
    if (!listContainer || !emptyState) return;
    
    try {
        if (window.MovieBoxStorage) {
            // Get saved movies from IndexedDB
            const savedMovies = await window.MovieBoxStorage.getMyList();
            
            if (savedMovies && savedMovies.length > 0) {
                // Hide empty state, show list
                emptyState.style.display = 'none';
                listContainer.style.display = 'grid';
                
                // Render saved movies
                if (window.MovieCard) {
                    // Add remove button to each card
                    const moviesWithRemove = savedMovies.map(movie => ({
                        ...movie,
                        hasRemoveButton: true
                    }));
                    
                    window.MovieCard.renderGrid(moviesWithRemove, listContainer);
                    
                    // Add remove functionality
                    addRemoveButtons();
                }
                
                console.log(`Loaded ${savedMovies.length} movies from My List`);
            } else {
                // Show empty state
                emptyState.style.display = 'block';
                listContainer.style.display = 'none';
                console.log('My List is empty');
            }
        } else {
            console.error('Storage not available');
            showError('Storage not available');
        }
    } catch (error) {
        console.error('Failed to load My List:', error);
        showError('Failed to load your list');
    }
}

function addRemoveButtons() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const movieId = card.dataset.id;
        
        // Add remove button if not exists
        if (!card.querySelector('.btn-remove')) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn-remove';
            removeBtn.textContent = '✕ Remove';
            removeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(229, 9, 20, 0.9);
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                z-index: 10;
                transition: all 0.3s ease;
            `;
            
            removeBtn.addEventListener('mouseenter', function() {
                this.style.background = '#e50914';
                this.style.transform = 'scale(1.05)';
            });
            
            removeBtn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(229, 9, 20, 0.9)';
                this.style.transform = 'scale(1)';
            });
            
            removeBtn.addEventListener('click', async function(e) {
                e.stopPropagation();
                await removeFromList(movieId, card);
            });
            
            card.style.position = 'relative';
            card.appendChild(removeBtn);
        }
    });
}

async function removeFromList(movieId, cardElement) {
    try {
        if (window.MovieBoxStorage) {
            await window.MovieBoxStorage.removeFromMyList(parseInt(movieId));
            
            // Animate card removal
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'scale(0.8)';
            
            setTimeout(async () => {
                cardElement.remove();
                
                // Check if list is now empty
                const remainingCards = document.querySelectorAll('.movie-card');
                if (remainingCards.length === 0) {
                    await loadMyList(); // Reload to show empty state
                }
                
                if (window.MovieBoxUtils) {
                    window.MovieBoxUtils.showToast('Removed from My List', 'success');
                }
            }, 300);
        }
    } catch (error) {
        console.error('Failed to remove from list:', error);
        if (window.MovieBoxUtils) {
            window.MovieBoxUtils.showToast('Failed to remove', 'error');
        }
    }
}

function showError(message) {
    const listContainer = document.getElementById('my-list-items');
    if (listContainer) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 60px; color: #a0a0a0; grid-column: 1 / -1;">
                <h3 style="color: #fff; margin-bottom: 15px;">⚠️ ${message}</h3>
                <button onclick="location.reload()" class="cta-button">Retry</button>
            </div>
        `;
    }
}