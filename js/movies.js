// Movies page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Movies page loaded');
    
    // Movies page specific code here
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Filter logic for movies
        });
    });
});