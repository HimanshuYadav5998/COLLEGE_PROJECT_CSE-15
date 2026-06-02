import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Browse from './Browse';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The default path "/" shows the Registration Page */}
        <Route path="/" element={<Register />} />
        
        {/* The path "/browse" shows your Movie Dashboard */}
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;