import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MyList from './pages/MyList';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { moviesData, moviesDataVersion } from './data/movies';

export default function App() {
  const loadMoviesFromStorage = () => {
    const saved = localStorage.getItem("netflix_movies_db");
    const savedVersion = localStorage.getItem("netflix_movies_db_version");
    if (!saved) return moviesData;

    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return moviesData;

      if (savedVersion !== moviesDataVersion.toString()) {
        return moviesData;
      }

      const hasStaleLinks = moviesData.some(dataMovie => {
        const savedMovie = parsed.find(movie => movie.id === dataMovie.id);
        return !savedMovie
          || savedMovie.poster !== dataMovie.poster
          || savedMovie.backdrop !== dataMovie.backdrop
          || savedMovie.videoUrl !== dataMovie.videoUrl;
      });

      return hasStaleLinks ? moviesData : parsed;
    } catch {
      return moviesData;
    }
  };

  // Lazy initialization for better performance and consistency
  const parseStoredSession = () => {
    const saved = localStorage.getItem("netflix_user");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem("netflix_user");
      return null;
    }
  };

  const [user, setUser] = useState(parseStoredSession);

  const [movies, setMovies] = useState(loadMoviesFromStorage);

  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("netflix_mylist");
    return saved ? JSON.parse(saved) : [];
  });

  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem("netflix_activity_logs");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Simplified Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("netflix_movies_db", JSON.stringify(movies));
    localStorage.setItem("netflix_movies_db_version", moviesDataVersion.toString());
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("netflix_mylist", JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem("netflix_activity_logs", JSON.stringify(activityLog));
  }, [activityLog]);

  const logActivity = (action, details) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog(prev => {
      const newLog = {
        id: Date.now(),
        timestamp,
        user: user ? user.email : "Guest",
        action,
        details
      };
      return [newLog, ...prev].slice(0, 50);
    });
  };

  const incrementMovieViews = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const newViews = (movie.views || 0) + 1;
    
    // 1. Perform side effect first
    logActivity("Stream Started", `${movie.title} (Total: ${newViews})`);
    
    // 2. Update state purely
    setMovies(prev => prev.map(m => m.id === movieId ? { ...m, views: newViews } : m));
  };

  const toggleMyList = (movie) => {
    const isAdding = !myList.some(item => item.id === movie.id);
    
    // 1. Side effect based on the action
    logActivity(isAdding ? "Added to List" : "Removed from List", movie.title);

    // 2. Pure state update
    setMyList(prev => {
      return isAdding ? [...prev, movie] : prev.filter(item => item.id !== movie.id);
    });
  };

  const handleLogout = () => {
    logActivity("Logged Out", "Session ended");
    localStorage.removeItem("netflix_user");
    setUser(null);
    navigate("/");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#141414' }}>
      {user && (
        <header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/" style={logoStyle}>NETFLIX</Link>
            <nav style={navStyle}>
              <Link to="/" style={location.pathname === "/" ? activeLinkStyle : navLinkStyle}>Home</Link>
              <Link to="/browse" style={location.pathname === "/browse" ? activeLinkStyle : navLinkStyle}>Browse & Search</Link>
              <Link to="/my-list" style={location.pathname === "/my-list" ? activeLinkStyle : navLinkStyle}>My List</Link>
              <Link to="/dashboard" style={location.pathname === "/dashboard" ? activeLinkStyle : navLinkStyle}>Activity Logs</Link>
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search titles, genres..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (location.pathname !== "/browse") navigate("/browse");
                }}
                style={searchInputStyle}
              />
            </div>
            <div style={profileContainerStyle}>
              <span style={{ fontSize: '0.9rem', color: '#aaa' }}>{user.email}</span>
              <button onClick={handleLogout} style={logoutButtonStyle}>Sign Out</button>
            </div>
          </div>
        </header>
      )}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={user ? <Home movies={movies} toggleMyList={toggleMyList} myList={myList} incrementMovieViews={incrementMovieViews} user={user} /> : <Register setUser={setUser} logActivity={logActivity} />} />
          <Route path="/browse" element={<Browse movies={movies} toggleMyList={toggleMyList} myList={myList} incrementMovieViews={incrementMovieViews} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/my-list" element={<MyList myList={myList} toggleMyList={toggleMyList} incrementMovieViews={incrementMovieViews} />} />
          <Route path="/dashboard" element={<Dashboard activityLog={activityLog} movies={movies} setActivityLog={setActivityLog} />} />
        </Routes>
      </main>

      <footer style={footerStyle}>
        <p>© {new Date().getFullYear()} Netflix Clone. Developed by Himanshu Yadav.</p>
        <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.5rem' }}>Data simulated with local storage tracking metrics.</p>
      </footer>
    </div>
  );
}

// Styling Objects for core UI layout
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 4%',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)',
  backdropFilter: 'blur(10px)'
};

const logoStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#e50914',
  fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
  textDecoration: 'none',
  letterSpacing: '1px'
};

const navStyle = {
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center'
};

const navLinkStyle = {
  color: '#e5e5e5',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'color 0.2s',
  fontWeight: '500'
};

const activeLinkStyle = {
  ...navLinkStyle,
  color: '#ffffff',
  fontWeight: 'bold'
};

const searchInputStyle = {
  background: 'rgba(0,0,0,0.6)',
  border: '1px solid #444',
  color: '#fff',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  outline: 'none',
  width: '240px',
  fontSize: '0.85rem',
  transition: 'border-color 0.3s'
};

const profileContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const logoutButtonStyle = {
  background: '#e50914',
  border: 'none',
  color: '#fff',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 'bold'
};

const footerStyle = {
  padding: '3rem 4%',
  backgroundColor: '#101010',
  textAlign: 'center',
  borderTop: '1px solid #1c1c1c',
  color: '#666',
  fontSize: '0.9rem'
};