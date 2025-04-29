import React from "react";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectWalletButton from '..components/ConnectWalletButton';
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { isLoggedIn, userProfile } = useAuth();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse className="text-green-600" size={28} />
            <span className="text-xl font-bold text-green-800">GOOD CARE Network</span>
          </Link>
          
          <nav className="flex gap-6 items-center">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Leaderboard
            </Link>
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              About
            </Link>
            
            <ConnectWallet
              theme="light"
              modalSize="compact"
              modalTitle="Connect Your Wallet"
              auth={{
                loginOptional: false,
                onLogin: () => {
                  // Refresh the page after successful login
                  window.location.reload();
                },
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
