import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SqlMastery from './pages/SqlMastery';
import TrackListing from './pages/TrackListing';
import ArticlePage from './pages/ArticlePage';
import Practice from './pages/Practice';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { Privacy, Terms, Contact } from './pages/Legal';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Public Track Landing Pages */}
                <Route path="/sql-mastery" element={<SqlMastery />} />
                <Route path="/track/:trackId" element={<TrackListing />} />
                
                {/* Protected Content */}
                <Route path="/lesson/:trackId/:lessonId" element={<ArticlePage />} />
                
                <Route path="/practise-sql" element={<Practice />} />
                
                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Legal - French Routes */}
                <Route path="/confidentialite" element={<Privacy />} />
                <Route path="/conditions" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;