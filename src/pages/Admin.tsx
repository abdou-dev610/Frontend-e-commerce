import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Package, ShoppingCart, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;
type Order = Tables<"orders">;

const categories = ["Lacostes", "Chaussures", "Abayas", "Qamis", "Pullovers", "Pantalons", "Ensembles"];

const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Lacostes", description: "" });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image) {
      toast({ title: "Erreur", description: "Remplissez tous les champs obligatoires", variant: "destructive" });
      return;
    }

    const productData = {
      name: form.name,
      price: parseInt(form.price),
      image: form.image,
      category: form.category,
      description: form.description,
    };

    if (editingProduct) {
      const { error } = await supabase.from("products").update(productData).eq("id", editingProduct.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Produit modifié" });
    } else {
      const { error } = await supabase.from("products").insert(productData);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Produit ajouté" });
    }

    setShowForm(false);
    setEditingProduct(null);
    setForm({ name: "", price: "", image: "", category: "Lacostes", description: "" });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Produit supprimé" });
    fetchProducts();
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Statut mis à jour" });
    fetchOrders();
  };

  if (!isAdmin) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Accès refusé</h1>
          <p className="text-muted-foreground">Vous n'avez pas les droits d'administration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">Administration</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button variant={tab === "products" ? "default" : "outline"} onClick={() => setTab("products")}>
            <Package className="h-4 w-4 mr-2" /> Produits ({products.length})
          </Button>
          <Button variant={tab === "orders" ? "default" : "outline"} onClick={() => setTab("orders")}>
            <ShoppingCart className="h-4 w-4 mr-2" /> Commandes ({orders.length})
          </Button>
        </div>

        {/* Products Tab */}
        {tab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Gestion des produits</h2>
              <Button onClick={() => { setShowForm(true); setEditingProduct(null); setForm({ name: "", price: "", image: "", category: "Lacostes", description: "" }); }}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter
              </Button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{editingProduct ? "Modifier" : "Ajouter"} un produit</h3>
                    <button onClick={() => setShowForm(false)}><X className="h-5 w-5" /></button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Nom *</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Prix (FCFA) *</label>
                      <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">URL Image *</label>
                      <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Catégorie</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <Button onClick={handleSave} className="w-full">
                      {editingProduct ? "Enregistrer" : "Ajouter"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-card border border-border rounded-lg p-4">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                      <Pencil className="h-3 w-3 mr-1" /> Modifier
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-3 w-3 mr-1" /> Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">Commandes</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">Aucune commande pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <p className="font-semibold">Commande #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString("fr-FR")}</p>
                        {order.customer_name && <p className="text-sm">Client : {order.customer_name}</p>}
                        {order.customer_phone && <p className="text-sm">Tél : {order.customer_phone}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-bold">{formatPrice(order.total)}</p>
                        <p className="text-sm text-muted-foreground">{order.payment_method || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
