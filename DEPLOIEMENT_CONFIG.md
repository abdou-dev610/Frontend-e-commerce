# Configuration Déploiement - Résumé

## ✅ Modifications effectuées

### 1. Fichier `.env` (racine du projet)
- **Local** : `VITE_API_URL=http://localhost:5000/api`
- **Production** : `VITE_API_URL=https://backend-e-commerce1.onrender.com/api`

### 2. Fichier `src/integrations/api/client.js`
- Utilise automatiquement la variable d'environnement `VITE_API_URL`

### 3. Fichier `backend/server.js`
- CORS configuré pour accepter :
  - `http://localhost:5173` (Vite dev)
  - `http://localhost:3000` (autre)
  - `https://*.vercel.app` (production Vercel)
  - `https://*.vercel.com`

### 4. Fichier `backend/.env`
- Ajouté : `BACKEND_URL=https://backend-e-commerce1.onrender.com`

### 5. Fichier `vercel.json` créé
- Configure Vercel pour utiliser Vite

---

## 🚀 Déploiement Frontend sur Vercel

### Étape 1 : Variables d'environnement sur Vercel
Dans **Vercel Dashboard > Project Settings > Environment Variables** :

| Nom | Valeur |
|-----|--------|
| `VITE_API_URL` | `https://backend-e-commerce1.onrender.com/api` |

### Étape 2 : Connecter le dépôt Git
1. Connecter votre dépôt GitHub à Vercel
2. Framework Preset : **Vite**
3. Build Command : `npm run build`
4. Output Directory : `dist`

### Étape 3 : Déployer
- Cliquer sur **Deploy**

---

## 🔧 Utilisation

### Développement local (localhost)
```bash
npm run dev
```
→ Le frontend utilise `http://localhost:5000/api`

### Production (Vercel)
- Le frontend utilise `https://backend-e-commerce1.onrender.com/api`

---

## ⚠️ Important

Le backend Render doit être en cours d'exécution pour que le frontend Vercel fonctionne. Assurez-vous que :
1. Le backend sur Render est déployé et actif
2. Les variables d'environnement sont configurées sur Render