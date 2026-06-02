import React, { useState } from 'react';

export default function MovieRow({ title, movies, onMovieSelect, toggleMyList, myList, showNumbers = false }) {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  return (
    <div style={{ marginBottom: '2.5rem', padding: '0 4%' }}>
      <h2 style={{ fontSize: '1.4rem', color: '#e5e5e5', marginBottom: '0.8rem', fontWeight: 'bold' }}>{title}</h2>
      <div style={scrollRowStyle}>
        {movies?.map((movie, index) => {
          const isHovered = hoveredMovieId === movie.id;

          return (
            <div
              key={movie.id}
              style={getCardContainerStyle(isHovered)}
              onMouseEnter={() => setHoveredMovieId(movie.id)}
              onMouseLeave={() => setHoveredMovieId(null)}
            >
              {showNumbers && (
                <span style={rankBadgeStyle}>{index + 1}</span>
              )}
              <img
                src={movie.poster}
                alt={movie.title}
                style={posterImageStyle}
                onClick={() => onMovieSelect(movie)}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/400x600?text=No+Image'; }}
              />
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

const getCardContainerStyle = (hovered) => ({
  ...cardContainerStyle,
  transform: hovered ? 'scale(1.08)' : 'scale(1)',
  boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.35)' : 'none',
  zIndex: hovered ? 2 : 1
});

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

const rankBadgeStyle = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  backgroundColor: 'rgba(0,0,0,0.75)',
  color: '#fff',
  padding: '6px 10px',
  borderRadius: '999px',
  fontSize: '0.9rem',
  fontWeight: '700',
  letterSpacing: '0.05em',
  zIndex: 3
};

const posterImageStyle = {
  width: '100%',
  height: '280px',
  objectFit: 'cover',
  display: 'block'
};



