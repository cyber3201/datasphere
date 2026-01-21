import React from 'react';

// Standard Layout for Text Pages
const LegalLayout: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-white">
     <div className="max-w-3xl mx-auto px-6 py-20 lg:py-24">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-10">{title}</h1>
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:font-light prose-h3:text-xl">
           {children}
        </div>
     </div>
  </div>
);

export const Privacy: React.FC = () => (
  <LegalLayout title="Politique de Confidentialité">
      <h3>1. Collecte des données</h3>
      <p>
        Chez DataSphere, nous appliquons un principe strict de minimisation. Nous ne collectons que les informations nécessaires à votre expérience d'apprentissage (progression, compte utilisateur basique).
      </p>
      <h3>2. Cookies & Traceurs</h3>
      <p>
        Nous n'utilisons aucun cookie publicitaire tiers. Seuls des cookies de session essentiels sont stockés pour maintenir votre connexion active et sauvegarder votre progression.
      </p>
      <h3>3. Stockage</h3>
      <p>
        Vos données de progression sont stockées de manière sécurisée et nous ne partageons aucune information avec des tiers à des fins commerciales.
      </p>
  </LegalLayout>
);

export const Terms: React.FC = () => (
  <LegalLayout title="Conditions d'Utilisation">
      <h3>1. Usage Personnel</h3>
      <p>
        L'accès à DataSphere est gratuit et réservé à un usage personnel et non commercial. Le contenu pédagogique est protégé par le droit d'auteur.
      </p>
      <h3>2. Code de conduite</h3>
      <p>
        En rejoignant notre plateforme, vous vous engagez à maintenir un comportement respectueux et à ne pas tenter de compromettre l'intégrité du site.
      </p>
      <h3>3. Responsabilité</h3>
      <p>
        Bien que nous nous efforcions de fournir un contenu exact, DataSphere ne peut être tenu responsable des erreurs ou omissions dans les cours proposés.
      </p>
  </LegalLayout>
);

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé ! Nous vous répondrons sous 48h.");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full">
         <div className="text-center mb-10">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">Contactez-nous</h1>
            <p className="text-gray-500 font-light text-lg">Nous sommes à votre écoute pour toute question.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
               <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
               <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
               <textarea required rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all transform hover:-translate-y-0.5">Envoyer</button>
         </form>
      </div>
    </div>
  );
};