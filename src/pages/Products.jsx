import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGridCard from "@/components/ProductGridCard";
import CategoryCard from "@/components/CategoryCard";
import { getProducts, getCategories } from "@/services/productService";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "Tous";
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(["Tous"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(["Tous", ...cats.filter(c => c !== "Tous")]);
      } catch (err) {
        console.error("Error loading categories:", err);
        setCategories(["Tous", "Vêtements", "Accessoires", "Chaussures"]);
      }
    };
    loadCategories();
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Charger tous les produits pour les cartes de catégories
        const allProds = await getProducts(null);
        setAllProducts(allProds);
        
        // Charger les produits filtres pour la vue détaillée
        const prods = await getProducts(activeCategory === "Tous" ? null : activeCategory);
        setProducts(prods);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Erreur lors du chargement des produits");
        setProducts([]);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [activeCategory]);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  // Grouper les produits par catégorie
  const groupProductsByCategory = () => {
    const grouped = {};
    allProducts.forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  };

  const productsByCategory = groupProductsByCategory();

  return (
    <div style={{ paddingTop: "clamp(60px, 10vw, 80px)", paddingBottom: "clamp(40px, 8vw, 64px)" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 clamp(8px, 3vw, 16px)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(24px, 6vw, 40px)" }}>
          <span style={{
            color: "#ea580c",
            fontSize: "clamp(10px, 2vw, 12px)",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Catalogue
          </span>
          <h1 style={{
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: "bold",
            color: "#1f2937",
            marginTop: "8px"
          }}>
            {activeCategory === "Tous" ? "Nos Produits" : activeCategory}
          </h1>
          {activeCategory !== "Tous" && (
            <p style={{
              fontSize: "clamp(13px, 2vw, 15px)",
              color: "#ea580c",
              marginTop: "8px",
              fontWeight: "600"
            }}>
              {products.length} produits dans cette catégorie
            </p>
          )}
        </div>

        {/* Category Filter */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(8px, 2vw, 12px)",
          marginBottom: "clamp(24px, 6vw, 40px)"
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px clamp(12px, 3vw, 20px)",
                borderRadius: "9999px",
                fontSize: "clamp(12px, 2vw, 14px)",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                backgroundColor: activeCategory === cat ? "#ea580c" : "#f3f4f6",
                color: activeCategory === cat ? "white" : "#6b7280"
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.target.style.backgroundColor = "#e5e7eb";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.target.style.backgroundColor = "#f3f4f6";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <p style={{
            textAlign: "center",
            color: "#9ca3af",
            paddingTop: "64px",
            paddingBottom: "64px"
          }}>
            Chargement des produits...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p style={{
            textAlign: "center",
            color: "#dc3545",
            paddingTop: "64px",
            paddingBottom: "64px"
          }}>
            {error}
          </p>
        )}

        {/* Grid Layout - Display by view type */}
        {!loading && !error && (
          <>
            {/* View "Tous" - Category Cards with 15 images each */}
            {activeCategory === "Tous" && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px"
              }}>
                {categories.filter(cat => cat !== "Tous").map((cat, i) => (
                  <div
                    key={cat}
                    style={{
                      animation: "fadeIn 0.5s ease-in-out",
                      animationDelay: `${i * 0.05}s`,
                      animationFillMode: "both"
                    }}
                  >
                    {productsByCategory[cat] && (
                      <CategoryCard 
                        category={cat} 
                        products={productsByCategory[cat].slice(0, 15)} 
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Specific Category View - E-commerce product grid */}
            {activeCategory !== "Tous" && products.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "18px",
                }}
              >
                {products.map((product, i) => (
                  <div
                    key={product._id || product.id}
                    style={{
                      animation: "fadeIn 0.4s ease-in-out",
                      animationDelay: `${i * 0.03}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <ProductGridCard product={product} disableNavigation />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!loading && !error && activeCategory !== "Tous" && products.length === 0 && (
          <p style={{
            textAlign: "center",
            color: "#9ca3af",
            paddingTop: "64px",
            paddingBottom: "64px"
          }}>
            Aucun produit dans cette catégorie.
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
