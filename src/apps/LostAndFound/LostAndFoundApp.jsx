import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './LostAndFound.css';

import LfNavbar from './components/LfNavbar';
import LfHome from './pages/LfHome';
import LfBrowse from './pages/LfBrowse';
import LfReport from './pages/LfReport';
import LfAbout from './pages/LfAbout';

export default function LostAndFoundApp() {
  return (
    <div className="lf-app lf-body">
      <LfNavbar />
      <div className="lf-main">
        <Routes>
          <Route path="/" element={<LfHome />} />
          <Route path="/items" element={<LfBrowse />} />
          <Route path="/report" element={<LfReport />} />
          <Route path="/about" element={<LfAbout />} />
        </Routes>
      </div>
    </div>
  );
}
