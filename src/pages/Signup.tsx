import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    school: '',
    age: '',
    source: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on change
  };

  const validate = () => {
    if (formData.age) {
       const ageNum = parseInt(formData.age);
       if (isNaN(ageNum) || ageNum < 14) {
         return "Vous devez avoir au moins 14 ans pour vous inscrire.";
       }
       if (ageNum > 100) {
         return "Veuillez entrer un âge valide.";
       }
    } else {
        return "L'âge est requis.";
    }
    
    // Strict Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Format d'email invalide.";
    }

    if (formData.password.length < 6) {
        return "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (!formData.school.trim()) {
        return "L'établissement scolaire est requis.";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    signup({
      name: formData.name,
      email: formData.email,
      school: formData.school,
      age: formData.age,
      source: formData.source,
      city: 'Casablanca', // Default
    });
    // Redirect to Home as requested
    navigate('/'); 
  };

  const inputClass = "block w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-gray-100 max-w-lg w-full">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Créer un compte</h1>
            <p className="text-muted">Rejoignez la communauté DataSphere gratuitement.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
           {/* Nom & Age Row */}
           <div className="flex gap-4">
              <div className="flex-1">
                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom complet</label>
                 <input 
                   name="name" required
                   value={formData.name} onChange={handleChange}
                   type="text" 
                   className={inputClass}
                   placeholder="John Doe" 
                 />
              </div>
              <div className="w-24">
                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Âge</label>
                 <input 
                   name="age"
                   value={formData.age} onChange={handleChange}
                   type="number" 
                   min="14"
                   className={inputClass}
                   placeholder="22" 
                   required
                 />
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
              <input 
                name="email" required
                value={formData.email} onChange={handleChange}
                type="email" 
                className={inputClass}
                placeholder="etudiant@ecole.ma" 
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mot de passe</label>
              <input 
                name="password" required
                value={formData.password} onChange={handleChange}
                type="password" 
                className={inputClass}
                placeholder="••••••••" 
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">École / Université</label>
              <input 
                name="school" required
                value={formData.school} onChange={handleChange}
                type="text" 
                className={inputClass}
                placeholder="Ex: ESTEM, EMI, ENSIAS..." 
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Comment avez-vous entendu parler de nous ?</label>
              <select 
                name="source" required
                value={formData.source} onChange={handleChange}
                className={inputClass}
              >
                <option value="">Sélectionnez une option</option>
                <option value="social">Réseaux sociaux</option>
                <option value="friend">Ami / Collègue</option>
                <option value="school">École</option>
                <option value="google">Recherche Google</option>
                <option value="other">Autre</option>
              </select>
           </div>

           <button 
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 transition-all mt-6 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              S'inscrire et commencer
            </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted">
            Déjà un compte ? <Link to="/login" className="text-primary font-bold cursor-pointer hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;