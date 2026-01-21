
import { Track } from '../types';

// --- HELPER FUNCTIONS ---

const createPlaceholderLesson = (id: string, title: string) => ({
  id,
  slug: id,
  title,
  duration: "10 min",
  content: {
    paragraphs: [
      "Le contenu de ce module est en cours de développement.",
      "Nous travaillons avec des experts pour vous fournir une formation de haute qualité, adaptée aux réalités du marché.",
      "Revenez bientôt pour accéder à ce cours complet.",
      "En attendant, vous pouvez explorer les parcours Maîtrise SQL, Database Design ou Data Management qui sont déjà disponibles."
    ],
    exampleTitle: "Exemple à venir",
    exampleContent: "Un cas pratique détaillé sera ajouté ici prochainement.",
    quiz: [
      {
        id: `q1-${id}`,
        question: "Question de démonstration ?",
        options: ["Option A", "Option B", "Option C"],
        correctIndex: 0,
        explanation: "Contenu à venir."
      },
      {
        id: `q2-${id}`,
        question: "Question de démonstration ?",
        options: ["Option A", "Option B", "Option C"],
        correctIndex: 0,
        explanation: "Contenu à venir."
      },
      {
        id: `q3-${id}`,
        question: "Question de démonstration ?",
        options: ["Option A", "Option B", "Option C"],
        correctIndex: 0,
        explanation: "Contenu à venir."
      }
    ]
  }
});

const createTrack = (id: string, title: string, description: string, color: string, icon: string, moduleTitles: string[]) => {
  return {
    id,
    slug: id,
    title,
    description,
    longDescription: description,
    color,
    icon,
    details: {
      skills: moduleTitles.slice(0, 4),
      overview: "Ce parcours offre une approche structurée et professionnelle. Le contenu détaillé sera disponible prochainement.",
      targetAudience: ["Professionnels", "Étudiants", "Managers"],
      prerequisites: ["Aucun prérequis spécifique"],
      outcomes: ["Maîtrise des concepts clés", "Application pratique", "Vision stratégique"]
    },
    modules: moduleTitles.map((modTitle, idx) => ({
      id: `${id}-m${idx + 1}`,
      title: modTitle,
      lessons: [createPlaceholderLesson(`${id}-m${idx + 1}-l1`, modTitle)]
    }))
  };
};

