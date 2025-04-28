import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <ConnectWallet
        theme="light"
        modalSize="compact"
        auth={{
          loginOptional: false,
          onLogin: () => {
            window.location.reload();
          },
        }}
        modalTitle="Connect Your Wallet"
        className="!bg-blue-600 !text-white font-medium px-6 py-3 rounded-lg hover:!bg-blue-700 transition-all shadow-md"
      />
      
      <p className="mt-4 text-sm text-gray-600 max-w-md text-center">
        Connect your wallet to start your mental wellness journey and earn CARE points
      </p>
    </div>
  );
};

export default LoginButton;