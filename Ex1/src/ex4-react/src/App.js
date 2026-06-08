import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import modular components
import Header from './components/layout/Header';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <BrowserRouter>
      {/* Top navigation rendered on every page */}
      <Header />

      {/* SPA route definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;