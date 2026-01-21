
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { searchContent, SearchResult } from '../services/content';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isBMOpen, setIsBMOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setIsDataOpen(false);
    setIsBMOpen(false);
    setShowResults(false);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const results = searchContent(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    setShowResults(false);
    setSearchQuery('');
  };

  const dropdownItemClass = "block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-primary rounded-xl transition-colors";

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://i.postimg.cc/jjDJcspx/datasphere.png" 
                alt="DataSphere" 
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            
            {/* Data Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary rounded-xl transition-colors">
                Data
                <svg className="ml-1 w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              <div className="absolute left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-4 group-hover:translate-y-0 pt-4 z-50">
                <div className="rounded-2xl shadow-soft-hover bg-white border border-gray-100 overflow-hidden p-2">
                    <Link to="/track/db-design" className={dropdownItemClass}>Database Design</Link>
                    <Link to="/track/data-management" className={dropdownItemClass}>Data Management</Link>
                    <Link to="/track/data-governance" className={dropdownItemClass}>Data Governance</Link>
                    <Link to="/track/data-products" className={dropdownItemClass}>Data Products</Link>
                    <Link to="/track/operating-model" className={dropdownItemClass}>Data Operating Model</Link>
                </div>
              </div>
            </div>

            {/* B&M Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary rounded-xl transition-colors">
                B&M
                <svg className="ml-1 w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              <div className="absolute left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-4 group-hover:translate-y-0 pt-4 z-50">
                <div className="rounded-2xl shadow-soft-hover bg-white border border-gray-100 overflow-hidden p-2">
                    <Link to="/track/business-strategy" className={dropdownItemClass}>Business Strategy</Link>
                    <Link to="/track/performance-kpis" className={dropdownItemClass}>Performance & KPIs</Link>
                    <Link to="/track/risk-compliance" className={dropdownItemClass}>Risk & Compliance</Link>
                    <Link to="/track/decision-leadership" className={dropdownItemClass}>Decision-Making & Leadership</Link>
                    <Link to="/track/growth-transformation" className={dropdownItemClass}>Growth & Transformation</Link>
                </div>
              </div>
            </div>

            <Link to="/sql-mastery" className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary rounded-xl transition-colors">SQL Mastery</Link>
            <Link to="/practise-sql" className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary rounded-xl transition-colors">Practise SQL</Link>
            
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
                <div className="flex items-center bg-gray-100/50 border border-gray-200 rounded-full px-4 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary focus-within:bg-white w-64 xl:w-72 hover:border-gray-300">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                      type="text" 
                      placeholder="Rechercher une leçon..." 
                      className="ml-3 bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-800"
                      value={searchQuery}
                      onChange={handleSearch}
                      onFocus={() => { if(searchQuery.length > 1) setShowResults(true); }}
                    />
                </div>

                {showResults && (
                   <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-soft-hover border border-gray-100 overflow-hidden max-h-[20rem] overflow-y-auto z-50">
                      {searchResults.length > 0 ? (
                        <ul>
                          {searchResults.map((result, idx) => (
                             <li key={idx}>
                                <button 
                                   onClick={() => handleResultClick(result.url)}
                                   className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group"
                                >
                                   <div className="text-[10px] font-bold text-primary uppercase mb-0.5 tracking-wider">{result.type}</div>
                                   <div className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors truncate">{result.title}</div>
                                </button>
                             </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-5 py-6 text-center text-sm text-gray-500">
                           Aucun résultat trouvé pour "{searchQuery}".
                        </div>
                      )}
                   </div>
                )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <button onClick={() => navigate('/profile')} className="flex items-center space-x-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                 <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200" />
                 <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-gray-900 leading-none">{user.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Mon Profil</p>
                 </div>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-primary transition-colors px-2">
                  Se connecter
                </Link>
                <Link to="/signup" className="px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Créer un compte
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-primary bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none"
            >
              {isOpen ? (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-20 h-[calc(100vh-80px)] overflow-y-auto pb-20 animate-fade-in z-40">
          <div className="px-4 pt-6 pb-6 space-y-4">
            
            <div className="mb-6 relative">
               <input 
                 type="text" 
                 placeholder="Rechercher..." 
                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                 value={searchQuery}
                 onChange={handleSearch}
               />
               {showResults && (
                   <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100">
                      {searchResults.length > 0 ? (
                        searchResults.map((result, idx) => (
                           <button 
                             key={idx}
                             onClick={() => { handleResultClick(result.url); setIsOpen(false); }}
                             className="w-full text-left px-4 py-3 border-b border-gray-50 last:border-0"
                           >
                              <div className="text-xs font-bold text-primary uppercase">{result.type}</div>
                              <div className="text-sm font-medium text-gray-900">{result.title}</div>
                           </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">Aucun résultat.</div>
                      )}
                   </div>
               )}
            </div>

            {/* Mobile Data Accordion */}
            <div>
              <button 
                onClick={() => setIsDataOpen(!isDataOpen)}
                className="w-full flex justify-between items-center px-4 py-4 rounded-xl text-lg font-bold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span>Data</span>
                <svg className={`w-5 h-5 transform transition-transform ${isDataOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" /></svg>
              </button>
              {isDataOpen && (
                <div className="pl-4 space-y-2 mt-1 mb-2 border-l-2 border-gray-100 ml-4">
                   <Link to="/track/db-design" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Database Design</Link>
                   <Link to="/track/data-management" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Data Management</Link>
                   <Link to="/track/data-governance" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Data Governance</Link>
                   <Link to="/track/data-products" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Data Products</Link>
                   <Link to="/track/operating-model" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Data Operating Model</Link>
                </div>
              )}
            </div>

            {/* Mobile B&M Accordion */}
            <div>
              <button 
                onClick={() => setIsBMOpen(!isBMOpen)}
                className="w-full flex justify-between items-center px-4 py-4 rounded-xl text-lg font-bold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span>B&M</span>
                <svg className={`w-5 h-5 transform transition-transform ${isBMOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" /></svg>
              </button>
              {isBMOpen && (
                <div className="pl-4 space-y-2 mt-1 mb-2 border-l-2 border-gray-100 ml-4">
                   <Link to="/track/business-strategy" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Business Strategy</Link>
                   <Link to="/track/performance-kpis" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Performance & KPIs</Link>
                   <Link to="/track/risk-compliance" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Risk & Compliance</Link>
                   <Link to="/track/decision-leadership" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Decision-Making & Leadership</Link>
                   <Link to="/track/growth-transformation" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary">Growth & Transformation</Link>
                </div>
              )}
            </div>

            <Link to="/sql-mastery" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl text-lg font-bold text-gray-800 hover:bg-gray-50 transition-colors">SQL Mastery</Link>
            <Link to="/practise-sql" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl text-lg font-bold text-gray-800 hover:bg-gray-50 transition-colors">Practise SQL</Link>
            
            <div className="h-px bg-gray-100 my-4"></div>

            {!isAuthenticated ? (
               <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-800">Se connecter</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl bg-primary text-white font-bold shadow-lg">Créer un compte</Link>
               </div>
            ) : (
               <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-4 py-4 rounded-xl bg-blue-50 text-primary font-bold">
                  <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <span>Mon Profil</span>
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
