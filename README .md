# 🎬 MovieBox

A modern movie and TV show streaming platform inspired by Netflix, built with vanilla JavaScript, HTML, and CSS.

![MovieBox Preview](images/ghprofit.ico)

---

## 📖 About

MovieBox is a streaming platform clone that I built to practice frontend development. It features a clean, responsive design with 210+ movies and 55+ TV shows, complete with search, filtering, and a "My List" feature to save your favorites.

This project demonstrates:
- Modern JavaScript (ES6+)
- Component-based architecture
- Working with JSON data
- Local storage (IndexedDB)
- Responsive design
- Progressive Web App features

---

## ✨ Features

- 🎬 **Browse** 210+ movies and 55+ TV shows
- 🔍 **Search** content with instant results
- 🎭 **Filter** by genre, year, and rating
- ⭐ **Rate** movies and shows (1-5 stars)
- 💾 **My List** - Save your favorites
- 🌙 **Dark/Light Theme** toggle
- 📱 **Responsive** - Works on mobile, tablet, and desktop
- 🔌 **Works Offline** - Install as a Progressive Web App

---

## 🚀 How to Run

### Quick Start

1. **Download or Clone this project**
   ```bash
   git clone https://github.com/yourusername/moviebox.git
   cd moviebox
   ```

2. **Start a local server** (choose one):

   **Using Python:**
   ```bash
   python -m http.server 8000
   ```

   **Using Node.js:**
   ```bash
   npx http-server -p 8000
   ```

   **Using VS Code:**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

That's it! 🎉

> ⚠️ **Important:** Don't open the HTML files directly (double-clicking won't work). You need a local server for the JavaScript modules to load properly.

---

## 📁 Project Structure

```
moviebox/
├── index.html          # Landing page
├── main.html           # Homepage with movies
├── movies.html         # All movies page
├── tvshows.html        # TV shows page
├── popular.html        # Trending content
├── mylist.html         # Saved favorites
├── auth.html           # Sign in/Sign up page
│
├── css/                # Stylesheets
│   ├── main_styles.css
│   ├── landing.css
│   └── components/     # Component styles
│
├── js/
│   ├── modules/        # Core functionality
│   │   ├── api.js      # Fetch movies/shows
│   │   ├── storage.js  # Save data
│   │   ├── utils.js    # Helper functions
│   │   ├── theme.js    # Dark/light mode
│   │   └── pwa.js      # Offline support
│   │
│   ├── components/     # UI components
│   │   ├── MovieCard.js
│   │   ├── Modal.js
│   │   ├── SearchBar.js
│   │   └── ...more
│   │
│   └── main.js, movies.js, etc.  # Page scripts
│
└── data/               # Movie/show data (JSON)
    ├── movies.json     # 210 movies
    ├── tvshows.json    # 55 TV shows
    └── genres.json     # Genre list
```

---

## 🎯 Key Technologies

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modules, async/await, classes
- **IndexedDB** - Local database for My List
- **Service Worker** - Offline support
- **No frameworks!** - Pure vanilla JavaScript

---

## 🎨 Features Breakdown

### 1. Movie/TV Show Catalog
- Browse complete collection with posters and details
- Click any movie to see full information in a modal
- Beautiful card layouts with hover effects

### 2. Smart Search
- Type in the search bar
- Results appear instantly as you type
- Searches both movies and TV shows

### 3. Advanced Filtering
- Filter by genre (Action, Comedy, Drama, etc.)
- Filter by year range
- Filter by minimum rating
- Sort by popularity, rating, or year

### 4. My List
- Click the "+" button on any movie/show
- Items are saved permanently (even after closing browser)
- Access your list from the navigation menu

### 5. Continue Watching
- Automatically tracks your viewing progress
- Shows a progress bar on movie cards
- Resume where you left off

### 6. Theme Toggle
- Switch between dark and light modes
- Your preference is saved automatically
- Smooth transition animations

---

## 📱 Pages Overview

| Page | What's There |
|------|-------------|
| **index.html** | Landing page with random hero backgrounds |
| **main.html** | Homepage with Trending, Popular, Top Rated |
| **movies.html** | All movies with genre filters |
| **tvshows.html** | All TV shows with filters |
| **popular.html** | Trending this week, new releases, top 10 |
| **mylist.html** | Your saved favorites |
| **auth.html** | Sign in/Sign up form (UI only) |

---

## 🔧 How It Works

### Loading Movies

When you open a page, here's what happens:

1. JavaScript loads the movie data from `data/movies.json`
2. The API module fetches and caches the data
3. MovieCard component creates the visual cards
4. Cards are displayed on the page

**Example code:**
```javascript
// This is in js/main.js
const movies = await movieAPI.getTrendingMovies(8);
MovieCard.renderGrid(movies, container);
```

### Saving to My List

When you click the "Add to List" button:

1. Movie data is saved to IndexedDB
2. A toast notification appears ("Added to My List!")
3. The button changes to show it's saved
4. Data persists even after closing the browser

