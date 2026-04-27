# 🔐 Guide d'Accès au Tableau de Bord Admin

## 🎯 Objectif
Accéder à la page admin pour gérer les commandes et les paiements: http://localhost:8081/admin

---

## 📋 Prérequis
- Backend en route: `cd backend && npm run dev` (✅ doit afficher "Server running")
- Frontend en route: `npm run dev` (✅ doit afficher "VITE ready")
- MongoDB connecté: ✅ "MongoDB Connected"

---

## ✅ Option 1: Créer un Compte Admin (Recommandé)

### Étape 1️⃣ - Lancer le Script Setup Admin

```bash
# Terminal backend (depuis le dossier backend)
node setup-admin.js
```

### Output attendu:
```
✅ Connecté à MongoDB
✅ Compte admin créé avec succès!

📊 Détails du Compte:
═══════════════════════════════════════
📧 Email:      admin@example.com
🔐 Mot de passe: Admin@123
👑 Is Admin:   true
═══════════════════════════════════════

✨ Vous pouvez maintenant:
1️⃣  Allez à http://localhost:8081/auth
2️⃣  Connectez-vous avec admin@example.com
3️⃣  Accédez à http://localhost:8081/admin
```

### Étape 2️⃣ - Se Connecter

1. Ouvrez http://localhost:8081/auth
2. Cliquez sur l'onglet **"Se connecter"**
3. Entrez:
   - **Email:** admin@example.com
   - **Mot de passe:** Admin@123
4. Cliquez **"Se connecter"**

### Étape 3️⃣ - Accéder à l'Admin

1. Une fois connecté, allez à: http://localhost:8081/admin
2. 🎉 Vous devez voir le **Tableau de Bord Admin**

---

## 🆘 Option 2: Transformer un Compte Existant en Admin

### Si vous avez un compte utilisateur créé:

1. **Connectez-vous à MongoDB Atlas**
   - Allez sur https://cloud.mongodb.com
   - Accédez à votre cluster

2. **Trouvez la collection "users"**
   - Cherchez votre document utilisateur par email

3. **Modifiez le champ `isAdmin`:**
   ```javascript
   {
     email: "votreamil@example.com",
     password: "...",
     fullName: "Votre Nom",
     isAdmin: false  // ← Changez à true
   }
   ```

4. **Sauvegardez les modifications**

5. **Déconnectez-connectez vous** (F5 pour rafraîchir)

6. **Allez à** http://localhost:8081/admin

---

## ❌ Dépannage

### "Accès refusé - Vous n'avez pas les droits d'administration"

**Causes possibles:**
1. ❌ Vous n'êtes pas connecté
   - **Solution:** Connectez-vous d'abord à http://localhost:8081/auth

2. ❌ Votre compte n'a pas `isAdmin: true`
   - **Solution:** Lancez `node setup-admin.js` ou modifiez MongoDB

3. ❌ Le token n'a pas été mis à jour
   - **Solution:** Videz le cache (Ctrl+Shift+Delete) et reconnectez-vous

### "Page non trouvée" (404)

- **Vérifiez:** http://localhost:8081/admin (pas https!)
- **Backend doit tourner:** `cd backend && npm run dev`
- **Frontend doit tourner:** `npm run dev`

### "Impossible de charger les commandes"

- **Backend n'est pas connecté à MongoDB**
- **Solution:** 
  ```bash
  cd backend
  npm run dev
  # Attendez: ✅ MongoDB Connected
  ```

---

## 📊 Fonctionnalités du Tableau Admin

Une fois connecté, vous pouvez:

✅ **Voir toutes les commandes**
✅ **Filtrer par statut de paiement** (En attente / Confirmé)
✅ **Mettre à jour le statut de paiement** (⏳ → ✅)
✅ **Mettre à jour le statut de commande** (📦 → 🚚)
✅ **Voir les détails du client** (Nom, Email, Téléphone)
✅ **Voir les montants des commandes**

---

## 🔄 Workflow Admin Complet

```
1. Client achète → Crée une commande
2. Client paye sur PayTech
3. PayTech notifie → Crée l'ordre en BD
4. Admin reçoit WhatsApp notification
5. Admin va à /admin
6. Admin change "En attente" → "Confirmé" ✅
7. Système vérifie le paiement
8. Commande est préparée
9. Admin change "Créée" → "Livrée" 🚚
10. Client reçoit la commande
```

---

## 🎯 Commandes Utiles

### Vérifier l'accès admin en terminal:

```bash
# Vérifie si admin@example.com existe avec isAdmin: true
# Depuis mongosh:
use chic-senegal-db
db.users.findOne({email: "admin@example.com"})
# Résultat attendu: { isAdmin: true }
```

### Réinitialiser l'admin:

```bash
# Terminal backend
node setup-admin.js
# Recrée/met à jour le compte admin
```

---

## ✨ À Retenir

| Élément | Valeur |
|---------|--------|
| **URL Admin** | http://localhost:8081/admin |
| **Email Admin** | admin@example.com |
| **Password Admin** | Admin@123 |
| **Création Admin** | `node setup-admin.js` |
| **Base de Données** | MongoDB Atlas |
| **Collection** | users |
| **Champ Requis** | isAdmin: true |

---

## 🚀 Prochaines Étapes

Une fois l'admin accessible:

1. ✅ Testez avec une commande de test
2. ✅ Vérifiez les statuts de paiement
3. ✅ Essayez de mettre à jour un statut
4. ✅ Recevez les notifications WhatsApp

---

**Status:** ✅ Admin accessible
**Date:** April 9, 2026
**Version:** 1.0
