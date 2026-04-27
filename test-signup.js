#!/usr/bin/env node

/**
 * Test Script - Vérifier que l'inscription fonctionne
 * 
 * Usage:
 * node test-signup.js
 * 
 * Ou depuis le terminal du backend:
 * npm run test
 */

const API_URL = "http://localhost:5000/api";

// Données de test
const testUser = {
  email: `test${Date.now()}@example.com`,
  password: "Test@123",
  fullName: "Test User",
  phone: "+221771234567"
};

async function testSignup() {
  try {
    console.log("🧪 TEST D'INSCRIPTION");
    console.log("═══════════════════════════════════════");
    console.log("\n📝 Données d'inscription:");
    console.log(`  Email: ${testUser.email}`);
    console.log(`  Nom: ${testUser.fullName}`);
    console.log(`  Téléphone: ${testUser.phone}`);
    console.log(`  Mot de passe: ${testUser.password}`);

    console.log("\n🔄 Envoi requête POST /auth/signup...");

    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUser),
    });

    console.log(`\n📨 Statut réponse: ${response.status} ${response.statusText}`);

    const data = await response.json();
    console.log("\n📦 Réponse serveur:");
    console.log(JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("\n✅ SUCCÈS!");
      console.log(`\n🔑 Token reçu: ${data.token ? data.token.substring(0, 50) + "..." : "ABSENT"}`);
      console.log(`\n👤 Utilisateur créé:`);
      console.log(`  - ID: ${data.user?.id || data.user?._id || "ABSENT"}`);
      console.log(`  - Email: ${data.user?.email || "ABSENT"}`);
      console.log(`  - Nom: ${data.user?.fullName || "ABSENT"}`);
      console.log(`  - Admin: ${data.user?.isAdmin || "false"}`);
    } else {
      console.log("\n❌ ERREUR!");
      console.log(`\nMessage: ${data.message || "Pas de message"}`);
    }
  } catch (error) {
    console.error("\n🚨 ERREUR DE CONNEXION:");
    console.error(error.message);
    console.error("\n⚠️  Vérifiez que:");
    console.error("  1. Le backend tourne sur http://localhost:5000");
    console.error("  2. MongoDB est connecté");
    console.error("  3. Les variables d'environnement sont bien configurées");
  }
}

async function testHealth() {
  try {
    console.log("\n\n🏥 VÉRIFICATION SANTÉ DU BACKEND");
    console.log("═══════════════════════════════════════");

    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();

    if (response.ok) {
      console.log("✅ Backend est en ligne!");
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log("❌ Backend retourne une erreur");
    }
  } catch (error) {
    console.error("❌ Impossible de connecter au backend");
    console.error(`   ${error.message}`);
  }
}

// Exécuter les tests
(async () => {
  await testHealth();
  await testSignup();
})();