### Search Function

The search is debounced (waits 300ms after you stop typing):

```javascript
// Searches as you type
const results = await movieAPI.search('action', 'all');
// Returns: { movies: [...], shows: [...] }
```

---

## 🐛 Troubleshooting

### Movies not loading?

**Check 1:** Are you using a local server?
```
✅ http://localhost:8000
❌ file:///C:/moviebox/index.html
```

**Check 2:** Do the data files exist?
```bash
ls data/
# Should see: movies.json, tvshows.json, genres.json
```

**Check 3:** Check browser console (F12)
- Look for red error messages
- Common error: "Failed to fetch data/movies.json"

### Blank page?

**Hard refresh:**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Search not working?

Make sure the SearchBar component is loaded in your HTML:
```html
<script src="js/components/SearchBar.js"></script>
```

---

## 🎓 What I Learned

Building this project taught me:

- ✅ How to structure a large JavaScript project
- ✅ Component-based architecture without frameworks
- ✅ Working with JSON data and APIs
- ✅ Browser storage (IndexedDB, localStorage)
- ✅ Responsive design with CSS Grid and Flexbox
- ✅ Progressive Web Apps and Service Workers
- ✅ Debouncing and performance optimization
- ✅ Clean, maintainable code organization

---

## 🎨 Customization

Want to make it your own? Here are some easy tweaks:

### Change the Theme Color

Edit `css/main_styles.css`:
```css
:root {
  --accent: #e50914;  /* Change this to your color! */
}
```

### Add More Movies

Edit `data/movies.json` and add:
```json
{
  "id": 211,
  "title": "Your Movie",
  "year": 2024,
  "rating": 8.5,
  "poster": "poster-url",
  "genres": ["Action", "Drama"],
  "overview": "Movie description..."
}
```

### Change Hero Backgrounds

Edit `index.html` around line 140:
```javascript
const heroImages = [
  'your-image-1.jpg',
  'your-image-2.jpg'
];
```

---

## 📚 Code Examples

### Display Movies
```javascript
// Get movies
const movies = await movieAPI.getMovies();

// Show them on page
MovieCard.renderGrid(movies, container, {
  showOverview: true,
  showRating: true
});
```

### Search
```javascript
const results = await movieAPI.search('inception', 'all');
console.log(results.movies); // Array of matching movies
```

### Filter Movies
```javascript
const filtered = await movieAPI.filter({
  genres: ['Action'],
  yearMin: 2020,
  minRating: 7.5
}, 'movie');
```

### Save to My List
```javascript
await storage.addToMyList(movie);
```

---

## 🚀 Future Improvements

Things I'd like to add:

- [ ] User authentication (login/signup)
- [ ] Video player to actually watch movies
- [ ] User reviews and comments
- [ ] Recommendations based on watch history
- [ ] Admin panel to manage content
- [ ] Better mobile experience

---

## 🤝 Contributing

Want to improve this project?

1. Fork the repository
2. Create a new branch (`git checkout -b feature/cool-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add cool feature'`)
5. Push (`git push origin feature/cool-feature`)
6. Open a Pull Request

**Ideas for contributions:**
- Add more movies/shows to the data files
- Improve the UI/design
- Fix bugs
- Add new features
- Improve documentation

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**What this means:**
- ✅ You can use it for personal projects
- ✅ You can use it for commercial projects
- ✅ You can modify it however you want
- ✅ You can distribute it
- ⚠️ Just keep the copyright notice

---

## 💡 Credits

**Built by:** GhPROFIT

**Inspired by:** Netflix, Disney+, Amazon Prime Video

**Resources used:**
- Movie data: Generated sample data
- Images: Unsplash (hero backgrounds)
- Icons: Emoji icons built into the system

**Special thanks to:**
- The web development community
- Stack Overflow (for debugging help!)
- MDN Web Docs (best JavaScript reference)

---

## 🌟 Show Your Support

If you found this project helpful or learned something from it:

- ⭐ Star this repository
- 🍴 Fork it and make it your own
- 📢 Share it with friends learning web development
- 🐛 Report any bugs you find

---

## 📞 Questions?

Have questions or found a bug?

- Open an [Issue](https://github.com/CosmosKyeremeh/moviebox/issues)
- Email: kyeremehcosmos938@gmail.com
- LinkedIn: [in/cosmos-kyeremeh-2b33882b3](https://www.linkedin.com/in/cosmos-kyeremeh-2b33882b3)

---

## 🎉 Enjoy!

Thanks for checking out MovieBox! I hope you find it useful for learning or as a starting point for your own projects.

Happy coding! 🚀

---

**Made with ❤️ and lots of ☕ by GhPROFIT**

---

## Quick Reference

```bash
# Start server
python -m http.server 8000

# Open browser
http://localhost:8000

# Check if working
# - Open browser console (F12)
# - Look for "MovieBox loaded successfully!"
```
