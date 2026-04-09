import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Smartphone } from "lucide-react";

const paymentMethods = [
  { id: "wave", name: "Wave", icon: "🌊" },
  { id: "orange_money", name: "Orange Money", icon: "🟠" },
  { id: "free_money", name: "Free Money", icon: "🟢" },
];

const Payment = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({ title: "Erreur", description: "Veuillez choisir un mode de paiement", variant: "destructive" });
      return;
    }
    if (!user) {
      navigate("/auth");
      return;
    }

    setProcessing(true);
    try {
      // Create order in DB
      const orderItems = items.map((i) => ({
        product_id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      }));

      const { error: orderError } = await supabase.from("orders").insert({
        user_id: user.id,
        items: orderItems,
        total,
        payment_method: selectedMethod,
        status: "pending",
        customer_name: user.user_metadata?.full_name || "",
        customer_phone: user.user_metadata?.phone || "",
      });

      if (orderError) throw orderError;

      // Call Paytech edge function
      const { data, error } = await supabase.functions.invoke("paytech-payment", {
        body: {
          amount: total,
          payment_method: selectedMethod,
          description: `Commande Boutique Fashion - ${items.length} article(s)`,
        },
      });

      if (error) throw error;

      if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        // Fallback: mark as pending and show success
        clearCart();
        toast({ title: "Commande enregistrée", description: "Votre commande a été enregistrée. Vous recevrez les instructions de paiement." });
        navigate("/");
      }
    } catch (err: any) {
      toast({ title: "Erreur de paiement", description: err.message || "Une erreur est survenue", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/panier");
    return null;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Paiement</h1>
        <p className="text-muted-foreground mb-8">Choisissez votre mode de paiement</p>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Mobile Money
          </h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  selectedMethod === method.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium text-foreground">{method.name}</span>
                {selectedMethod === method.id && (
                  <span className="ml-auto text-primary text-sm font-medium">✓ Sélectionné</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Récapitulatif
          </h2>
          <div className="space-y-2 mb-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name} x{item.quantity}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <Button onClick={handlePayment} disabled={processing || !selectedMethod} className="w-full" size="lg">
          {processing ? "Traitement en cours..." : `Payer ${formatPrice(total)}`}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
