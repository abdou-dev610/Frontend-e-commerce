import { ShoppingCart, ExternalLink } from "lucide-react";
import { Product, formatPrice, getWhatsAppLink } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({ title: "Ajouté au panier", description: product.name });
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-2">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-accent transition-colors"
              title="Ajouter au panier"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-[#25D366] text-white hover:bg-[#1ebe5b] transition-colors"
              title="Commander via WhatsApp"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
