# NIRD - Numérique Inclusif, Responsable et Durable

Application web pour aider les établissements scolaires à évaluer leur dépendance aux Big Tech et à générer une feuille de route vers des solutions Libres.

## 🚀 Fonctionnalités

- **Quiz de résistance NIRD** : Évaluez la dépendance de votre école aux GAFAM
- **Feuille de route personnalisée** : Obtenez un plan de transition vers le Libre
- **Tableau de bord admin** : Visualisez les données des quiz
- **Intégration Supabase** : Stockage des questions et réponses dans Supabase
- **Mode sombre** : Support du thème clair/sombre
- **Interface multilingue** : Contenu en français

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase (pour les données)

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/hachemchaabi/nird.git
cd nird
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
Créez un fichier `.env.local` avec :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_supabase
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
nird/
├── src/
│   ├── app/                    # Pages Next.js App Router
│   │   ├── resistance-quiz/    # Pages du quiz
│   │   └── admin/              # Tableau de bord admin
│   ├── modules/
│   │   └── resistance-quiz/    # Module principal du quiz
│   │       ├── components/     # Composants React
│   │       └── lib/            # Logique métier et Supabase
│   └── components/ui/          # Composants UI (shadcn/ui)
├── vercel.json                 # Configuration Vercel
└── package.json
```

## 🎯 Routes

- `/` - Page d'accueil (Landing page du quiz)
- `/resistance-quiz` - Landing page du quiz
- `/resistance-quiz/persona` - Sélection du persona
- `/resistance-quiz/questions` - Questions du quiz
- `/resistance-quiz/results` - Résultats du quiz
- `/resistance-quiz/roadmap` - Feuille de route personnalisée
- `/admin` - Tableau de bord admin (données mockées)

## 🗄️ Base de données Supabase

Le projet utilise Supabase pour stocker :
- **quiz_questions** : Les questions du quiz (40 questions)
- **quiz_question_options** : Les options de réponse (160 options)
- **quiz_sessions** : Les sessions de quiz
- **quiz_answers** : Les réponses des utilisateurs
- **quiz_results** : Les résultats calculés
- **quiz_roadmaps** : Les feuilles de route générées

## 🚀 Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Ajoutez les variables d'environnement dans les paramètres Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Vercel détectera automatiquement Next.js et déploiera l'application

## 🛠️ Technologies utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **shadcn/ui** - Composants UI
- **Supabase** - Backend et base de données
- **next-themes** - Gestion des thèmes

## 📝 License

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
