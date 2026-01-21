import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

declare global {
  interface Window {
    initSqlJs: (config?: any) => Promise<any>;
  }
}

const INITIAL_QUERY = `-- Bienvenue sur l'éditeur SQL DataSphere.
-- Sélectionnez les commandes livrées à Casablanca :

SELECT o.order_id, c.last_name, s.carrier, s.tracking_code
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN shipments s ON o.order_id = s.order_id
WHERE c.city = 'Casablanca' AND s.status = 'Livrée';`;

interface TableSchema {
  name: string;
  columns: { name: string; type: string }[];
}

interface Example {
  label: string;
  query: string;
}

const EXAMPLES: Example[] = [
  { label: "1. SELECT Basique", query: "SELECT first_name, last_name, city, phone \nFROM customers \nWHERE city = 'Rabat';" },
  { label: "2. Filtrage (WHERE)", query: "SELECT * \nFROM orders \nWHERE amount_mad > 5000 AND status = 'payée';" },
  { label: "3. Jointure (JOIN)", query: "SELECT c.last_name, o.item, o.amount_mad \nFROM customers c \nJOIN orders o ON c.customer_id = o.customer_id \nORDER BY o.amount_mad DESC;" },
  { label: "4. Agrégation (GROUP BY)", query: "SELECT city, COUNT(*) as client_count \nFROM customers \nGROUP BY city;" },
  { label: "5. Filtre Groupe (HAVING)", query: "SELECT city, COUNT(*) as total \nFROM customers \nGROUP BY city \nHAVING total > 1;" },
  { label: "6. Top 3 Dépenses", query: "SELECT item, amount_mad \nFROM orders \nORDER BY amount_mad DESC \nLIMIT 3;" },
];