// --- 1. SQL MASTERY (FULL CONTENT) ---
const sqlMasteryTrack = {
  id: 'sql-mastery',
  slug: 'sql-mastery',
  title: 'Maîtrise SQL',
  description: 'Devenez un expert du langage SQL, des requêtes simples aux analyses complexes.',
  longDescription: 'Ce cours complet vous emmène des bases absolues jusqu\'aux techniques d\'optimisation avancées. Conçu pour les analystes, ingénieurs et professionnels business, il couvre l\'intégralité du cycle de vie de la donnée via SQL.',
  color: "from-blue-600 to-blue-800",
  icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  details: {
    skills: ['SELECT & Filtering', 'Jointures Complexes', 'Window Functions', 'Performance Tuning', 'Data Analysis', 'Reporting BI'],
    overview: "Le SQL (Structured Query Language) est la compétence la plus demandée dans le monde de la data. Ce n'est pas seulement un langage de programmation, c'est l'outil universel pour interroger, analyser et transformer les données. Ce parcours est structuré pour vous donner une maîtrise opérationnelle immédiate.",
    targetAudience: ['Data Analysts', 'Développeurs Backend', 'Business Analysts', 'Futurs Data Engineers'],
    prerequisites: ['Aucune connaissance préalable requise', 'Un ordinateur avec un navigateur moderne'],
    outcomes: ['Écrire des requêtes performantes sur des millions de lignes', 'Analyser des données multi-sources', 'Comprendre les plans d\'exécution']
  },
  modules: [
    {
      id: 'sql-m1',
      title: 'Fondamentaux SQL',
      lessons: [
        {
          id: 'sql-1-1', slug: 'intro-sql', title: 'Introduction au SQL', duration: "10 min",
          content: { 
            paragraphs: [
              "SQL (Structured Query Language) est le langage standard pour interagir avec les bases de données relationnelles. Créé dans les années 70, il reste aujourd'hui la compétence technique la plus demandée dans le domaine de la data, loin devant Python ou R pour l'accès aux données.",
              "Son rôle est essentiel car la majorité des données d'entreprise résident dans des bases relationnelles. Que vous soyez analyste, développeur ou manager, SQL est la clé qui vous donne accès à l'information brute sans dépendre d'outils intermédiaires.",
              "Dans le cycle de vie de la donnée, SQL intervient partout : lors de l'extraction, du nettoyage, de la transformation et de l'analyse finale. C'est le langage universel de la data.",
              "Contrairement aux langages procéduraux (comme Java ou C++), SQL est déclaratif. Vous dites à la base de données CE QUE vous voulez (le résultat), et non COMMENT l'obtenir (l'algorithme)."
            ], 
            exampleTitle: "La demande d'information",
            exampleContent: "Au lieu d'écrire un programme pour parcourir un fichier ligne par ligne, en SQL vous écrivez simplement : Donne-moi tous les clients français. Le moteur de base de données se charge de trouver la méthode la plus efficace pour les récupérer.", 
            quiz: [
              { id: 'q1', question: "Que signifie SQL ?", options: ["Structured Question List", "Structured Query Language", "Simple Query Logic"], correctIndex: 1, explanation: "C'est le Langage de Requête Structurée standardisé." },
              { id: 'q2', question: "Quelle est la nature du langage SQL ?", options: ["Impératif (Comment faire)", "Déclaratif (Quoi obtenir)", "Oriente Objet"], correctIndex: 1, explanation: "On décrit le résultat souhaité, pas les étapes pour y arriver." },
              { id: 'q3', question: "Où SQL intervient-il dans le cycle de la donnée ?", options: ["Uniquement au stockage", "De l'extraction à l'analyse", "Seulement pour la suppression"], correctIndex: 1, explanation: "C'est un outil transversal utilisé à presque toutes les étapes." }
            ] 
          }
        },
        {
          id: 'sql-1-2', slug: 'db-basics', title: 'Bases de Données & Tables', duration: "15 min",
          content: { 
            paragraphs: [
              "Une base de données relationnelle est une collection organisée de données. Elle est structurée en Tables, qui ressemblent à des feuilles de calcul Excel avec des lignes (enregistrements) et des colonnes (attributs).",
              "Chaque table représente une entité spécifique (ex: Clients, Produits). Les colonnes définissent le type de donnée (Texte, Nombre, Date) et les lignes contiennent les données réelles.",
              "La Clé Primaire (Primary Key) est un concept fondamental. C'est une colonne (ou un groupe de colonnes) qui identifie de manière unique chaque ligne de la table. Elle garantit qu'il n'y a pas de doublons stricts.",
              "Les tables sont reliées entre elles par des relations logiques, souvent via des Clés Étrangères (Foreign Keys), ce qui permet de structurer l'information sans redondance excessive."
            ], 
            exampleTitle: "Structure Table Client",
            exampleContent: "Table 'Customers' :\n- ID (Clé Primaire, Entier)\n- Nom (Texte)\n- Email (Texte)\n- Ville (Texte)\nChaque client a un ID unique. On ne stocke pas ses commandes dans cette table, mais dans une autre table liée.", 
            quiz: [
              { id: 'q1', question: "Qu'est-ce qu'une table dans une base de données ?", options: ["Un fichier texte", "Une structure organisée en lignes et colonnes", "Un graphique"], correctIndex: 1, explanation: "C'est l'unité de stockage fondamentale contenant les données." },
              { id: 'q2', question: "À quoi sert une Clé Primaire ?", options: ["À trier les données", "À identifier de manière unique chaque ligne", "À sécuriser la base"], correctIndex: 1, explanation: "Elle est l'identifiant unique de l'enregistrement (ex: ID Client)." },
              { id: 'q3', question: "Que contient une colonne ?", options: ["Un attribut spécifique (ex: email) pour toutes les lignes", "Un mélange de données", "Une seule ligne"], correctIndex: 0, explanation: "Une colonne définit un type d'information homogène." }
            ] 
          }
        },
        {
          id: 'sql-1-3', slug: 'basic-select', title: 'Requêtes SELECT de base', duration: "15 min",
          content: { 
            paragraphs: [
              "La commande SELECT est la base de toute interrogation SQL. Elle permet de spécifier quelles colonnes vous souhaitez récupérer. La clause FROM indique la table source.",
              "Pour filtrer les résultats et ne récupérer que les lignes pertinentes, on utilise la clause WHERE. C'est ici qu'on applique des conditions logiques.",
              "Les résultats ne sont pas triés par défaut. La clause ORDER BY permet de les classer par ordre croissant (ASC) ou décroissant (DESC) selon une ou plusieurs colonnes.",
              "Enfin, la clause LIMIT permet de restreindre le nombre de lignes retournées, ce qui est très utile pour explorer de grandes tables sans surcharger le réseau."
            ], 
            exampleTitle: "Requête Basique",
            exampleContent: "SELECT nom, prix FROM produits WHERE prix > 50 ORDER BY prix DESC LIMIT 10;\nCette requête récupère le nom et le prix des 10 produits les plus chers coûtant plus de 50 euros.", 
            quiz: [
              { id: 'q1', question: "Quelles sont les deux clauses obligatoires pour lire des données ?", options: ["SELECT et WHERE", "SELECT et FROM", "FROM et ORDER BY"], correctIndex: 1, explanation: "Il faut dire QUOI (Select) et D'OÙ (From)." },
              { id: 'q2', question: "Quelle clause sert à filtrer les lignes ?", options: ["ORDER BY", "LIMIT", "WHERE"], correctIndex: 2, explanation: "WHERE applique les conditions de restriction." },
              { id: 'q3', question: "Comment inverser l'ordre de tri ?", options: ["Utiliser DESC", "Utiliser REVERSE", "Utiliser INVERT"], correctIndex: 0, explanation: "ORDER BY colonne DESC trie du plus grand au plus petit." }
            ] 
          }
        }
      ]
    },
    {
        id: 'sql-m2', 
        title: 'Opérations SQL Fondamentales',
        lessons: [
          {
            id: 'sql-2-1', slug: 'filtering-conditions', title: 'Filtres et Conditions', duration: "20 min",
            content: { 
              paragraphs: [
                "Au-delà des simples égalités, SQL offre des opérateurs logiques puissants. AND exige que toutes les conditions soient vraies, OR demande qu'au moins une soit vraie, et NOT inverse une condition.",
                "Les opérateurs de comparaison incluent >, <, >=, <=, et <> (différent de). Pour des filtres plus complexes, on utilise BETWEEN (plage de valeurs), IN (liste de valeurs) et LIKE (recherche de texte partiel).",
                "La gestion des valeurs NULL est piègeuse. NULL signifie absence de valeur (ni zéro, ni vide). On ne peut pas utiliser = NULL, il faut impérativement utiliser IS NULL ou IS NOT NULL.",
                "La maîtrise des priorités (parenthèses) est cruciale lors de la combinaison de AND et OR pour éviter des erreurs logiques silencieuses."
              ], 
              exampleTitle: "Filtre complexe",
              exampleContent: "SELECT * FROM utilisateurs WHERE (ville = 'Paris' OR ville = 'Lyon') AND statut IS NOT NULL;\nCette requête cherche les utilisateurs actifs situés soit à Paris, soit à Lyon.", 
              quiz: [
                { id: 'q1', question: "Comment vérifier si une colonne est vide (NULL) ?", options: ["= NULL", "IS NULL", "== NULL"], correctIndex: 1, explanation: "NULL n'est pas une valeur, c'est un état, donc l'égalité ne marche pas." },
                { id: 'q2', question: "Que fait l'opérateur IN ?", options: ["Vérifie si une valeur est dans une liste donnée", "Vérifie l'intérieur d'un texte", "Crée une entrée"], correctIndex: 0, explanation: "C'est un raccourci pour plusieurs conditions OR." },
                { id: 'q3', question: "Quelle est la priorité logique par défaut ?", options: ["OR avant AND", "AND avant OR", "Aucune priorité"], correctIndex: 1, explanation: "AND est prioritaire, comme la multiplication en maths. Utilisez des parenthèses." }
              ] 
            }
          },
          {
            id: 'sql-2-2', slug: 'aggregations-grouping', title: 'Agrégations et Groupement', duration: "20 min",
            content: { 
              paragraphs: [
                "L'analyse de données repose souvent sur le résumé d'informations. Les fonctions d'agrégation comme COUNT (compter), SUM (somme), AVG (moyenne), MIN et MAX permettent de synthétiser des colonnes entières.",
                "La clause GROUP BY est utilisée pour créer des sous-groupes sur lesquels appliquer ces agrégations (ex: somme des ventes PAR mois).",
                "Pour filtrer sur le résultat d'une agrégation (ex: garder les mois avec > 10k ventes), on ne peut pas utiliser WHERE. Il faut utiliser la clause HAVING, qui s'exécute après le groupement.",
                "Une erreur classique est de sélectionner une colonne non agrégée sans l'inclure dans le GROUP BY, ce qui provoque une erreur SQL ou des résultats aléatoires."
              ], 
              exampleTitle: "Ventes par Catégorie",
              exampleContent: "SELECT categorie, SUM(montant) as total FROM ventes GROUP BY categorie HAVING SUM(montant) > 1000;\nCalcule le total des ventes par catégorie, et ne garde que celles dépassant 1000€.", 
              quiz: [
                { id: 'q1', question: "Quelle clause filtre les résultats APRES l'agrégation ?", options: ["WHERE", "HAVING", "FILTER"], correctIndex: 1, explanation: "WHERE filtre les lignes brutes, HAVING filtre les groupes agrégés." },
                { id: 'q2', question: "Que fait COUNT(*) ?", options: ["Compte toutes les lignes, y compris les NULLs", "Compte les lignes non-NULL", "Compte les colonnes"], correctIndex: 0, explanation: "C'est la méthode standard pour compter le volume de lignes." },
                { id: 'q3', question: "Si j'utilise GROUP BY ville, puis-je sélectionner le nom du client ?", options: ["Oui", "Non, sauf si j'agrège le nom ou si je groupe aussi par nom", "Seulement s'il est unique"], correctIndex: 1, explanation: "On ne peut pas afficher un détail (nom) quand on a compressé les données par groupe (ville)." }
              ] 
            }
          },
          {
            id: 'sql-2-3', slug: 'joins-relationships', title: 'Jointures et Relations', duration: "25 min",
            content: { 
              paragraphs: [
                "Les données sont réparties dans plusieurs tables pour éviter la redondance. Les JOINS permettent de les recombiner lors de l'interrogation. C'est le super-pouvoir des bases relationnelles.",
                "INNER JOIN ne garde que les lignes qui ont une correspondance dans les deux tables (intersection). LEFT JOIN garde toutes les lignes de la table de gauche, même sans correspondance à droite (utile pour trouver les 'manquants').",
                "RIGHT JOIN est l'inverse du LEFT, et FULL JOIN garde tout. La jointure se fait généralement sur une clé étrangère (ex: commande.client_id = client.id).",
                "Attention aux jointures Many-to-Many qui peuvent exploser le nombre de lignes (produit cartésien) si les clés de jointure ne sont pas uniques."
              ], 
              exampleTitle: "Commandes et Clients",
              exampleContent: "SELECT c.nom, o.date FROM clients c INNER JOIN commandes o ON c.id = o.client_id;\nCeci retourne la liste des clients ayant passé commande. Un client sans commande n'apparaîtra pas.", 
              quiz: [
                { id: 'q1', question: "Quel JOIN utiliser pour voir TOUS les clients, même sans commande ?", options: ["INNER JOIN", "LEFT JOIN (si clients est à gauche)", "RIGHT JOIN"], correctIndex: 1, explanation: "LEFT JOIN préserve la table principale (gauche) intégralement." },
                { id: 'q2', question: "Sur quel type de colonne fait-on généralement une jointure ?", options: ["Une date", "Une clé (ID)", "Un commentaire"], correctIndex: 1, explanation: "Les clés (Primaires/Étrangères) sont faites pour lier les tables." },
                { id: 'q3', question: "Qu'est-ce un produit cartésien ?", options: ["Une carte géographique", "Le croisement de toutes les lignes avec toutes les lignes (explosion)", "Un produit mathématique"], correctIndex: 1, explanation: "Cela arrive lors d'une jointure sans condition ou mal définie." }
              ] 
            }
          }
        ]
    },
    {
      id: 'sql-m3',
      title: 'SQL Intermédiaire',
      lessons: [
        {
          id: 'sql-3-1', slug: 'subqueries', title: 'Sous-requêtes (Subqueries)', duration: "20 min",
          content: { 
            paragraphs: [
              "Une sous-requête est une requête imbriquée à l'intérieur d'une autre requête. Elle peut être utilisée dans les clauses SELECT, FROM ou WHERE. Elle agit comme une table temporaire ou une valeur dynamique.",
              "Une sous-requête scalaire retourne une seule valeur (ex: le prix moyen global) et peut être comparée avec > ou <. Une sous-requête table retourne plusieurs lignes et s'utilise avec IN ou EXISTS.",
              "Les sous-requêtes corrélées dépendent de la requête principale et sont exécutées pour chaque ligne, ce qui peut être très lent. Il faut souvent leur préférer les jointures.",
              "Elles sont puissantes pour les analyses en plusieurs étapes : trouver les clients qui ont acheté plus que la moyenne."
            ], 
            exampleTitle: "Au-dessus de la moyenne",
            exampleContent: "SELECT * FROM produits WHERE prix > (SELECT AVG(prix) FROM produits);\nIci, la sous-requête calcule la moyenne une fois, et la requête principale filtre les produits.", 
            quiz: [
              { id: 'q1', question: "Qu'est-ce qu'une sous-requête scalaire ?", options: ["Une requête qui retourne une seule valeur", "Une requête qui retourne une table", "Une requête qui plante"], correctIndex: 0, explanation: "Elle remplace une valeur fixe par une valeur calculée." },
              { id: 'q2', question: "Où peut-on placer une sous-requête ?", options: ["Seulement dans WHERE", "Dans SELECT, FROM, WHERE, HAVING", "Nulle part"], correctIndex: 1, explanation: "C'est très flexible, on peut l'utiliser presque partout." },
              { id: 'q3', question: "Quel est le risque d'une sous-requête corrélée ?", options: ["Elle est trop rapide", "Problème de performance (exécutée pour chaque ligne)", "Elle donne des faux résultats"], correctIndex: 1, explanation: "Sur une grosse table, cela peut tuer les performances." }
            ] 
          }
        },
        {
          id: 'sql-3-2', slug: 'set-operations', title: 'Opérations Ensemblistes', duration: "15 min",
          content: { 
            paragraphs: [
              "Les opérations ensemblistes combinent les résultats de deux requêtes verticalement (empilement), contrairement aux jointures qui combinent horizontalement.",
              "UNION combine les résultats et supprime les doublons. UNION ALL combine tout et garde les doublons (plus rapide).",
              "INTERSECT retourne uniquement les lignes présentes dans les deux résultats. EXCEPT (ou MINUS) retourne les lignes du premier résultat qui ne sont pas dans le second.",
              "Pour que cela fonctionne, les deux requêtes doivent avoir exactement le même nombre de colonnes et des types de données compatibles."
            ], 
            exampleTitle: "Clients 2023 et 2024",
            exampleContent: "SELECT email FROM clients_2023 UNION SELECT email FROM clients_2024;\nCela crée une liste unique de tous les emails, sans doublon, issus des deux tables.", 
            quiz: [
              { id: 'q1', question: "Quelle est la différence entre UNION et UNION ALL ?", options: ["Aucune", "UNION supprime les doublons, UNION ALL garde tout", "UNION est plus rapide"], correctIndex: 1, explanation: "UNION fait un travail de déduplication supplémentaire." },
              { id: 'q2', question: "Que fait INTERSECT ?", options: ["Retourne les éléments communs aux deux requêtes", "Retourne tout", "Retourne les différences"], correctIndex: 0, explanation: "C'est l'intersection mathématique de deux ensembles." },
              { id: 'q3', question: "Quelle est la contrainte principale ?", options: ["Même nom de table", "Même nombre et type de colonnes", "Même nombre de lignes"], correctIndex: 1, explanation: "On ne peut pas empiler des pommes et des poires." }
            ] 
          }
        },
        {
          id: 'sql-3-3', slug: 'dates-text', title: 'Manipulation de Dates et Texte', duration: "20 min",
          content: { 
            paragraphs: [
              "Les données brutes nécessitent souvent un nettoyage ou une transformation. Les fonctions de texte permettent de concaténer, extraire des sous-chaînes, ou changer la casse (UPPER, LOWER).",
              "Les fonctions de date sont cruciales pour l'analyse temporelle : extraire l'année, ajouter des jours, ou calculer la différence entre deux dates (DATEDIFF).",
              "Le formatage est aussi important : convertir une date en texte lisible ou nettoyer des espaces superflus avec TRIM.",
              "Ces fonctions varient légèrement selon le système (MySQL vs PostgreSQL), mais la logique reste la même."
            ], 
            exampleTitle: "Extraction d'année",
            exampleContent: "SELECT EXTRACT(YEAR FROM date_commande) as annee, COUNT(*) FROM commandes GROUP BY annee;\nPermet d'analyser l'évolution du volume de commandes par année.", 
            quiz: [
              { id: 'q1', question: "À quoi sert la fonction TRIM ?", options: ["Couper les cheveux", "Enlever les espaces inutiles au début et à la fin d'un texte", "Mettre en majuscule"], correctIndex: 1, explanation: "Essentiel pour nettoyer les données saisies par des humains." },
              { id: 'q2', question: "Comment combiner deux colonnes texte (ex: Prénom + Nom) ?", options: ["Avec + ou CONCAT()", "Avec MULTIPLY", "Avec MERGE"], correctIndex: 0, explanation: "La concaténation assemble des chaînes de caractères." },
              { id: 'q3', question: "Pourquoi extraire des parties de date ?", options: ["Pour réduire la taille", "Pour agréger les données par année, mois ou jour", "Pour cacher la date"], correctIndex: 1, explanation: "C'est la base de l'analyse de séries temporelles." }
            ] 
          }
        }
      ]
    },
    {
      id: 'sql-m4',
      title: 'SQL Avancé',
      lessons: [
        {
          id: 'sql-4-1', slug: 'window-functions', title: 'Fonctions de Fenêtrage', duration: "25 min",
          content: { 
            paragraphs: [
              "Les Window Functions sont l'outil le plus puissant pour l'analyse avancée. Contrairement au GROUP BY qui écrase les lignes, elles permettent de calculer des agrégations tout en gardant le détail des lignes.",
              "Elles utilisent la clause OVER(), qui peut contenir PARTITION BY (pour définir le groupe) et ORDER BY (pour l'ordre dans le groupe).",
              "Des fonctions comme ROW_NUMBER(), RANK(), LEAD() et LAG() permettent de faire des classements ou de comparer une ligne avec la précédente.",
              "Cas d'usage typique : calcul de solde cumulé, classement des ventes par région, ou calcul de la croissance mois par mois."
            ], 
            exampleTitle: "Classement par département",
            exampleContent: "SELECT nom, salaire, RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) as rang FROM employes;\nCela attribue un rang (1, 2, 3...) à chaque employé au sein de son département selon son salaire.", 
            quiz: [
              { id: 'q1', question: "Quelle est la différence principale avec GROUP BY ?", options: ["Aucune", "Les Window Functions ne réduisent pas le nombre de lignes", "Elles sont plus lentes"], correctIndex: 1, explanation: "On garde le détail tout en ayant le calcul agrégé." },
              { id: 'q2', question: "À quoi sert PARTITION BY ?", options: ["À supprimer des données", "À définir la fenêtre (le groupe) sur laquelle la fonction s'applique", "À trier"], correctIndex: 1, explanation: "C'est l'équivalent du GROUP BY mais pour la fenêtre." },
              { id: 'q3', question: "Que fait LAG() ?", options: ["Accède à la valeur de la ligne précédente", "Ralentit la requête", "Donne la dernière valeur"], correctIndex: 0, explanation: "Très utile pour calculer des variations (Delta)." }
            ] 
          }
        },
        {
          id: 'sql-4-2', slug: 'performance-optimization', title: 'Performance et Optimisation', duration: "20 min",
          content: { 
            paragraphs: [
              "Écrire une requête qui marche est bien, écrire une requête rapide est mieux. Le moteur SQL utilise un 'Plan d'Exécution' pour décider comment récupérer les données.",
              "Les Index sont comme l'index d'un livre : ils permettent de trouver une ligne sans lire toute la table (Full Table Scan). Ils sont essentiels sur les colonnes filtrées ou jointes.",
              "Évitez les 'SELECT *', car cela récupère des données inutiles et empêche l'utilisation optimale des index. Sélectionnez uniquement les colonnes nécessaires.",
              "Attention aux fonctions sur les colonnes indexées (ex: WHERE YEAR(date) = 2023) qui rendent l'index inutilisable. Préférez une plage de dates."
            ], 
            exampleTitle: "L'impact de l'Index",
            exampleContent: "Sans index, chercher un client par email dans une table de 1M lignes prend 1 seconde. Avec un index sur 'email', cela prend 0.001 seconde car le moteur va directement au but.", 
            quiz: [
              { id: 'q1', question: "Pourquoi éviter SELECT * ?", options: ["C'est vulgaire", "Cela gaspille des ressources (I/O, réseau) et ignore les index couvrants", "C'est interdit"], correctIndex: 1, explanation: "La performance dépend du volume de données déplacé." },
              { id: 'q2', question: "Qu'est-ce qu'un Index ?", options: ["Une liste de chapitres", "Une structure de données qui accélère la recherche", "Une clé primaire"], correctIndex: 1, explanation: "C'est un arbre de recherche optimisé." },
              { id: 'q3', question: "Qu'est-ce qu'un Full Table Scan ?", options: ["Scanner le code barre", "Lire la table entière pour trouver une info (lent)", "Une bonne chose"], correctIndex: 1, explanation: "C'est ce qu'on essaie d'éviter avec les index." }
            ] 
          }
        },
        {
          id: 'sql-4-3', slug: 'advanced-analysis', title: 'Analyse de Données Avancée', duration: "25 min",
          content: { 
            paragraphs: [
              "SQL permet des analyses complexes dignes des meilleurs outils BI. On peut créer des pivots, des analyses de cohorte ou des entonnoirs de conversion.",
              "Les jointures multi-niveaux (en étoile) permettent de relier des faits (ventes) à plusieurs dimensions (temps, produit, client).",
              "L'utilisation des CTE (Common Table Expressions) avec WITH permet de décomposer un problème complexe en étapes lisibles et modulaires.",
              "L'objectif est de transformer la donnée brute en insights business exploitables directement depuis la base."
            ], 
            exampleTitle: "Analyse de Cohorte",
            exampleContent: "Utiliser des CTE pour grouper les utilisateurs par mois d'inscription, puis calculer le % de rétention mois par mois. C'est une analyse classique en startup SaaS faite en pur SQL.", 
            quiz: [
              { id: 'q1', question: "Quel est l'avantage d'une CTE (WITH ...) ?", options: ["Améliorer la lisibilité et la structure d'une requête complexe", "Aucun", "Sauvegarder les données"], correctIndex: 0, explanation: "Cela permet de nommer des sous-résultats temporaires." },
              { id: 'q2', question: "Qu'est-ce qu'un schéma en étoile ?", options: ["Une forme géométrique", "Une table de faits centrale reliée à des tables de dimensions", "Un type de base de données"], correctIndex: 1, explanation: "C'est le modèle standard pour l'analyse décisionnelle." },
              { id: 'q3', question: "Le but final du SQL analytique est :", options: ["D'extraire des lignes", "De produire des insights business actionnables", "De faire des calculs"], correctIndex: 1, explanation: "La technique doit servir la compréhension du business." }
            ] 
          }
        }
      ]
    },
    {
      id: 'sql-m5',
      title: 'SQL en Contexte Réel',
      lessons: [
        {
          id: 'sql-5-1', slug: 'analytics-bi', title: 'SQL pour la BI', duration: "15 min",
          content: { 
            paragraphs: [
              "Les outils de BI (PowerBI, Tableau) reposent sur SQL. Soit ils génèrent du SQL automatiquement, soit vous leur fournissez une requête SQL optimisée comme source.",
              "Préparer la donnée en SQL (nettoyage, jointure) est souvent plus performant et maintenable que de le faire dans l'outil de BI. Cela centralise la logique.",
              "La reproductibilité est clé : une requête SQL donne toujours le même résultat pour les mêmes données, ce qui assure la fiabilité des tableaux de bord.",
              "Savoir écrire du SQL permet de ne pas être limité par les fonctionnalités 'drag-and-drop' des outils visuels."
            ], 
            exampleTitle: "Vue SQL pour Dashboard",
            exampleContent: "Créer une VIEW 'sales_dashboard_source' qui pré-calcule les KPIs du mois. PowerBI n'a plus qu'à afficher cette vue, ce qui rend le rapport ultra-rapide.", 
            quiz: [
              { id: 'q1', question: "Pourquoi faire la transformation en SQL plutôt que dans l'outil BI ?", options: ["C'est plus joli", "Pour la performance, la centralisation et la réutilisabilité", "C'est obligatoire"], correctIndex: 1, explanation: "La base de données est plus puissante pour traiter les données que l'outil de viz." },
              { id: 'q2', question: "Qu'est-ce que la reproductibilité ?", options: ["Copier coller", "La capacité à obtenir le même résultat de manière fiable", "Faire des sauvegardes"], correctIndex: 1, explanation: "C'est la base de la confiance dans les chiffres." },
              { id: 'q3', question: "SQL remplace-t-il les outils BI ?", options: ["Oui", "Non, il les alimente et les complète", "Peut-être"], correctIndex: 1, explanation: "SQL prépare, la BI visualise." }
            ] 
          }
        },
        {
          id: 'sql-5-2', slug: 'data-quality', title: 'SQL et Qualité des Données', duration: "15 min",
          content: { 
            paragraphs: [
              "SQL est le premier outil de contrôle qualité. Il permet de détecter les doublons, les valeurs manquantes ou les incohérences.",
              "Des requêtes simples avec GROUP BY et HAVING COUNT > 1 identifient les doublons. Des vérifications de fourchettes (prix < 0) repèrent les anomalies.",
              "L'intégrité référentielle (vérifier si un order.client_id existe dans la table clients) peut être auditée via des LEFT JOIN ... WHERE IS NULL.",
              "Ces requêtes de contrôle doivent être automatisées pour garantir la gouvernance des données."
            ], 
            exampleTitle: "Chasse aux doublons",
            exampleContent: "SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;\nCette requête liste immédiatement tous les emails qui apparaissent plusieurs fois, signalant un problème de qualité.", 
            quiz: [
              { id: 'q1', question: "Comment trouver des doublons ?", options: ["En lisant toutes les lignes", "Avec GROUP BY et HAVING COUNT > 1", "Avec DISTINCT"], correctIndex: 1, explanation: "C'est la méthode standard pour isoler les répétitions." },
              { id: 'q2', question: "Comment trouver des orphelins (référence manquante) ?", options: ["Avec un LEFT JOIN et un filtre IS NULL sur la table de droite", "Avec un INNER JOIN", "Impossible"], correctIndex: 0, explanation: "Cela montre les lignes qui n'ont pas de correspondance." },
              { id: 'q3', question: "Pourquoi utiliser SQL pour la qualité ?", options: ["Car c'est lent", "Pour auditer exhaustivement les données à la source", "Pour corriger automatiquement"], correctIndex: 1, explanation: "C'est le meilleur moyen de diagnostiquer l'état réel des données." }
            ] 
          }
        },
        {
          id: 'sql-5-3', slug: 'best-practices', title: 'Bonnes Pratiques SQL', duration: "15 min",
          content: { 
            paragraphs: [
              "Le code SQL est du code : il doit être lisible, maintenable et documenté. L'indentation et le formatage sont cruciaux pour relire une requête complexe.",
              "Utilisez des conventions de nommage claires (snake_case) et des alias explicites (ex: 'c' pour clients, pas 't1').",
              "Commentez votre code (-- commentaire) pour expliquer la logique métier complexe ('Pourquoi on filtre ce statut ?').",
              "Pensez 'équipe' : votre requête sera probablement relue ou modifiée par quelqu'un d'autre. Facilitez-lui la tâche."
            ], 
            exampleTitle: "Code Propre",
            exampleContent: "-- Mauvais : SELECT a,b FROM t1 WHERE c=1\n-- Bon :\nSELECT customer_name, total_amount\nFROM orders\nWHERE status = 'active'; -- Uniquement les commandes actives", 
            quiz: [
              { id: 'q1', question: "Pourquoi formater son SQL ?", options: ["Pour faire joli", "Pour la lisibilité, la maintenance et le débogage", "Pour que ça tourne plus vite"], correctIndex: 1, explanation: "Un code illisible est un code dangereux et impossible à maintenir." },
              { id: 'q2', question: "Que sont les alias ?", options: ["Des noms d'espions", "Des raccourcis pour nommer les tables ou colonnes (AS)", "Des erreurs"], correctIndex: 1, explanation: "Ils simplifient l'écriture, surtout avec les jointures." },
              { id: 'q3', question: "Pour qui écrit-on du code ?", options: ["Pour la machine uniquement", "Pour la machine et pour les humains qui le reliront", "Pour soi-même"], correctIndex: 1, explanation: "Le code est un outil de communication." }
            ] 
          }
        }
      ]
    },
    {
      id: 'sql-m6',
      title: 'Conclusion',
      lessons: [
        {
          id: 'sql-6-1', slug: 'summary-outcomes', title: 'Bilan et Prochaines étapes', duration: "10 min",
          content: { 
            paragraphs: [
              "Félicitations ! Vous avez parcouru le chemin complet, de la simple sélection de colonnes aux fonctions de fenêtrage analytiques.",
              "Vous avez maintenant atteint une maturité SQL qui vous permet de 'penser en ensembles' (Set Thinking) plutôt qu'en boucles procédurales.",
              "Cette compétence est le socle. Elle se connecte directement au Database Design (comment structurer ce que vous interrogez) et aux Data Products (comment packager vos requêtes en valeur).",
              "La pratique est la clé. Continuez à écrire des requêtes, confrontez-vous à de vrais problèmes, et le SQL deviendra votre seconde langue maternelle."
            ], 
            exampleTitle: "Le profil complet",
            exampleContent: "Un professionnel de la data complet sait : 1. Concevoir la base (Design) 2. La remplir et la gérer (Management) 3. L'interroger expertement (SQL Mastery). Vous avez validé le pilier 3.", 
            quiz: [
              { id: 'q1', question: "Quelle est l'étape la plus importante maintenant ?", options: ["Tout oublier", "Pratiquer sur des cas réels", "Apprendre le latin"], correctIndex: 1, explanation: "C'est en forgeant qu'on devient forgeron." },
              { id: 'q2', question: "Quel est le lien avec le Database Design ?", options: ["Aucun", "Une bonne structure facilite l'écriture de bon SQL", "C'est opposé"], correctIndex: 1, explanation: "Le design dicte la complexité de vos requêtes." },
              { id: 'q3', question: "Le SQL est-il suffisant ?", options: ["Oui, on peut tout faire", "C'est un outil puissant, mais il s'intègre dans un écosystème plus large (Architecture, Viz, etc.)", "Non"], correctIndex: 1, explanation: "C'est une brique fondamentale, mais pas unique." }
            ] 
          }
        }
      ]
    }
  ]
};

