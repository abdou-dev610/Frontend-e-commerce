import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, ShoppingCart, User, LogOut, Shield, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/produits", label: "Produits" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { itemCount } = useCart();

  // Extraire les initiales du nom
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderBottom: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "48px" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit", cursor: "pointer", minWidth: 0 }}>
          <div style={{ background: "linear-gradient(135deg, #b45309 0%, #f97316 100%)", padding: "8px", borderRadius: "6px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", flexShrink: 0 }}>
            <ShoppingBag size={20} color="white" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", minWidth: 0 }}>
            <div style={{ fontWeight: "bold", fontSize: "14px", background: "linear-gradient(90deg, #b45309 0%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: "1.1", whiteSpace: "nowrap" }}>CHIC SENEGAL</div>
            <div style={{ fontSize: "10px", color: "#b45309", fontWeight: "600", lineHeight: "1" }}>STYLE</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 40px)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "clamp(12px, 2vw, 14px)",
                fontWeight: "600",
                color: location.pathname === link.to ? "#ea580c" : "#374151",
                textDecoration: location.pathname === link.to ? "underline" : "none",
                transition: "all 0.3s"
              }}
            >{link.label}</Link>
          ))}
        </div>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Cart Icon */}
          <Link to="/panier" style={{ position: "relative", textDecoration: "none", color: "#374151", cursor: "pointer", padding: "6px", borderRadius: "6px", transition: "all 0.3s", display: "flex", alignItems: "center" }}>
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                {itemCount}
              </span>
            )}
          </Link>

          {/* Desktop Auth - Hidden on mobile */}
          {user ? (
            <div style={{ display: "flex", gap: "12px", alignItems: "center", position: "relative" }}>
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid #e5e7eb",
                  background: "white",
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  transition: "all 0.3s",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #b45309 0%, #f97316 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}
                >
                  {getInitials(user.fullName)}
                </div>
                <span style={{ color: "#374151", display: "clamp(0, 100vw, 500px)" }}>
                  {user.fullName?.split(" ")[0] || user.email}
                </span>
                <ChevronDown size={16} style={{ color: "#9ca3af", transition: "transform 0.3s" }} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    minWidth: "200px",
                    zIndex: 10
                  }}
                >
                  {/* User Info */}
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.4" }}>
                      <div style={{ fontWeight: "600", color: "#111827" }}>{user.fullName}</div>
                      <div>{user.email}</div>
                      {user.phone && <div>{user.phone}</div>}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/mon-compte"
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                      borderBottom: "1px solid #f3f4f6"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    👤 Mon Compte
                  </Link>

                  <Link
                    to="/commandes"
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                      borderBottom: "1px solid #f3f4f6"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    📦 Mes Commandes
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => {
                        setProfileOpen(false);
                      }}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        color: "#ea580c",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: "600",
                        transition: "all 0.2s",
                        borderBottom: "1px solid #f3f4f6"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef3c7")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <Shield size={14} style={{ display: "inline", marginRight: "4px" }} /> Tableau de Bord Admin
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      signOut();
                      setProfileOpen(false);
                      navigate("/");
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: "13px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef2f2")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <LogOut size={14} style={{ display: "inline", marginRight: "4px" }} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/auth" 
              style={{ fontSize: "clamp(11px, 2vw, 13px)", fontWeight: "bold", color: "white", background: "linear-gradient(90deg, #b45309 0%, #f97316 100%)", padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 12px)", borderRadius: "6px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.3s" }}
            >
              <User size={14} /> Connexion
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            style={{ display: "flex", border: "none", background: "none", cursor: "pointer", color: "#374151", padding: "6px", borderRadius: "6px", transition: "all 0.3s" }}
            onClick={() => setOpen(!open)} 
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb", padding: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "12px 8px", color: location.pathname === link.to ? "#ea580c" : "#374151", textDecoration: "none", fontWeight: "500", fontSize: "14px" }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ borderTop: "1px solid #e5e7eb", marginTop: "12px", paddingTop: "12px" }}>
            {user ? (
              <>
                {/* Profile Info */}
                <div style={{ padding: "12px 8px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #b45309 0%, #f97316 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "13px"
                    }}
                  >
                    {getInitials(user.fullName)}
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    <div style={{ fontWeight: "600", color: "#111827" }}>{user.fullName}</div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>{user.email}</div>
                  </div>
                </div>

                <Link 
                  to="/mon-compte" 
                  onClick={() => setOpen(false)}
                  style={{ display: "block", padding: "12px 8px", color: "#374151", textDecoration: "none", fontWeight: "500", fontSize: "14px" }}
                >
                  👤 Mon Compte
                </Link>

                <Link 
                  to="/commandes" 
                  onClick={() => setOpen(false)}
                  style={{ display: "block", padding: "12px 8px", color: "#374151", textDecoration: "none", fontWeight: "500", fontSize: "14px" }}
                >
                  📦 Mes Commandes
                </Link>

                {isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={() => setOpen(false)}
                    style={{ display: "block", padding: "12px 8px", color: "#ea580c", textDecoration: "none", fontWeight: "500", fontSize: "14px" }}
                  >
                    <Shield size={14} style={{ display: "inline", marginRight: "4px" }} /> Tableau de Bord Admin
                  </Link>
                )}
                <button 
                  onClick={handleSignOut}
                  style={{ width: "100%", textAlign: "left", padding: "12px 8px", border: "none", background: "none", cursor: "pointer", color: "#ef4444", fontSize: "14px", fontWeight: "500" }}
                >
                  <LogOut size={14} style={{ display: "inline", marginRight: "4px" }} /> Déconnexion
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setOpen(false)}
                style={{ display: "block", textAlign: "center", padding: "10px", background: "linear-gradient(90deg, #b45309 0%, #f97316 100%)", color: "white", textDecoration: "none", fontWeight: "600", borderRadius: "6px" }}
              >
                <User size={14} style={{ display: "inline", marginRight: "4px" }} /> Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

