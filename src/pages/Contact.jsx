import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const Contact = () => (
  <div style={{ paddingTop: "clamp(60px, 10vw, 80px)", paddingBottom: "clamp(40px, 8vw, 64px)", backgroundColor: "#f9fafb" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(8px, 3vw, 16px)" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "clamp(32px, 8vw, 48px)" }}>
        <span style={{
          color: "#ea580c",
          fontSize: "clamp(10px, 2vw, 12px)",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          Nous joindre
        </span>
        <h1 style={{
          fontSize: "clamp(24px, 5vw, 32px)",
          fontWeight: "bold",
          color: "#1f2937",
          marginTop: "8px"
        }}>
          Contactez-nous
        </h1>
        <p style={{
          fontSize: "clamp(13px, 2.5vw, 14px)",
          color: "#6b7280",
          marginTop: "12px",
          maxWidth: "600px",
          margin: "12px auto 0"
        }}>
          Une question sur un produit ? Envoyez-nous un message ou contactez-nous directement via WhatsApp.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "clamp(24px, 6vw, 48px)"
      }}>
        {/* Info Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937"
          }}>
            Informations
          </h2>

          {/* Info Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Phone */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#fed7aa",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Phone size={20} color="#ea580c" />
              </div>
              <div>
                <p style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#1f2937",
                  marginBottom: "4px"
                }}>
                  Téléphone
                </p>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280"
                }}>
                  +221 76 204 81 19
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#fed7aa",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Mail size={20} color="#ea580c" />
              </div>
              <div>
                <p style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#1f2937",
                  marginBottom: "4px"
                }}>
                  Email
                </p>
                <p style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  wordBreak: "break-all"
                }}>
                  ndiayeabdoumamesaye1234@gmail.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#fed7aa",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <MapPin size={20} color="#ea580c" />
              </div>
              <div>
                <p style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#1f2937",
                  marginBottom: "4px"
                }}>
                  Adresse
                </p>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280"
                }}>
                  Dakar, Sénégal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "white",
            padding: "32px 24px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.elements.namedItem("name").value;
            const message = form.elements.namedItem("message").value;
            const waUrl = `https://wa.me/221762048119?text=${encodeURIComponent(
              `Bonjour, je suis ${name}. ${message}`
            )}`;
            window.open(waUrl, "_blank");
          }}
        >
          {/* Name Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151"
            }}>
              Nom
            </label>
            <input
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="Votre nom"
              style={{
                padding: "12px 14px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontFamily: "inherit",
                transition: "all 0.3s",
                backgroundColor: "#fff"
              }}
              onFocus={(e) => e.target.style.borderColor = "#ea580c"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            />
          </div>

          {/* Email Field (Optional) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151"
            }}>
              Email (optionnel)
            </label>
            <input
              name="email"
              type="email"
              placeholder="Votre email"
              style={{
                padding: "12px 14px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontFamily: "inherit",
                transition: "all 0.3s",
                backgroundColor: "#fff"
              }}
              onFocus={(e) => e.target.style.borderColor = "#ea580c"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            />
          </div>

          {/* Message Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151"
            }}>
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              maxLength={1000}
              placeholder="Votre message..."
              style={{
                padding: "12px 14px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontFamily: "inherit",
                transition: "all 0.3s",
                backgroundColor: "#fff",
                resize: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#ea580c"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: "12px 16px",
              backgroundColor: "#ea580c",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s",
              marginTop: "8px"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#c2410c"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#ea580c"}
          >
            Envoyer via WhatsApp
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
