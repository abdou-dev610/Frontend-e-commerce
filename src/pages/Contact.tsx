import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const Contact = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <span className="text-primary text-sm font-medium uppercase tracking-widest">
          Nous joindre
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
          Contactez-nous
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Une question sur un produit ? Envoyez-nous un message ou contactez-nous directement via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info */}
        <div className="space-y-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Informations
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Téléphone</p>
                <p className="text-muted-foreground">+221 76 204 81 19</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-muted-foreground text-sm break-all">
                  ndiayeabdoumamesaye1234@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Adresse</p>
                <p className="text-muted-foreground">Sénégal</p>
              </div>
            </div>
          </div>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-[#fff] px-6 py-3 rounded-md font-medium hover:bg-[#1ebe5b] transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Écrire sur WhatsApp
          </a>
        </div>

        {/* Contact form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
            const waUrl = `https://wa.me/221762048119?text=${encodeURIComponent(
              `Bonjour, je suis ${name}. ${message}`
            )}`;
            window.open(waUrl, "_blank");
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              className="w-full border border-input bg-background rounded-md px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={1000}
              className="w-full border border-input bg-background rounded-md px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Votre message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-accent transition-colors"
          >
            Envoyer via WhatsApp
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
