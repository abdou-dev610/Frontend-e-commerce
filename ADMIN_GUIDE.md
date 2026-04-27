# 📊 Guide Admin - Gestion des Commandes

## 🔑 Accès au Panneau Admin

1. **Se connecter en tant qu'ADMIN**
   - Email admin: `admin@example.com` (ou votre compte admin)
   - Accès: `http://localhost:8081/admin`

2. **Le tableau de bord affiche:**
   - ✅ Toutes les commandes des clients
   - ✅ Statut du paiement (⏳ En attente / ✅ Confirmé)
   - ✅ Statut de la commande (📦 / ✓ / 🚚 / ❌)
   - ✅ Montant de chaque commande
   - ✅ Détails client (nom, email, téléphone)

---

## 📱 Flux de Notification

### Quand un client paie:

1. **Client complète la commande**
   - ✅ Commande créée dans la BD
   - ✅ Numéro automatique: `CMD-20260409-12345`

2. **Admin reçoit une notification WhatsApp**
   - Message avec:
     - Numéro de commande
     - Liste des articles
     - Montant total
     - État: ⏳ En attente de confirmation

3. **Admin va au tableau de bord**
   - URL: `/admin`
   - Clique: ⚙️ **Gérer** sur la commande

4. **Admin change les statuts:**
   - 💳 **Paiement:** 
     - ⏳ En attente de paiement
     - ✅ Paiement confirmé
   - 📦 **Commande:**
     - 📦 Commande créée
     - ✓ Confirmé
     - 🚚 Livré
     - ❌ Annulé

---

## ⚙️ Statuts Possibles

| Paiement | Sens |
|----------|------|
| ⏳ En attente | Client a créé la commande, pas encore payé |
| ✅ Confirmé | Admin a validé le paiement |

| Commande | Sens |
|----------|------|
| 📦 Créée | Juste arrivée |
| ✓ Confirmé | Prêt à être livré |
| 🚚 Livré | Remis au client |
| ❌ Annulé | Sauf en cas de refus |

---

## 📋 Filtres

Le tableau de bord offre **3 vues:**

1. **📋 Toutes les commandes** - Veut dire toutes
2. **⏳ En attente de paiement** - Celles non confirmées
3. **✅ Paiements confirmés** - Celles déjà validées

---

## 🎯 Processus Recommandé

1. **Reçevez WhatsApp** → Admin notifié automatiquement
2. **Allez à `/admin`** → Voir la commande
3. **Vérifiez les détails** → Client, montant, articles
4. **Validez le paiement** → Clique ✅ "Paiement confirmé"
5. **Changez le statut commande** → 📦 → ✓ → 🚚
6. **Livrez le produit** → Marquez comme 🚚 "Livré"

---

## 🔐 Sécurité

- ✅ Seuls les **ADMINS** peuvent accéder à `/admin`
- ✅ Les clients **ne voient pas** le panneau admin
- ✅ Chaque modification est **sauvegardée en BD**
- ✅ **WhatsApp reste l'unique pont** de notification

---

## 💡 Exemple Workflow

```
Client ajoute produit au panier
         ↓
Client va à /paiement
         ↓
Client sélectionne methode paiement (Wave/Orange/WhatsApp)
         ↓
Commande créée: CMD-20260409-43796
         ↓
Admin reçoit WhatsApp 📬
         ↓
Admin va à /admin
         ↓
Admin clique: ⚙️ Gérer
         ↓
Admin marque: ✅ Paiement confirmé
         ↓
Admin marque: 🚚 Livré
         ↓
Fin! Commande complète ✓
```

---

## ❓ FAQ

**Q: Comment l'admin est créé?**
A: Lors de l'inscription, le compte doit avoir `isAdmin: true` à la BD (voir config backend)

**Q: Les clients reçoivent un SMS?**
A: Non (optionnel), ils reçoivent le numéro de commande sur la page de succès

**Q: Que se passe si j'annule une commande?**  
A: Elle reste en BD mais marquée ❌ "Annulé" = pas de confusion

**Q: Puis-je voir les anciennes commandes?**
A: Oui, elles restent en BD. Le filtre "_En attente_" montre que celles non validées

---

🚀 **Le système est maintenant complet et prêt pour la production!**
