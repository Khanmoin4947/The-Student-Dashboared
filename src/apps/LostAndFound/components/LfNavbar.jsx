import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function LfNavbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === `/lost-and-found${path}` ? 'is-active' : '';

  return (
    <header className="lf-header">
      <div className="lf-container lf-header-inner">
        <Link to="/lost-and-found" className="lf-logo" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
          <Search size={24} color="var(--red-500)" />
          Lost & Found
        </Link>
        <nav className="lf-nav">
          <Link to="/lost-and-found" className={`lf-nav-link ${isActive('')}`}>Home</Link>
          <Link to="/lost-and-found/items" className={`lf-nav-link ${isActive('/items')}`}>Items</Link>
          <Link to="/lost-and-found/report" className={`lf-nav-link ${isActive('/report')}`}>Report</Link>
          <Link to="/lost-and-found/about" className={`lf-nav-link ${isActive('/about')}`}>About</Link>
        </nav>
      </div>
    </header>
  );
}
