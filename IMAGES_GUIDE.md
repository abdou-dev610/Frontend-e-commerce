# 📸 Guide Complet Images - React + Vite + Tailwind

## 🎯 Problème Résolu

Les images ne s'affichaient pas correctement à cause de:
1. **Mauvais chemin relatif** (ex: `./public/images/...` au lieu de `/images/...`)
2. **Mauvaise gestion des erreurs** (pas de fallback)
3. **Pas de lazy loading** (chargement lent)
4. **Pas de validation d'URL** (URLs cassées)

---

## ✅ Solution: Composant SafeImage

### Structure du Projet

```
public/
  images/
    Lacostes/
      lacoste1.jpeg ✓
    Chaussures/
    Abayas/
    ...

src/
  assets/
    logo.png
    placeholder.svg
  components/
    SafeImage.jsx ← Nouveau composant !
    ProductCard.jsx
    ProductDetailInline.jsx
    ...
```

---

## 📖 3 Cas d'Utilisation

### CAS 1️⃣ : Images du dossier `/public`

**Chemin correct avec Vite :**
```javascript
// ❌ MAUVAIS
image: "./public/images/lacoste1.jpeg"
image: "/public/images/lacoste1.jpeg"

// ✅ BON (Vite sert public/ à la racine /)
image: "/images/Lacostes/lacoste1.jpeg"
```

**En JSX :**
```jsx
import SafeImage from "@/components/SafeImage";

export default function ProductCard({ product }) {
  return (
    <SafeImage
      src={product.image} // "/images/Lacostes/lacoste1.jpeg"
      alt={product.name}
      className="w-full h-64 object-cover rounded-lg"
    />
  );
}
```

### CAS 2️⃣ : Images importées de `/src/assets`

```jsx
import logo from "@/assets/logo.png";
import SafeImage from "@/components/SafeImage";

export default function Header() {
  return (
    <SafeImage
      src={logo}
      alt="Logo"
      className="h-12 w-auto"
    />
  );
}
```

### CAS 3️⃣ : Images d'une API (URL dynamique)

```jsx
import SafeImage from "@/components/SafeImage";

export default function ProductCard({ product }) {
  return (
    <SafeImage
      src={product.imageUrl} // URL externe ou du backend
      alt={product.name}
      fallbackSrc="/images/no-image.png" // Image de secours
      showErrorUI={true} // Afficher le message d'erreur
      className="w-full h-64 rounded-lg"
    />
  );
}
```

---

## 🔧 Props du composant SafeImage

```javascript
<SafeImage
  src={string}                    // Image URL ou chemin (obligatoire)
  alt={string}                    // Texte alternatif (obligatoire)
  className={string}              // Classes Tailwind (défaut: "w-full h-auto")
  fallbackSrc={string}            // Image si erreur (défaut: placeholder gris)
  showErrorUI={boolean}           // Afficher erreur UI (défaut: false)
  width={number}                  // Largeur en px
  height={number}                 // Hauteur en px
  loading={string}                // "lazy" ou "eager" (défaut: "lazy")
/>
```

---

## 🚀 Exemples Complets

### Exemple 1: ProductCard.jsx (Images locales)

```jsx
import SafeImage from "@/components/SafeImage";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      {/* Image du produit */}
      <div className="relative h-64 bg-gray-200">
        <SafeImage
          src={product.image} // "/images/Lacostes/lacoste1.jpeg"
          alt={product.name}
          className="w-full h-full"
        />
      </div>

      {/* Infos */}
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-green-600 font-semibold">
          {new Intl.NumberFormat("fr-SN").format(product.price)} FCFA
        </p>
      </div>
    </div>
  );
}
```

### Exemple 2: ProductDetail.jsx (API avec fallback)

```jsx
import SafeImage from "@/components/SafeImage";
import { useState } from "react";

export default function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Grande image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
        <SafeImage
          src={product?.image_url}
          alt={product?.name}
          fallbackSrc="/images/no-image.png"
          showErrorUI={true}
          loading="eager" // Important pour la première image
          width={600}
          height={600}
        />
      </div>

      {/* Infos produit */}
      <div>
        <h1 className="text-3xl font-bold">{product?.name}</h1>
        <p className="text-gray-600">{product?.description}</p>
      </div>
    </div>
  );
}
```