// --- 2. DATABASE DESIGN ---
const dbDesignTrack = {
  id: 'db-design',
  slug: 'db-design',
  title: 'Database Design',
  description: 'Conception de bases de données robustes, performantes et évolutives.',
  longDescription: 'Apprenez à concevoir des architectures de données solides. Du modèle conceptuel à l\'implémentation physique, maîtrisez la normalisation, l\'intégrité des données et les meilleures pratiques pour soutenir les applications et l\'analytique.',
  color: "from-purple-600 to-purple-800",
  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  details: {
    skills: ['Modélisation Conceptuelle', 'Normalisation (1NF, 2NF, 3NF)', 'Schéma Logique & Physique', 'Intégrité Référentielle'],
    overview: "La conception de base de données est l'art de structurer l'information pour qu'elle soit fiable, accessible et performante. Une mauvaise conception entraîne des données dupliquées, des incohérences et des lenteurs. Ce cours vous donne les clés pour construire des fondations solides pour n'importe quel système d'information.",
    targetAudience: ['Data Architects', 'Data Engineers', 'Développeurs Backend', 'Tech Leads'],
    prerequisites: ['Compréhension basique des tables et colonnes', 'Notions de SQL recommandées'],
    outcomes: ['Traduire des besoins métier en modèles de données', 'Éviter les erreurs de conception courantes', 'Optimiser pour la performance et l\'évolutivité']
  },
  modules: [
    {
      id: 'db-m1',
      title: 'Introduction à la Conception',
      lessons: [{
        id: 'db-1-1', slug: 'intro-db-design', title: 'Les enjeux du Database Design', duration: "10 min",
        content: {
          paragraphs: [
            "La conception de bases de données (Database Design) est le processus de définition de la structure, du stockage et des relations des données au sein d'un système. Elle ne se limite pas à créer des tables ; c'est une étape critique qui influence directement la qualité des données, la performance des applications et la capacité de l'entreprise à prendre des décisions éclairées.",
            "Une base de données bien conçue garantit l'intégrité de l'information (pas de données orphelines ou contradictoires), réduit la redondance (stockage optimisé) et facilite l'évolution future du système. À l'inverse, une mauvaise conception entraîne des coûts de maintenance élevés et une dette technique lourde.",
            "Dans le contexte moderne de la Data et Analytics, le design impacte tout le pipeline : de l'ingestion des données transactionnelles (OLTP) jusqu'au reporting décisionnel (OLAP) et aux modèles d'IA. Un mauvais schéma source rendra l'analytique complexe et fragile.",
            "Ce module posera les bases théoriques et pratiques pour passer d'un besoin métier flou à une structure de données claire, robuste et performante."
          ],
          exampleTitle: "Impact Business",
          exampleContent: "Imaginez un site e-commerce où l'adresse du client est stockée directement dans la table Commandes. Si le client déménage, faut-il mettre à jour toutes ses anciennes commandes ? Non, car cela fausserait l'historique. Une bonne conception sépare les entités Clients et Adresses pour gérer ces cas sans ambiguïté.",
          quiz: [
            { id: 'q1', question: "Quel est l'objectif principal du Database Design ?", options: ["Écrire du code SQL plus vite", "Garantir l'intégrité, la performance et l'évolutivité des données", "Créer des interfaces graphiques jolies"], correctIndex: 1, explanation: "Le design vise à structurer les données pour qu'elles soient fiables et utilisables à long terme." },
            { id: 'q2', question: "Qu'est-ce qu'une conséquence d'une mauvaise conception ?", options: ["Redondance et incohérence des données", "Trop de sécurité", "Des requêtes trop rapides"], correctIndex: 0, explanation: "La duplication non contrôlée mène souvent à des données contradictoires." },
            { id: 'q3', question: "Le design de base de données concerne :", options: ["Uniquement les développeurs web", "Toute la chaîne de valeur, de l'application à l'IA", "Uniquement les administrateurs système"], correctIndex: 1, explanation: "La structure des données impacte l'application source, mais aussi le BI, le reporting et la Data Science." }
          ]
        }
      }]
    },
    {
      id: 'db-m2',
      title: 'Modélisation Conceptuelle',
      lessons: [{
        id: 'db-2-1', slug: 'conceptual-modeling', title: 'Entités et Relations', duration: "15 min",
        content: {
          paragraphs: [
            "Le modèle conceptuel de données (MCD) est la première étape de la conception. Il s'agit d'une représentation abstraite des besoins métier, indépendante de toute technologie (SQL, NoSQL, Oracle, Postgres). L'objectif est de capturer le QUOI et non le COMMENT.",
            "Les composants clés sont les Entités (objets du réel comme Client, Produit, Commande), les Attributs (caractéristiques comme Nom, Prix, Date) et les Relations (associations comme Un client passe une commande).",
            "Cette phase nécessite un dialogue étroit avec les experts métier. Si le modèle conceptuel est faux, le code sera faux. C'est ici que l'on clarifie les règles de gestion : Un produit peut-il appartenir à plusieurs catégories ? Un employé peut-il avoir plusieurs managers ?",
            "Le résultat est souvent un diagramme Entité-Association (ERD) simplifié qui sert de contrat entre les équipes techniques et le métier."
          ],
          exampleTitle: "Cas : Gestion Scolaire",
          exampleContent: "Dans une école, les entités pourraient être Élève, Cours et Professeur. Une relation Inscrit relie Élève et Cours. Un attribut de la relation pourrait être Date d'inscription. Au niveau conceptuel, on ne se soucie pas des clés étrangères ou des types de données, on se concentre sur la logique métier.",
          quiz: [
            { id: 'q1', question: "Que représente un Modèle Conceptuel de Données (MCD) ?", options: ["Le code SQL pour créer les tables", "Une vue abstraite des besoins métier sans détails techniques", "L'emplacement physique des fichiers sur le disque"], correctIndex: 1, explanation: "Le MCD traduit les règles de gestion en entités et relations, sans se soucier de l'implémentation technique." },
            { id: 'q2', question: "Qu'est-ce qu'une Entité ?", options: ["Une ligne de code", "Un objet du monde réel ou un concept métier (ex: Client)", "Une requête SELECT"], correctIndex: 1, explanation: "Les entités sont les noms principaux de votre système d'information." },
            { id: 'q3', question: "Pourquoi impliquer le métier lors de la modélisation conceptuelle ?", options: ["Pour leur apprendre le SQL", "Pour valider que le modèle reflète correctement les règles de gestion", "Pour qu'ils paient la licence du logiciel"], correctIndex: 1, explanation: "Seul le métier peut confirmer si les règles (ex: un client a une seule adresse) sont justes." }
          ]
        }
      }]
    },
    {
      id: 'db-m3',
      title: 'Modèles Logiques & Physiques',
      lessons: [{
        id: 'db-3-1', slug: 'logical-physical', title: 'Traduction vers la Base de Données', duration: "15 min",
        content: {
          paragraphs: [
            "Une fois le concept validé, on passe au Modèle Logique de Données (MLD). Ici, on commence à structurer les données pour une famille de bases de données (ex: relationnelle). Les relations N-N deviennent des tables d'association, les attributs deviennent des colonnes, et on définit les Clés Primaires et Étrangères.",
            "Ensuite vient le Modèle Physique de Données (MPD), spécifique au moteur choisi (PostgreSQL, MySQL, SQL Server). C'est l'étape technique ultime : choix précis des types de données (INT vs BIGINT, CHAR vs VARCHAR), définition des index, partitionnement, et contraintes spécifiques au SGBD.",
            "La transition est : Conceptuel (Business) vers Logique (Structurel) vers Physique (Technique). Sauter des étapes mène souvent à des designs rigides difficiles à faire évoluer.",
            "Le modèle physique doit aussi prendre en compte les volumes et la performance. Parfois, on dénormalise volontairement au niveau physique pour optimiser la lecture, tout en gardant un modèle logique propre."
          ],
          exampleTitle: "De l'idée à la table",
          exampleContent: "Conceptuel : Relation Achete entre Client et Produit. Logique : Table Ventes avec clés étrangères client_id et produit_id. Physique : Table Ventes_2024 partitionnée par mois, colonne montant en DECIMAL(10,2) pour la précision financière.",
          quiz: [
            { id: 'q1', question: "Quelle est la différence entre modèle Logique et Physique ?", options: ["Aucune", "Le Logique est structurel, le Physique est lié au SGBD spécifique (types, index)", "Le Physique est fait par le métier"], correctIndex: 1, explanation: "Le MPD inclut des détails techniques comme les types précis (VARCHAR_255) et les index de performance." },
            { id: 'q2', question: "Que devient une relation Plusieurs-à-Plusieurs (N-N) dans un modèle logique relationnel ?", options: ["Elle est supprimée", "Elle devient une table d'association (ou de jointure)", "On ajoute une colonne dans les deux tables"], correctIndex: 1, explanation: "On crée une table intermédiaire contenant les clés étrangères des deux entités liées." },
            { id: 'q3', question: "À quelle étape définit-on les Index de performance ?", options: ["Modèle Conceptuel", "Modèle Logique", "Modèle Physique"], correctIndex: 2, explanation: "Les index sont des structures de stockage physiques pour accélérer la recherche." }
          ]
        }
      }]
    },
    {
      id: 'db-m4',
      title: 'Normalisation & Contraintes',
      lessons: [{
        id: 'db-4-1', slug: 'normalization', title: 'Formes Normales (1NF, 2NF, 3NF)', duration: "20 min",
        content: {
          paragraphs: [
            "La Normalisation est une technique pour organiser les données afin de réduire la redondance et améliorer l'intégrité. Elle se base sur des règles appelées Formes Normales.",
            "1NF (Première Forme Normale) : Chaque colonne doit contenir une valeur atomique (pas de liste séparée par des virgules) et chaque enregistrement doit être unique.",
            "2NF : Tout attribut non-clé doit dépendre de la clé primaire entière (important pour les clés composées).",
            "3NF : Tout attribut doit dépendre uniquement de la clé (pas de dépendance transitive). Par exemple, si une table Commandes contient Ville_Client qui dépend de ID_Client, on doit déplacer la ville dans la table Clients.",
            "Les Contraintes (Primary Key, Foreign Key, Unique, Not Null) sont les gardes-fous qui forcent le respect de ces règles au niveau du moteur de base de données. Il faut toujours privilégier la normalisation pour un système transactionnel (OLTP) afin d'éviter les anomalies de mise à jour."
          ],
          exampleTitle: "Anomalie de mise à jour",
          exampleContent: "Si l'adresse du client est répétée dans chaque ligne de commande (non normalisé), et que le client change d'adresse, vous devez mettre à jour 50 lignes au lieu d'une seule dans la table Client. Si le processus échoue à moitié, vos données sont corrompues (adresses mixtes). La normalisation évite cela.",
          quiz: [
            { id: 'q1', question: "Quel est le but principal de la normalisation ?", options: ["Rendre la base de données plus grosse", "Éliminer la redondance et les anomalies de mise à jour", "Supprimer toutes les relations"], correctIndex: 1, explanation: "La normalisation vise à stocker chaque fait une seule fois au bon endroit." },
            { id: 'q2', question: "Une colonne contenant 'Rouge,Bleu,Vert' viole quelle forme normale ?", options: ["1NF", "2NF", "3NF"], correctIndex: 0, explanation: "La 1NF exige des valeurs atomiques (indivisibles)." },
            { id: 'q3', question: "Que garantit une contrainte FOREIGN KEY ?", options: ["Que la donnée est unique", "Que la valeur fait référence à un enregistrement existant dans une autre table", "Que la colonne ne peut pas être nulle"], correctIndex: 1, explanation: "Elle assure l'intégrité référentielle : pas de commande sans client valide." }
          ]
        }
      }]
    },
    {
      id: 'db-m5',
      title: 'Schema Design Best Practices',
      lessons: [{
        id: 'db-5-1', slug: 'schema-best-practices', title: 'Conventions et Maintenabilité', duration: "10 min",
        content: {
          paragraphs: [
            "Un bon design respecte des conventions de nommage claires. Utilisez l'anglais (standard international), le snake_case pour la lisibilité (customer_id, pas CustomerId), et des noms explicites. Les tables doivent généralement être au pluriel (users, orders) ou au singulier, mais soyez cohérent.",
            "Évitez les colonnes fourre-tout comme JSON ou XML sauf si c'est strictement nécessaire pour des données non structurées. Elles empêchent l'indexation efficace et la validation des données.",
            "Pensez à l'évolution : utilisez des clés primaires techniques (ID auto-incrémenté ou UUID) plutôt que des clés métier (numéro de sécu, email) qui peuvent changer.",
            "Documentez votre schéma. Les commentaires sur les colonnes et les diagrammes ERD à jour sont essentiels pour les équipes Data qui consommeront vos données plus tard."
          ],
          exampleTitle: "Mauvaise vs Bonne pratique",
          exampleContent: "Mauvais : Table Table1 avec colonnes u_n (User Name), d (Date), meta (JSON géant). Bon : Table users avec colonnes username, created_at, preferences_json. Le second est auto-explicatif et maintenable.",
          quiz: [
            { id: 'q1', question: "Pourquoi éviter d'utiliser l'email comme Clé Primaire ?", options: ["C'est trop court", "Un email peut changer, ce qui casserait toutes les liaisons (Foreign Keys)", "Les emails ne sont pas uniques"], correctIndex: 1, explanation: "Les clés primaires doivent être immuables. Si la clé change, il faut mettre à jour toutes les références historiques, ce qui est lourd et risqué." },
            { id: 'q2', question: "Quelle convention de nommage est recommandée en SQL ?", options: ["camelCase", "snake_case", "kebab-case"], correctIndex: 1, explanation: "snake_case (user_id) est le standard le plus lisible et compatible en SQL." },
            { id: 'q3', question: "Pourquoi documenter son schéma ?", options: ["Pour faire plaisir au manager", "Pour faciliter la compréhension par les analystes et futurs développeurs", "Ça ne sert à rien"], correctIndex: 1, explanation: "La data vit plus longtemps que le code. La documentation aide les futurs utilisateurs à comprendre le sens des données." }
          ]
        }
      }]
    },
    {
      id: 'db-m6',
      title: 'Data Integrity & Relationships',
      lessons: [{
        id: 'db-6-1', slug: 'integrity-relationships', title: 'Cardinalités et Confiance', duration: "15 min",
        content: {
          paragraphs: [
            "L'intégrité des données est le pilier de la confiance. L'intégrité référentielle (via Foreign Keys) empêche les orphelins : impossible de supprimer un client s'il a encore des commandes actives.",
            "Il est crucial de bien définir les cardinalités. One-to-One (1:1) signifie qu'un utilisateur a un seul profil étendu. One-to-Many (1:N) signifie qu'un client a plusieurs commandes (le plus courant). Many-to-Many (N:N) signifie qu'un étudiant suit plusieurs cours et qu'un cours a plusieurs étudiants.",
            "Ces relations dictent la structure des tables. Une erreur de cardinalité, comme traiter un 1:N comme un 1:1, bloquera l'évolution du produit.",
            "L'intégrité passe aussi par les contraintes NOT NULL (donnée obligatoire) et CHECK (ex: prix > 0). Ces règles strictes à l'entrée garantissent des rapports de qualité à la sortie."
          ],
          exampleTitle: "L'impact sur l'Analytique",
          exampleContent: "Si votre base autorise des commandes sans client (manque de FK) ou des prix négatifs (manque de CHECK), votre tableau de bord financier sera faux. Le Data Analyst perdra des jours à nettoyer ces données. Le design de la base est la première ligne de défense de la qualité des données.",
          quiz: [
            { id: 'q1', question: "Quelle relation relie 'Auteurs' et 'Livres' ?", options: ["One-to-One", "One-to-Many (ou Many-to-Many si co-auteurs)", "Aucune"], correctIndex: 1, explanation: "Un auteur écrit plusieurs livres. Si on gère les co-auteurs, c'est du Many-to-Many." },
            { id: 'q2', question: "À quoi sert une contrainte CHECK ?", options: ["Vérifier l'orthographe", "Valider une condition logique (ex: age >= 18)", "Vérifier la clé étrangère"], correctIndex: 1, explanation: "CHECK permet d'imposer une règle métier simple directement dans la base." },
            { id: 'q3', question: "Que se passe-t-il si on supprime un parent utilisé par des enfants (avec FK active) ?", options: ["La base de données plante", "La suppression est bloquée par le SGBD (erreur d'intégrité)", "Les enfants sont supprimés silencieusement"], correctIndex: 1, explanation: "Par défaut, le SGBD protège l'intégrité et interdit la suppression pour éviter les orphelins (sauf si CASCADE est configuré)." }
          ]
        }
      }]
    },
    {
      id: 'db-m7',
      title: 'Architectures Modernes',
      lessons: [{
        id: 'db-7-1', slug: 'modern-architectures', title: 'OLTP vs OLAP et Data Warehouse', duration: "10 min",
        content: {
          paragraphs: [
            "Le design que nous avons vu (normalisé) est optimisé pour l'OLTP (Online Transaction Processing) : l'écriture rapide et la cohérence transactionnelle (ex: applis web, ERP).",
            "Pour l'analyse, on utilise l'OLAP (Online Analytical Processing) dans des Data Warehouses (BigQuery, Snowflake). Ici, les principes s'inversent : on dénormalise souvent (schéma en étoile, tables larges) pour optimiser la lecture et les agrégations massives.",
            "Dans une stack moderne, le rôle du Database Design opérationnel est de fournir une source propre. Les pipelines ELT transforment ensuite ces données pour l'analyse.",
            "Comprendre cette distinction est vital : ne faites pas de reporting lourd sur votre base de production OLTP (risque de ralentissement), et ne normalisez pas à l'extrême votre Data Warehouse (complexité des jointures)."
          ],
          exampleTitle: "Le cycle de la donnée",
          exampleContent: "L'appli e-commerce écrit dans PostgreSQL (3NF, très normalisé). Fivetran copie ces données vers Snowflake. Dans Snowflake, dbt transforme ces 50 tables normalisées en une seule table large one_big_table_sales facile à utiliser pour Tableau ou PowerBI.",
          quiz: [
            { id: 'q1', question: "OLTP est optimisé pour :", options: ["L'analyse de données historiques", "Les transactions rapides et l'écriture (Day-to-day operations)", "Le stockage de fichiers vidéos"], correctIndex: 1, explanation: "OLTP (Transaction Processing) vise la rapidité des insertions/mises à jour unitaires." },
            { id: 'q2', question: "Pourquoi dénormalise-t-on en OLAP (Data Warehouse) ?", options: ["Car on est paresseux", "Pour réduire le nombre de jointures et accélérer les requêtes d'analyse massives", "Pour économiser de l'espace disque"], correctIndex: 1, explanation: "Les jointures coûtent cher sur des milliards de lignes. Les tables larges (dénormalisées) sont plus performantes pour la lecture analytique." },
            { id: 'q3', question: "Où doit-on connecter PowerBI de préférence ?", options: ["Sur la base de prod (OLTP)", "Sur le Data Warehouse (OLAP)", "Sur des fichiers Excel"], correctIndex: 1, explanation: "Le Warehouse est conçu pour supporter la charge des requêtes analytiques sans ralentir l'application métier." }
          ]
        }
      }]
    },
    {
      id: 'db-m8',
      title: 'Résumé & Acquis',
      lessons: [{
        id: 'db-8-1', slug: 'summary-db-design', title: 'Conclusion du Parcours', duration: "5 min",
        content: {
          paragraphs: [
            "Félicitations ! Vous avez couvert les fondamentaux du Design de Bases de Données.",
            "À retenir : Le design commence par le métier (Conceptuel) avant la technique (Physique). La normalisation (3NF) protège vos données contre les incohérences. Les types, clés et index sont vos leviers de performance. Un bon design en amont simplifie toute la chaîne Data en aval.",
            "Une base de données n'est jamais figée. Elle évolue avec l'entreprise. Mais des fondations saines rendent ces évolutions possibles sans douleur.",
            "Ce module est la transition parfaite vers le parcours Data Management, où nous verrons comment gérer la qualité, la sécurité et le cycle de vie de ces données maintenant bien structurées."
          ],
          exampleTitle: "Prochaine étape",
          exampleContent: "Maintenant que vous savez concevoir une base, comment garantir que les données qu'elle contient restent propres dans le temps ? C'est le sujet du Data Management.",
          quiz: [
            { id: 'q1', question: "Quelle est la suite logique après le Database Design ?", options: ["Apprendre à peindre", "Le Data Management (Qualité, Gouvernance)", "Oublier tout ce qu'on a appris"], correctIndex: 1, explanation: "Une fois l'architecture posée, il faut gérer la vie de la donnée." },
            { id: 'q2', question: "Un bon design est-il définitif ?", options: ["Oui, on ne touche plus jamais à la base", "Non, il doit être maintenable et évolutif", "Seulement si le chef le dit"], correctIndex: 1, explanation: "Les besoins business changent, le schéma doit pouvoir s'adapter (migrations)." },
            { id: 'q3', question: "Quel concept relie le design à la confiance ?", options: ["L'intégrité des données", "La couleur des tables", "Le nom du serveur"], correctIndex: 0, explanation: "L'intégrité (référentielle, de domaine) garantit que la donnée est techniquement valide, base de la confiance." }
          ]
        }
      }]
    }
  ]
};

