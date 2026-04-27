# ✅ Checklist de Vérification - Système Complet

## 🔧 Avant de Tester

1. **Backend en cours d'exécution**
   ```bash
   cd backend
   npm run dev   # ou nodemon index.js
   ```
   ✓ Doit afficher: `Server running on port 5000`

2. **Frontend en cours d'exécution**
   ```bash
   npm run dev
   # ou
   bun run dev
   ```
   ✓ Doit afficher: `VITE v5.x.x  ready in x ms` et `Local: http://localhost:8081`

3. **MongoDB connecté**
   ✓ Dans les logs backend, cherchez: `Connected to MongoDB`

---

## 🧪 Phase 1: Setup Complet

- [ ] **Backend démarre sans erreur**
  ```
  Cherchez: "Server running on port 5000"
  ET       "Connected to MongoDB"
  ```

- [ ] **Frontend démarre sans erreur**
  ```
  Cherchez: "✓ Local: http://localhost:8081"
  ```

- [ ] **Aucune erreur de compilation**
  ```
  Pas de messages "ERROR" en rouge dans VS Code
  ```

---

## 👤 Phase 2: Comptes Admin + User

### 2A: Créer un Compte ADMIN

1. Allez à `http://localhost:8081/auth`
2. **Inscrivez-vous avec:**
   - Email: `admin@example.com`
   - Motdepasse: `Admin@123`
   - Confirmez le mot de passe
3. Attendez le message "✓ Inscription réussie"
4. **IMPORTANT:** Allez à MongoDB Compass / Atlas
   - DB: `ecommerce` → Collection: `users`
   - Trouvez l'utilisateur `admin@example.com`
   - Changez `isAdmin: false` → `isAdmin: true`
   - SAUVEGARDEZ

✓ Vous avez maintenant un admin!

### 2B: Créer un Compte CLIENT

1. Allez à `http://localhost:8081/auth`
2. **Inscrivez-vous avec:**
   - Email: `client@example.com`
   - Motdepasse: `Client@123`
3. Attendez le message "✓ Inscription réussie"

✓ Vous avez maintenant un client normal!

---

## 🛍️ Phase 3: Flux Client Normal

### 3A: Ajouter des Produits au Panier

