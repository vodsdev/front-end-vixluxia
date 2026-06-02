# 21st Clone - Component Registry

Un clone moderne de **21st.dev**, un registre communautaire de composants UI React construits avec Tailwind CSS et Radix UI.

## 🚀 Caractéristiques

- **Barre latérale persistante** : Navigation facile entre les catégories et les sections
- **Recherche en temps réel** : Filtrage instantané des composants par nom ou description
- **Grille responsive** : Affichage adaptatif sur tous les appareils (mobile, tablette, desktop)
- **Mode sombre/clair** : Support complet du thème système avec persistance locale
- **Aperçus interactifs** : Prévisualisations des composants avec Framer Motion
- **Copie facile** : Copier les prompts des composants en un clic
- **Système de notation** : Aimer et noter les composants favoris

## 🛠️ Stack Technologique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : JavaScript/TypeScript
- **Styling** : Tailwind CSS 3.4+
- **Composants UI** : Radix UI + Shadcn UI
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Notifications** : Sonner
- **Gestion d'état** : React Hooks

## 📋 Prérequis

- Node.js 18+ ou supérieur
- npm, yarn, ou pnpm

## 🔧 Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/Maxthiba24/front-end-vixluxia.git
cd front-end-vixluxia
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Ouvrir dans le navigateur**
Accédez à `http://localhost:3000` dans votre navigateur.

## 📁 Structure du Projet

```
front-end-vixluxia/
├── app/
│   ├── layout.js           # Layout racine
│   ├── page.js             # Page d'accueil
│   ├── globals.css         # Styles globaux
│   ├── api/                # Routes API
│   └── providers.js        # Fournisseurs (React Query, etc.)
├── components/
│   ├── ui/                 # Composants UI (Shadcn)
│   ├── component-card.jsx  # Carte de composant
│   ├── category-grid.jsx   # Grille de catégories
│   ├── search-bar.jsx      # Barre de recherche
│   └── previews.js         # Aperçus de composants
├── lib/
│   ├── utils.js            # Utilitaires (cn, etc.)
│   ├── config.js           # Configuration de l'app
│   ├── prompts-data.js     # Données des composants
│   └── mongodb.js          # Connexion MongoDB
├── hooks/
│   └── use-mobile.jsx      # Hook pour détection mobile
├── public/                 # Assets statiques
├── tailwind.config.js      # Configuration Tailwind
├── next.config.js          # Configuration Next.js
└── package.json            # Dépendances
```

## 🎨 Composants Principaux

### ComponentCard
Affiche un composant avec aperçu, titre, description et actions (copier, aimer).

```jsx
<ComponentCard 
  component={component}
  preview={PreviewComponent}
  onCopy={handleCopy}
/>
```

### CategoryGrid
Grille responsive de catégories avec sélection.

```jsx
<CategoryGrid 
  categories={categories}
  onSelect={setSelectedCategory}
  selectedCategory={selectedCategory}
/>
```

### SearchBar
Barre de recherche avec icône et bouton de réinitialisation.

```jsx
<SearchBar 
  value={search}
  onChange={setSearch}
  placeholder="Search components..."
/>
```

## 🎯 Fonctionnalités Principales

### Découverte
- Parcourir les composants par catégorie
- Voir les composants en vedette
- Consulter les nouveaux composants

### Recherche
- Recherche en temps réel
- Filtrage par nom ou description
- Réinitialisation rapide

### Interaction
- Copier les prompts des composants
- Aimer les composants favoris
- Voir les aperçus interactifs

## 🌓 Thème

Le projet supporte le mode sombre et clair avec :
- Détection automatique des préférences système
- Persistance locale du choix utilisateur
- Transition fluide entre les thèmes
- Variables CSS pour personnalisation facile

## 📱 Responsive Design

- **Mobile** : Barre latérale rétractable, grille 1 colonne
- **Tablette** : Barre latérale visible, grille 2 colonnes
- **Desktop** : Barre latérale persistante, grille 3 colonnes

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t 21st-clone .
docker run -p 3000:3000 21st-clone
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez :

1. Fork le dépôt
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [21st.dev](https://21st.dev) pour l'inspiration
- [Shadcn/ui](https://ui.shadcn.com/) pour les composants
- [Radix UI](https://www.radix-ui.com/) pour les primitives
- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS

## 📧 Contact

Pour toute question ou suggestion, veuillez ouvrir une issue sur GitHub.

---

**Dernière mise à jour** : Juin 2026
