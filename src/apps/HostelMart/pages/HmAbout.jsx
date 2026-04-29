import React from 'react';
import { ShieldCheck, Tag, HeartHandshake } from 'lucide-react';

export default function HmAbout() {
  return (
    <div className="hm-container hm-container-sm" style={{maxWidth: '800px'}}>
      <h1 className="hm-section-title">About HostelMart</h1>
      
      <div className="hm-about-card">
        <h2>Our Mission</h2>
        <p>HostelMart was built with a simple goal in mind: to help students living on campus buy and sell essentials easily. By keeping the marketplace localized to your college, we eliminate shipping costs and allow you to quickly exchange goods with people you trust.</p>

        <h2>Why Choose Us?</h2>
        <div className="hm-features-grid">
          <div className="hm-feature-item">
            <ShieldCheck className="hm-feature-icon" color="#ef4444" />
            <h4>Safe & Local</h4>
            <p>Exchange items directly within your campus safely.</p>
          </div>
          <div className="hm-feature-item">
            <Tag className="hm-feature-icon" color="#ef4444" />
            <h4>Great Deals</h4>
            <p>Find second-hand textbooks, electronics, and more at low prices.</p>
          </div>
          <div className="hm-feature-item">
            <HeartHandshake className="hm-feature-icon" color="#ef4444" />
            <h4 style={{fontSize: '1.2rem', marginBotton: '0.5rem'}}>Eco-Friendly</h4>
            <p>Reduce waste by passing along items you no longer need.</p>
          </div>
        </div>
        
        <h2>How It Works</h2>
        <p style={{marginTop: '1rem'}}>
          <strong>1. Browse:</strong> Look through the marketplace to find what you need.<br/>
          <strong>2. Contact:</strong> Use the provided contact info to reach out to the seller directly.<br/>
          <strong>3. Meet Up:</strong> Arrange a safe meeting spot on campus to exchange the item and payment.<br/>
        </p>
      </div>
    </div>
  );
}
