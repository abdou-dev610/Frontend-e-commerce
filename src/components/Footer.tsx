import { ShoppingBag, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-charcoal text-cream py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold">Boutique Fashion</span>
        </div>
        <p className="text-sm text-cream/70 leading-relaxed">
          Votre destination mode au Sénégal. Lacostes, chaussures, abayas, qamis et plus encore.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold mb-4">Liens rapides</h4>
        <div className="flex flex-col gap-2">
          <Link to="/" className="text-sm text-cream/70 hover:text-primary transition-colors">Accueil</Link>
          <Link to="/produits" className="text-sm text-cream/70 hover:text-primary transition-colors">Produits</Link>
          <Link to="/contact" className="text-sm text-cream/70 hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-cream/70">
            <Phone className="h-4 w-4 text-primary" />
            +221 76 204 81 19
          </div>
          <div className="flex items-center gap-2 text-sm text-cream/70">
            <Mail className="h-4 w-4 text-primary" />
            ndiayeabdoumamesaye1234@gmail.com
          </div>
          <div className="flex items-center gap-2 text-sm text-cream/70">
            <MapPin className="h-4 w-4 text-primary" />
            Sénégal
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-8 border-t border-cream/10 text-center text-sm text-cream/50">
      © {new Date().getFullYear()} Boutique Fashion. Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
