import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import modular components
import Header from './components/layout/Header';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RestaurantMenu from './components/restaurants/RestaurantMenu';
import OrderHistory from './components/orders/OrderHistory';
import OrderDetail from './components/orders/OrderDetail';


function App() {
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };
  return (
    <BrowserRouter>
      {/* Top navigation rendered on every page */}
      <Header currentUser={user} onLogout={handleLogout} />

      {/* SPA route definitions */}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
    } />

    {/* Restaurant Menu Route with dynamic ID */}
    <Route path="/restaurants/:id" element={
      <ProtectedRoute>
        <RestaurantMenu />
      </ProtectedRoute>
    } />

    {/* Order History Route */}
    <Route path="/history" element={
      <ProtectedRoute>
        <OrderHistory />
      </ProtectedRoute>
    } />

    {/* Specific Order Details Route */}
    <Route path="/orders/:id" element={
      <ProtectedRoute>
        <OrderDetail />
      </ProtectedRoute>
    } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;