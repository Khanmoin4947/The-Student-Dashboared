import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import PortalHome from './pages/PortalHome';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HostelMartApp from './apps/HostelMart/HostelMartApp';
import LostAndFoundApp from './apps/LostAndFound/LostAndFoundApp';

function GlobalHomeButton() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <Link to="/" style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '60px',
      height: '60px',
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
      zIndex: 9999,
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    title="Back to Campus Portal"
    >
      <Home size={28} />
    </Link>
  );
}

function GlobalLogoutButton() {
  const { currentUser, logout } = useAuth();
  
  if (!currentUser) return null;

  return (
    <button onClick={logout} style={{
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      padding: '0.6rem 1.2rem',
      backgroundColor: 'white',
      color: '#ef4444',
      border: '1px solid #fee2e2',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.05)',
      zIndex: 9999,
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(239, 68, 68, 0.05)';
    }}
    >
      <LogOut size={18} />
      Sign Out
    </button>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalHomeButton />
        <GlobalLogoutButton />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><PortalHome /></ProtectedRoute>} />
          <Route path="/hostel-mart/*" element={<ProtectedRoute><HostelMartApp /></ProtectedRoute>} />
          <Route path="/lost-and-found/*" element={<ProtectedRoute><LostAndFoundApp /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
