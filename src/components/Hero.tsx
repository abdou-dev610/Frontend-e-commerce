import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={heroBanner}
        alt="Boutique Fashion - Mode au Sénégal"
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-transparent" />
    </div>

    <div className="relative container mx-auto px-4 py-20">
      <div className="max-w-xl space-y-6 animate-fade-in">
        <span className="inline-block text-primary font-medium text-sm uppercase tracking-widest">
          Nouvelle Collection
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-cream leading-tight">
          Votre Style,{" "}
          <span className="text-primary">Notre Passion</span>
        </h1>
        <p className="text-cream/80 text-lg leading-relaxed max-w-md">
          Découvrez notre sélection de vêtements tendance — Lacostes, chaussures, abayas, qamis et plus encore. Livraison au Sénégal.
        </p>
        <Link
          to="/produits"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-medium text-base hover:bg-accent transition-colors"
        >
          Voir les produits
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
