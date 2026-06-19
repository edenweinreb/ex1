import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RestaurantMenu from './components/restaurants/RestaurantMenu';
import OrderHistory from './components/orders/OrderHistory';
import OrderDetail from './components/orders/OrderDetail';
import AddRestaurant from './components/restaurants/AddRestaurant';


function App() {
  const [user, setUser] = React.useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    // Navigation is handled by Header.js
  };

  return (
    <BrowserRouter>
      <Header currentUser={user} onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id" element={<RestaurantMenu />} />
        <Route path="/register" element={<Register />} />
        
        {/* Pass setUser to Login to allow real-time Header updates */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/add-restaurant" element={<AddRestaurant />} />
        

        {/* Protected Routes */}
        <Route path="/history" element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        } />

        <Route path="/orders/:id" element={
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;