// --- 3. DATA MANAGEMENT ---
const dataManagementTrack = createTrack(
  'data-management',
  'Data Management',
  'Cycle de vie, qualité, MDM et intégration des données.',
  'from-emerald-600 to-emerald-800',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  ['Cycle de Vie de la Donnée', 'Qualité des Données', 'Master Data Management', 'Intégration & ETL', 'Stockage & Archivage']
);

// --- 4. DATA GOVERNANCE ---
const dataGovernanceTrack = createTrack(
  'data-governance',
  'Gouvernance des Données',
  'Politiques, rôles et conformité pour une data de confiance.',
  'from-orange-500 to-orange-700',
  'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  ['Fondamentaux de la Gouvernance', 'Rôles (Owners & Stewards)', 'Politiques & Standards', 'Catalogue de Données', 'Conformité & Éthique']
);

// --- 5. DATA PRODUCTS ---
const dataProductsTrack = createTrack(
  'data-products',
  'Data Products',
  'Concevoir la data comme un produit à valeur ajoutée.',
  'from-pink-600 to-pink-800',
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  ['Product Thinking', 'Discovery & Besoin Utilisateur', 'Design de Produits Data', 'Cycle de Vie Produit', 'Mesure de la Valeur']
);

// --- 6. OPERATING MODEL ---
const operatingModelTrack = createTrack(
  'operating-model',
  'Data Operating Model',
  'Organisation, culture et méthodes pour les équipes data.',
  'from-teal-600 to-teal-800',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  ['Structures Organisationnelles', 'Data Mesh & Décentralisation', 'DataOps & Agile', 'Culture Data', 'Recrutement & Talents']
);

