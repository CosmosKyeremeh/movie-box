// My List page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('My List page loaded');
    
    // My List page specific code here
    const myList = JSON.parse(localStorage.getItem('myList')) || [];
    
    if (myList.length > 0) {
        document.getElementById('empty-state').style.display = 'none';
        document.getElementById('my-list-items').style.display = 'grid';
        // Render my list items
    }
});