### Exemple 3: Galerie (plusieurs images)

```jsx
import SafeImage from "@/components/SafeImage";

export default function Gallery({ images }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, idx) => (
        <SafeImage
          key={idx}
          src={image.url}
          alt={`Produit ${idx + 1}`}
          className="w-full h-48 rounded-lg cursor-pointer hover:scale-105 transition"
          loading="lazy"
        />
      ))}
    </div>
  );
}
```

---

## 📝 Correction de products.js

**AVANT (❌) :**
```javascript
{ 
  id: "l1", 
  name: "Polo Lacoste Classic Blanc", 
  price: 25000, 
  image: "./public/images/lacoste1.jpg",  // ❌ Mauvais !
  category: "Lacostes"
}
```

**APRÈS (✅) :**
```javascript
{ 
  id: "l1", 
  name: "Polo Lacoste Classic Blanc", 
  price: 25000, 
  image: "/images/Lacostes/lacoste1.jpeg",  // ✅ Correct !
  category: "Lacostes"
}
```

---

## 🛠️ Vite Configuration (vite.config.js)

Vérifie que tu as ceci :

```javascript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Les fichiers de /public sont servis à la racine /
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

---

## 🔍 Déboguer les images

### Dans le navigateur (F12):

1. **Network tab:** Voir le statut de l'image (200, 404, etc.)
2. **Console:** Chercher les erreurs de chemin
3. **Test direct:** Aller à `http://localhost:8080/images/Lacostes/lacoste1.jpeg`

### Commandes utiles:

```bash
# Vérifier que les fichiers existent
ls -la public/images/Lacostes/

# Redémarrer Vite (clear cache)
npm run dev  # Ctrl+C et relancer
```

---

## 📚 Bonnes Pratiques

### ✅ À FAIRE:

```jsx
// 1. Toujours utiliser SafeImage
<SafeImage src={url} alt="Description" />

// 2. Chemin absolu depuis public/
image: "/images/category/name.jpeg"

// 3. Lazy loading pour les images hors écran
<SafeImage src={url} alt="Test" loading="lazy" />

// 4. Fallback pour les images API
fallbackSrc="/images/placeholder.png"

// 5. Dimensions fixes pour éviter layout shift
<SafeImage src={url} alt="Test" width={400} height={500} />
```

### ❌ À ÉVITER:

```jsx
// 1. Chemins relatifs avec ./public/
image: "./public/images/..." ❌

// 2. Pas d'alt text
<img src={url} /> ❌

// 3. Pas de gestion d'erreur
<img src={apiUrl} onError={null} /> ❌

// 4. Lazy loading sur first image (hero)
<SafeImage src={heroImg} loading="lazy" /> ❌ utilise "eager"

// 5. URLs non validées
<img src={userInput} /> ❌
```

---

## 🚀 Performance

### Lazy Loading activé par défaut:
```javascript
loading="lazy" // Charger seulement quand visible
```

### Désactiver pour la première image (hero):
```jsx
<SafeImage
  src={heroImage}
  alt="Hero"
  loading="eager" // Force le chargement immédiat
/>
```

---

## ✨ Résumé

| Situation | Solution |
|-----------|----------|
| Image `/public/images/...` | `src="/images/..."` avec SafeImage |
| Image importée `src/assets` | `import img from "@/assets/..."` |
| Image d'API | `fallbackSrc="/images/placeholder.png"` |
| Image cassée | SafeImage affiche automatiquement fallback |
| Slow load | `loading="lazy"` (défaut) |
| First image | `loading="eager"` |

---

## 📞 Support

Si une image ne s'affiche toujours pas:

1. ✅ Vérifie que le fichier existe: `ls public/images/...`
2. ✅ Teste l'URL directe: `http://localhost:8080/images/...`
3. ✅ Utilise SafeImage avec `showErrorUI={true}`
4. ✅ Regarde la console (F12) pour les erreurs
5. ✅ Redémarre `npm run dev`