// --- 7. BUSINESS STRATEGY ---
const businessStrategyTrack = createTrack(
  'business-strategy',
  'Business Strategy',
  'Aligner la stratégie data avec les objectifs de l\'entreprise.',
  'from-indigo-600 to-indigo-800',
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  ['Compréhension du Business', 'Analyse de la Chaîne de Valeur', 'Stratégie Data', 'Modèles Économiques', 'Transformation Organisationnelle']
);

// --- 8. PERFORMANCE & KPIS ---
const performanceKpisTrack = createTrack(
  'performance-kpis',
  'Performance & KPIs',
  'Mesurer ce qui compte vraiment pour piloter l\'activité.',
  'from-cyan-600 to-cyan-800',
  'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z',
  ['Design de KPIs', 'Tableaux de Bord Efficaces', 'Data Storytelling', 'Analyse d\'Écart', 'Actionnabilité des Données']
);

// --- 9. RISK & COMPLIANCE ---
const riskComplianceTrack = createTrack(
  'risk-compliance',
  'Risk & Compliance',
  'Gérer les risques et assurer la conformité réglementaire.',
  'from-red-600 to-red-800',
  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  ['Cartographie des Risques', 'Cadres Réglementaires', 'Sécurité des Données', 'Audit & Contrôle', 'Gestion de Crise']
);

