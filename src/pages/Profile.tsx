import React, { useState } from 'react';
import { useAuth, User, Experience, Education } from '../contexts/AuthContext';
import { getProgress } from '../services/progressService';
import { TRACKS } from '../services/content';
import { Link, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  
  // Local state for editing forms
  const [tempUser, setTempUser] = useState<Partial<User>>({});
  const [newItem, setNewItem] = useState<any>({});

  if (!user) return <div className="p-8 text-center">Veuillez vous connecter.</div>;

  const progress = getProgress();
  // Calculate total lessons across all tracks
  const totalLessons = Object.values(TRACKS).reduce((acc, track) => acc + track.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0);
  const completedCount = progress.completedLessons.length;
  const globalPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // --- Handlers ---

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startEdit = (section: string) => {
    setEditingSection(section);
    setTempUser(user);
    setNewItem({});
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setNewItem({});
  };

  const saveProfileInfo = () => {
    updateUser(tempUser);
    setEditingSection(null);
  };

  const addExperience = () => {
    if (!newItem.role) return;
    const newExp: Experience = {
      id: Date.now().toString(),
      role: newItem.role || '',
      company: newItem.company || '',
      year: newItem.year || '',
      description: newItem.description || ''
    };
    const updatedExp = [...(user.experience || []), newExp];
    updateUser({ experience: updatedExp });
    setEditingSection(null);
  };

  const removeExperience = (id: string) => {
    const updatedExp = user.experience.filter(e => e.id !== id);
    updateUser({ experience: updatedExp });
  };

  const addEducation = () => {
     if (!newItem.school) return;
     const newEdu: Education = {
         id: Date.now().toString(),
         school: newItem.school || '',
         degree: newItem.degree || '',
         year: newItem.year || ''
     };
     const updatedEdu = [...(user.education || []), newEdu];
     updateUser({ education: updatedEdu });
     setEditingSection(null);
  };

  const removeEducation = (id: string) => {
      const updatedEdu = user.education.filter(e => e.id !== id);
      updateUser({ education: updatedEdu });
  };

  // --- Styles ---
  // High contrast inputs
  const inputStyle = "w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 bg-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm";

  // --- Components ---

  const SectionHeader = ({ title, onAdd }: { title: string, onAdd?: () => void }) => (
    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {onAdd && (
        <button onClick={onAdd} className="text-sm font-bold text-primary hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
          + Ajouter
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="h-28 bg-gradient-to-r from-primary to-blue-600"></div>
               <div className="px-6 pb-6 relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm absolute -top-12 overflow-hidden group cursor-pointer">
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold" onClick={() => alert("Fonction upload à venir")}>
                        Modifier
                      </div>
                  </div>
                  
                  <div className="pt-16">
                    {editingSection === 'intro' ? (
                       <div className="space-y-3">
                          <input 
                            className={inputStyle}
                            value={tempUser.name || ''}
                            onChange={e => setTempUser({...tempUser, name: e.target.value})}
                            placeholder="Nom complet"
                          />
                          <input 
                             className={inputStyle}
                             value={tempUser.headline || ''}
                             onChange={e => setTempUser({...tempUser, headline: e.target.value})}
                             placeholder="Titre (ex: Étudiant Data)"
                          />
                          <input 
                             className={inputStyle}
                             value={tempUser.city || ''}
                             onChange={e => setTempUser({...tempUser, city: e.target.value})}
                             placeholder="Ville"
                          />
                          <div className="flex gap-2 justify-end pt-2">
                             <button onClick={cancelEdit} className="text-xs text-gray-600 font-bold px-3 py-2 bg-gray-100 rounded-lg border border-gray-200">Annuler</button>
                             <button onClick={saveProfileInfo} className="text-xs bg-primary text-white px-3 py-2 rounded-lg font-bold shadow-sm">Enregistrer</button>
                          </div>
                       </div>
                    ) : (
                       <div>
                          <div className="flex justify-between items-start">
                             <div>
                                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-primary font-medium text-sm mb-1">{user.headline || 'Apprenant DataSphere'}</p>
                                <p className="text-gray-500 text-sm flex items-center">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                  {user.city}
                                </p>
                             </div>
                             <button onClick={() => startEdit('intro')} className="text-gray-400 hover:text-primary p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                             </button>
                          </div>
                          
                          <div className="mt-8 flex flex-col gap-3">
                             <button 
                                onClick={handleLogout} 
                                className="w-full bg-red-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                             >
                                Se déconnecter
                             </button>
                          </div>
                       </div>
                    )}
                  </div>
               </div>
            </div>

            {/* Stats Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Progression Globale</h3>
                <div className="mb-6">
                   <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700">Avancement</span>
                      <span className="font-bold text-primary">{globalPercentage}%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2.5 rounded-full" style={{width: `${globalPercentage}%`}}></div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                   <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-2xl font-bold text-gray-800">{completedCount}</div>
                      <div className="text-xs text-gray-500 font-medium">Leçons terminées</div>
                   </div>
                   <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-2xl font-bold text-gray-800">0</div>
                      <div className="text-xs text-gray-500 font-medium">Certificats</div>
                   </div>
                </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Experience Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
               <SectionHeader title="Expérience Professionnelle" onAdd={() => startEdit('add-exp')} />
               
               {editingSection === 'add-exp' && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200 space-y-4 animate-fade-in">
                     <h4 className="text-sm font-bold text-gray-700">Ajouter une expérience</h4>
                     <div className="grid grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Poste (ex: Data Analyst)" value={newItem.role || ''} onChange={e => setNewItem({...newItem, role: e.target.value})} />
                        <input className={inputStyle} placeholder="Entreprise" value={newItem.company || ''} onChange={e => setNewItem({...newItem, company: e.target.value})} />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="Année (ex: 2022 - Présent)" value={newItem.year || ''} onChange={e => setNewItem({...newItem, year: e.target.value})} />
                     </div>
                     <textarea className={inputStyle} rows={3} placeholder="Description des tâches..." value={newItem.description || ''} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                     <div className="flex gap-2 justify-end">
                        <button onClick={cancelEdit} className="text-sm text-gray-600 font-bold px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
                        <button onClick={addExperience} className="text-sm bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-800">Ajouter</button>
                     </div>
                  </div>
               )}

               <div className="space-y-8">
                  {user.experience && user.experience.length > 0 ? (
                    user.experience.map((exp) => (
                      <div key={exp.id} className="flex gap-5 group border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                         <div className="flex-shrink-0 mt-1">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start">
                               <div>
                                   <h4 className="font-bold text-lg text-gray-900">{exp.role}</h4>
                                   <p className="text-sm font-bold text-gray-600">{exp.company}</p>
                               </div>
                               <button onClick={() => removeExperience(exp.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-red-50">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                            </div>
                            <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide mt-1">{exp.year}</p>
                            <p className="text-sm text-gray-600 leading-relaxed font-light">{exp.description}</p>
                         </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">Aucune expérience ajoutée.</p>
                  )}
               </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
               <SectionHeader title="Formation" onAdd={() => startEdit('add-edu')} />

               {editingSection === 'add-edu' && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200 space-y-4 animate-fade-in">
                     <h4 className="text-sm font-bold text-gray-700">Ajouter une formation</h4>
                     <div className="grid grid-cols-2 gap-4">
                        <input className={inputStyle} placeholder="École" value={newItem.school || ''} onChange={e => setNewItem({...newItem, school: e.target.value})} />
                        <input className={inputStyle} placeholder="Diplôme" value={newItem.degree || ''} onChange={e => setNewItem({...newItem, degree: e.target.value})} />
                     </div>
                     <input className={inputStyle} placeholder="Année (ex: 2023)" value={newItem.year || ''} onChange={e => setNewItem({...newItem, year: e.target.value})} />
                     <div className="flex gap-2 justify-end">
                        <button onClick={cancelEdit} className="text-sm text-gray-600 font-bold px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
                        <button onClick={addEducation} className="text-sm bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-800">Ajouter</button>
                     </div>
                  </div>
               )}

               <div className="space-y-8">
                  {user.education && user.education.length > 0 ? (
                    user.education.map((edu) => (
                      <div key={edu.id} className="flex gap-5 group border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                         <div className="flex-shrink-0 mt-1">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                            </div>
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start">
                               <div>
                                  <h4 className="font-bold text-lg text-gray-900">{edu.school}</h4>
                                  <p className="text-sm font-bold text-gray-600">{edu.degree}</p>
                               </div>
                               <button onClick={() => removeEducation(edu.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-red-50">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">{edu.year}</p>
                         </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">Aucune formation ajoutée.</p>
                  )}
               </div>
            </div>

            {/* Courses Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
               <SectionHeader title="Cours en cours" />
               <div className="space-y-4">
                  {Object.values(TRACKS).map(track => {
                      // We need to pass the tracks object to the service function logic
                      // Since we are inside the component, we can assume the service function needs the data
                      // Re-implement logic briefly here or use the imported function if it accepts data
                      const p = (() => {
                         let t = 0, c = 0;
                         track.modules.forEach(m => m.lessons.forEach(l => {
                            t++;
                            if (progress.completedLessons.includes(l.id)) c++;
                         }));
                         return t === 0 ? 0 : Math.round((c/t)*100);
                      })();

                      if (p === 0) return null; 
                      return (
                        <div key={track.id} className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition-colors group">
                           <div className="flex justify-between items-center mb-3">
                              <Link to={track.id === 'sql-mastery' ? '/sql-mastery' : `/track/${track.id}`} className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">{track.title}</Link>
                              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">{p}%</span>
                           </div>
                           <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                              <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{width: `${p}%`}}></div>
                           </div>
                        </div>
                      );
                  })}
                  {completedCount === 0 && (
                     <p className="text-sm text-gray-400 italic">Vous n'avez commencé aucun cours.</p>
                  )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;