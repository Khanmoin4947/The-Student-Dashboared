import React from 'react';
import { Link } from 'react-router-dom';

export default function LfHome() {
  return (
    <div className="lf-container">
      <div className="lf-hero">
        <div className="lf-hero-text">
          <h1>Findit <span>Lost & Found</span></h1>
          <p className="lf-hero-subtitle">
            A centralized place to report missing belongings and post found items. 
            Help keep our campus community strong by returning lost items to their owners.
          </p>
          <div className="lf-hero-actions">
            <Link to="/lost-and-found/items" className="lf-btn lf-btn-primary">View Items directory</Link>
            <Link to="/lost-and-found/report" className="lf-btn lf-btn-secondary">Report an Item</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
