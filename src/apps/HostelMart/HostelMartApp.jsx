import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './HostelMart.css';

import HmNavbar from './components/HmNavbar';
import HmHome from './pages/HmHome';
import HmBrowse from './pages/HmBrowse';
import HmList from './pages/HmList';
import HmDetails from './pages/HmDetails';
import HmAbout from './pages/HmAbout';

export default function HostelMartApp() {
  return (
    <div className="hm-app hm-body">
      <HmNavbar />
      <Routes>
        <Route path="/" element={<HmHome />} />
        <Route path="/browse" element={<HmBrowse />} />
        <Route path="/list" element={<HmList />} />
        <Route path="/details/:id" element={<HmDetails />} />
        <Route path="/about" element={<HmAbout />} />
      </Routes>
    </div>
  );
}
