# 📝 Guide : Comment Éditer le Contenu de Votre Site

## ✅ Oui, vous éditez dans Supabase et ça modifie le site !

### 🎯 Principe

Votre site charge le contenu **dynamiquement depuis Supabase**. Quand vous modifiez dans Supabase Dashboard, les changements apparaissent sur votre site.

---

## 🚀 Comment Faire (3 étapes)

### 1. Allez sur Supabase Dashboard

1. Ouvrez https://supabase.com/dashboard
2. Connectez-vous
3. Sélectionnez le projet **"Devmaster"**
4. Cliquez sur **"Table Editor"** dans le menu de gauche

### 2. Sélectionnez la Table à Modifier

| Table | Ce que vous pouvez modifier |
|-------|---------------------------|
| **testimonials** | Témoignages clients (nom, rôle, texte) |
| **faqs** | Questions et réponses |
| **sections** | Contenu des sections (hero, benefits, results) |
| **pages** | Meta SEO (titre, description, keywords) |
| **navigation_items** | Menu de navigation |

### 3. Éditez et Sauvegardez

- Cliquez sur une ligne pour l'éditer
- Modifiez les champs
- Cliquez sur **"Save"** (ou appuyez sur Enter)

**C'est tout !** ✅

---

## ⏱️ Quand Voir les Changements ?

### ⚠️ Attention : Il y a un Cache !

Votre site utilise un **système de cache** pour optimiser les performances. Les changements ne sont pas **immédiats**.

**Délais selon le type de contenu** :

| Type de Contenu | Délai d'Affichage |
|-----------------|-------------------|
| **Témoignages** | 15 minutes |
| **FAQs** | 15 minutes |
| **Sections** | 5 minutes |
| **Navigation** | 30 minutes |
| **Meta SEO** | 10 minutes |

### 🔄 Voir Immédiatement (2 méthodes)

#### Méthode 1 : Vider le Cache du Navigateur

1. Ouvrez votre site
2. Appuyez sur **`Cmd + Shift + R`** (Mac) ou **`Ctrl + Shift + R`** (Windows/Linux)
3. Le cache est vidé → Vous voyez les changements immédiatement

#### Méthode 2 : Attendre le TTL

Attendez simplement 5-30 minutes selon le type de contenu. Le cache se rafraîchit automatiquement.

---

## 📋 Exemples Concrets

### Exemple 1 : Modifier un Témoignage

**Dans Supabase** :
1. Table Editor → `testimonials`
2. Cliquez sur le témoignage de "Sophie Martin"
3. Modifiez le champ `testimonial_text`
4. Changez : "multiplié par 3" → "multiplié par 5"
5. Save

**Sur le Site** :
- Après 15 min (ou Cmd+Shift+R) → Le nouveau texte apparaît

### Exemple 2 : Ajouter une FAQ

**Dans Supabase** :
1. Table Editor → `faqs`
2. Cliquez sur **"Insert row"** (en bas)
3. Remplissez :
   - `question`: "Nouvelle question ?"
   - `answer`: "Nouvelle réponse..."
   - `display_order`: 9
   - `is_published`: true
4. Save

**Sur le Site** :
- Après 15 min (ou Cmd+Shift+R) → La nouvelle FAQ apparaît dans la liste

### Exemple 3 : Modifier le Titre SEO

**Dans Supabase** :
1. Table Editor → `pages`
2. Cliquez sur la ligne "home"
3. Modifiez `title`: "DevMaster - Automatisation IA"
4. Save

**Sur le Site** :
- Après 10 min (ou Cmd+Shift+R) → Le titre de l'onglet navigateur change

---

## 🎨 Qu'est-ce qui est Dynamique vs Statique ?

### ✅ Dynamique (Modifiable dans Supabase)

Ces composants chargent depuis Supabase :

| Composant | Table Supabase | Modifiable ? |
|-----------|----------------|--------------|
| **NavigationSupabase** | `navigation_items` | ✅ Oui |
| **TestimonialsSupabase** | `testimonials` | ✅ Oui |
| **FAQSupabase** | `faqs` | ✅ Oui |
| **SEOHead** | `pages` | ✅ Oui |
| **Sections** (si utilisé) | `sections` | ✅ Oui |

### ❌ Statique (Modifiable dans le Code)

Ces composants sont **hardcodés** dans le code React :

| Composant | Fichier | Modifiable ? |
|-----------|---------|--------------|
| **Hero** | `src/components/Hero.tsx` | ❌ Code uniquement |
| **Benefits** | `src/components/Benefits.tsx` | ❌ Code uniquement |
| **SolutionsOrbital** | `src/components/SolutionsOrbital.tsx` | ❌ Code uniquement |
| **Results** | `src/components/Results.tsx` | ❌ Code uniquement |
| **ProcessTimeline** | `src/components/ProcessTimeline.tsx` | ❌ Code uniquement |
| **Footer** | `src/components/Footer.tsx` | ❌ Code uniquement |

**Pour modifier ces composants** : Il faut éditer le code React directement.

---

## 🔍 Comment Savoir si un Composant est Dynamique ?

Regardez dans `src/App.tsx` :

```typescript
// ✅ Dynamique (Supabase)
<NavigationSupabase />      // ← "Supabase" dans le nom
<TestimonialsSupabase />    // ← "Supabase" dans le nom
<FAQSupabase />            // ← "Supabase" dans le nom
<SEOHead />                // ← Charge depuis Supabase

// ❌ Statique (Code)
<Hero />                   // ← Pas de "Supabase"
<Benefits />               // ← Pas de "Supabase"
<SolutionsOrbital />       // ← Pas de "Supabase"
```

**Règle** : Si le nom contient "Supabase" → Modifiable dans Supabase Dashboard ✅

---

## 💡 Astuces

### 1. Voir les Changements en Temps Réel (Dev)

Si vous êtes en développement (`npm run dev`) :

1. Modifiez dans Supabase
2. Attendez 5-30 min OU
3. Rechargez avec `Cmd+Shift+R`

### 2. Tester Avant de Publier

1. Créez une FAQ avec `is_published: false`
2. Testez sur votre site (elle n'apparaît pas)
3. Quand prête, mettez `is_published: true`
4. Save → Elle apparaît après le cache

### 3. Ordre d'Affichage

Utilisez `display_order` pour contrôler l'ordre :
- `display_order: 1` → Apparaît en premier
- `display_order: 2` → Apparaît en deuxième
- etc.

---

## 🚨 Important : Le Cache

### Pourquoi un Cache ?

Le cache réduit les appels à Supabase de **90%**, ce qui :
- ✅ Rend le site ultra-rapide
- ✅ Réduit les coûts
- ✅ Améliore l'expérience utilisateur

### Inconvénient

Les modifications ne sont pas **instantanées** (5-30 min selon le type).

### Solution

Pour voir immédiatement : **`Cmd+Shift+R`** (vide le cache)

---

## 📊 Résumé Rapide

```
1. Modifier dans Supabase Dashboard
   ↓
2. Sauvegarder
   ↓
3. Attendre 5-30 min OU Cmd+Shift+R
   ↓
4. Changement visible sur le site ✅
```

---

## ✅ Checklist

- [ ] Je sais où aller (Supabase Dashboard → Table Editor)
- [ ] Je sais quelle table modifier
- [ ] Je comprends le système de cache
- [ ] Je sais comment voir immédiatement (Cmd+Shift+R)
- [ ] Je sais quels composants sont dynamiques

---

**C'est tout ! Votre site est un vrai CMS headless.** 🚀

*Modifiez dans Supabase → Visible sur le site après le cache*
