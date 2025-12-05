# Configuration Vercel

## Variables d'environnement requises

Dans les paramètres de votre projet Vercel, ajoutez ces variables d'environnement :

```
NEXT_PUBLIC_SUPABASE_URL=https://kwrftoelcixbyjqbyqhe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cmZ0b2VsY2l4YnlqcWJ5cWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NzE2NjksImV4cCI6MjA4MDQ0NzY2OX0._WxKvxqdQO9FFGtvdXMczQY24ZciHdYdGyCpiIU5CWA
```

## Configuration automatique

Vercel détectera automatiquement Next.js et utilisera :
- **Framework Preset** : Next.js
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Install Command** : `npm install`

## Navigation entre pages

Next.js App Router gère automatiquement la navigation entre pages. Aucune configuration supplémentaire n'est nécessaire.

Les routes sont configurées dans `src/app/` :
- `/` → `src/app/page.tsx`
- `/resistance-quiz` → `src/app/resistance-quiz/page.tsx`
- `/resistance-quiz/persona` → `src/app/resistance-quiz/persona/page.tsx`
- `/resistance-quiz/questions` → `src/app/resistance-quiz/questions/page.tsx`
- `/resistance-quiz/results` → `src/app/resistance-quiz/results/page.tsx`
- `/resistance-quiz/roadmap` → `src/app/resistance-quiz/roadmap/page.tsx`
- `/admin` → `src/app/admin/page.tsx`

## Déploiement

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Ajoutez les variables d'environnement Supabase
4. Déployez !

