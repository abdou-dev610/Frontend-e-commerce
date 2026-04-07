import { ExternalLink } from "lucide-react";
import { Product, formatPrice, getWhatsAppLink } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => (
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
        <a
          href={getWhatsAppLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
        >
          Commander
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
);

export default ProductCard;
