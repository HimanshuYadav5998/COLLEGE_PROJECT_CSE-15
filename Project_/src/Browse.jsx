import React, { useState, useEffect } from 'react';
import './App.css';

function Browse() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCounts, setClickCounts] = useState({});
  const [lastClickedTitle, setLastClickedTitle] = useState("");

  const handleImageClick = async (title) => {
    // 1. Immediately update the UI so it feels fast to the user
    setLastClickedTitle(title);
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [title]: (prevCounts[title] || 0) + 1
    }));

    // 2. Send the data permanently to the Java Backend
    try {
      await fetch('http://localhost:8080/api/stats/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // We package the title into JSON to match the Java MovieClick class
        body: JSON.stringify({ movieTitle: title })
      });
    } catch (error) {
      console.error("Failed to save click to Java backend", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- MOVIE DATA ARRAYS ---

  const trendingShows = [
    { id: 1, title: "Sex Education", image: "https://tse2.mm.bing.net/th/id/OIP.qiFmzoh7jRaNmuKEHnYJPwHaKM?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 2, title: "Wednesday", image: "https://posterspy.com/wp-content/uploads/2023/01/Wednesday-2.jpg" },
    { id: 3, title: "Bird Box", image: "https://tse2.mm.bing.net/th/id/OIP.U8kvi6fvPP1-wherquqgfwHaLL?w=1356&h=2048&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 4, title: "Squid Game ", image: "https://m.media-amazon.com/images/M/MV5BYTU3ZDVhNmMtMDVlNC00MDc0LTgwNDMtYWE5MTI2ZGI4YWIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 5, title: "I Care A Lot", image: "https://fontmeme.com/images/ICARE-A-LOT-FONT-1-370x548.jpg" },
    { id: 6, title: "Extraction", image: "https://tse1.explicit.bing.net/th/id/OIP.MtcMk7Rq1VJ5ry9QA35aBwHaK_?w=674&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 7, title: "Chicago 7", image: "https://c8.alamy.com/comp/2E9XB1E/the-trial-of-the-chicago-7-2020-directed-by-aaron-sorkin-credit-dreamworks-pictures-album-2E9XB1E.jpg" },
    { id: 8, title: "Murder Mystery", image: "https://tse3.mm.bing.net/th/id/OIP.aqjI0CZPWnXzQGRbmiHqxQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 9, title: "Dick Johnson is Dead", image: "https://tse2.mm.bing.net/th/id/OIP.tpv9Ft4LhSt0WPlOnyMfuAHaK-?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 10, title: "The Power of the Dog", image: "https://tse2.mm.bing.net/th/id/OIP.bMMR7COkh-7Zrsk65OKK-AHaK-?rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];
                                
  const continueWatching = [
    { id: 1, title: "Continue Movie 1", image: "https://tse2.mm.bing.net/th/id/OIP.qiFmzoh7jRaNmuKEHnYJPwHaKM?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 2, title: "Continue Movie 2", image: "https://posterspy.com/wp-content/uploads/2023/01/Wednesday-2.jpg" },
    { id: 3, title: "Continue Movie 3", image: "https://tse1.mm.bing.net/th/id/OIP.5G_lRlCGTwyl4AXVE-nHvQHaK-?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 4, title: "Continue Movie 4", image: "https://c8.alamy.com/comp/2E9XB1E/the-trial-of-the-chicago-7-2020-directed-by-aaron-sorkin-credit-dreamworks-pictures-album-2E9XB1E.jpg" },
    { id: 5, title: "Continue Movie 5", image: "https://tse2.mm.bing.net/th/id/OIP.bMMR7COkh-7Zrsk65OKK-AHaK-?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 6, title: "Continue Movie 6", image: "https://image.tmdb.org/t/p/original/drKpe1UXOVg5tYGso44Q0axWePV.jpg" },
  ];

  // --- NEW SECTIONS ---
  const popularMovies = [
    { id: 1, title: "Popular 1", image: "https://tse3.mm.bing.net/th/id/OIP.6VSClX0y3ZZm0JJ4tfpi2AHaK-?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 2, title: "Popular 2", image: "https://image.tmdb.org/t/p/w780/7HVO15FMFcwmrbChM4y4xV6KIWH.jpg" },
    { id: 3, title: "Popular 3", image: "https://th.bing.com/th/id/R.512c1628b8fe54e59359cccb3fa26cfa?rik=8ZiYN5%2fFjX9ODw&riu=http%3a%2f%2fryreviews.com%2fwp-content%2fuploads%2f2019%2f02%2froma.jpg&ehk=7r08xaLXAnNk%2bT9FYh5v46TlI5rxRNF2j%2f2P5mYf3L4%3d&risl=&pid=ImgRaw&r=0" },
    { id: 4, title: "Popular 4", image: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/LIONSGATEPLAY/MOVIE/67e52ef0f5fed064b2326136/images/LANDSCAPE_169/BEFOREIWAKE0Y2016M-airtel-cover-poster-1923X1082.jpg?o=production" },
    { id: 5, title: "Popular 5", image: "https://image.tmdb.org/t/p/original/drKpe1UXOVg5tYGso44Q0axWePV.jpg" },
    { id: 6, title: "Popular 6", image: "https://image.tmdb.org/t/p/w780/7HVO15FMFcwmrbChM4y4xV6KIWH.jpg" },
  ];

  const netflixOriginals = [
    { id: 1, title: "Original 1", image: "https://cdn.moviefone.com/image-assets/1020662/hIJ5QNIjQ2oILCNLBtbnS0Cmw9z.jpg?d=360x540&q=80" },
    { id: 2, title: "Original 2", image: "https://cdn.moviefone.com/image-assets/1228710/5Vi8dSauVwH1HOsiZceDMbRr1Ca.jpg?d=360x540&q=80" },
    { id: 3, title: "Original 3", image: "https://freakingeek.com/wp-content/uploads/2020/12/Equinox-Banniere-800x445.jpg" },
    { id: 4, title: "Original 4", image: "https://tse4.mm.bing.net/th/id/OIP.0p1BidynRpXiA72d-bkPMgHaKk?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 5, title: "Original 5", image: "https://cdn-p.smehost.net/sites/90b58e35a8714a8bbe2e845a0b7bffd2/wp-content/uploads/2020/11/Voices-of-Fire-RCAI-v2.png" },
    { id: 6, title: "Original 6", image: "https://tse4.mm.bing.net/th/id/OIP.0p1BidynRpXiA72d-bkPMgHaKk?rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  const myList = [
    { id: 1, title: "Saved 1", image: "https://cdn.moviefone.com/image-assets/1020662/hIJ5QNIjQ2oILCNLBtbnS0Cmw9z.jpg?d=360x540&q=80" },
    { id: 2, title: "Saved 2", image: "https://cdn-p.smehost.net/sites/90b58e35a8714a8bbe2e845a0b7bffd2/wp-content/uploads/2020/11/Voices-of-Fire-RCAI-v2.png" },
    { id: 3, title: "Saved 3", image: "https://freakingeek.com/wp-content/uploads/2020/12/Equinox-Banniere-800x445.jpg" },
    { id: 4, title: "Saved 4", image: "https://m.media-amazon.com/images/M/MV5BYTU3ZDVhNmMtMDVlNC00MDc0LTgwNDMtYWE5MTI2ZGI4YWIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 5, title: "Saved 5", image: "https://image.tmdb.org/t/p/original/drKpe1UXOVg5tYGso44Q0axWePV.jpg" },
    { id: 6, title: "Saved 6", image: "https://tse4.mm.bing.net/th/id/OIP.0p1BidynRpXiA72d-bkPMgHaKk?rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  return (
    <div className="app-container">
      {/* NAVIGATION */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <div className="logo">NETFLIX</div>
          <ul className="nav-links">
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">TV Shows</a></li>
            <li><a href="#">Movies</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Game of Thrones</h1>
          <p className="hero-description">
            Nine noble families fight for control over the lands of Westeros, 
            while an ancient enemy returns after being dormant for millennia.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-play">▶ Play</button>
            <button className="btn btn-info">ⓘ More Info</button>
          </div>
        </div>
      </div>

      {/* 1. TRENDING ROW (With Overlapping Numbers) */}
      <div className="content-section">
        <h2 className="row-title">Trending Now</h2>
        <div className="content-row">
          {trendingShows.map((show) => (
            <div 
              className="trending-card" 
              key={`trending-${show.id}`}
              onClick={() => handleImageClick(show.title)}
            >
              <div className="trending-number">{show.id}</div>
              <div className="trending-image">
                <img src={show.image} alt={show.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CONTINUE WATCHING ROW */}
      <div className="content-section">
        <h2 className="row-title">Continue Watching for Himanshu</h2>
        <div className="content-row">
          {continueWatching.map((movie) => (
            <div 
              className="content-card" 
              key={`continue-${movie.id}`}
              onClick={() => handleImageClick(movie.title)}
            >
               <img src={movie.image} alt={movie.title} className="card-image" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. POPULAR ON NETFLIX ROW */}
      <div className="content-section">
        <h2 className="row-title">Popular on Netflix</h2>
        <div className="content-row">
          {popularMovies.map((movie) => (
            <div 
              className="content-card" 
              key={`popular-${movie.id}`}
              onClick={() => handleImageClick(movie.title)}
            >
               <img src={movie.image} alt={movie.title} className="card-image" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. NETFLIX ORIGINALS ROW */}
      <div className="content-section">
        <h2 className="row-title">Netflix Originals</h2>
        <div className="content-row">
          {netflixOriginals.map((movie) => (
            <div 
              className="content-card" 
              key={`originals-${movie.id}`}
              onClick={() => handleImageClick(movie.title)}
            >
               <img src={movie.image} alt={movie.title} className="card-image" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. MY LIST ROW */}
      <div className="content-section">
        <h2 className="row-title">My List</h2>
        <div className="content-row">
          {myList.map((movie) => (
            <div 
              className="content-card" 
              key={`mylist-${movie.id}`}
              onClick={() => handleImageClick(movie.title)}
            >
               <img src={movie.image} alt={movie.title} className="card-image" />
            </div>
          ))}
        </div>
      </div>

      {/* --- PREMIUM CLICK COUNTER DASHBOARD --- */}
      <div className="click-counter-section">
        <div className="stats-info">
          <h3>Activity Stats</h3>
          {lastClickedTitle ? (
            <p>
              You recently clicked on <span className="highlight-text">{lastClickedTitle}</span>
            </p>
          ) : (
            <p>Click on any movie or show to track your views.</p>
          )}
        </div>
        <div className="stats-display">
          <span className="stats-label">Total Clicks</span>
          <div className="stats-number">
            {lastClickedTitle ? clickCounts[lastClickedTitle] : 0}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Browse;