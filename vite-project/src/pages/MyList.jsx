import React, { useState } from 'react';
import MovieModal from '../components/MovieModal';

export default function MyList({ myList, toggleMyList, incrementMovieViews }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div style={{ padding: '2rem 4%', minHeight: '80vh' }} className="fade-in">
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>My List</h1>

      {myList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#555' }}>
          <h2>Your list is currently empty</h2>
          <p style={{ marginTop: '0.5rem' }}>Explore content rows and add movies to bookmark them here.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {myList.map(movie => (
            <div key={movie.id} style={cardContainerStyle}>
              <img src={movie.poster} alt={movie.title} style={posterImageStyle} onClick={() => setSelectedMovie(movie)} />
              <div style={metaOverlayStyle}>
                <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>{movie.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setSelectedMovie(movie)} style={playBtnSmall}>▶ Play</button>
                  <button onClick={() => toggleMyList(movie)} style={removeBtnSmall}>Remove</button>
                </div>
              </div>
            </div>
          ))}
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

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '1.5rem'
};

const cardContainerStyle = {
  backgroundColor: '#181818',
  borderRadius: '6px',
  overflow: 'hidden',
  cursor: 'pointer'
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

const removeBtnSmall = {
  background: 'transparent',
  border: '1px solid #444',
  color: '#888',
  padding: '0.3rem 0.6rem',
  fontSize: '0.8rem',
  borderRadius: '3px',
  cursor: 'pointer'
};