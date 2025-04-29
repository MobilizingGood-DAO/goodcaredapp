import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
  coinbaseWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GOOD_CARE_CHAIN } from './constants';
import { AuthProvider } from './context/AuthContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';

// Wallet Connect Button
import ConnectWalletButton from './components/Connectwalletbutton';

import { inAppWallet } from "thirdweb/wallets";
import { ConnectEmbed } from "thirdweb/react";

// Create a Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  if (!clientId) {
    console.error('VITE_THIRDWEB_CLIENT_ID environment variable is not set');
    return <div>Configuration Error: ThirdWeb Client ID not found</div>;
  }

  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={GOOD_CARE_CHAIN}
      supportedWallets={[
        embeddedWallet({
          auth: {
            options: ["X"],
            redirectUrl: currentOrigin,
            preferredAuth: 'X',
          },
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />

              {/* ✨ Insert Connect Wallet Button (global, always visible) */}
              <div className="container mx-auto mt-4">
                <ConnectWalletButton />
              </div>

              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default App;
