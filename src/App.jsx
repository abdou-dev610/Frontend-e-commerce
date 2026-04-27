import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import ConfirmationCommande from "./pages/ConfirmationCommande";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="min-h-screen pt-12">
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  </TooltipProvider>
);

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/produits", element: <Products /> },
        { path: "/produit/:id", element: <ProductDetail /> },
        { path: "/contact", element: <Contact /> },
        { path: "/auth", element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/mon-compte", element: <MyAccount /> },
        { path: "/commandes", element: <MyOrders /> },
        { path: "/panier", element: <Cart /> },
        { path: "/paiement", element: <Payment /> },
        { path: "/payment-success", element: <PaymentSuccess /> },
        { path: "/confirmation-commande", element: <ConfirmationCommande /> },
        { path: "/admin", element: <AdminDashboard /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
