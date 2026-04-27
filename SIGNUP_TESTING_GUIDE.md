# 🔧 GUIDE DE TEST - Inscription (Signup)

## 🎯 Problème Rapporté

```
La page d'inscription ne marche pas.
Je veux que quand le client s'inscrit, 
il reçoive un message de succès et 
un compte soit créé.
```

---

## ✅ Corrections Appliquées

### 1️⃣ **Page Auth.jsx**
- ✅ Ajout de redirection après inscription (vers `/auth` puis `/`)
- ✅ Ajout de validation du formulaire
- ✅ Ajout de logs pour déboguer
- ✅ Messages toast améliorés

### 2️⃣ **Backend authController.js**
- ✅ Ajout de logs détaillés à chaque étape
- ✅ Meilleur gestion des erreurs
- ✅ Confirmation que le token et user sont bien retournés

### 3️⃣ **Test Script**
- ✅ Créé `test-signup.js` pour tester l'API directement

---

## 🚀 COMMENT TESTER (Étape par Étape)

### ÉTAPE 1: Vérifier que le Backend Fonctionne

```bash
# Terminal 1 - Démarrer le backend
cd backend
npm run dev

# Attendez de voir:
# ✅ MongoDB Connected
# 🚀 Server running on http://localhost:5000
```

### ÉTAPE 2: Tester l'API Directement

```bash
# Terminal 2 - Tester l'inscription via API
node test-signup.js

# Vous devez voir:
# ✅ SUCCÈS!
# 🔑 Token reçu: ...
# 👤 Utilisateur créé:
#   - ID: ...
#   - Email: ...
```

**Si c'est OK:** Le backend fonctionne ✅ Allez à ÉTAPE 3
**Si erreur:** Regardez la section "Dépannage Backend" ci-dessous

### ÉTAPE 3: Démarrer le Frontend

```bash
# Terminal 3 - Démarrer le frontend
npm run dev

# Attendez de voir:
# ✅ VITE v5.x.x ready
# 📍 Local: http://localhost:8081
```

### ÉTAPE 4: Tester l'Inscription via le Formulaire

1. **Allez à:** `http://localhost:8081/auth`

2. **Cliquez:** "S'inscrire" (si vous êtes en connexion)

3. **Remplissez le formulaire:**
   ```
   Nom complet: Abdou Khadre
   Téléphone: 78 947 23 34
   Email: test@gmail.com
   Mot de passe: Test@1234
   ```

4. **Cliquez:** Bouton "S'inscrire" (orange)

5. **Attendez 1-2 secondes**

---

## ✅ CE QUI DEVRAIT SE PASSER

### Avant Clic "S'inscrire":
- ✅ Tous les champs sont remplis
- ✅ Bouton est actif (pas grisé)

### Après Clic "S'inscrire":
- ✅ Bouton devient "Chargement..."
- ✅ Toast vert apparaît: "✅ Inscription réussie!"
- ✅ Après ~1 seconde, redirection vers l'accueil (`/`)
- ✅ Vous êtes auto-connecté (voir le menu avec votre email)

### Vérification dans la Console (F12):
```javascript
// Vous devez voir:
📝 Tentative inscription...
✅ Inscription réussie:
```

---

## 🔍 DÉPANNAGE

### ❌ Problème: "User already exists"

**Cause:** Un utilisateur avec cet email existe déjà

**Solution:** 
- Utilisez un email différent
- Ou supprimez l'utilisateur de la BD MongoDB

---

### ❌ Problème: "Erreur: Une erreur est survenue"

**Cause:** Problème de connexion au backend

**Vérifications:**
1. Backend tourne-t-il? Vérifiez Terminal 1
   ```bash
   cd backend && npm run dev
   ```

2. MongoDB est-il connecté?
   - Regardez dans Terminal 1 pour: `✅ MongoDB Connected`
   - Sinon, vérifiez `backend/.env` → `MONGODB_URI`

3. Testez l'API directement:
   ```bash
   node test-signup.js
   ```

---

### ❌ Problème: "Mot de passe requis" ou "Nom complet requis"

**Cause:** Le formulaire valide les champs vides

**Solution:** Remplissez tous les champs:
- Nom complet (requis)
- Téléphone (requis)
- Email (requis)
- Mot de passe (au moins 6 caractères)

---

### ❌ Problème: Pas de redirection après inscription

**Cause:** Peut-être que `navigate` n'est pas bien configuré

**Vérifications:**
1. Ouvrez DevTools (F12)
2. Onglet "Console"
3. Vous devez voir le log vert: `✅ Inscription réussie:`
4. Vérifiez qu'il n'y a pas d'erreur JavaScript en rouge

---

### ❌ Problème: "Cannot read property 'user' of undefined"

**Cause:** La réponse du backend n'a pas le champ `user`

**Solution:**
1. Vérifiez les logs backend (Terminal 1)
2. Testez avec le script: `node test-signup.js`
3. Regardez la réponse exacte

---

## 📊 FLUX COMPLET DE L'INSCRIPTION

