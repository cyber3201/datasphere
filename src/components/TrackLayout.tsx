
import React, { useState, useEffect } from 'react';
import { Track } from '../types';
import { getTrackProgressPercentage } from '../services/progressService';
import { TRACKS } from '../services/content';
import { Link } from 'react-router-dom';
import { CourseTabs, SkillsSection, AboutSection, ReviewsSection, RecommendationsSection } from './TrackSections';

interface Props {
  track: Track;
}

const TrackLayout: React.FC<Props> = ({ track }) => {
  const percentage = getTrackProgressPercentage(track.id, TRACKS);
  const modulesToDisplay = track.modules;
  const [openModule, setOpenModule] = useState<string | null>(modulesToDisplay[0]?.id || null);
  const [activeTab, setActiveTab] = useState('skills');
  
  // Type assertion for visual properties
  const trackAny = track as any;
  const trackColor = trackAny.color || "from-blue-600 to-blue-800";
  const trackIcon = trackAny.icon || "M13 10V3L4 14h7v7l9-11h-7z";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [track.id]);

  const toggleModule = (id: string) => setOpenModule(openModule === id ? null : id);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
       const offset = 140; 
       const elementPosition = el.getBoundingClientRect().top;
       const offsetPosition = elementPosition + window.pageYOffset - offset;
       window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
       });
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans">
      
      {/* 1. HERO SECTION (Coursera Style with Themed Illustration) */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-12 lg:pt-12 lg:pb-16 overflow-hidden relative">
        {/* Subtle Background Shape */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${trackColor} opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">Data</span>
              <span className="text-gray-300">/</span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${trackColor}`}>{track.title}</span>
           </div>

           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Left Text Content */}
              <div className="flex-1 w-full">
                  <h1 className="text-4xl lg:text-6xl font-display font-extrabold text-gray-900 mb-6 leading-[1.1]">
                    {track.title}
                  </h1>
                  <p className="text-lg text-slate-600 font-light leading-relaxed mb-8 max-w-2xl">
                    {track.description}
                  </p>
                  
                  {/* Meta Row */}
                  <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm font-medium text-gray-500 mb-8">
                     <div className="flex items-center gap-2">
                        <img src="https://ui-avatars.com/api/?name=Data+Sphere&background=0F172A&color=fff" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Instructor" />
                        <div>
                           <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Instructeur</p>
                           <p className="text-gray-900 font-bold">DataSphere Team</p>
                        </div>
                     </div>
                     <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                     <div>
                        <div className="flex items-center gap-1 mb-0.5">
                           <span className="font-bold text-gray-900 text-lg">4.8</span>
                           <div className="flex text-yellow-400">
                              {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                           </div>
                        </div>
                        <p className="text-xs text-gray-400">(120 avis)</p>
                     </div>
                     <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                     <div>
                        <p className="text-gray-900 font-bold text-lg">{track.modules.length}</p>
                        <p className="text-xs text-gray-400">Modules</p>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                     <Link 
                       to={`/lesson/${track.id}/${modulesToDisplay[0].lessons[0].id}`} 
                       className={`inline-flex justify-center items-center px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all text-base bg-gradient-to-r ${trackColor} shadow-blue-900/10`}
                     >
                       {percentage > 0 ? "Continuer le cours" : "Commencer gratuitement"}
                     </Link>
                     <p className="text-xs text-gray-400 mt-2 sm:mt-0 sm:self-center">
                        * Inclus avec votre compte gratuit
                     </p>
                  </div>
              </div>

              {/* Right Visual (Themed 3D Illustration) */}
              <div className="w-full lg:w-96 flex justify-center lg:justify-end relative">
                  <div className="relative w-64 h-64 lg:w-80 lg:h-80 perspective-1000">
                      {/* Back Card */}
                      <div className={`absolute top-4 left-8 w-full h-full bg-gradient-to-br ${trackColor} opacity-20 rounded-3xl transform rotate-6 scale-95`}></div>
                      {/* Main Card */}
                      <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center p-8 transform transition-transform hover:scale-105 duration-500 group overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${trackColor} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                          
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${trackColor} shadow-lg flex items-center justify-center text-white mb-6 relative z-10`}>
                             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={trackIcon} /></svg>
                          </div>
                          
                          <div className="text-center relative z-10">
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Parcours</span>
                             <h3 className="text-xl font-bold text-gray-900 leading-tight">{track.title}</h3>
                          </div>

                          {/* Decorative circles */}
                          <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${trackColor} opacity-20 rounded-full blur-xl`}></div>
                      </div>
                      
                      {/* Floating Element */}
                      <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-gray-50 animate-float-delayed">
                         <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                  </div>
              </div>

           </div>
        </div>
      </div>

      {/* 2. TABS & CONTENT LAYOUT */}
      <CourseTabs activeTab={activeTab} onTabClick={scrollToSection} sticky={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN (Content) - 66% */}
            <div className="lg:col-span-8 space-y-2">
               
               {/* Skills (Aperçu) */}
               <SkillsSection skills={track.details?.skills || []} />

               {/* About */}
               <AboutSection details={track.details || { overview: track.longDescription, targetAudience: [], prerequisites: [], outcomes: [] }} />

               {/* Syllabus (Programme) */}
               <div id="outline" className="scroll-mt-36 py-12 border-b border-gray-50">
                  <div className="flex justify-between items-end mb-6">
                     <h3 className="text-xl font-display font-bold text-gray-900">Programme du cours</h3>
                     <span className="text-sm font-medium text-gray-500">{track.modules.length} modules • {modulesToDisplay.reduce((acc, m) => acc + m.lessons.length, 0)} leçons</span>
                  </div>
                  
                  <div className="space-y-4">
                     {modulesToDisplay.map((module, idx) => (
                        <div key={module.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                           <button 
                              onClick={() => toggleModule(module.id)}
                              className="w-full bg-white px-6 py-5 flex justify-between items-center text-left"
                           >
                              <div>
                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Module {idx + 1}</span>
                                 <h4 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{module.title}</h4>
                              </div>
                              <div className="flex items-center gap-4">
                                 <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${openModule === module.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </div>
                           </button>
                           
                           {openModule === module.id && (
                              <div className="border-t border-gray-100 bg-gray-50/50">
                                 {module.lessons.map(lesson => (
                                    <Link key={lesson.id} to={`/lesson/${track.id}/${lesson.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-white border-b border-gray-100 last:border-0 transition-colors group/lesson">
                                       <div className="flex items-center gap-4">
                                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${localStorage.getItem('datasphere_progress')?.includes(lesson.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white'}`}>
                                             {localStorage.getItem('datasphere_progress')?.includes(lesson.id) ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>}
                                          </div>
                                          <div>
                                             <span className="text-sm font-bold text-gray-700 group-hover/lesson:text-primary block">{lesson.title}</span>
                                             <span className="text-xs text-gray-400 font-medium">Lecture • {lesson.duration}</span>
                                          </div>
                                       </div>
                                       <span className="text-xs text-primary font-bold opacity-0 group-hover/lesson:opacity-100 transition-opacity bg-blue-50 px-3 py-1 rounded-full">Démarrer</span>
                                    </Link>
                                 ))}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Reviews */}
               <ReviewsSection trackId={track.id} isLocked={percentage < 100} />

               {/* Recommendations */}
               <RecommendationsSection currentTrackId={track.id} />
            </div>

            {/* RIGHT COLUMN (STICKY SIDEBAR) - 33% */}
            <div className="lg:col-span-4">
               <div className="sticky top-28 space-y-6">
                  
                  {/* Progress / Enrollment Card */}
                  <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-200 relative overflow-hidden">
                     {percentage > 0 && <div className="absolute top-0 left-0 w-full h-1 bg-gray-100"><div className="h-full bg-green-500" style={{ width: `${percentage}%` }}></div></div>}
                     
                     <div className="mb-6 text-center">
                        <span className="text-4xl font-extrabold text-gray-900 block mb-1">{percentage}%</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progression</span>
                     </div>
                     
                     <Link 
                       to={`/lesson/${track.id}/${modulesToDisplay[0].lessons[0].id}`} 
                       className={`block w-full py-3.5 text-white font-bold text-center rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 bg-gradient-to-r ${trackColor}`}
                     >
                        {percentage > 0 ? "Reprendre le cours" : "S'inscrire maintenant"}
                     </Link>
                     
                     <p className="text-center text-xs text-gray-400 mt-4">
                        Accès illimité • Certificat inclus
                     </p>
                  </div>

                  {/* Course Info Widget */}
                  <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-200">
                     <h4 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">Ce cours comprend</h4>
                     <ul className="space-y-5 text-sm text-gray-600">
                        <li className="flex items-start gap-3">
                           <div className="p-2 bg-blue-50 text-primary rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </div>
                           <div>
                              <strong className="block text-gray-900">Rythme flexible</strong>
                              <span className="text-xs text-gray-500">Apprenez quand vous voulez.</span>
                           </div>
                        </li>
                        <li className="flex items-start gap-3">
                           <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </div>
                           <div>
                              <strong className="block text-gray-900">Certificat de fin</strong>
                              <span className="text-xs text-gray-500">Partageable sur LinkedIn.</span>
                           </div>
                        </li>
                        <li className="flex items-start gap-3">
                           <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                           </div>
                           <div>
                              <strong className="block text-gray-900">Niveau Intermédiaire</strong>
                              <span className="text-xs text-gray-500">Connaissances de base requises.</span>
                           </div>
                        </li>
                     </ul>

                     <div className="border-t border-gray-100 my-6"></div>

                     <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Prérequis</h4>
                     <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 marker:text-gray-300">
                        {track.details.prerequisites.map((p, i) => (
                           <li key={i}>{p}</li>
                        ))}
                     </ul>
                  </div>

               </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default TrackLayout;
