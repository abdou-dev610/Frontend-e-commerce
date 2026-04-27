// ========================================
// 📸 EXEMPLES D'UTILISATION DE SafeImage
// ========================================

// 1️⃣ EXEMPLE BASIQUE - Image locale
// ==================================
import SafeImage from "@/components/SafeImage";

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <SafeImage
        src={product.image} // "/images/Lacostes/lacoste1.jpeg"
        alt={product.name}
        className="w-full h-64 rounded-lg object-cover"
      />
      <h3 className="mt-4 font-bold">{product.name}</h3>
    </div>
  );
}

// 2️⃣ EXEMPLE AVEC FALLBACK - Image d'API
// ========================================
export function RemoteProductCard({ product }) {
  return (
    <SafeImage
      src={product.imageUrl} // URL d'une API externe
      alt={product.name}
      fallbackSrc="/images/no-image.png" // Affichage si erreur
      showErrorUI={true} // Montrer le message d'erreur
      className="w-full h-80 rounded-xl"
    />
  );
}

// 3️⃣ EXEMPLE AVEC DIMENSIONS - Image fixe
// ========================================
export function HeroImage() {
  return (
    <SafeImage
      src="/images/hero-banner.jpeg"
      alt="Banner principal"
      width={1200}
      height={600}
      loading="eager" // Charger immédiatement (pas lazy)
      className="w-full rounded-xl"
    />
  );
}

// 4️⃣ EXEMPLE AVEC IMAGE IMPORTÉE - Asset local
// ==============================================
import heroImage from "@/assets/hero.png";

export function HeroWithImport() {
  return (
    <SafeImage
      src={heroImage} // Import du fichier
      alt="Hero section"
      className="w-full h-96 object-cover"
    />
  );
}

// 5️⃣ EXEMPLE GALERIE - Plusieurs images
// ======================================
export function ProductGallery({ images }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, idx) => (
        <SafeImage
          key={idx}
          src={image.url}
          alt={`Photo ${idx + 1}`}
          fallbackSrc="/images/placeholder.png"
          className="w-full h-48 rounded-lg cursor-pointer hover:scale-105 transition"
          loading="lazy"
        />
      ))}
    </div>
  );
}

// 6️⃣ EXEMPLE AVEC ÉTAT - Changer d'image
// ======================================
import { useState } from "react";

export function ImageSelector({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="flex gap-4">
      {/* Grandes image */}
      <div className="flex-1">
        <SafeImage
          src={selectedImage}
          alt={product.name}
          loading="eager"
          className="w-full aspect-square rounded-xl"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {product.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 rounded-lg border-2 transition ${
              selectedImage === img ? "border-orange-500" : "border-gray-300"
            }`}
          >
            <SafeImage
              src={img}
              alt={`Thumbnail ${idx}`}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// 7️⃣ EXEMPLE COMPLÈTE - Détail produit
// ====================================
export function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image);

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Section Images */}
      <div>
        {/* Image principale */}
        <div className="mb-6 aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <SafeImage
            src={mainImage}
            alt={product.name}
            fallbackSrc="/images/no-image.png"
            loading="eager"
            className="w-full h-full"
          />
        </div>

        {/* Autres images (si disponibles) */}
        {product.additionalImages && (
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => setMainImage(product.image)}
              className="aspect-square rounded-lg overflow-hidden border-2 border-orange-500"
            >
              <SafeImage src={product.image} alt="Image 1" />
            </button>

            {product.additionalImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-orange-500 transition"
              >
                <SafeImage src={img} alt={`Image ${idx + 2}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Section Infos */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-2xl font-bold text-green-600">
            {product.price.toLocaleString("fr-SN")} FCFA
          </p>
        </div>

        {/* Contrôles */}
        <div className="flex gap-4 mb-6">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

// 8️⃣ EXEMPLE LAZY LOADING - Optimize performance
// ===============================================
export function ProductList({ products }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg overflow-hidden">
          {/* Lazy loading par défaut = meilleure perf */}
          <SafeImage
            src={product.image}
            alt={product.name}
            className="w-full h-48"
            loading="lazy" // Charge quand visible à l'écran
          />
          <div className="p-4">
            <h3>{product.name}</h3>
            <p className="text-gray-600">{product.price} FCFA</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 9️⃣ EXEMPLE AVEC GESTION D'ERREUR - Afficher les erreurs
// ========================================================
export function ErrorHandlingExample({ imageUrl }) {
  return (
    <div className="relative">
      <SafeImage
        src={imageUrl}
        alt="Image avec gestion d'erreur"
        fallbackSrc="/images/default.png"
        showErrorUI={true} // 👈 Affiche l'icône d'erreur en cas de problème
        className="w-full h-64 rounded-lg"
      />
    </div>
  );
}

// 🔟 EXEMPLE AVEC CLASSE CSS CUSTOM - Tailwind intégré
// ==================================================
export function CustomStyledImage() {
  return (
    <SafeImage
      src="/images/products/item.jpeg"
      alt="Product"
      className="w-full h-96 rounded-2xl shadow-lg hover:shadow-2xl transition object-cover"
    />
  );
}

// 1️⃣1️⃣ EXEMPLE RESPONSIVE - Mobile/Desktop
// ========================================
export function ResponsiveImage() {
  return (
    <SafeImage
      src="/images/product.jpeg"
      alt="Responsive image"
      className="w-full h-auto sm:h-48 md:h-64 lg:h-96 rounded-lg"
      loading="lazy"
    />
  );
}

// 1️⃣2️⃣ CAS RÉEL - Panier d'achat
// ============================
export function CartItem({ item }) {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg">
      {/* Image produit */}
      <SafeImage
        src={item.product.image}
        alt={item.product.name}
        fallbackSrc="/images/no-image.png"
        width={120}
        height={120}
        className="w-28 h-28 rounded-lg"
      />

      {/* Infos */}
      <div className="flex-1">
        <h3 className="font-bold">{item.product.name}</h3>
        <p className="text-gray-600 text-sm">{item.product.description}</p>
        <p className="font-semibold mt-2">
          {item.quantity} × {item.product.price} FCFA
        </p>
      </div>

      {/* Bouton supprimer */}
      <button className="text-red-600 hover:text-red-700">
        Supprimer
      </button>
    </div>
  );
}

// ==================================================
// ✅ BONNES PRATIQUES À RETENIR
// ==================================================

/*
✅ À FAIRE :
- Toujours utiliser SafeImage au lieu de <img>
- Fournir un fallbackSrc pour les images API
- Utiliser loading="eager" pour la première image
- Utiliser loading="lazy" pour les autres
- Ajouter showErrorUI={true} en développement pour déboguer

❌ À ÉVITER :
- Chemins relatifs avec ./public/
- Pas de texte alt
- Pas de fallback pour images dynamiques
- Lazy loading sur l'image hero
- URLs non validées

📊 PERFORMANCE :
- Lazy loading activé par défaut
- Skeleton loader pendant chargement
- Gestion des erreurs automatique
- Validation d'URL intégrée
*/
