
import React, { useState, useEffect } from 'react';
import { Track, Review } from '../types';
import { TRACKS } from '../services/content';
import { Link } from 'react-router-dom';

// --- MOCK REVIEWS GENERATOR ---
const generateReviews = (trackId: string): Review[] => {
  const names = ['Sarah M.', 'Karim B.', 'Youssef T.', 'Amina L.', 'Thomas D.', 'Sofia E.'];
  const cities = ['Casablanca', 'Rabat', 'Tanger', 'Marrakech', 'Paris', 'Lyon'];
  const comments = [
    "Excellent cours, très clair et pratique. J'ai pu appliquer les concepts dès le lendemain.",
    "La pédagogie est top. Les exemples sont pertinents pour le marché marocain.",
    "Un peu dense par moments, mais la qualité est au rendez-vous. Je recommande.",
    "La meilleure ressource francophone que j'ai trouvée sur ce sujet. Merci !",
    "Très structuré. Les quiz aident vraiment à valider les acquis.",
    "J'ai adoré l'approche concrète. Pas de blabla inutile."
  ];

  return names.map((name, i) => ({
    id: `${trackId}-rev-${i}`,
    author: name,
    city: cities[i],
    date: `Il y a ${Math.floor(Math.random() * 10) + 1} jours`,
    rating: i === 2 ? 4 : 5, // Mostly 5 stars
    comment: comments[i]
  }));
};

// --- TABS NAVIGATION ---
interface TabsProps {
  activeTab: string;
  onTabClick: (id: string) => void;
  sticky?: boolean;
}

export const CourseTabs: React.FC<TabsProps> = ({ activeTab, onTabClick, sticky = true }) => {
  const tabs = [
    { id: 'skills', label: 'Aperçu' },
    { id: 'outline', label: 'Programme' },
    { id: 'reviews', label: 'Avis' },
    { id: 'about', label: 'À propos' },
  ];

  return (
    <div className={`${sticky ? 'sticky top-20 z-30' : ''} bg-white border-b border-gray-100 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto no-scrollbar gap-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SECTIONS ---

export const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => (
  <div id="skills" className="scroll-mt-36 py-12 border-b border-gray-50">
    <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Compétences à acquérir</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-4 py-2 bg-white text-gray-700 text-sm font-bold rounded-full border border-gray-200 shadow-sm">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export const AboutSection: React.FC<{ details: any }> = ({ details }) => (
  <div id="about" className="scroll-mt-36 py-12 border-b border-gray-50">
    <h3 className="text-xl font-display font-bold text-gray-900 mb-6">À propos du cours</h3>
    <div className="prose prose-slate max-w-none text-gray-600">
      <div className="whitespace-pre-line leading-relaxed text-lg font-light">{details.overview}</div>
    </div>
  </div>
);

export const ReviewsSection: React.FC<{ trackId: string, isLocked?: boolean }> = ({ trackId, isLocked = false }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    // Load static + local reviews
    const staticReviews = generateReviews(trackId);
    const stored = localStorage.getItem(`course_reviews_${trackId}`);
    const localReviews = stored ? JSON.parse(stored) : [];
    setReviews([...localReviews, ...staticReviews]);
  }, [trackId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now().toString(),
      author: "Vous (Apprenant)",
      city: "Maroc",
      date: "À l'instant",
      rating: newRating,
      comment: newComment
    };
    
    // Save to local
    const stored = localStorage.getItem(`course_reviews_${trackId}`);
    const existing = stored ? JSON.parse(stored) : [];
    localStorage.setItem(`course_reviews_${trackId}`, JSON.stringify([review, ...existing]));

    setReviews([review, ...reviews]);
    setShowModal(false);
    setNewComment("");
  };

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <div id="reviews" className="scroll-mt-36 py-12 border-b border-gray-50">
       <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Avis des apprenants</h3>
            <div className="flex items-center gap-3">
               <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
               <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className={`w-5 h-5 ${star <= Math.round(parseFloat(avgRating)) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
               </div>
               <span className="text-sm text-gray-500">({reviews.length} avis)</span>
            </div>
          </div>
          <button 
            onClick={() => !isLocked && setShowModal(true)} 
            disabled={isLocked}
            className={`mt-4 md:mt-0 px-6 py-2.5 border font-bold rounded-xl transition-colors shadow-sm ${isLocked ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
             {isLocked ? "Terminez le cours pour laisser un avis" : "Laisser un avis"}
          </button>
       </div>

       <div className="grid md:grid-cols-2 gap-6">
          {reviews.slice(0, 4).map(review => (
             <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
                         {review.author.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-gray-900 text-sm">{review.author}</p>
                         <p className="text-xs text-gray-500">{review.city} • {review.date}</p>
                      </div>
                   </div>
                   <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(s => <svg key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                   </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{review.comment}"</p>
             </div>
          ))}
       </div>

       {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Donnez votre avis</h3>
                <form onSubmit={handleSubmit}>
                   <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">Note</label>
                      <select className="w-full p-2 border rounded-lg" value={newRating} onChange={e => setNewRating(Number(e.target.value))}>
                         <option value="5">5 - Excellent</option>
                         <option value="4">4 - Très bon</option>
                         <option value="3">3 - Moyen</option>
                         <option value="2">2 - Insuffisant</option>
                         <option value="1">1 - Mauvais</option>
                      </select>
                   </div>
                   <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">Commentaire</label>
                      <textarea className="w-full p-2 border rounded-lg" rows={3} value={newComment} onChange={e => setNewComment(e.target.value)} required placeholder="Ce cours m'a aidé à..." />
                   </div>
                   <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 font-bold">Annuler</button>
                      <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg">Publier</button>
                   </div>
                </form>
             </div>
          </div>
       )}
    </div>
  );
};

export const RecommendationsSection: React.FC<{ currentTrackId: string }> = ({ currentTrackId }) => {
  const recommendations = Object.values(TRACKS).filter(t => t.id !== currentTrackId).slice(0, 3);
  
  return (
    <div className="py-12">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Vous aimerez aussi</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map(track => {
           // Type assertion for TS since we added color/icon locally
           const t = track as any; 
           const gradient = t.color || 'from-gray-100 to-gray-200';
           
           return (
             <div key={track.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full transform hover:-translate-y-1">
                {/* Large visual area */}
                <div className={`h-32 bg-gradient-to-r ${gradient} relative`}>
                    <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 z-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon || "M13 10V3L4 14h7v7l9-11h-7z"} /></svg>
                    </div>
                </div>
                <div className="p-6 pt-8 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg mb-2">{track.title}</h4>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow leading-relaxed">{track.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{track.modules.length} Modules</span>
                     <Link 
                       to={track.id === 'sql-mastery' ? '/sql-mastery' : `/track/${track.id}`} 
                       className="text-sm font-bold text-white bg-primary px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                     >
                        Découvrir
                     </Link>
                  </div>
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};
