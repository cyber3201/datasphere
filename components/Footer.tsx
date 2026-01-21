import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="https://i.postimg.cc/jjDJcspx/datasphere.png" 
                alt="DataSphere" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              Plateforme éducative dédiée aux sciences de la donnée. 
              Conçue pour accompagner la nouvelle génération de leaders data.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Parcours</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/sql-mastery" className="hover:text-primary transition-colors">SQL Mastery</Link></li>
              <li><Link to="/track/data-governance" className="hover:text-primary transition-colors">Gouvernance</Link></li>
              <li><Link to="/track/db-design" className="hover:text-primary transition-colors">Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Légal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link to="/conditions" className="hover:text-primary transition-colors">Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2026 DataSphere. Projet étudiant.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-bold">
             <a href="https://www.linkedin.com/in/zakaryagbibar/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
             <a href="https://github.com/cyber3201" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;