# 🎬 MovieBox - Netflix-Inspired Streaming Platform

A modern Progressive Web App (PWA) for browsing movies and TV shows, powered by The Movie Database (TMDB) API.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Enabled-success)

---

## 📖 About

MovieBox is a Netflix-inspired streaming platform built with vanilla JavaScript, HTML, and CSS. It integrates with the TMDB API to provide access to **thousands of real movies and TV shows** with high-quality posters, ratings, and detailed information.

### **Live Demo:** [Coming Soon]
### **Repository:** [github.com/CosmosKyeremeh/movie-box](https://github.com/CosmosKyeremeh/movie-box)

---

## ✨ Features

### 🎬 **Content Browsing**
- **Thousands of Movies** - Browse popular, trending, and top-rated movies from TMDB
- **TV Shows** - Explore popular series and currently airing shows
- **Real-time Data** - All content fetched live from TMDB API
- **High-Quality Posters** - Official movie posters from TMDB

### 🔍 **Search & Discovery**
- **Smart Search** - Search movies and TV shows as you type
- **Genre Filtering** - Filter by Action, Comedy, Drama, Horror, Sci-Fi, Romance
- **Trending Content** - See what's trending this week
- **New Releases** - Browse newly released movies
- **Top Rated** - Discover critically acclaimed content

### 💾 **Personal Features**
- **My List** - Save your favorite movies (stored offline in IndexedDB)
- **Persistent Storage** - Your list survives page refreshes and offline mode
- **Add/Remove** - Easy one-click add to list

### 📱 **Progressive Web App**
- **Installable** - Install as a native app on any device
- **Offline Support** - Service Worker caches assets for offline browsing
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Fast Loading** - Optimized performance with caching strategies

### 🎨 **User Experience**
- **Dark Theme** - Eye-friendly dark interface
- **Smooth Animations** - Polished hover effects and transitions
- **Loading States** - Skeleton screens while content loads
- **Error Handling** - Graceful fallbacks for failed API calls

---

## 🚀 Quick Start