1. **Connectez-vous comme CLIENT** (`client@example.com`)
2. Allez à `http://localhost:8081/produits`
3. Cliquez sur **"Billé traditionnel"** (ou n'importe quel produit)
4. Cliquez: **"Ajouter au panier"**
5. Vérifiez:
   - [ ] Le produit s'ajoute (aucune erreur en console)
   - [ ] Badge du panier montre "1" ✓
   - [ ] Vous êtes renvoyé à la page produits

6. **Ajoutez un 2ème produit:**
   - Cliquez sur **"Dashiki coloré"**
   - Cliquez: **"Ajouter au panier"**
   - Badge panier montre "2" ✓

### 3B: Aller au Panier

1. Cliquez sur l'**icône Panier** (en haut)
2. Vérifiez:
   - [ ] Les 2 produits s'affichent
   - [ ] Montants et quantités corrects
   - [ ] Bouton **"Passer la commande"**

3. Cliquez: **"Passer la commande"**

### 3C: Page de Commande

1. Remplissez le formulaire:
   - Nom: `Fatou Diallo`
   - Email: `fatou@example.com` (peut être différent)
   - Téléphone: `221772345678`
   - Adresse: `Route de Fann, Dakar`

2. Cliquez: **"Confirmer la commande"**
3. Attendez que la commande soit créée
4. Vérifiez:
   - [ ] Vous voyez un **message de succès**
   - [ ] Un numéro de commande: `CMD-YYYYMMDD-XXXXX` ✓
   - [ ] Quelques secondes après → **Redirigé à `/paiement`**

### 3D: Page de Paiement

1. **Vous voyez:**
   - [ ] Résumé de la commande
   - [ ] Montant total
   - [ ] 3 méthodes de paiement (Wave, Orange Money, WhatsApp)

2. **Sélectionnez:** `Orange Money` (ou n'importe laquelle)

3. **Cliquez:** `Procéder au paiement`

4. **Vous êtes redirigé à:** `http://localhost:8081/payment-success?...`

---

## ✅ Phase 4: Page de Succès de Paiement

### 4A: Vérifier le Affichage

Vous devez voir:
- [ ] ✅ Grande icône de succès (animée qui bounce)
- [ ] "Commande réussie!"
- [ ] Numéro de commande: `CMD-...`
- [ ] Montant payé: ex. `50,000 CFA`
- [ ] Liste des articles avec quantités
- [ ] Texte: "Votre commande a été reçue. L'admin vous contactera bientôt via WhatsAppensuite"

### 4B: Notification Admin (WhatsApp)

✓ **C'est ici que l'admin devrait recevoir une notification WhatsApp à:**
   - Numéro: `+ 221 762 048 119` (ou votre numéro admin)
   - **CONTENU:**
     ```
     🎉 Nouvelle commande reçue!
     
     📦 Commande: CMD-20260409-12345
     💳 Transaction: MOCK-1712687430125
     
     📋 Articles:
     - Billé traditionnel (1x) = 15,000 CFA
     - Dashiki coloré (1x) = 35,000 CFA
     
     💰 Total: 50,000 CFA
     ⏳ Statut: En attente de confirmation
     
     👉 Allez à l'admin: http://localhost:8081/admin
     ```

✓ **SI VOUS N'AVEZ PAS REÇU WHATSAPP YET:**
- [ ] Attendez 2-3 secondes
- [ ] Vérifiez que WhatsApp est ouvert
- [ ] Cherchez les "Chats 24h: Admin"

### 4C: Compter à Rebours

- [ ] Vous voyez un **compteur:** "Redirection automatique dans 5..."
- [ ] Compte à rebours: 5 → 4 → 3 → 2 → 1 → 0

### 4D: Panier Vidé

- [ ] Après le compte à rebours, le **panier se vide**
- [ ] Badge du panier → "0" (ou disparu)

---

## 🔐 Phase 5: Authentification Admin

### 5A: Déconnectez le Client

1. Cliquez: **Hamburger Menu** (haut à droite)
2. Cliquez: **Déconnexion**
3. Vous êtes renvoyé à `/`

### 5B: Connectez-vous en tant qu'Admin

1. Allez à: `http://localhost:8081/auth`
2. **Connectez-vous avec:**
   - Email: `admin@example.com`
   - Motdépasse: `Admin@123`
3. Cliquez: **Connexion**
4. Attendez quelques secondes
5. Vérifiez:
   - [ ] Vous êtes redirigé au home
   - [ ] **Apparition d'un nouveau menu:** "📊 Admin"

---

## 📊 Phase 6: Tableau de Bord Admin

### 6A: Accès au Dashboard

1. **Cliquez:** `📊 Admin` (dans le menu)
   OU
   Allez directement à: `http://localhost:8081/admin`

2. **Le tableau de bord affiche:**
   - [ ] Titre: "Gestion des Commandes"
   - [ ] **Table avec colonnes:**
     - Numéro de commande (CMD-...)
     - Client (Fatou Diallo)
     - Email
     - Téléphone
     - Montant (50,000 CFA)
     - Statut paiement (⏳ En attente)
     - Statut commande (📦 Créée)
     - Bouton ⚙️ Gérer

### 6B: Filtrer les Commandes

1. **Vous voyez 3 boutons de filtre:**
   ```
   [📋 Toutes]  [⏳ En attente de paiement]  [✅ Paiements confirmés]
   ```

2. Cliquez: **`📋 Toutes`** → Affiche TOUTES les commandes
3. Cliquez: **`⏳ En attente de paiement`** → Affiche seulement celles en attente
4. Cliquez: **`✅ Paiements confirmés`** → Affiche celles confirmées

✓ Vérifiez que les filtres changent le contenu du tableau

### 6C: Gérer la Commande

1. **Sur la commande que vous avez créée** (CMD-...)
2. Cliquez: **`⚙️ Gérer`**

3. **Une fenêtre modale s'ouvre avec:**
   - [ ] Numéro de commande
   - [ ] Client et email
   - [ ] Montant total
   - [ ] **Section "💳 Paiement:"**
     - Boutons: `⏳ En attente` | `✅ Confirmé`
   - [ ] **Section "📦 Commande:"**
     - Boutons: `📦 Créée` | `✓ Confirmée` | `🚚 Livrée` | `❌ Annulée`

### 6D: Changer le Statut de Paiement

1. **En attente:** Cliquez sur: `✅ Confirmé`
2. Vérifiez:
   - [ ] La modale **se ferme**
   - [ ] La table **se met à jour en temps réel**
   - [ ] Statut paiement change: `⏳ En attente` → `✅ Confirmé` ✓
   - [ ] La ligne de couleur change (jaune → vert)

✓ **API CALL EN ARRIÈRE PLAN:**
```
PUT http://localhost:5000/api/orders/[ID]
Payload: { paymentStatus: "completed" }
Response: { ... paymentStatus: "completed" ... }
```

### 6E: Changer le Statut de Commande

1. Cliquez de nouveau: **⚙️ Gérer**
2. **Section "📦 Commande:"**
3. Cliquez: **`✓ Confirmée`**
4. Vérifiez:
   - [ ] Modale se ferme
   - [ ] Tableau mis à jour
   - [ ] Statut commande change: `📦 Créée` → `✓ Confirmée` ✓

5. Cliquez de nouveau: **⚙️ Gérer**
6. **Section "📦 Commande:"**
7. Cliquez: **`🚚 Livrée`**
8. Vérifiez:
   - [ ] Statut commande change: `✓ Confirmée` → `🚚 Livrée` ✓

✓ La commande est maintenant complète!

---

##🔐 Phase 7: Tests de Sécurité

### 7A: Client NE PEUT PAS accéder à `/admin`

1. **Déconnectez-vous** de l'admin
2. **Connectez-vous** avec le compte client (`client@example.com`)
3. Essayez d'accéder: `http://localhost:8081/admin`
4. Vérifiez:
   - [ ] Message: **"Accès refusé - Vous n'avez pas les permissions d'admin"**
   - [ ] Redirigé au home

✓ **Sécurité OK!**

### 7B: Utilisateur Non Connecté NE PEUT PAS accéder à `/admin`

1. **Déconnectez-vous** complètement
2. Essayez d'accéder: `http://localhost:8081/admin`
3. Vérifiez:
   - [ ] Redirigé à `/auth` (page de connexion)

✓ **Sécurité OK!**

---

## 📱 Phase 8: Workflow Complet (Simulation)

### Résumé du Flux Complet

```
1️⃣ CLIENT se connecte
   ↓
2️⃣ CLIENT ajoute produits au panier
   ↓
3️⃣ CLIENT passe la commande (CMD-...)
   ↓
4️⃣ CLIENT va à /paiement
   ↓
5️⃣ CLIENT clique "Procéder au paiement"
   ↓
6️⃣ REDIRECT → /payment-success
   ↓
7️⃣ ✅ ADMIN REÇOIT WHATSAPP
   ↓
8️⃣ ADMIN va à /admin
   ↓
9️⃣ ADMIN voit la commande en "⏳ En attente"
   ↓
🔟 ADMIN clique ⚙️ Gérer
   ↓
1️⃣1️⃣ ADMIN change: ✅ Paiement Confirmé
   ↓
1️⃣2️⃣ ADMIN change: 🚚 Livrée
   ↓
✅ WORKFLOW TERMINÉ!
```

---

## 🚨 Dépannage

### Problème: Impossible d'accéder à `/admin`
**Solutions:**
- [ ] Vérifiez que vous êtes connecté en tant qu'admin
- [ ] Vérifiez que `isAdmin: true` dans MongoDB
- [ ] Redémarrez le frontend: Ctrl+C puis `npm run dev`

### Problème: La table admin est vide
**Solutions:**
- [ ] Créez une nouvelle commande (Phase 3)
- [ ] Vérifiez dans MongoDB que les commandes existent: `db.orders.find()`
- [ ] Vérifiez dans les logs du backend: pas d'erreur "Get Orders Error"

### Problème: Les changements de statut ne marchent pas
**Solutions:**
- [ ] Ouvrez DevTools (F12) → Network
- [ ] Essayez de changer un statut
- [ ] Cherchez la requête `PUT /orders/[ID]`
- [ ] Si elle est en **RED** (erreur), vérifiez le backend
- [ ] Si elle est en **GREEN** mais ne met pas à jour, rafraîchissez la page (F5)

### Problème: Pas de notification WhatsApp
**Solutions:**
- [ ] Le numéro doit être: `+ 221 762 048 119`
- [ ] Ouvrez WhatsApp web: https://web.whatsapp.com
- [ ] Vérifiez que le navigateur a accès à WhatsApp
- [ ] Vérifiez que le numéro a WhatsApp (pas juste un téléphone classique)
- [ ] Vérifiez les logs frontend: cherchez "WhatsApp message"

---

## ✨ Résumé Final

Si **TOUS les ✓** sont cochés:

✅ **Backend:** Fonctionne correctement
✅ **Frontend:** Fonctionne correctement
✅ **Auth:** Admin + Client OK
✅ **Cart:** Fonctionne
✅ **Orders:** Création OK
✅ **Payment Success:** Affichage OK
✅ **Admin Dashboard:** Gestion des statuts OK
✅ **Sécurité:** Accès restreint OK
✅ **WhatsApp:** Notifications OK

## 🎉 **SYSTÈME COMPLET PRÊT POUR PRODUCTION!**
