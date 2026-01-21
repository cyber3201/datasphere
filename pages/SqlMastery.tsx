
import React, { useState, useEffect } from 'react';
import { TRACKS } from '../services/content';
import { Link } from 'react-router-dom';
import { getTrackProgressPercentage } from '../services/progressService';
import { CourseTabs, SkillsSection, AboutSection, ReviewsSection, RecommendationsSection } from '../components/TrackSections';

const SqlMastery: React.FC = () => {
  const track = TRACKS['sql-mastery'];
  const percentage = getTrackProgressPercentage('sql-mastery', TRACKS);
  const [openModule, setOpenModule] = useState<string | null>(track?.modules[0]?.id || null);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!track) return <div>Piste non trouvée</div>;

  const toggleModule = (id: string) => {
    setOpenModule(openModule === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
       const offset = 150; 
       const elementPosition = el.getBoundingClientRect().top;
       const offsetPosition = elementPosition + window.pageYOffset - offset;
       window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
       });
    }
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Landing Hero (Custom for SQL) */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
             <h1 className="text-5xl font-extrabold text-primary mb-6 leading-tight font-display">
               Maîtrise <span className="text-maroon">SQL</span>
             </h1>
             <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium max-w-lg">
               Pour les analystes, développeurs et data scientists. Passez de zéro à expert en écriture de requêtes performantes.
             </p>
             
             <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
               <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3">Ce que vous allez apprendre</h3>
               <ul className="space-y-2 text-sm text-slate-700">
                 <li className="flex items-center"><svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Architecture des bases de données relationnelles</li>
                 <li className="flex items-center"><svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Requêtes complexes (Joins, Windows Functions)</li>
                 <li className="flex items-center"><svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Optimisation de performance et indexation</li>
               </ul>
             </div>

             <div className="flex flex-col sm:flex-row gap-4">
               <Link 
                 to={`/lesson/${track.id}/${track.modules[0].lessons[0].id}`}
                 className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl shadow-glow text-white bg-primary hover:bg-maroon transition-all"
               >
                 Commencer le parcours
               </Link>
               {percentage > 0 && (
                   <span className="inline-flex items-center px-4 font-bold text-maroon">
                      {percentage}% complété
                   </span>
               )}
             </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <div className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-6 border-b-4 border-maroon overflow-hidden">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto leading-relaxed">
                  <code>
                    <span className="text-purple-400 font-bold">SELECT</span> u.name, <span className="text-yellow-300 font-bold">COUNT</span>(o.id)<br/>
                    <span className="text-purple-400 font-bold">FROM</span> users u<br/>
                    <span className="text-purple-400 font-bold">JOIN</span> orders o <span className="text-purple-400 font-bold">ON</span> u.id = o.user_id<br/>
                    <span className="text-purple-400 font-bold">WHERE</span> o.total &gt; 100<br/>
                    <span className="text-purple-400 font-bold">GROUP BY</span> u.name;
                  </code>
                </pre>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <CourseTabs activeTab={activeTab} onTabClick={scrollToSection} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         
         {/* 1. Skills */}
         <SkillsSection skills={track.details?.skills || []} />

         {/* 2. About */}
         <AboutSection details={track.details || { overview: track.longDescription, targetAudience: [], prerequisites: [], outcomes: [] }} />

         {/* 3. Outline */}
         <div id="outline" className="scroll-mt-36 py-12 border-b border-gray-50">
           <h2 className="text-3xl font-bold text-primary mb-2 font-display">Programme</h2>
           <p className="text-slate-600 mb-8">Durée estimée : 10 heures • {track.modules.reduce((acc,m) => acc + m.lessons.length, 0)} leçons</p>

           <div className="space-y-4">
            {track.modules.map((module, idx) => {
               const isOpen = openModule === module.id;
               return (
                 <div key={module.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                   <button 
                      onClick={() => toggleModule(module.id)}
                      className="w-full bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center text-left"
                   >
                     <div>
                       <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Module {idx + 1}</span>
                       <h3 className="font-bold text-lg text-primary">{module.title}</h3>
                     </div>
                     <div className="flex items-center space-x-4">
                        <span className="text-xs font-semibold bg-white border border-gray-200 px-2 py-1 text-gray-500 rounded">{module.lessons.length} leçons</span>
                        <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                     </div>
                   </button>
                   
                   <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="divide-y divide-gray-100">
                          {module.lessons.map(lesson => (
                            <Link to={`/lesson/sql-mastery/${lesson.id}`} key={lesson.id} className="flex items-center justify-between px-6 py-4 hover:bg-blue-50 transition-colors group">
                               <div className="flex items-center space-x-3">
                                 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${localStorage.getItem('datasphere_progress')?.includes(lesson.id) ? 'bg-accent border-accent text-white' : 'border-gray-300 bg-white'}`}>
                                    {localStorage.getItem('datasphere_progress')?.includes(lesson.id) && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                 </div>
                                 <span className="text-slate-700 font-medium group-hover:text-primary transition-colors">{lesson.title}</span>
                               </div>
                               <div className="text-gray-300 group-hover:text-primary">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                               </div>
                            </Link>
                          ))}
                      </div>
                   </div>
                 </div>
               );
            })}
           </div>
         </div>

         {/* 4. Reviews */}
         <ReviewsSection trackId={track.id} />

         {/* 5. Recommendations */}
         <RecommendationsSection currentTrackId={track.id} />

      </div>
    </div>
  );
};

export default SqlMastery;
