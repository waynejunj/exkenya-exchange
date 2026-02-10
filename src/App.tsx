import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WalletProvider, useWallet } from "./contexts/WalletContext";
import { AppLayout } from "./components/AppLayout";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import ExchangePage from "./pages/ExchangePage";
import DerivPage from "./pages/DerivPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWallet();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useWallet();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
      <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/deriv" element={<DerivPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WalletProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