// --- 10. DECISION LEADERSHIP ---
const decisionLeadershipTrack = createTrack(
  'decision-leadership',
  'Decision & Leadership',
  'Prendre de meilleures décisions et mener le changement.',
  'from-violet-600 to-violet-800',
  'M13 10V3L4 14h7v7l9-11h-7z',
  ['Processus Décisionnel', 'Biais Cognitifs', 'Leadership d\'Influence', 'Gestion du Changement', 'Communication Stratégique']
);

// --- 11. GROWTH & TRANSFORMATION ---
const growthTransformationTrack = createTrack(
  'growth-transformation',
  'Growth & Transformation',
  'Utiliser la data pour la croissance et l\'innovation.',
  'from-fuchsia-600 to-fuchsia-800',
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  ['Innovation par la Data', 'Growth Hacking', 'Expérimentation & A/B Testing', 'Nouveaux Business Models', 'Scalabilité']
);


// --- EXPORT ---

export const TRACKS: Record<string, Track & { color: string; icon: string }> = {
  'sql-mastery': sqlMasteryTrack as any,
  'db-design': dbDesignTrack as any,
  'data-management': dataManagementTrack as any,
  'data-governance': dataGovernanceTrack as any,
  'data-products': dataProductsTrack as any,
  'operating-model': operatingModelTrack as any,
  'business-strategy': businessStrategyTrack as any,
  'performance-kpis': performanceKpisTrack as any,
  'risk-compliance': riskComplianceTrack as any,
  'decision-leadership': decisionLeadershipTrack as any,
  'growth-transformation': growthTransformationTrack as any
};

export interface SearchResult {
  title: string;
  type: 'Parcours' | 'Leçon' | 'Module';
  url: string;
}

export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.length < 2) return [];
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  Object.values(TRACKS).forEach(track => {
    if (track.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        title: track.title,
        type: 'Parcours',
        url: track.id === 'sql-mastery' ? '/sql-mastery' : `/track/${track.id}`
      });
    }
    track.modules.forEach(mod => {
      if (mod.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          title: mod.title,
          type: 'Module',
          url: track.id === 'sql-mastery' ? '/sql-mastery' : `/track/${track.id}`
        });
      }
      mod.lessons.forEach(less => {
        if (less.title.toLowerCase().includes(lowerQuery)) {
           results.push({
             title: less.title,
             type: 'Leçon',
             url: `/lesson/${track.id}/${less.id}`
           });
        }
      });
    });
  });
  return results.slice(0, 8);
};
