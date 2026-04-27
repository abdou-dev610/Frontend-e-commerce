// ============================================
// 🧪 TEST RAPIDE - Vérifier Images
// ============================================

/**
 * Après avoir implémenté SafeImage, testez ceci:
 */

// 1️⃣ TESTER EN CONSOLE (F12)
// ==========================
// Copier-coller dans la console du navigateur:

// Vérifier que les fichiers existent
fetch('/images/Lacostes/lacoste1.jpeg')
  .then(res => console.log('✅ lacoste1.jpeg:', res.status))
  .catch(err => console.error('❌ Erreur:', err));

fetch('/images/Lacostes/lacoste2.jpeg')
  .then(res => console.log('✅ lacoste2.jpeg:', res.status))
  .catch(err => console.error('❌ Erreur:', err));

// Vérifier tous les chemins d'images
const testImages = [
  '/images/Lacostes/lacoste1.jpeg',
  '/images/Lacostes/lacoste2.jpeg',
  '/images/Chaussures/c1.jpeg',
  '/images/Abayas/a1.jpeg',
];

testImages.forEach(img => {
  fetch(img)
    .then(res => console.log(`${img}: ${res.status === 200 ? '✅' : '❌'}`))
    .catch(err => console.error(`${img}: ❌`));
});

// 2️⃣ CHECKLIST DE VÉRIFICATION
// ============================

console.log(`
✅ CHECKLIST IMAGES:

[ ] SafeImage.jsx créé dans src/components/
[ ] ProductCard.jsx utilise SafeImage
[ ] ProductDetailInline.jsx utilise SafeImage
[ ] ProductGridCard.jsx utilise SafeImage
[ ] Chemins commencent par / (ex: /images/...)
[ ] Les fichiers existent en /public/images/
[ ] npm run dev fonctionne sans erreur
[ ] F12 Network: pas de 404 pour les images
[ ] Images s'affichent correctement sur les pages

Si un test échoue, vérifiez:
1. Le chemin du fichier
2. L'extension (.jpeg vs .jpg)
3. Le dossier public/images/
4. Vérifiez F12 > Network > cherchez l'image
5. Vérifiez F12 > Console pour les erreurs
`);

// 3️⃣ EXEMPLE DE COMPOSANT TEST
// ============================

import React from 'react';
import SafeImage from '@/components/SafeImage';

export function ImageTest() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🧪 Test Images</h1>

      {/* Test 1: Image locale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Test 1️⃣: Image Locale</h2>
        <p className="text-gray-600 mb-4">Doit afficher lacoste1.jpeg</p>
        <SafeImage
          src="/images/Lacostes/lacoste1.jpeg"
          alt="Lacoste 1"
          className="w-full max-w-xs h-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Test 2: Avec fallback */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Test 2️⃣: Avec Fallback</h2>
        <p className="text-gray-600 mb-4">Doit afficher fallback si URL invalide</p>
        <SafeImage
          src="/images/invalid-path/image.jpg"
          alt="Image invalide"
          fallbackSrc="/images/Lacostes/lacoste1.jpeg"
          className="w-full max-w-xs h-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Test 3: Avec dimensions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Test 3️⃣: Avec Dimensions</h2>
        <p className="text-gray-600 mb-4">Doit afficher une image 300x400</p>
        <SafeImage
          src="/images/Lacostes/lacoste2.jpeg"
          alt="Lacoste 2"
          width={300}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </section>

      {/* Test 4: Avec erreur visuelle */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Test 4️⃣: Avec Erreur Visuelle</h2>
        <p className="text-gray-600 mb-4">Doit afficher l'icône d'erreur</p>
        <SafeImage
          src="/images/invalid/image.jpg"
          alt="Image cassée"
          fallbackSrc="/images/invalid-fallback.jpg"
          showErrorUI={true}
          className="w-full max-w-xs h-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Test 5: Gallery */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Test 5️⃣: Galerie</h2>
        <div className="grid grid-cols-3 gap-4">
          {['lacoste1.jpeg', 'lacoste2.jpeg', 'lacoste3.jpeg'].map((img, idx) => (
            <SafeImage
              key={idx}
              src={`/images/Lacostes/${img}`}
              alt={`Lacoste ${idx + 1}`}
              className="w-full aspect-square rounded-lg shadow-lg"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* Logs */}
      <section className="bg-gray-100 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">📋 Résultats Attendus:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✅ Test 1: lacoste1.jpeg visible</li>
          <li>✅ Test 2: Fallback utilisé automatiquement</li>
          <li>✅ Test 3: Image en 300x400</li>
          <li>✅ Test 4: Icône d'erreur avec message</li>
          <li>✅ Test 5: Galerie 3x3 sans erreurs</li>
          <li>✅ Console: Pas d'erreur 404</li>
        </ul>
      </section>
    </div>
  );
}

// 4️⃣ COMMANDES UTILES
// ===================

/*
# Vérifier que les fichiers existent
ls -la public/images/Lacostes/

# Vérifier la config Vite
cat vite.config.js

# Test d'accès direct au fichier
curl http://localhost:8080/images/Lacostes/lacoste1.jpeg

# Voir les erreurs
npm run dev  # Chercher les warnings/errors en rouge

# Nettoyer le cache et redémarrer
rm -rf node_modules/.vite
npm run dev
*/
