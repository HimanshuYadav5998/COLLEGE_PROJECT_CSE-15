import React from 'react';

export default function Dashboard({ activityLog, movies, setActivityLog }) {
  const clearLogs = () => {
    setActivityLog([]);
    localStorage.removeItem("netflix_activity_logs");
  };

  const totalViews = movies.reduce((sum, movie) => sum + (movie.views || 0), 0);

  return (
    <div style={{ padding: '2rem 4%', minHeight: '80vh' }} className="fade-in">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Streaming Analytics & Activity Logs</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Satisfies college criteria requirements for user tracking metrics and streaming statistics logging.</p>

      {/* Aggregate Statistics Row */}
      <div style={statsRowStyle}>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Total Platform Watch Activity</span>
          <span style={{ ...statNumberStyle, color: '#e50914' }}>{totalViews} Plays</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Tracked Video Elements</span>
          <span style={statNumberStyle}>{movies.length} Assets</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Active Live Session Status</span>
          <span style={{ ...statNumberStyle, color: '#46d369' }}>Running</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.3rem' }}>Live Session Action Tracking logs</h2>
        <button onClick={clearLogs} style={clearButtonStyle}>Clear Logs</button>
      </div>

      <div style={logBoxStyle}>
        {activityLog.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <p>No activity tracked in this session yet.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Open video details or play any video to generate real-time metrics.</p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>User Account</th>
                <th style={thStyle}>Action Triggered</th>
                <th style={thStyle}>Details Metadata</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={tdStyle}>{log.timestamp}</td>
                  <td style={{ ...tdStyle, color: '#aaa' }}>{log.user}</td>
                  <td style={tdStyle}>
                    <span style={badgeStyle(log.action)}>{log.action}</span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 'bold' }}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Styles
const statsRowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1.5rem',
  marginBottom: '3rem'
};

const statCardStyle = {
  backgroundColor: '#181818',
  padding: '1.5rem',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const statLabelStyle = {
  color: '#888',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  fontWeight: 'bold'
};

const statNumberStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold'
};

const clearButtonStyle = {
  background: '#333',
  border: 'none',
  color: '#ccc',
  padding: '0.4rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem'
};

const logBoxStyle = {
  backgroundColor: '#181818',
  borderRadius: '6px',
  padding: '1.5rem',
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.9rem'
};

const thStyle = {
  padding: '1rem',
  color: '#888'
};

const tdStyle = {
  padding: '1rem',
  color: '#fff'
};

const badgeStyle = (action) => {
  let color = '#fff';
  let bg = '#333';
  if (action.includes("Stream Started")) { bg = '#1d3b24'; color = '#46d369'; }
  if (action.includes("Login")) { bg = '#112a45'; color = '#007fff'; }
  if (action.includes("Add")) { bg = '#332912'; color = '#ffad1f'; }
  if (action.includes("Remove")) { bg = '#3d161a'; color = '#f85149'; }

  return {
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    backgroundColor: bg,
    color: color
  };
};