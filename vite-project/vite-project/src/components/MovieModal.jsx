import React, { useState } from 'react';

export default function MovieModal({ movie, onClose, toggleMyList, myList, incrementMovieViews }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isAdded = myList.some(item => item.id === movie.id);

  const handleStartPlay = () => {
    setIsPlaying(true);
    incrementMovieViews(movie.id);
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle} className="fade-in">
        <button onClick={onClose} style={closeButtonStyle}>×</button>

        {isPlaying ? (
          <div style={playerContainerStyle}>
            <video width="100%" height="450px" controls autoPlay style={{ objectFit: 'cover' }}>
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={playingOverlayStyle}>
              <span style={{ fontSize: '0.9rem' }}>Now Streaming: <strong>{movie.title}</strong></span>
              <button onClick={() => setIsPlaying(false)} style={stopStreamingButton}>Close Player</button>
            </div>
          </div>
        ) : (
          <div style={heroImageContainer(movie.backdrop)}>
            <div style={gradientOverlayStyle}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{movie.title}</h1>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button onClick={handleStartPlay} style={bigPlayButton}>▶ Play Video</button>
                <button onClick={() => toggleMyList(movie)} style={bigListButton(isAdded)}>
                  {isAdded ? "✓ Added to My List" : "+ Add to My List"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={metaContainerStyle}>
          <div style={{ flex: 2 }}>
            <div style={badgeRowStyle}>
              <span style={{ color: '#46d369', fontWeight: 'bold' }}>{movie.rating * 10}% Match</span>
              <span style={badgeStyle}>{movie.year}</span>
              <span style={badgeStyle}>{movie.duration}</span>
              <span style={{ ...badgeStyle, borderColor: 'red', color: 'red' }}>HD</span>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#ddd' }}>{movie.description}</p>
          </div>
          <div style={{ flex: 1, borderLeft: '1px solid #333', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <span style={labelStyle}>Genre:</span> <span style={valueStyle}>{movie.genre}</span>
            </div>
            <div>
              <span style={labelStyle}>Category:</span> <span style={valueStyle}>{movie.type}</span>
            </div>
            <div>
              <span style={labelStyle}>Total Views Tracked:</span> <span style={{ ...valueStyle, color: '#e50914', fontWeight: 'bold' }}>{movie.views} plays</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '2rem'
};

const modalContentStyle = {
  backgroundColor: '#181818',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '850px',
  overflow: 'hidden',
  position: 'relative'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: 'rgba(0,0,0,0.7)',
  border: 'none',
  color: '#fff',
  fontSize: '2rem',
  cursor: 'pointer',
  zIndex: 10,
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const playerContainerStyle = {
  position: 'relative',
  backgroundColor: '#000'
};

const playingOverlayStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  background: '#141414',
  color: '#fff'
};

const stopStreamingButton = {
  backgroundColor: '#e50914',
  border: 'none',
  color: '#fff',
  padding: '0.4rem 1rem',
  cursor: 'pointer',
  borderRadius: '4px',
  fontWeight: 'bold'
};

const heroImageContainer = (img) => ({
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '380px',
  position: 'relative'
});

const gradientOverlayStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  background: 'linear-gradient(to top, #181818 0%, rgba(24,24,24,0.7) 40%, rgba(0,0,0,0) 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '2rem'
};

const bigPlayButton = {
  backgroundColor: '#ffffff',
  color: '#000',
  border: 'none',
  padding: '0.8rem 1.8rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer'
};

const bigListButton = (added) => ({
  backgroundColor: added ? '#333' : 'rgba(0, 0, 0, 0.6)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.5)',
  padding: '0.8rem 1.8rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer'
});

const metaContainerStyle = {
  padding: '2rem',
  display: 'flex',
  gap: '2rem',
  backgroundColor: '#181818'
};

const badgeRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1rem'
};

const badgeStyle = {
  border: '1px solid #555',
  padding: '0.1rem 0.5rem',
  borderRadius: '3px',
  fontSize: '0.8rem',
  color: '#ccc'
};

const labelStyle = {
  color: '#777',
  fontSize: '0.9rem'
};

const valueStyle = {
  color: '#fff',
  fontSize: '0.9rem'
};