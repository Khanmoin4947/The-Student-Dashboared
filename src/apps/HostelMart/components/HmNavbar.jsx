import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function HmNavbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === `/hostel-mart${path}` ? 'active' : '';

  return (
    <nav className="hm-navbar">
      <Link to="/hostel-mart" className="hm-logo">
        <ShoppingCart className="hm-icon" />
        Hostel<span>Mart</span>
      </Link>
      <div className="hm-nav-links">
        <Link to="/hostel-mart/browse" className={isActive('/browse')}>Browse Items</Link>
        <Link to="/hostel-mart/list" className={isActive('/list')}>Add Item</Link>
        <Link to="/hostel-mart/about" className={isActive('/about')}>About Us</Link>
      </div>
    </nav>
  );
}