### **Prerequisites**
- TMDB API Key (free - see setup below)
- Local web server (Python, Node.js, or VS Code Live Server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### **Installation**

**1. Clone the Repository**
```bash
git clone https://github.com/CosmosKyeremeh/movie-box.git
cd movie-box
```

**2. Get Your TMDB API Key**
1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API Key (choose "Developer")
5. Copy your API Key

**3. Add Your API Key**

Open `js/config.js` and add your key:
```javascript
const config = {
    TMDB_API_KEY: 'YOUR_API_KEY_HERE', // Paste your key here
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p'
};
```

**4. Start Local Server**

Choose one method:

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server -p 8000
```

**VS Code Live Server:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**5. Open in Browser**
```
http://localhost:8000
```

That's it! You should see movies loading from TMDB 🎉

---

## 📁 Project Structure

```
movie-box/
├── index.html              # Landing page
├── main.html               # Homepage with movie grid
├── movies.html             # All movies page with filters
├── tvshows.html            # TV shows page
├── popular.html            # Trending & new releases
├── mylist.html             # Saved favorites
├── auth.html               # Sign in/Sign up UI
│
├── css/
│   ├── main_styles.css     # Global styles
│   ├── landing.css         # Landing page styles
│   ├── auth.css            # Auth page styles
│   └── ...more              # Page-specific styles
│
├── js/
│   ├── config.js           # API key configuration
│   │
│   ├── modules/            # Core functionality
│   │   ├── api.js          # TMDB API integration
│   │   ├── storage.js      # IndexedDB for My List
│   │   ├── utils.js        # Helper functions
│   │   ├── theme.js        # Dark/light theme
│   │   └── pwa.js          # Service Worker registration
│   │
│   ├── components/         # Reusable UI components
│   │   ├── MovieCard.js    # Movie card rendering
│   │   ├── Modal.js        # Modal dialogs
│   │   ├── SearchBar.js    # Search functionality
│   │   └── LoadingSkeleton.js  # Loading animations
│   │
│   └── main.js, movies.js, etc.  # Page-specific scripts
│
├── images/                 # Icons and assets
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── vercel.json             # Vercel deployment config
├── .gitignore              # Git ignore file
├── .env.example            # Environment variables template
└── README.md               # This file
```

---

## 🎯 Key Technologies

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup, PWA manifest |
| **CSS3** | Grid, Flexbox, animations, responsive design |
| **JavaScript (ES6+)** | Modules, async/await, classes, arrow functions |
| **TMDB API** | Real movie and TV show data |
| **IndexedDB** | Offline storage for My List feature |
| **Service Workers** | Offline support and caching |
| **PWA** | Installable, works offline |
| **Vercel** | Deployment platform |

**No frameworks!** Built with pure vanilla JavaScript for maximum learning value.

---

## 🔧 How It Works

### **1. API Integration**

When you open a page:
```javascript
// js/movies.js
const data = await window.MovieBoxAPI.getPopularMovies(1);
const movies = data.results; // Array of 20 movies from TMDB

window.MovieCard.renderGrid(movies.slice(0, 12), container);
```

### **2. Movie Cards**

Each movie card displays:
- High-quality poster from TMDB
- Movie title
- Release year
- Star rating (out of 10)
- Brief overview

### **3. My List (IndexedDB)**

Click "+ Add to List" to save:
```javascript
// Saved to IndexedDB (works offline!)
await window.MovieBoxStorage.addToMyList(movie);
```

### **4. Service Worker**

Caches assets for offline use:
- HTML pages
- CSS stylesheets
- JavaScript modules
- Images and icons
- TMDB API responses (temporarily)

---

## 📱 Pages Overview

| Page | What's There | API Endpoints Used |
|------|-------------|-------------------|
| **index.html** | Landing page with hero | None (static) |
| **main.html** | Trending, Popular, Top Rated | `/movie/popular`, `/trending/movie/week`, `/movie/top_rated` |
| **movies.html** | All movies with genre filters | `/movie/popular`, `/movie/now_playing`, `/discover/movie` |
| **tvshows.html** | Popular, Airing, Top Rated TV | `/tv/popular`, `/trending/tv/week`, `/tv/top_rated` |
| **popular.html** | Trending, New Releases, Top 10 | `/trending/movie/week`, `/movie/now_playing`, `/movie/top_rated` |
| **mylist.html** | Your saved favorites | IndexedDB (no API) |
| **auth.html** | Sign in/Sign up forms | None (UI only) |

---

## 🎬 TMDB API Endpoints

The app uses these TMDB endpoints:

**Movies:**
- `GET /movie/popular` - Popular movies
- `GET /movie/top_rated` - Top rated movies
- `GET /movie/now_playing` - Now playing in theaters
- `GET /trending/movie/{time_window}` - Trending movies
- `GET /discover/movie` - Discover movies by genre
- `GET /search/movie` - Search movies

**TV Shows:**
- `GET /tv/popular` - Popular TV shows
- `GET /tv/top_rated` - Top rated shows
- `GET /trending/tv/{time_window}` - Trending shows
- `GET /search/tv` - Search TV shows

**Genres:**
- `GET /genre/movie/list` - Get movie genres
- `GET /genre/tv/list` - Get TV genres

---

## 🐛 Troubleshooting

### **Movies Not Loading?**

**Check 1: API Key**
- Open `js/config.js`
- Verify your TMDB API key is correct
- Test your key at: [TMDB API Docs](https://developers.themoviedb.org/3)

**Check 2: Browser Console (F12)**
```
✅ GOOD: "Movies loaded successfully!"
❌ BAD: "API Error: 401" (Invalid API key)
❌ BAD: "MovieBoxAPI is not defined" (Scripts not loading)
```

**Check 3: Network Tab**
- F12 → Network → Filter by "themoviedb"
- Status should be **200** (success)
- NOT **401** (unauthorized) or **404** (not found)

**Check 4: Using Local Server?**
```
✅ http://localhost:8000
❌ file:///C:/movie-box/index.html  (Won't work!)
```

### **Blank Page?**

Hard refresh:
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### **"My List" Not Saving?**

- Check browser supports IndexedDB (all modern browsers do)
- Check if Private/Incognito mode (storage disabled)
- Clear browser cache and try again

---

## 🚀 Deployment

### **Deploy to Vercel** (Recommended)

**1. Install Vercel CLI**
```bash
npm install -g vercel
```

**2. Login**
```bash
vercel login
```

**3. Deploy**
```bash
vercel --prod
```

**4. Set Environment Variable**

In Vercel Dashboard:
- Go to your project → Settings → Environment Variables
- Add: `VITE_TMDB_API_KEY` = `your_api_key_here`

### **Deploy to Netlify**

**1. Create netlify.toml**
```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**2. Deploy**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### **Deploy to GitHub Pages**

```bash
# Enable GitHub Pages in repo settings
# Point to main branch
# Your site will be live at: https://username.github.io/movie-box/
```

---

## 🎨 Customization

### **Change Theme Color**

Edit `css/main_styles.css`:
```css
:root {
  --accent-color: #e50914;  /* MovieBox red */
  --dark-bg: #0f1419;
  --card-bg: #1a1f2e;
}
```

### **Adjust Movies Per Page**

Edit `js/movies.js`:
```javascript
// Show 20 movies instead of 12
window.MovieCard.renderGrid(movies.slice(0, 20), container);
```

### **Change Hero Backgrounds**

Edit `index.html` (around line 146):
```javascript
const heroImages = [
  'your-image-url-1.jpg',
  'your-image-url-2.jpg'
];
```

---

## 📚 Code Examples

### **Fetch Movies**
```javascript
// Get popular movies
const data = await MovieBoxAPI.getPopularMovies(1);
console.log(data.results); // Array of 20 movies
```

### **Search**
```javascript
const results = await MovieBoxAPI.searchMovies('inception');
console.log(results.results); // Matching movies
```

### **Filter by Genre**
```javascript
const data = await MovieBoxAPI.getMoviesByGenre(28, 1); // Action movies
console.log(data.results);
```

### **Save to My List**
```javascript
await MovieBoxStorage.addToMyList(movie);
```

---

## 🔐 Security

- ⚠️ **Never commit your API key to GitHub!**
- ✅ API key is in `js/config.js` (in `.gitignore`)
- ✅ Use environment variables for production
- ✅ TMDB API has rate limits (protect your key)

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| **First Load** | 1-2 seconds (with API calls) |
| **Cached Load** | <500ms |
| **Movies Displayed** | ~60 on first load |
| **API Calls/Page** | 2-3 per page |
| **Image Sizes** | 500px width (optimized) |

---

## 🛣️ Roadmap

### **Current Features** ✅
- TMDB API integration
- Movie & TV show browsing
- Search & filtering
- My List with IndexedDB
- PWA support
- Responsive design

### **Planned Features** 🚧
- [ ] User authentication (real login/signup)
- [ ] Video trailers (YouTube integration)
- [ ] User reviews & ratings
- [ ] Recommendations based on watch history
- [ ] Watchlist sharing
- [ ] Dark/Light theme toggle

### **Future Enhancements** 💭
- [ ] Movie details page with cast & crew
- [ ] Similar movies suggestions
- [ ] Multi-language support
- [ ] Advanced filtering (year, rating, runtime)
- [ ] Infinite scroll pagination

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/cool-feature`)
3. Commit your changes (`git commit -m 'Add cool feature'`)
4. Push to the branch (`git push origin feature/cool-feature`)
5. Open a Pull Request

### **Contribution Ideas:**
- Improve UI/UX design
- Add new features from roadmap
- Fix bugs or improve performance
- Enhance documentation
- Add unit tests

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**What this means:**
- ✅ Use for personal projects
- ✅ Use for commercial projects
- ✅ Modify as you like
- ✅ Distribute freely
- ⚠️ Keep copyright notice

---

## 💡 What I Learned

Building this project taught me:
- ✅ Integrating with external APIs (TMDB)
- ✅ Component-based architecture in vanilla JS
- ✅ IndexedDB for offline storage
- ✅ Service Workers and PWA concepts
- ✅ Responsive design with CSS Grid/Flexbox
- ✅ Async JavaScript and error handling
- ✅ Code organization in larger projects
- ✅ Deployment to cloud platforms

---

## 📞 Contact & Support

**Developer:** Cosmos Kyeremeh (GhPROFIT)  
**Email:** kyeremehcosmos938@gmail.com  
**LinkedIn:** [cosmos-kyeremeh-2b33882b3](https://www.linkedin.com/in/cosmos-kyeremeh-2b33882b3)  
**GitHub:** [@CosmosKyeremeh](https://github.com/CosmosKyeremeh)

### **Found a Bug?**
Open an [Issue](https://github.com/CosmosKyeremeh/movie-box/issues)

### **Have Questions?**
Check the [Wiki](https://github.com/CosmosKyeremeh/movie-box/wiki) or open a Discussion

---

## 🌟 Show Your Support

If you found this project helpful:
- ⭐ Star the repository
- 🍴 Fork and make it your own
- 📢 Share with friends learning web development
- 🐛 Report bugs or suggest features

---

## 🙏 Acknowledgments

**Built by:** GhPROFIT (Cosmos Kyeremeh)

**Powered by:**
- [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
- [Unsplash](https://unsplash.com/) (hero background images)

**Inspired by:**
- Netflix
- Disney+
- Amazon Prime Video

**Resources:**
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)

---

## 📖 Documentation

For more detailed documentation, see:
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [TMDB_INTEGRATION_GUIDE.md](TMDB_INTEGRATION_GUIDE.md) - API integration guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

---

## 🎉 Enjoy!

Thanks for checking out MovieBox! I hope you find it useful for learning or as a starting point for your own projects.

**Happy coding!** 🚀🎬

---

**Made with ❤️ and lots of ☕ by GhPROFIT**

---

## Quick Reference Card

```bash
# Clone
git clone https://github.com/CosmosKyeremeh/movie-box.git

# Add API key to js/config.js
TMDB_API_KEY: 'your_key_here'

# Start server
python -m http.server 8000

# Open browser
http://localhost:8000

# Check console (F12)
✅ "Movies loaded successfully!"
```

---

**⚡ Pro Tip:** Press `F12` in your browser to open DevTools and watch the API calls in the Network tab. You'll see real-time requests to TMDB!