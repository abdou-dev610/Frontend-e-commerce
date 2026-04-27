import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const cats = [
  { name: "Lacostes", emoji: "👕", color: "#ea580c", bgColor: "#fef3c7" },
  { name: "Chaussures", emoji: "👟", color: "#f97316", bgColor: "#fed7aa" },
  { name: "Abayas", emoji: "👗", color: "#ea580c", bgColor: "#fed7aa" },
  { name: "Qamis", emoji: "🕌", color: "#f97316", bgColor: "#fef3c7" },
  { name: "Pullovers", emoji: "🧥", color: "#ea580c", bgColor: "#fed7aa" },
  { name: "Ensembles", emoji: "👔", color: "#f97316", bgColor: "#fef3c7" },
];

const CategoryBanner = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/produits?cat=${encodeURIComponent(categoryName)}`);
  };

  return (
  <section style={{ 
    paddingTop: "clamp(56px, 12vw, 80px)", 
    paddingBottom: "clamp(56px, 12vw, 96px)", 
    background: "linear-gradient(135deg, #faf8f3 0%, #ffffff 100%)",
    position: "relative",
    overflow: "hidden"
  }}>
    {/* Decorative Background Elements */}
    <div style={{
      position: "absolute",
      top: "-50px",
      right: "-50px",
      width: "300px",
      height: "300px",
      background: "radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)",
      borderRadius: "50%",
      pointerEvents: "none"
    }} />

    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 clamp(8px, 3vw, 16px)", position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "clamp(48px, 12vw, 64px)" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(234, 88, 12, 0.1)",
          border: "1px solid rgba(234, 88, 12, 0.2)",
          padding: "8px 16px",
          borderRadius: "50px",
          marginBottom: "16px"
        }}>
          <Sparkles size={16} color="#ea580c" />
          <span style={{
            color: "#ea580c",
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>
            Nos Collections
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "clamp(32px, 6vw, 48px)",
          fontWeight: "900",
          color: "#111827",
          marginTop: "12px",
          letterSpacing: "-0.01em"
        }}>
          Nos Catégories
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(14px, 2vw, 16px)",
          color: "#6b7280",
          marginTop: "12px",
          maxWidth: "600px",
          margin: "12px auto 0 auto",
          fontWeight: "500"
        }}>
          Explorez nos 7 catégories principales de mode sénégalaise et internationale
        </p>
      </div>

      {/* Categories Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 22vw, 200px), 1fr))",
        gap: "clamp(16px, 3vw, 24px)",
        marginBottom: "clamp(48px, 12vw, 64px)"
      }}>
        {cats.map((c) => (
          <button
            key={c.name}
            onClick={() => handleCategoryClick(c.name)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "clamp(24px, 5vw, 32px) clamp(16px, 3vw, 20px)",
              borderRadius: "16px",
              background: c.bgColor,
              border: `2px solid ${c.color}`,
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              cursor: "pointer",
              transform: "translateY(0)",
              boxShadow: `0 4px 15px rgba(234, 88, 12, 0.1)`,
              fontFamily: "inherit"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(${c.color === "#ea580c" ? "234, 88, 12" : "249, 115, 22"}, 0.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 15px rgba(234, 88, 12, 0.1)`;
            }}
          >
            {/* Icon */}
            <span style={{
              fontSize: "clamp(36px, 8vw, 48px)",
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              pointerEvents: "none",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
            }}>
              {c.emoji}
            </span>

            {/* Category Name */}
            <span style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              fontWeight: "700",
              color: "#111827",
              textAlign: "center",
              letterSpacing: "-0.01em"
            }}>
              {c.name}
            </span>

            {/* Arrow Indicator */}
            <ArrowRight 
              size={16} 
              color={c.color}
              style={{
                transition: "transform 0.3s",
                opacity: 0.6,
                pointerEvents: "none"
              }}
            />
          </button>
        ))}
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: "center",
        background: "linear-gradient(135deg, rgba(234, 88, 12, 0.05) 0%, rgba(251, 146, 60, 0.05) 100%)",
        padding: "40px 24px",
        borderRadius: "16px",
        border: "1px solid rgba(234, 88, 12, 0.1)"
      }}>
        <h3 style={{
          fontSize: "clamp(18px, 4vw, 22px)",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "12px"
        }}>
          Ne Trouvez Pas Votre Style?
        </h3>
        <p style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "20px",
          maxWidth: "500px",
          margin: "0 auto 20px auto"
        }}>
          Parcourez tous nos 105 produits sélectionnés avec soin
        </p>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/produits");
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
            color: "white",
            padding: "12px 28px",
            borderRadius: "8px",
            fontWeight: "700",
            textDecoration: "none",
            transition: "all 0.3s",
            boxShadow: "0 8px 20px rgba(234, 88, 12, 0.25)",
            fontSize: "14px",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(234, 88, 12, 0.35)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(234, 88, 12, 0.25)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Voir Tous les Produits
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </section>
  );
};

export default CategoryBanner;
