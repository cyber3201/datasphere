
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Scroll amount is roughly card width + gap. 
      const scrollAmount = 350; 
      const newPos = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({
        left: newPos,
        behavior: 'smooth'
      });
    }
  };

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
         const { current } = scrollContainerRef;
         if (current.scrollLeft + current.offsetWidth >= current.scrollWidth) {
            current.scrollTo({ left: 0, behavior: 'smooth' });
         } else {
            scroll('right');
         }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tracks = [
    { title: "Maîtrise SQL", desc: "Le langage universel de la data. Du SELECT basique à l'optimisation.", slug: "/sql-mastery", color: "from-blue-600 to-blue-800", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" },
    { title: "DB Design", desc: "Modélisation, formes normales et architecture de données.", slug: "/track/db-design", color: "from-purple-600 to-purple-800", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { title: "Data Management", desc: "Cycle de vie, qualité, MDM et intégration.", slug: "/track/data-management", color: "from-emerald-600 to-emerald-800", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
    { title: "Gouvernance", desc: "Politiques, rôles (Steward/Owner) et conformité GDPR.", slug: "/track/data-governance", color: "from-orange-500 to-orange-700", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
    { title: "Data Products", desc: "Concevoir la data comme un produit à valeur ajoutée.", slug: "/track/data-products", color: "from-pink-600 to-pink-800", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { title: "Operating Model", desc: "Organisation des équipes data, DataOps et culture.", slug: "/track/operating-model", color: "from-teal-600 to-teal-800", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];

  return (
    <div className="animate-fade-in overflow-hidden bg-cream selection:bg-primary/20">
      
      {/* Hero Section */}
      <div className="relative pt-10 pb-12 lg:pt-16 lg:pb-20 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[1000px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-[100%] -z-10 blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left z-10 w-full">
              
              <h1 className="text-4xl lg:text-7xl font-display font-extrabold text-text leading-[1.1] mb-6 tracking-tight animate-slide-up" style={{animationDelay: '100ms'}}>
                L'avenir de la <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-blue-400">Data & Analytics</span>
              </h1>
              
              <p className="text-lg text-slate-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{animationDelay: '200ms'}}>
                La référence francophone pour maîtriser les standards de l'industrie. 
                De la théorie complexe à la pratique professionnelle, construisez votre carrière.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-slide-up" style={{animationDelay: '300ms'}}>
                <Link to="/sql-mastery" className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:bg-blue-800 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
                  Commencer le parcours
                </Link>
                <a href="#tracks" className="px-8 py-4 bg-white text-text border border-gray-100 rounded-xl font-bold shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 w-full sm:w-auto text-center">
                  Explorer les cours
                </a>
              </div>
            </div>

            {/* Abstract 3D Illustration */}
            <div className="flex-1 w-full relative h-[300px] lg:h-[500px] flex items-center justify-center perspective-1000 animate-fade-in mb-8 lg:mb-0" style={{animationDelay: '400ms'}}>
              <div className="relative w-64 h-64 lg:w-96 lg:h-96">
                 {/* Central Card */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 rounded-[2rem] shadow-2xl border border-white/60 backdrop-blur-xl z-20 flex flex-col items-center justify-center animate-float transform-style-3d">
                    <img 
                       src="https://i.postimg.cc/jjDJcspx/datasphere.png" 
                       alt="DataSphere" 
                       className="h-20 lg:h-24 w-auto mb-4 object-contain drop-shadow-lg"
                    />
                    <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm text-xs font-bold text-primary border border-white">
                      Hub d'Apprentissage
                    </div>
                 </div>
                 
                 {/* Orbiting Elements */}
                 <div className="absolute top-10 -right-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float-delayed z-30 border border-gray-50">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                 </div>
                 <div className="absolute bottom-12 -left-8 w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center animate-pulse-slow z-30 border border-gray-50">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: À propos de DataSphere */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Notre Mission</span>
           <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-8">À propos de DataSphere</h2>
           <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
             DataSphere est une plateforme francophone conçue pour apprendre la data de façon structurée : 
             <span className="font-medium text-primary"> SQL</span>, 
             <span className="font-medium text-primary"> conception de bases de données</span> et 
             <span className="font-medium text-primary"> data management</span>. 
             Notre approche est orientée pratique, avec des cours clairs, des exemples concrets et une progression visible pour apprendre étape par étape.
           </p>
        </div>
      </section>

      {/* SECTION 2: Pourquoi DataSphere ? */}
      <section className="py-16 bg-cream border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-display font-bold text-gray-900">Pourquoi DataSphere ?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Du concret, pas du blabla</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Des cours courts et percutants, appuyés par des exemples réels, des exercices pratiques et des quiz pour valider chaque notion.
                  </p>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Progression guidée</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Ne soyez jamais perdu. Suivez votre avancement en temps réel, débloquez des objectifs par module et visualisez votre réussite.
                  </p>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Pratique immédiate</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Passez de la théorie à l'action instantanément avec notre page "Practise SQL" pour exécuter vos requêtes sans installation.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 3: Ce qui nous rend uniques */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-white to-blue-50 border-y border-white">
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-50 animate-blob mix-blend-multiply filter"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>

         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">Ce qui nous rend uniques</h2>
               <p className="text-slate-600 max-w-2xl mx-auto">Une expérience d'apprentissage pensée dans les moindres détails pour maximiser votre réussite professionnelle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
               {/* Item 1 */}
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-200">
                     <span className="font-bold text-sm">1</span>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-2">Parcours Data complet</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Un curriculum exhaustif couvrant toute la chaîne de valeur : SQL → DB Design → Management → Governance → Products → Operating Model.
                     </p>
                  </div>
               </div>

               {/* Item 2 */}
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-indigo-200">
                     <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-2">Pédagogie orientée carrière</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Nous enseignons les compétences réellement demandées en entreprise, les cas d'usage fréquents et les bonnes pratiques du métier.
                     </p>
                  </div>
               </div>

               {/* Item 3 */}
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-teal-200">
                     <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-2">Exemples en contexte</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Des données et des scénarios adaptés au contexte francophone et marocain (villes, noms, entreprises) pour une immersion totale.
                     </p>
                  </div>
               </div>

               {/* Item 4 */}
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-rose-200">
                     <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-900 mb-2">Design premium et lisible</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Une interface simple, moderne et agréable qui met le contenu en valeur et réduit la fatigue cognitive lors de l'apprentissage.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Creator Section */}
      <section className="py-16 relative overflow-hidden bg-cream-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-soft border border-gray-100">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/3"></div>

              {/* Grid: Image Top on Mobile, Left on Desktop */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                 
                 {/* Visual Side */}
                 <div className="relative w-full flex justify-center lg:justify-end lg:order-1 order-1">
                    <div className="relative z-10 w-full max-w-sm">
                       <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform rotate-3 scale-105"></div>
                       <img 
                         src="https://i.postimg.cc/PqJq4cWt/Gemini-Generated-Image-fz10tpfz10tpfz10.png" 
                         alt="Zakaria Gbibar" 
                         className="relative rounded-[2rem] shadow-xl w-full object-cover transform transition-transform duration-500 hover:scale-[1.01]"
                       />
                       
                       {/* Animated Blobs */}
                       <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-200/40 rounded-full blur-xl animate-blob"></div>
                       <div className="absolute bottom-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-blob animation-delay-2000"></div>

                       {/* Floating Badge */}
                       <div className="absolute -bottom-6 -right-4 bg-white px-5 py-3 rounded-xl shadow-lg border border-gray-50 flex items-center gap-3 animate-float-delayed z-20">
                          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </div>
                          <div>
                             <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Créé par</p>
                             <p className="text-sm font-bold text-text">Zakaria Gbibar</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Text Side */}
                 <div className="w-full lg:order-2 order-2">
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-text mb-6">
                       Le mot du créateur
                    </h2>
                    
                    <div className="space-y-4 text-base lg:text-lg text-slate-600 font-light leading-relaxed">
                       <p>
                          Je suis <strong className="text-text font-medium">Zakaria Gbibar</strong>, étudiant à la <span className="text-primary font-medium">FSTS</span>, spécialisé en Transformation Digitale. Je gère les opérations digitales à la <span className="text-primary font-medium">Holistic Health Academy</span>.
                       </p>
                       <p>
                          Passionné par la technologie et la gestion de projet, mon parcours combine expérience professionnelle, formation technique et certifications internationales.
                       </p>
                       <p>
                          DataSphere est né de cette volonté de partager des connaissances pointues pour la stratégie numérique et permettre à chacun de monter en compétences.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Tracks Section - Premium Slider */}
      <div id="tracks" className="relative z-10 py-16 bg-gradient-to-b from-cream to-white border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 px-2">
             <div className="max-w-2xl">
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Nos Programmes</span>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-text mb-3">Parcours d'Excellence</h2>
                <p className="text-base text-muted">Des cursus structurés pour vous emmener de la théorie à la pratique.</p>
             </div>
             
             {/* Slider Navigation */}
             <div className="hidden md:flex gap-3 mt-6 md:mt-0">
                <button 
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  aria-label="Previous"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  aria-label="Next"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
             </div>
          </div>

          {/* Slider Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar px-2"
            style={{ scrollBehavior: 'smooth' }}
          >
             {tracks.map((track, idx) => (
               <div key={idx} className="min-w-[300px] md:min-w-[45%] lg:min-w-[45%] snap-center group">
                 <div className="h-full bg-white rounded-[1.5rem] p-8 shadow-sm hover:shadow-soft-hover border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden">
                   
                   {/* Card Gradient Overlay (Color Accent) */}
                   <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${track.color} opacity-10 rounded-full blur-3xl -mr-10 -mb-10`}></div>
                   
                   <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${track.color} shadow-lg text-white`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={track.icon} /></svg>
                      </div>
                      
                      <h3 className="text-xl font-bold text-text mb-3">{track.title}</h3>
                      <p className="text-muted leading-relaxed text-sm flex-grow mb-6 line-clamp-3 font-light">{track.desc}</p>
                      
                      <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                          <Link to={track.slug} className="inline-flex items-center text-sm font-bold text-primary group-hover:text-blue-700 transition-colors">
                            Découvrir
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </Link>
                      </div>
                   </div>
                 </div>
               </div>
             ))}
             
             {/* Spacer */}
             <div className="min-w-[20px] snap-center lg:hidden"></div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
