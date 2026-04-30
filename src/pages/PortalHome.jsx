import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, ArrowRight } from 'lucide-react';
import './PortalHome.css';

function PortalHome() {
  return (
    <div className="portal-container">
      <div className="portal-header">
        <h1>Welcome to <span>The Student Dashboard</span></h1>
        <p>Your one-stop destination for campus trading and finding lost items.</p>
      </div>
      
      <div className="portal-cards">
        <Link to="/hostel-mart" className="portal-card hostel-card">
          <div className="card-bg"></div>
          <div className="card-content">
            <div className="icon-wrapper">
              <ShoppingCart size={40} />
            </div>
            <h2>Hostel Mart</h2>
            <p>Buy and sell items within the campus securely. From textbooks to electronics.</p>
            <div className="card-action">
              <span>Enter Marketplace</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>
        
        <Link to="/lost-and-found" className="portal-card lost-card">
          <div className="card-bg"></div>
          <div className="card-content">
            <div className="icon-wrapper">
              <Search size={40} />
            </div>
            <h2>Lost & Found</h2>
            <p>Lost something? Found an item? Reconnect belongings with their owners.</p>
            <div className="card-action">
              <span>Enter Directory</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>
      </div>
      
      <footer className="portal-footer">
        <p>&copy; {new Date().getFullYear()} Findit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default PortalHome;
