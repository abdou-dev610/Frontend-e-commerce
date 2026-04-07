export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const categories = [
  "Tous",
  "Lacostes",
  "Chaussures",
  "Abayas",
  "Qamis",
  "Pullovers",
  "Pantalons",
  "Ensembles",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Polo Lacoste Classic",
    price: 25000,
    image: "https://images.unsplash.com/photo-1625910513413-5fc66e60b5e0?w=400&h=500&fit=crop",
    category: "Lacostes",
    description: "Polo Lacoste classique en coton piqué, coupe régulière",
  },
  {
    id: "2",
    name: "Polo Lacoste Slim",
    price: 28000,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
    category: "Lacostes",
    description: "Polo slim fit en coton stretch premium",
  },
  {
    id: "3",
    name: "Sneakers Urban",
    price: 35000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    category: "Chaussures",
    description: "Sneakers tendance pour un look urbain décontracté",
  },
  {
    id: "4",
    name: "Chaussures Classiques",
    price: 40000,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop",
    category: "Chaussures",
    description: "Chaussures en cuir élégantes pour homme",
  },
  {
    id: "5",
    name: "Abaya Élégante Noire",
    price: 30000,
    image: "https://images.unsplash.com/photo-1590156546946-ce55a12a6a77?w=400&h=500&fit=crop",
    category: "Abayas",
    description: "Abaya noire brodée avec finitions dorées",
  },
  {
    id: "6",
    name: "Abaya Moderne",
    price: 35000,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
    category: "Abayas",
    description: "Abaya moderne avec manches évasées",
  },
  {
    id: "7",
    name: "Qamis Blanc Premium",
    price: 20000,
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
    category: "Qamis",
    description: "Qamis blanc en coton léger, parfait pour la prière",
  },
  {
    id: "8",
    name: "Qamis Brodé",
    price: 25000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    category: "Qamis",
    description: "Qamis avec broderies traditionnelles élégantes",
  },
  {
    id: "9",
    name: "Pullover en Laine",
    price: 22000,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    category: "Pullovers",
    description: "Pullover chaud en laine mérinos, coupe moderne",
  },
  {
    id: "10",
    name: "Pantalon Chino",
    price: 18000,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    category: "Pantalons",
    description: "Pantalon chino slim en coton stretch confortable",
  },
  {
    id: "11",
    name: "Ensemble Sport Chic",
    price: 45000,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=500&fit=crop",
    category: "Ensembles",
    description: "Ensemble veste + pantalon pour un look sport chic",
  },
  {
    id: "12",
    name: "Blouson Cuir",
    price: 55000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    category: "Ensembles",
    description: "Blouson en simili-cuir avec doublure intérieure",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-SN", {
    style: "decimal",
  }).format(price) + " FCFA";
};

export const getWhatsAppLink = (productName?: string): string => {
  const phone = "221762048119";
  const message = productName
    ? `Bonjour, je suis intéressé par : ${productName}. Pouvez-vous me donner plus d'informations ?`
    : "Bonjour, je suis intéressé par vos produits.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
