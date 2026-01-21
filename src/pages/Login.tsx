
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  // High contrast input style
  const inputClass = "block w-full border border-gray-300 rounded-lg p-3 text-sm bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="flex w-full max-w-4xl bg-white rounded-3xl shadow-soft overflow-hidden min-h-[500px] border border-gray-100">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50 relative flex-col items-center justify-center p-12 text-center">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
              <img src="https://i.postimg.cc/jjDJcspx/datasphere.png" alt="Logo" className="h-20 w-auto mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-primary mb-4">Bon retour parmi nous</h2>
              <p className="text-slate-600">Reprenez votre apprentissage là où vous l'avez laissé. De nouveaux défis SQL vous attendent.</p>
           </div>
           <div className="mt-8 flex gap-2">
             <div className="w-2 h-2 rounded-full bg-primary"></div>
             <div className="w-2 h-2 rounded-full bg-primary/30"></div>
             <div className="w-2 h-2 rounded-full bg-primary/30"></div>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-bold text-text font-display mb-2">Connexion</h1>
            <p className="text-muted text-sm">Entrez vos identifiants pour accéder aux cours.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-text mb-2">Email</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="nom@exemple.com"
                required 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-bold text-text">Mot de passe</label>
                 <a href="#" className="text-xs text-primary font-bold hover:underline">Oublié ?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
            >
              Se connecter
            </button>

            <div className="text-center mt-4">
              <p className="text-xs text-slate-400">
                Demo access: Username: <span className="font-medium text-slate-500">datasphere</span> Password: <span className="font-medium text-slate-500">data</span>
              </p>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            Pas encore de compte ? <Link to="/signup" className="text-primary font-bold cursor-pointer hover:underline">Créer un compte</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
