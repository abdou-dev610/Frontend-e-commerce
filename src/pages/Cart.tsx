import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, getWhatsAppLink } from "@/data/products";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();

  const whatsAppOrderMessage = () => {
    const productList = items
      .map((i) => `• ${i.product.name} x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`)
      .join("\n");
    const msg = `Bonjour, je souhaite commander :\n\n${productList}\n\nTotal : ${formatPrice(total)}\n\nMerci !`;
    return `https://wa.me/221762048119?text=${encodeURIComponent(msg)}`;
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 text-center py-20">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">Ajoutez des produits pour commencer vos achats</p>
          <Link to="/produits">
            <Button>Voir les produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Mon Panier</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.product.category}</p>
                  <p className="text-primary font-bold mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded border border-border hover:bg-muted">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded border border-border hover:bg-muted">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Résumé</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">{item.product.name} x{item.quantity}</span>
                  <span className="font-medium text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {user ? (
                <Link to="/paiement">
                  <Button className="w-full" size="lg">
                    Payer en ligne
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button className="w-full" size="lg">
                    Se connecter pour payer
                  </Button>
                </Link>
              )}
              <a href={whatsAppOrderMessage()} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full bg-[#25D366] text-white border-[#25D366] hover:bg-[#1ebe5b] hover:text-white" size="lg">
                  Commander via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
