# 🚀 Guide Complet - Installation Backend + Frontend

## ÉTAPE 1: Backend Express.js

### 1.1 Installer les dépendances backend
```bash
cd backend
npm install
```

### 1.2 Créer MongoDB Atlas (si pas encore fait)
1. Aller sur https://www.mongodb.com/cloud/atlas
2. Créer une account
3. Créer un cluster "Chic Senegal"
4. Créer une database "chic-senegal"
5. Créer un utilisateur "admin" avec mot de passe "admin2000"
6. Obtenir la connection string et la mettre dans `.env`

### 1.3 Configurer `.env`
Fichier déjà créé: `backend/.env`
Vérifier:
- MONGODB_URI (votre connection string MongoDB Atlas)
- Clés PayTech
- Admin credentials

### 1.4 Lancer le backend
```bash
cd backend
npm start       # Production
# ou
npm run dev     # Développement (auto-reload)
```

Le backend tournera sur: **http://localhost:5000** ✅

Tester: `http://localhost:5000/api/health`
Réponse attendue: `{"status":"ok","message":"Backend is running"}`

---

## ÉTAPE 2: Frontend React

### 2.1 Créer le client API (communication frontend ↔ backend)

Créer le fichier: `src/integrations/api/client.js`

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => {
  return localStorage.getItem('authToken');
};

const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }
  return data;
};

export default apiClient;
```

### 2.2 Créer un fichier `.env` pour le frontend

Ajouter à `src/.env.local` ou `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 2.3 Mettre à jour les contexts (Auth, Cart)

**CartContext** reste pareil ✅

**AuthContext** doit utiliser le backend:
- `signUp` → appelle `/api/auth/signup`
- `signIn` → appelle `/api/auth/signin`
- Token sauvegardé dans `localStorage`

---

## ÉTAPE 3: Flux de Travail Complet

### Frontend Development (Terminal 1)
```bash
cd chic-senegal-style
npm run dev
```
Port: http://localhost:8082

### Backend Development (Terminal 2)
```bash
cd chic-senegal-style/backend
npm run dev
```
Port: http://localhost:5000

### Flux Client
1. **Inscription**: POST `/api/auth/signup` 
   - Frontend stocke le token
2. **Connexion**: POST `/api/auth/signin`
   - Frontend stocke le token
3. **Voir produits**: GET `/api/products`
4. **Panier**: CartContext (local)
5. **Commander**: POST `/api/orders` (nécessite auth)
6. **Paiement**: POST `/api/payment/initiate` (PayTech)

### Flux Admin
1. **Login admin**: POST `/api/auth/admin-signin`
2. **Ajouter produit**: POST `/api/products`
3. **Modifier produit**: PUT `/api/products/:id`
4. **Supprimer produit**: DELETE `/api/products/:id`
5. **Voir commandes**: GET `/api/orders`
6. **Changer statut**: PUT `/api/orders/:id`

---

## ÉTAPE 4: Tests des Endpoints

### Test avec curl ou Postman

**Signup Client:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@test.com",
    "password": "password123",
    "fullName": "Test Client",
    "phone": "771234567"
  }'
```

**Admin Login:**
```bash
curl -X POST http://localhost:5000/api/auth/admin-signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ndiayeabdoumamesaye1234@gmail.com",
    "password": "abdou@2000"
  }'
```

**Créer Produit (admin):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Lacoste Premium",
    "price": 15000,
    "category": "Lacostes",
    "description": "Lacoste de qualité",
    "image": "https://..."
  }'
```

---

## ✅ Checklist Installation

- [ ] Backend node modules installés
- [ ] MongoDB Atlas configuré et connecté
- [ ] .env backend avec MongoDB URI
- [ ] Backend lancé sur port 5000
- [ ] Health check fonctionne (http://localhost:5000/api/health)
- [ ] Frontend node modules installés
- [ ] Client API créé (src/integrations/api/client.js)
- [ ] Frontend .env avec VITE_API_URL
- [ ] Frontend lancé sur port 8082
- [ ] Tests des endpoints avec curl/Postman
- [ ] Signup/Login client fonctionnent
- [ ] Admin login fonctionne
- [ ] Produits affichent depuis backend

---

## 🔗 Ressources

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Paytech: https://paytech.sn
- Postman: https://www.postman.com

---

**Backend et Frontend connectés** ✅
