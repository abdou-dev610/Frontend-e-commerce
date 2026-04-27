// API Client - Wrapper pour les appels au backend

// Utilise localhost en développement local, Render en production
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// 🔐 TOKEN MANAGEMENT
export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};

// 🔥 CORE API CALL
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // ✅ propre
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 🔥 Gestion réponse vide (IMPORTANT)
    let data;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    // 🔥 Gestion erreurs améliorée
    if (!response.ok) {
      console.error("❌ API ERROR:", {
        status: response.status,
        data,
      });

      throw new Error(
        data.message || `Erreur serveur (${response.status})`
      );
    }

    console.log("✅ API SUCCESS:", endpoint, data);

    return data;
  } catch (error) {
    console.error("🚨 FETCH ERROR:", error.message);
    throw error;
  }
};

// ================= AUTH =================
export const authApi = {
  signup: (email, password, fullName, phone) =>
    apiCall("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName, phone }),
    }),

  signin: async (email, password) => {
    const data = await apiCall("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // ✅ Sauvegarde automatique token
    if (data.token) {
      setToken(data.token);
    }

    return data;
  },

  adminSignin: async (email, password) => {
    const data = await apiCall("/auth/admin-signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      setToken(data.token);
    }

    return data;
  },

  verifyToken: () => apiCall("/auth/verify"),
};

// ================= PRODUCTS =================
export const productsApi = {
  getAll: (category) => {
    const params =
      category && category !== "Tous" ? `?category=${category}` : "";
    return apiCall(`/products${params}`);
  },

  getById: (id) => apiCall(`/products/${id}`),

  create: (productData) =>
    apiCall("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    }),

  update: (id, productData) =>
    apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    }),

  delete: (id) =>
    apiCall(`/products/${id}`, {
      method: "DELETE",
    }),

  getCategories: () => apiCall("/products/categories"),
};

// ================= ORDERS =================
export const ordersApi = {
  create: (orderData) => {
    console.log("📦 Creating order:", orderData); // 🔥 debug
    return apiCall("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  getAll: () => apiCall("/orders"),

  getById: (id) => apiCall(`/orders/${id}`),

  updateStatus: (id, orderData) =>
    apiCall(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    }),

  confirmPayment: (id, transactionId) => {
    console.log("💳 Confirming payment for order:", id); // 🔥 debug
    return apiCall(`/orders/${id}/confirm-payment`, {
      method: "POST",
      body: JSON.stringify({ transactionId }),
    });
  },

  cancel: (id) =>
    apiCall(`/orders/${id}/cancel`, {
      method: "POST",
    }),
};

// ================= PAYMENT =================
export const paymentApi = {
  initiate: (paymentData) => {
    console.log("💳 Payment init:", paymentData); // 🔥 debug
    return apiCall("/payment/initiate", {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  },

  checkStatus: (orderId) =>
    apiCall("/payment/check-status", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    }),
};

export default apiCall;