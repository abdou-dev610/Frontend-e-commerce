import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/produits", label: "Produits" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { itemCount } = useCart();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Boutique Fashion
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Cart */}
          <Link to="/panier" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1">
                  <Shield className="h-4 w-4" /> Admin
                </Link>
              )}
              <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
              <User className="h-4 w-4" /> Connexion
            </Link>
          )}
        </div>

        {/* Mobile: cart + toggle */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/panier" className="relative text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                className={`text-base font-medium transition-colors ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="text-base font-medium text-primary flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Administration
                  </Link>
                )}
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="text-base font-medium text-muted-foreground text-left flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Déconnexion
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="text-base font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