```
CLIENT (Frontend)
└─ 1. Remplit le formulaire
└─ 2. Clique "S'inscrire"
└─ 3. Valide le formulaire (champs non-vides)
└─ 4. Appelle authApi.signup()
   └─ Envoie POST /auth/signup
      └─ Backend reçoit la requête
         └─ Vérifie email unique
         └─ Hash le mot de passe
         └─ Crée l'utilisateur en BD
         └─ Génère JWT token
         └─ Retourne { token, user }
      └─ Frontend reçoit la réponse
         └─ AuthContext sauvegarde token
         └─ AuthContext sauvegarde user
         └─ Affiche toast "Inscription réussie"
         └─ Navigate vers "/" (Accueil)
         └─ ✅ COMPLET!
```

---

## 🧪 ÉTAPES DE TEST DÉTAILLÉES

### Test 1: API Directement (Sans Frontend)
```bash
# Lancer: 
node test-signup.js

# Résultat attendu:
✅ SUCCÈS!
🔑 Token reçu: eyJh...
👤 Utilisateur créé:
  - ID: 123456789...
  - Email: test@gmail.com
  - Nom: Test User
  - Admin: false
```

### Test 2: Formulaire Frontend

**Cas A: Inscription Nouvelle**
```
1. http://localhost:8081/auth → Cliquez "S'inscrire"
2. Remplissez avec NEW_email@test.com
3. Cliquez "S'inscrire"
4. ✅ Doit afficher toast de succès
5. ✅ Doit rediriger vers /
6. ✅ Vous êtes connecté (voyez le menu avec votre email)
```

**Cas B: Email Existant**
```
1. Récrivez la même inscription (même email)
2. Cliquez "S'inscrire"
3. ✅ Doit afficher erreur: "User already exists" ou "Cet email existe déjà"
```

**Cas C: Données Invalides**
```
1. Laissez "Nom complet" vide
2. Cliquez "S'inscrire"
3. ✅ Doit afficher erreur avant d'envoyer: "Le nom complet est requis"
4. La requête n'est PAS envoyée au backend
```

---

## 🔐 VÉRIFICATION DE LA BD

Pour vérifier que l'utilisateur a bien été créé:

### Via MongoDB Atlas Web:
1. Allez à: https://cloud.mongodb.com
2. Connectez-vous
3. Ouvrez votre collection `users`
4. Cherchez l'email du nouvel utilisateur
5. Vérifiez:
   - ✅ email existe
   - ✅ password hashé (commence par `$2b$`)
   - ✅ fullName
   - ✅ phone
   - ✅ isAdmin: false

### Via CLI MongoDB:
```bash
# Se connecter à MongoDB
mongosh "mongodb+srv://..." --username ...

# Voir les users
use ecommerce
db.users.find({ email: "test@gmail.com" })

# Résultat attendu:
{
  "_id": ObjectId("..."),
  "email": "test@gmail.com",
  "password": "$2b$10...",  # Hashé
  "fullName": "Test User",
  "phone": "+221...",
  "isAdmin": false,
  "createdAt": ISODate("2026-04-09T...")
}
```

---

## 📱 VÉRIFICATION DU TOKEN

Pour vérifier que le token JWT fonctionne:

### Option 1: Vérifier dans LocalStorage
```javascript
// Dans DevTools Console:
localStorage.getItem('authToken')

// Vous devez voir un long string qui commence par: eyJ...
```

### Option 2: Décoder le JWT
```javascript
// Allez à: https://jwt.io
// Collez votre token
// Vous devez voir:
{
  "userId": "...",
  "email": "test@gmail.com",
  "isAdmin": false,
  "iat": 1712687430,
  "exp": 1712987430
}
```

---

## 📋 CHECKLIST FINALE

```
BACKEND
[ ] `npm run dev` démarre sans erreur
[ ] "✅ MongoDB Connected" visible
[ ] "🚀 Server running on http://localhost:5000" visible

API TEST
[ ] `node test-signup.js` marche
[ ] "✅ SUCCÈS!" affiché
[ ] Token et User reçus

FRONTEND
[ ] `npm run dev` démarre sans erreur
[ ] http://localhost:8081/auth s'ouvre

FORMULAIRE
[ ] Tous les inputs visibles
[ ] Bouton "S'inscrire" cliquable
[ ] Validation des champs fonctionne
[ ] Toasts s'affichent

INSCRIPTION
[ ] Remplissez et soumettez
[ ] Toast "✅ Inscription réussie!"
[ ] Redirection vers /
[ ] Vous êtes connecté
[ ] MongoMB: L'utilisateur existe

VÉRIFICATION
[ ] localStorage.getItem('authToken') retourne un token
[ ] Token valide sur jwt.io
[ ] Menu affiche votre email
```

---

## 🆘 BESOIN D'AIDE?

### Vérifier les Logs

**Terminal 1 (Backend):**
```
Cherchez:
📝 SIGNUP REQUEST: { email, fullName, phone, ... }
✅ Inscription réussie:
```

**DevTools Console (Frontend - F12):**
```
Cherchez:
📝 Tentative inscription...
✅ Inscription réussie:
```

### Contacter le Support

Si vous avez toujours des problèmes:
1. Vérifiez tous les checkboxes ci-dessus
2. Lancez `node test-signup.js` et montrez l'output
3. Montrez les logs du backend (Terminal 1)
4. Montrez la console du navigateur (F12)

---

## 🎉 SUCCÈS!

Si vous voyez tout en ✅ ci-dessus, votre inscription fonctionne! 🎊

L'utilisateur peut maintenant:
- ✅ S'inscrire avec un compte
- ✅ Se connecter
- ✅ Acheter des produits
- ✅ Passer des commandes

Bon shopping! 🛍️
