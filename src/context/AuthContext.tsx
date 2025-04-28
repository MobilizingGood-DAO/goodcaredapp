import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAddress, useConnect, useDisconnect } from "@thirdweb-dev/react";
import { saveUserProfile, getUserByAddress } from "../services/userService";
import { UserProfile } from "../types";

interface AuthContextType {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (address) {
        try {
          const profile = getUserByAddress(address);
          if (profile) {
            setUserProfile(profile);
          } else {
            // Create a new profile for the connected wallet
            const mockTwitterHandle = `user_${Math.floor(Math.random() * 10000)}`;
            const mockProfileImage = `https://picsum.photos/200/200?random=${Math.random()}`;
            const newProfile = saveUserProfile(address, mockTwitterHandle, mockProfileImage);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError("Error fetching your profile. Please try again.");
        }
      } else {
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [address]);

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await connect();

      if (!address) {
        throw new Error("Wallet connection failed");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    disconnect();
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userProfile,
        userProfile,
        login,
        logout,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};