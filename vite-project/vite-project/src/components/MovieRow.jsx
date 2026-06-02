import React from 'react';

export default function MovieRow({ title, movies, onMovieSelect, toggleMyList, myList }) {
  return (
    <div style={{ marginBottom: '2.5rem', padding: '0 4%' }}>
      <h2 style={{ fontSize: '1.4rem', color: '#e5e5e5', marginBottom: '0.8rem', fontWeight: 'bold' }}>{title}</h2>
      <div style={scrollRowStyle}>
        {movies?.map(movie => {
          const isAdded = myList?.some(item => item.id === movie.id);
          return (
            <div key={movie.id} style={cardContainerStyle}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={posterImageStyle}
                onClick={() => onMovieSelect(movie)}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/400x600?text=No+Image'; }}
              />
              <div style={cardOverlayStyle}>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.4rem 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{movie.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => onMovieSelect(movie)} style={playBtnSmall}>Play</button>
                  <button onClick={() => toggleMyList(movie)} style={listBtnStyle(isAdded)}>
                    {isAdded ? "✓ My List" : "+ My List"}
                  </button>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#aaa', display: 'flex', gap: '0.5rem' }}>
                  <span>★ {movie.rating}</span>
                  <span>{movie.year}</span>
                  <span style={{ marginLeft: 'auto', color: '#e50914' }}>{movie.views} views</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const scrollRowStyle = {
  display: 'flex',
  gap: '1rem',
  overflowX: 'auto',
  paddingBottom: '1rem',
  scrollBehavior: 'smooth'
};

const cardContainerStyle = {
  minWidth: '200px',
  maxWidth: '200px',
  position: 'relative',
  borderRadius: '6px',
  overflow: 'hidden',
  backgroundColor: '#181818',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  zIndex: 1
};

const posterImageStyle = {
  width: '100%',
  height: '280px',
  objectFit: 'cover',
  display: 'block'
};

const cardOverlayStyle = {
  padding: '0.8rem',
  background: 'linear-gradient(to top, #141414, #222)'
};

const playBtnSmall = {
  background: '#ffffff',
  color: '#000',
  border: 'none',
  padding: '0.3rem 0.8rem',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer'
};

const listBtnStyle = (added) => ({
  background: added ? '#333' : 'transparent',
  border: '1px solid #666',
  color: '#fff',
  padding: '0.3rem 0.6rem',
  fontSize: '0.75rem',
  borderRadius: '4px',
  cursor: 'pointer'
});