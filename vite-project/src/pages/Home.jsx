import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';

export default function Home({ movies, toggleMyList, myList, incrementMovieViews, user }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const parseStoredUser = () => {
    const raw = localStorage.getItem('netflix_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem('netflix_user');
      return null;
    }
  };

  const activeUser = user || parseStoredUser();

  useEffect(() => {
    // Check authentication
    const savedUser = localStorage.getItem("netflix_user");
    if (!savedUser && !user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (movies.length > 0) {
      // Pick dynamic trending film for main banner
      const trending = movies.filter(m => m.isTrending);
      setFeaturedMovie(trending[Math.floor(Math.random() * trending.length)] || movies[0]);
    }
  }, [movies]);

  useEffect(() => {
    if (!activeUser) return;

    setShowWelcome(true);
    const timeout = setTimeout(() => setShowWelcome(false), 10000);
    return () => clearTimeout(timeout);
  }, [activeUser]);

  if (!movies.length) return <div style={{ color: '#fff', padding: '5rem', textAlign: 'center' }}>Loading Catalog...</div>;

  const trendingMovies = movies.filter(movie => movie.isTrending);
  const topRatedMovies = movies.filter(movie => movie.isTopRated);
  const scifiMovies = movies.filter(movie => movie.genre === "Sci-Fi");
  const actionMovies = movies.filter(movie => movie.genre === "Action");
  const documentaries = movies.filter(movie => movie.genre === "Documentary");

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }} className="fade-in">
      {activeUser && showWelcome && (
        <div style={userPanelStyle}>
          <div>
            <p style={userWelcomeStyle}>Welcome back, {activeUser.email}</p>
            <p style={userDetailStyle}>
              Subscription: <strong>Premium - ₹149/month</strong>
            </p>
          </div>
        </div>
      )}

      {/* Featured Jumbotron Banner */}
      {featuredMovie && (
        <div style={heroBannerStyle(featuredMovie.backdrop)}>
          <div style={heroGradientStyle}>
            <span style={categoryLabelStyle}>{featuredMovie.type}</span>
            <h1 style={heroTitleStyle}>{featuredMovie.title}</h1>
            <p style={heroDescriptionStyle}>{featuredMovie.description}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setSelectedMovie(featuredMovie)} style={heroPlayBtn}>▶ Play Now</button>
              <button onClick={() => toggleMyList(featuredMovie)} style={heroInfoBtn}>
                {myList.some(i => i.id === featuredMovie.id) ? "✓ Added to List" : "+ Add to List"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Row Grids */}
      <div style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <MovieRow title="Trending Now" movies={trendingMovies} onMovieSelect={setSelectedMovie} toggleMyList={toggleMyList} myList={myList} showNumbers={true} />
        <MovieRow title="Top Rated Classics" movies={topRatedMovies} onMovieSelect={setSelectedMovie} toggleMyList={toggleMyList} myList={myList} />
        <MovieRow title="Sci-Fi Thrillers" movies={scifiMovies} onMovieSelect={setSelectedMovie} toggleMyList={toggleMyList} myList={myList} />
        <MovieRow title="Action Adventures" movies={actionMovies} onMovieSelect={setSelectedMovie} toggleMyList={toggleMyList} myList={myList} />
        <MovieRow title="Compelling Documentaries" movies={documentaries} onMovieSelect={setSelectedMovie} toggleMyList={toggleMyList} myList={myList} />
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          toggleMyList={toggleMyList}
          myList={myList}
          incrementMovieViews={incrementMovieViews}
        />
      )}
    </div>
  );
}

const heroBannerStyle = (img) => ({
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '75vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const heroGradientStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to right, rgba(20,20,20,0.95) 25%, rgba(0,0,0,0) 100%), linear-gradient(to top, #141414 0%, rgba(20,20,20,0) 30%)',
  padding: '0 4%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const categoryLabelStyle = {
  fontSize: '0.9rem',
  color: '#e50914',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  letterSpacing: '3px',
  marginBottom: '0.5rem'
};

const heroTitleStyle = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  maxWidth: '55%'
};

const heroDescriptionStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.5',
  color: '#e5e5e5',
  maxWidth: '45%',
  marginBottom: '1.5rem'
};

const heroPlayBtn = {
  background: '#fff',
  color: '#000',
  border: 'none',
  padding: '0.8rem 2rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer'
};

const heroInfoBtn = {
  background: 'rgba(109, 109, 110, 0.7)',
  color: '#fff',
  border: 'none',
  padding: '0.8rem 2rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer'
};

const userPanelStyle = {
  background: '#0f0f0f',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  padding: '1rem 4%',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const userWelcomeStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  margin: 0,
  color: '#ffffff'
};

const userDetailStyle = {
  margin: '0.25rem 0 0',
  color: '#d3d3d3',
  fontSize: '0.95rem'
};