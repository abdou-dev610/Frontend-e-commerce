# 📧 GUIDE CONFIG EMAIL - Chic Senegal Style

## ✅ Configuration Complète (SOLUTION FINALE)

### Step 1: Vérifier le fichier `.env` du backend

Assurez-vous que votre fichier `backend/.env` contient:

```env
# Email Configuration (Nodemailer + Gmail)
GMAIL_USER=ndiayeabdoumamesaye1234@gmail.com
GMAIL_APP_PASSWORD=gdmh wpka vsmm yzwn
```

**⚠️ IMPORTANT: L'App Password DOIT être utilisé (pas le mot de passe Gmail ordinaire)**

---

### Step 2: Générer une App Password Gmail (si nécessaire)

Si vous n'avez pas d'App Password:

1. Allez à [Google Account Security](https://myaccount.google.com/security)
2. Activez "2-Step Verification" si ce n'est pas fait
3. Allez à "App passwords"
4. Sélectionnez "Mail" et "Windows Computer"
5. Copiez le mot de passe généré (16 caractères)
6. Remplacez-le dans le `.env`

---

### Step 3: Tester la Configuration

Dans le dossier backend, créez un fichier `test-email.js`:

```javascript
import { testEmailConnection, sendWelcomeEmail, sendCustomerConfirmationEmail, sendAdminNotificationEmail } from './services/emailService.js';

async function runTests() {
  try {
    console.log('🧪 Test 1: Connexion Email');
    const test1 = await testEmailConnection();
    console.log('Résultat:', test1);

    console.log('\n🧪 Test 2: Email de Bienvenue');
    const test2 = await sendWelcomeEmail({
      email: 'ndiayeabdoumamesaye1234@gmail.com',
      fullName: 'Abdou Test'
    });
    console.log('Résultat:', test2);

    console.log('\n🧪 Test 3: Email de Confirmation de Paiement (Client)');
    const test3 = await sendCustomerConfirmationEmail({
      orderNumber: 'CMD-TEST001',
      customerName: 'Abdou Test',
      customerEmail: 'ndiayeabdoumamesaye1234@gmail.com',
      customerPhone: '76 204 81 19',
      totalAmount: 175000,
      items: [
        { name: 'Robe Abaya Traditionnelle', quantity: 1, price: 175000 }
      ],
      transactionId: 'TEST-TXN-001',
      paymentMethod: 'PayTech'
    });
    console.log('Résultat:', test3);

    console.log('\n🧪 Test 4: Email de Notification Admin');
    const test4 = await sendAdminNotificationEmail({
      orderNumber: 'CMD-TEST001',
      customerName: 'Abdou Test',
      customerEmail: 'ndiayeabdoumamesaye1234@gmail.com',
      customerPhone: '76 204 81 19',
      totalAmount: 175000,
      items: [
        { name: 'Robe Abaya Traditionnelle', quantity: 1, price: 175000 }
      ],
      transactionId: 'TEST-TXN-001'
    });
    console.log('Résultat:', test4);

    console.log('\n✅ TOUS LES TESTS SONT TERMINÉS!');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

runTests();
```

**Exécutez dann le backend/:**
```bash
node test-email.js
```

---

### Step 4: Où les Emails sont Envoyés

#### 📧 **Email de Bienvenue (Inscription)**
- **Quand:** Après la création d'un compte avec signup
- **Qui reçoit:** Le client (email d'inscription)
- **Contenu:** Message de bienvenue + lien vers produits

#### 💳 **Email de Confirmation (Paiement)**
- **Quand:** Après un paiement réussi
- **Qui reçoit:** Le client (email de commande)
- **Contenu:** Détails de la commande, numéro de commande, total

#### 📢 **Email de Notification Admin**
- **Quand:** Après un paiement réussi
- **Qui reçoit:** L'admin (ndiayeabdoumamesaye1234@gmail.com)
- **Contenu:** Infos client + items + lien dashboard

---

### Step 5: Vérifier les Logs Console

Vous verrez dans le terminal:
```
📧 Envoi email de confirmation au client...
✅ Email client envoyé avec succès: <message-id>
📧 Envoi de la notification à l'administrateur...
✅ Email admin envoyé avec succès: <message-id>
```

---

### ⚠️ Si les Emails ne s'Affichent Pas

**Vérifiez:**

1. ✅ Vérifier le dossier SPAM/Promotions dans Gmail
2. ✅ Vérifier que l'App Password est correct (pas de paramètres injectés)
3. ✅ Vérifier que GMAIL_USER est le bon email
4. ✅ Vérifier que la double authentification est activée sur Gmail
5. ✅ Redémarrer le serveur: `npm run dev` dans le backend

---

### 📝 Fichiers Modifiés

- ✅ `backend/services/emailService.js` - Nouveau service email
- ✅ `backend/controllers/paymentController.js` - Webhooks avec emails
- ✅ `backend/controllers/authController.js` - Email de bienvenue au signup
- ✅ `backend/.env` - Configuration Gmail corrigée

---

### 🎯 Résumé

L'ancien système **EmailJS** était cassé car les IDs étaient invalides.
La nouvelle solution utilise **Nodemailer avec Gmail** qui est:
- ✅ Plus fiable
- ✅ Plus simple à configurer
- ✅ Envoie aux DEUX (client + admin)
- ✅ Emails professionnels avec HTML formaté

**Redémarrez le backend et testez une nouvelle inscription/paiement!** 🚀
