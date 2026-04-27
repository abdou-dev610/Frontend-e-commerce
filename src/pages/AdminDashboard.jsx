import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ordersApi } from "@/integrations/api/client";

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Statuts possibles
  const paymentStatuses = [
    { value: "pending", label: "⏳ En attente de paiement", color: "#ffc107" },
    { value: "completed", label: "✅ Paiement confirmé", color: "#28a745" },
  ];

  const orderStatuses = [
    { value: "pending", label: "📦 Commande créée", color: "#007bff" },
    { value: "confirmed", label: "✓ Confirmé", color: "#28a745" },
    { value: "shipped", label: "🚚 Livré", color: "#17a2b8" },
    { value: "cancelled", label: "❌ Annulé", color: "#dc3545" },
  ];

  // Charger les commandes
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getAll();
      setOrders(data || []);
      setError("");
    } catch (err) {
      console.error("Erreur lors du chargement des commandes:", err);
      setError("Impossible de charger les commandes");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, statusType, statusValue) => {
    try {
      setUpdating(true);
      const updateData = statusType === "payment" 
        ? { paymentStatus: statusValue }
        : { orderStatus: statusValue };

      const updated = await ordersApi.updateStatus(orderId, updateData);
      
      setOrders(orders.map(o => o._id === orderId ? updated : o));
      setSelectedOrder(null);
      setError("");
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      setError("Impossible de mettre à jour le statut");
    } finally {
      setUpdating(false);
    }
  };

  // Filtrer les commandes
  const filteredOrders = orders.filter(order => {
    if (filter === "pending") return order.paymentStatus === "pending";
    if (filter === "completed") return order.paymentStatus === "completed";
    return true;
  });

  if (!isAdmin) {
    return (
      <div style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #faf8f3 0%, #fef3c7 100%)"
      }}>
        <div style={{ 
          maxWidth: "500px",
          textAlign: "center",
          background: "white",
          padding: "40px 32px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          border: "2px solid #f3e5d7"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔐</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", marginBottom: "12px" }}>
            Accès Administrateur
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px", lineHeight: "1.6" }}>
            Vous n'avez pas les droits d'administration pour accéder au tableau de bord.
          </p>

          <div style={{
            background: "#fef3c7",
            border: "1px solid #fcd34d",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
            textAlign: "left"
          }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "#111827", marginTop: "0" }}>
              📝 Pour devenir administrateur:
            </p>
            <ol style={{ fontSize: "12px", color: "#374151", paddingLeft: "20px", marginBottom: "0" }}>
              <li>Connectez-vous avec votre compte</li>
              <li>Contactez l'administrateur principal</li>
              <li>Il modifiera votre rôle dans la base de données</li>
            </ol>
          </div>

          <div style={{
            display: "flex",
            gap: "12px",
            flexDirection: "column"
          }}>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s",
                boxShadow: "0 4px 15px rgba(234, 88, 12, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(234, 88, 12, 0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(234, 88, 12, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ← Retourner à l'accueil
            </a>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "2px solid #ea580c",
                color: "#ea580c",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s",
                background: "white"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fef3c7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
              }}
            >
              💬 Nous contacter
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: "100px",
      paddingBottom: "60px",
      minHeight: "100vh",
      background: "#f5f5f5"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px"
      }}>
        {/* En-tête */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
            📊 Tableau de Bord Admin
          </h1>
          <p style={{ color: "#666" }}>
            Gérez les statuts des commandes
          </p>
        </div>

        {/* Erreur */}
        {error && (
          <div style={{
            padding: "15px",
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "8px",
            color: "#c33",
            marginBottom: "20px"
          }}>
            {error}
          </div>
        )}

        {/* Filtres */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          {[
            { value: "all", label: "📋 Toutes les commandes", count: orders.length },
            { value: "pending", label: "⏳ En attente de paiement", count: orders.filter(o => o.paymentStatus === "pending").length },
            { value: "completed", label: "✅ Paiements confirmés", count: orders.filter(o => o.paymentStatus === "completed").length },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                background: filter === f.value ? "#8B5E3C" : "#e0e0e0",
                color: filter === f.value ? "white" : "#333",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s"
              }}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Tableau des commandes */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            ⏳ Chargement des commandes...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            📭 Aucune commande trouvée
          </div>
        ) : (
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflowX: "auto"
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            }}>
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>N° Commande</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Client</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Montant</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Paiement</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Commande</th>
                  <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id} style={{
                    borderBottom: "1px solid #dee2e6",
                    "&:hover": { background: "#f9f9f9" }
                  }}>
                    <td style={{ padding: "12px", fontWeight: "600", color: "#8B5E3C" }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontSize: "13px" }}>
                        <strong>{order.customerName}</strong>
                        <br />
                        <span style={{ color: "#666", fontSize: "12px" }}>{order.customerEmail}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "600", color: "#28a745" }}>
                      {(order.totalAmount || 0).toLocaleString()} FCFA
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background: order.paymentStatus === "completed" ? "#d4edda" : "#fff3cd",
                        color: order.paymentStatus === "completed" ? "#155724" : "#856404",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {order.paymentStatus === "completed" ? "✅ Confirmé" : "⏳ En attente"}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background: "#e7f3ff",
                        color: "#004085",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {order.orderStatus === "pending" ? "📦" : order.orderStatus === "confirmed" ? "✓" : order.orderStatus === "shipped" ? "🚚" : "❌"}
                        {" " + (order.orderStatus || "pending")}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          padding: "6px 12px",
                          background: "#8B5E3C",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                          transition: "all 0.3s"
                        }}
                        onMouseOver={e => e.target.style.background = "#6a4a2c"}
                        onMouseOut={e => e.target.style.background = "#8B5E3C"}
                      >
                        ⚙️ Gérer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de gestion */}
        {selectedOrder && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}>
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Gérer la commande {selectedOrder.orderNumber}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Info client */}
              <div style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "13px"
              }}>
                <p><strong>Client:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                <p><strong>Téléphone:</strong> {selectedOrder.customerPhone}</p>
                <p><strong>Montant:</strong> {(selectedOrder.totalAmount || 0).toLocaleString()} FCFA</p>
              </div>

              {/* Statut du paiement */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
                  💳 Statut du paiement:
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {paymentStatuses.map(status => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusUpdate(selectedOrder._id, "payment", status.value)}
                      disabled={updating}
                      style={{
                        padding: "10px",
                        border: selectedOrder.paymentStatus === status.value ? "2px solid" : "1px solid #ddd",
                        borderColor: status.color,
                        background: selectedOrder.paymentStatus === status.value ? status.color + "20" : "white",
                        color: status.color,
                        borderRadius: "6px",
                        cursor: updating ? "not-allowed" : "pointer",
                        fontWeight: "500",
                        opacity: updating ? 0.6 : 1,
                        transition: "all 0.3s"
                      }}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statut de la commande */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
                  📦 Statut de la commande:
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {orderStatuses.map(status => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusUpdate(selectedOrder._id, "order", status.value)}
                      disabled={updating}
                      style={{
                        padding: "10px",
                        border: selectedOrder.orderStatus === status.value ? "2px solid" : "1px solid #ddd",
                        borderColor: status.color,
                        background: selectedOrder.orderStatus === status.value ? status.color + "20" : "white",
                        color: status.color,
                        borderRadius: "6px",
                        cursor: updating ? "not-allowed" : "pointer",
                        fontWeight: "500",
                        opacity: updating ? 0.6 : 1,
                        transition: "all 0.3s"
                      }}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedOrder(null)}
                disabled={updating}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#8B5E3C",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: updating ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  opacity: updating ? 0.6 : 1,
                  transition: "all 0.3s"
                }}
              >
                {updating ? "Mise à jour..." : "Fermer"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
