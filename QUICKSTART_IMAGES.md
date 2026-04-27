## 🚀 QUICK START - Images (5 min)

### Le Problème
Images ne s'affichent pas avec chemin `./public/images/...` ❌

### La Solution
Utiliser `SafeImage` et chemin `/images/...` ✅

---

## ⚡ 3 Étapes

### 1️⃣ Importer SafeImage
```jsx
import SafeImage from "@/components/SafeImage";
```

### 2️⃣ Remplacer `<img>` par `<SafeImage>`
```jsx
// ❌ Avant
<img src="./public/images/lacoste1.jpg" />

// ✅ Après
<SafeImage src="/images/Lacostes/lacoste1.jpeg" />
```

### 3️⃣ Ajouter fallback pour images API
```jsx
<SafeImage
  src={product.imageUrl}
  fallbackSrc="/images/no-image.png"
/>
```

---

## ✅ Vérifier Ça Marche

```bash
# Démarrer
npm run dev

# Ouvrir navigateur
# F12 > Network > filtrer par jpg/jpeg

# Vérifier
# ✓ Images chargent avec status 200
# ✓ Pas de 404
# ✓ Images visibles à l'écran
```

---

## 📝 Props Principales

```jsx
<SafeImage
  src="/images/category/file.jpeg"    // Chemin (obligatoire)
  alt="Description"                    // Alt text (obligatoire)
  className="w-full h-64 rounded-lg"  // Tailwind CSS
  fallbackSrc="/images/default.png"   // Si erreur
  loading="lazy"                       // ou "eager" pour hero
/>
```

---

## 🎯 Cas d'Utilisation

| Cas | Code |
|-----|------|
| Image locale | `<SafeImage src="/images/Lacostes/file.jpeg" alt="..." />` |
| Image API | `<SafeImage src={url} fallbackSrc="/images/default.png" />` |
| Image hero | `<SafeImage src={url} loading="eager" />` |
| Image liste | `<SafeImage src={url} loading="lazy" />` |

---

## ⚙️ Chemins Corrects

```
CORRECT ✓         INCORRECT ❌
/images/...       ./images/...
/images/...       ./public/images/...
/images/...       public/images/...
```

---

## 🐛 Si ça marche pas

1. ✓ F12 > Network > chercher l'image
2. ✓ Si 404 → Vérifier chemin et extension
3. ✓ Si 200 mais pas visible → Vérifier className
4. ✓ Si erreur console → Lire le message
5. ✓ Redémarrer: `npm run dev`

---

## 📚 Docs Complètes

- **`IMAGES_GUIDE.md`** - Guide détaillé (tous cas)
- **`SAFEIMAGE_EXAMPLES.jsx`** - 12 exemples
- **`IMAGE_TEST.jsx`** - Tests

---

C'est tout! Commence maintenant:

1. `npm run dev`
2. Ouvre ton navigateur
3. F12 > Network
4. Vérifie que les images se chargent
5. Si OK → Tu as terminé ✓

