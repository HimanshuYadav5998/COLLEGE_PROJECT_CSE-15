import React, { useState } from 'react';
import MovieModal from '../components/MovieModal';

export default function Browse({ movies, toggleMyList, myList, incrementMovieViews, searchQuery, setSearchQuery }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Action", "Sci-Fi", "Documentary"];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div style={{ padding: '2rem 4%', minHeight: '80vh' }} className="fade-in">
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Search and Catalog Filter</h1>

      {/* Control Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            style={genreButtonStyle(selectedGenre === g)}
          >
            {g} Titles
          </button>
        ))}
      </div>

      {searchQuery && (
        <p style={{ color: '#aaa', marginBottom: '1rem' }}>
          Showing {filteredMovies.length} results for: "<strong>{searchQuery}</strong>"
        </p>
      )}

      {filteredMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
          <h2>No Matching Content Found</h2>
          <p>Try exploring another genre button above.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {filteredMovies.map(movie => {
            const isAdded = myList.some(item => item.id === movie.id);
            return (
              <div key={movie.id} style={cardContainerStyle}>
                <img src={movie.poster} alt={movie.title} style={posterImageStyle} onClick={() => setSelectedMovie(movie)} />
                <div style={metaOverlayStyle}>
                  <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>{movie.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => setSelectedMovie(movie)} style={playBtnSmall}>▶ Play</button>
                    <button onClick={() => toggleMyList(movie)} style={listBtnSmall(isAdded)}>
                      {isAdded ? "✓ On List" : "+ Add"}
                    </button>
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#999' }}>
                    <span>{movie.genre}</span>
                    <span style={{ color: '#e50914' }}>{movie.views} views</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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

const genreButtonStyle = (active) => ({
  background: active ? '#e50914' : '#222',
  color: '#fff',
  border: active ? 'none' : '1px solid #444',
  padding: '0.5rem 1.2rem',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  transition: 'background-color 0.2s'
});

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '1.5rem'
};

const cardContainerStyle = {
  backgroundColor: '#181818',
  borderRadius: '6px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s'
};

const posterImageStyle = {
  width: '100%',
  height: '250px',
  objectFit: 'cover'
};

const metaOverlayStyle = {
  padding: '0.8rem'
};

const playBtnSmall = {
  background: '#fff',
  border: 'none',
  padding: '0.3rem 0.8rem',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  borderRadius: '3px',
  cursor: 'pointer'
};

const listBtnSmall = (added) => ({
  background: added ? '#333' : 'transparent',
  border: '1px solid #555',
  color: '#fff',
  padding: '0.3rem 0.6rem',
  fontSize: '0.8rem',
  borderRadius: '3px',
  cursor: 'pointer'
});