# DataSphere - Plateforme d'Apprentissage Data

Une plateforme d'apprentissage francophone pour la data et l'analytique, avec des parcours sur SQL, la conception de bases de données, la gouvernance des données et plus encore.

## 🚀 Déploiement sur Netlify

### Option 1: Déploiement via l'interface Netlify (Recommandé)

1. **Connectez-vous à Netlify** : Allez sur [netlify.com](https://netlify.com) et connectez-vous
2. **Nouveau site** : Cliquez sur "Add new site" > "Deploy manually"
3. **Glissez-déposez** : Glissez le dossier du projet dans la zone de dépôt
4. **Attendez** : Netlify construira et déploiera automatiquement votre site

### Option 2: Déploiement via Git

1. **Poussez vers GitHub/GitLab/Bitbucket**
2. **Connectez à Netlify** : Cliquez sur "Add new site" > "Import an existing project"
3. **Sélectionnez votre repo** : Choisissez le dépôt GitHub
4. **Configurez** : Les paramètres de build sont déjà dans `netlify.toml`
5. **Déployez** : Cliquez sur "Deploy site"

### Configuration de Build (Déjà incluse dans netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📦 Installation Locale

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

3. **Construire pour la production**
```bash
npm run build
```

4. **Prévisualiser la build de production**
```bash
npm run preview
```

## 🏗️ Structure du Projet

```
datasphere-fixed/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation principale
│   │   ├── Footer.tsx          # Pied de page
│   │   ├── BackToTop.tsx       # Bouton retour en haut
│   │   ├── ScrollToTop.tsx     # Scroll automatique au changement de route
│   │   └── ErrorBoundary.tsx   # Gestion des erreurs
│   ├── pages/
│   │   ├── Home.tsx            # Page d'accueil
│   │   ├── SqlMastery.tsx      # Page SQL Mastery
│   │   ├── TrackListing.tsx    # Liste des parcours
│   │   ├── ArticlePage.tsx     # Page d'article/leçon
│   │   ├── Practice.tsx        # Éditeur de pratique SQL
│   │   ├── Login.tsx           # Page de connexion
│   │   ├── Signup.tsx          # Page d'inscription
│   │   ├── Profile.tsx         # Page de profil utilisateur
│   │   └── Legal.tsx           # Pages légales (Privacy, Terms, Contact)
│   ├── contexts/
│   │   └── AuthContext.tsx     # Contexte d'authentification
│   ├── App.tsx                 # Composant principal
│   ├── index.tsx               # Point d'entrée
│   ├── index.css               # Styles globaux
│   └── types.ts                # Types TypeScript
├── index.html                  # Template HTML
├── package.json                # Dépendances du projet
├── tsconfig.json               # Configuration TypeScript
├── vite.config.ts              # Configuration Vite
├── tailwind.config.js          # Configuration Tailwind CSS
├── netlify.toml                # Configuration Netlify
└── README.md                   # Ce fichier

```

## 🎨 Technologies Utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **LocalStorage** - Stockage des données utilisateur

## 🔧 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production

## 📝 Fonctionnalités

- ✅ Navigation fluide avec React Router
- ✅ Authentification utilisateur (stockage local)
- ✅ Profils utilisateurs personnalisables
- ✅ Pages de parcours d'apprentissage
- ✅ Éditeur SQL de pratique
- ✅ Design responsive
- ✅ Animations fluides
- ✅ Gestion d'erreurs robuste

## 🐛 Résolution des Problèmes Courants

### Erreur de build
Si vous rencontrez des erreurs lors du build :
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problèmes de routes sur Netlify
Le fichier `netlify.toml` configure automatiquement les redirections. Si vous avez des problèmes de routes 404, vérifiez que ce fichier est bien présent à la racine.

### Erreurs TypeScript
Assurez-vous que tous les fichiers TypeScript sont correctement typés et que `tsconfig.json` est configuré.

## 📄 Licence

© 2024 DataSphere. Tous droits réservés.

## 👤 Auteur

**Zakaria Gbibar**
- Étudiant FSTS - Transformation Digitale
- Gestionnaire des opérations digitales à Holistic Health Academy

## 🤝 Support

Pour toute question ou problème :
- Email: contact@datasphere.ma
- Localisation: Casablanca, Maroc