const Practice: React.FC = () => {
  const [db, setDb] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState(INITIAL_QUERY);
  const [results, setResults] = useState<any[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [schemas, setSchemas] = useState<TableSchema[]>([]);
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({ 'customers': true });
  const [activeTab, setActiveTab] = useState<'tables' | 'editor' | 'results'>('editor');
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const loadSqlJs = async () => {
      try {
        if (!window.initSqlJs) {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
            script.async = true;
            document.body.appendChild(script);
            await new Promise((resolve) => script.onload = resolve);
        }
        
        const SQL = await window.initSqlJs({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const newDb = new SQL.Database();
        initializeDatabase(newDb);
        setDb(newDb);
        refreshSchemas(newDb);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le moteur SQL.");
        setIsLoading(false);
      }
    };
    loadSqlJs();
  }, []);

  const initializeDatabase = (database: any) => {
    database.run(`
      CREATE TABLE customers (customer_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, city TEXT, country TEXT, phone TEXT);
      CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, item TEXT, amount_mad INTEGER, status TEXT, FOREIGN KEY(customer_id) REFERENCES customers(customer_id));
      CREATE TABLE shipments (shipping_id INTEGER PRIMARY KEY, order_id INTEGER, carrier TEXT, tracking_code TEXT, status TEXT, FOREIGN KEY(order_id) REFERENCES orders(order_id));
      
      INSERT INTO customers VALUES 
      (1, 'Karim', 'Bennani', 'Casablanca', 'Maroc', '0661-123456'), (2, 'Sara', 'Idrissi', 'Rabat', 'Maroc', '0662-987654'),
      (3, 'Omar', 'Alaoui', 'Marrakech', 'Maroc', '0670-554433'), (4, 'Fatima', 'Zohra', 'Fès', 'Maroc', '0655-223344'),
      (5, 'Youssef', 'Tazi', 'Tanger', 'Maroc', '0663-112299'), (6, 'Amina', 'Chraibi', 'Casablanca', 'Maroc', '0612-334455');

      INSERT INTO orders VALUES
      (1, 1, 'MacBook Pro M2', 18000, 'payée'), (2, 1, 'Souris MX', 900, 'payée'),
      (3, 2, 'Écran Dell', 3500, 'payée'), (4, 3, 'Sony WH-1000XM5', 2800, 'payée'),
      (5, 4, 'Clavier Keychron', 1200, 'en_attente'), (6, 5, 'iPhone 14', 11000, 'payée');

      INSERT INTO shipments VALUES
      (1, 1, 'Amana', 'MA-882192', 'Livrée'), (2, 2, 'Amana', 'MA-882193', 'Livrée'),
      (3, 3, 'Aramex', 'AR-992100', 'Livrée'), (4, 4, 'Chronopost', 'CH-112233', 'En transit');
    `);
  };

  const refreshSchemas = (database: any) => {
    try {
      const res = database.exec("SELECT name FROM sqlite_master WHERE type='table';");
      if (res.length > 0) {
        const tables = res[0].values.flat();
        const newSchemas = tables.map((name: string) => {
          const info = database.exec(`PRAGMA table_info(${name})`);
          return {
             name,
             columns: info[0].values.map((r: any) => ({ name: r[1], type: r[2] }))
          };
        });
        setSchemas(newSchemas);
      }
    } catch(e) { console.error(e); }
  };

  const handleRun = () => {
    if (!db) return;
    setMessage(null); setError(null); setResults(null);
    if (window.innerWidth < 1024) setActiveTab('results');
    try {
      const res = db.exec(code);
      setResults(res);
      if (res.length === 0 && !code.trim().toUpperCase().startsWith('SELECT')) {
         setMessage("Requête exécutée avec succès.");
         refreshSchemas(db);
      } else if (res.length === 0) {
         setMessage("Aucun résultat.");
      }
    } catch (e: any) { setError(e.message); }
  };

  const resetDB = () => {
     if(!db) return;
     initializeDatabase(db);
     refreshSchemas(db);
     setMessage("Base de données réinitialisée.");
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-cream"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white overflow-hidden">
       {/* Mobile Tabs */}
       <div className="lg:hidden flex bg-white border-b border-gray-200 p-2 overflow-x-auto gap-2">
             {['tables','editor','results'].map((t:any) => (
                <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 px-3 py-2 text-xs font-bold uppercase rounded-md border ${activeTab===t ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{t}</button>
             ))}
       </div>

       <div className="flex-1 flex overflow-hidden p-0 lg:p-4 gap-0 lg:gap-4 bg-gray-50">
          {/* Schema - Col 1 (Wider) */}
          <div className={`w-full lg:w-72 bg-white lg:rounded-md lg:border border-gray-200 flex-col shadow-sm ${activeTab==='tables' ? 'flex' : 'hidden lg:flex'}`}>
             <div className="p-2 border-b border-gray-100 font-bold text-xs text-gray-500 uppercase bg-gray-50 lg:rounded-t-md flex justify-between items-center">
                <span>Tables (Maroc)</span>
                <button onClick={resetDB} className="text-[10px] text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded">Reset</button>
             </div>
             <div className="flex-1 overflow-y-auto p-1 space-y-1">
                {schemas.map(s => (
                   <div key={s.name}>
                      <button onClick={() => setExpandedTables(prev => ({...prev, [s.name]: !prev[s.name]}))} className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-xs font-bold text-gray-700">
                         <svg className={`w-3 h-3 text-gray-400 transition-transform ${expandedTables[s.name]?'rotate-90':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                         {s.name}
                      </button>
                      {expandedTables[s.name] && (
                         <div className="pl-6 pr-2 space-y-0.5 mt-0.5">
                            {s.columns.map(c => <div key={c.name} className="flex justify-between text-[10px] text-gray-400 font-mono py-0.5 border-b border-gray-50 last:border-0"><span className="text-gray-600">{c.name}</span><span className="text-blue-400">{c.type}</span></div>)}
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>

          {/* Editor - Col 2 */}
          <div className={`flex-1 bg-white lg:rounded-md lg:border border-gray-200 flex-col shadow-sm overflow-hidden ${activeTab==='editor' ? 'flex' : 'hidden lg:flex'}`}>
             <div className="p-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center lg:rounded-t-md">
                <div className="flex items-center gap-2 w-full">
                   <button onClick={handleRun} className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 flex items-center gap-1 shadow-sm transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> RUN
                   </button>
                   <div className="h-6 w-px bg-gray-300 mx-1"></div>
                   <select onChange={(e) => { const x = EXAMPLES.find(ex => ex.label === e.target.value); if(x) setCode(x.query); }} className="text-xs border-gray-300 rounded py-1.5 pl-2 pr-6 bg-white flex-1 max-w-xs cursor-pointer shadow-sm focus:ring-1 focus:ring-primary focus:border-primary">
                      <option disabled selected>Charger un exemple...</option>
                      {EXAMPLES.map(e => <option key={e.label} value={e.label}>{e.label}</option>)}
                   </select>
                </div>
             </div>
             <div className="flex-1 overflow-hidden relative text-sm border-b border-gray-100">
                <CodeMirror value={code} height="100%" extensions={[sql()]} onChange={(val) => setCode(val)} theme="light" />
             </div>
             {message && <div className="p-2 bg-blue-50 text-xs text-blue-800 font-medium border-t border-blue-100">{message}</div>}
          </div>

          {/* Results - Col 3 (Wider) */}
          <div className={`w-full lg:w-96 bg-white lg:rounded-md lg:border border-gray-200 flex-col shadow-sm overflow-hidden ${activeTab==='results' ? 'flex' : 'hidden lg:flex'}`}>
             <div className="p-2 border-b border-gray-100 font-bold text-xs text-gray-500 uppercase bg-gray-50 lg:rounded-t-md">Résultats</div>
             <div className="flex-1 overflow-auto bg-white p-0">
                {error ? (
                   <div className="p-4 text-xs text-red-600 font-mono bg-red-50 border-b border-red-100">{error}</div>
                ) : results && results.length > 0 ? (
                   <table className="min-w-full text-left text-xs border-collapse">
                      <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                         <tr>{results[0].columns.map((c:string, i:number) => <th key={i} className="px-3 py-2 font-semibold text-gray-700 border-b border-gray-200 bg-gray-50 whitespace-nowrap">{c}</th>)}</tr>
                      </thead>
                      <tbody>
                         {results[0].values.map((row:any[], i:number) => (
                            <tr key={i} className="hover:bg-blue-50 transition-colors">
                               {row.map((val, j) => <td key={j} className="px-3 py-2 border-b border-gray-100 text-gray-700 whitespace-nowrap">{val}</td>)}
                            </tr>
                         ))}
                      </tbody>
                   </table>
                ) : (
                   <div className="h-full flex flex-col items-center justify-center text-gray-300">
                      <div className="p-4 bg-gray-50 rounded-full mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                      </div>
                      <p className="text-xs font-medium text-gray-400">Aucune donnée à afficher</p>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

export default Practice;