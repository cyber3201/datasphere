import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { TRACKS } from '../services/content';
import { isLessonCompleted, toggleLessonCompletion } from '../services/progressService';
import { useAuth } from '../contexts/AuthContext';

const ArticlePage: React.FC = () => {
  const { trackId, lessonId } = useParams<{ trackId: string; lessonId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (lessonId) {
      setCompleted(isLessonCompleted(lessonId));
      window.scrollTo(0,0);
    }
    setSelectedAnswers({});
    setShowResults(false);
  }, [lessonId]);

  if (!isAuthenticated) return null;
  if (!trackId || !lessonId || !TRACKS[trackId]) return <div>Cours introuvable</div>;

  const track = TRACKS[trackId];
  const allLessons = track.modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const lesson = allLessons[currentIndex];
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  if (!lesson) return <div>Leçon introuvable</div>;

  const handleToggle = () => {
    toggleLessonCompletion(lesson.id);
    setCompleted(!completed);
  };

  const handleQuizSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto no-scrollbar pt-20 pb-10">
        <div className="px-6">
          <Link to={trackId === 'sql-mastery' ? '/sql-mastery' : `/track/${trackId}`} className="text-xs font-bold text-gray-400 hover:text-primary mb-6 block uppercase tracking-widest flex items-center transition-colors">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour
          </Link>
          <h2 className="text-lg font-bold text-gray-900 mb-6 leading-tight">{track.title}</h2>
          
          <div className="space-y-6">
            {track.modules.map((module, mIdx) => (
              <div key={module.id}>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Module {mIdx + 1}</h3>
                <ul className="space-y-1">
                  {module.lessons.map(l => {
                    const isActive = l.id === lessonId;
                    const isDone = isLessonCompleted(l.id);
                    return (
                      <li key={l.id}>
                        <Link 
                          to={`/lesson/${trackId}/${l.id}`}
                          className={`flex items-start px-3 py-2 text-xs font-medium rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          <div className={`mt-0.5 w-3 h-3 mr-2 flex-shrink-0 border rounded flex items-center justify-center ${isDone ? 'bg-accent border-accent' : 'border-gray-300'}`}>
                             {isDone && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className={isActive ? 'font-bold' : ''}>{l.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto p-6 md:p-12 lg:p-16 pt-24 lg:pt-16">
        <div className="mb-6 flex items-center justify-between">
           <Link to={`/track/${trackId}`} className="lg:hidden text-gray-400 text-xs font-bold uppercase tracking-widest">← Retour</Link>
           <div className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">{lesson.duration}</div>
        </div>

        <article className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-primary">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8">{lesson.title}</h1>
          <div className="space-y-6 text-slate-700 leading-relaxed font-light text-lg">
            {lesson.content.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-8 my-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl -mr-12 -mt-12 opacity-50"></div>
             <h3 className="text-lg font-bold text-primary mt-0 mb-4 flex items-center">
               <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3"><svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></span>
               {lesson.content.exampleTitle}
             </h3>
             <p className="text-slate-700 m-0 text-base">{lesson.content.exampleContent}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quiz</h3>
            <div className="space-y-8">
              {lesson.content.quiz.map((q, i) => (
                 <div key={q.id}>
                   <p className="font-bold text-gray-800 mb-3 text-base">{i + 1}. {q.question}</p>
                   <div className="space-y-2 pl-4">
                     {q.options.map((opt, oIdx) => {
                       const selected = selectedAnswers[q.id];
                       let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ";
                       if (showResults) {
                           if (oIdx === q.correctIndex) cls += "border-green-200 bg-green-50 text-green-800 font-bold";
                           else if (selected === oIdx) cls += "border-red-200 bg-red-50 text-red-800";
                           else cls += "border-gray-100 text-gray-400 opacity-50";
                       } else {
                           cls += selected === oIdx ? "border-primary bg-primary text-white" : "border-gray-200 hover:bg-gray-50 text-gray-600";
                       }
                       return <button key={oIdx} onClick={() => !showResults && handleQuizSelect(q.id, oIdx)} className={cls}>{opt}</button>;
                     })}
                   </div>
                 </div>
              ))}
            </div>
            {!showResults && (
               <button onClick={() => setShowResults(true)} className="mt-8 w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors" disabled={Object.keys(selectedAnswers).length < 3}>
                 Vérifier
               </button>
            )}
          </div>
        </article>

        {/* Completion Checkbox at BOTTOM */}
        <div className="mt-12 pt-8 border-t border-gray-100 bg-white rounded-2xl p-6 shadow-soft mb-8">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
               <label className="flex items-center gap-4 cursor-pointer group w-full sm:w-auto">
                  <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${completed ? 'bg-accent border-accent scale-110' : 'border-gray-300 bg-white group-hover:border-accent'}`}>
                     {completed && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                     <span className={`block font-bold text-lg ${completed ? 'text-accent' : 'text-gray-700'}`}>{completed ? 'Terminé !' : 'Marquer comme terminé'}</span>
                     <span className="text-xs text-gray-400">Validez votre progression</span>
                  </div>
                  <input type="checkbox" checked={completed} onChange={handleToggle} className="hidden" />
               </label>
               
               <div className="flex gap-4 w-full sm:w-auto">
                  {prevLesson ? <Link to={`/lesson/${trackId}/${prevLesson.id}`} className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 text-center">Précédent</Link> : <div/>}
                  {nextLesson ? <Link to={`/lesson/${trackId}/${nextLesson.id}`} className="flex-1 sm:flex-none px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-800 text-center shadow-md">Suivant</Link> : <Link to={`/track/${trackId}`} className="flex-1 sm:flex-none px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-800 text-center">Terminer</Link>}
               </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;