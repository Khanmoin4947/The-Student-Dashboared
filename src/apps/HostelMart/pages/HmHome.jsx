import React from 'react';
import { Link } from 'react-router-dom';

export default function HmHome() {
  return (
    <div className="hm-home">
      <div className="hm-hero">
        <h1>Welcome to <span>HostelMart</span></h1>
        <p>Buy and sell essential items locally within the campus. Save money, reduce waste, and find exactly what you need near you.</p>
        <div className="hm-hero-buttons">
          <Link to="/hostel-mart/browse" className="hm-btn">Browse Items</Link>
          <Link to="/hostel-mart/list" className="hm-btn hm-btn-secondary">List an Item</Link>
        </div>
      </div>
    </div>
  );
}
