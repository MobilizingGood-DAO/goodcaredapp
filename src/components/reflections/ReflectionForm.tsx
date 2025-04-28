import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { mintReflection } from "../../services/web3Service";
import { saveReflection } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useAddress } from "@thirdweb-dev/react";

interface ReflectionFormProps {
  onSuccess?: () => void;
  className?: string;
}

const ReflectionForm: React.FC<ReflectionFormProps> = ({ 
  onSuccess, 
  className = "" 
}) => {
  const { userProfile } = useAuth();
  const address = useAddress();
  const [reflection, setReflection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characterCount, setCharacterCount] = useState(0);
  
  const MAX_CHARS = 280; // Twitter-like character limit
  
  if (!address) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-green-800 mb-4">Daily Reflection</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">Please connect your wallet to start reflecting 🌱</p>
        </div>
      </div>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setReflection(text);
      setCharacterCount(text.length);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userProfile) {
      setError("You must be logged in to mint a reflection");
      return;
    }
    
    if (!reflection.trim()) {
      setError("Please enter your reflection");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Mint the reflection as an NFT
      const tx = await mintReflection(
        userProfile.address,
        reflection,
        userProfile.twitterHandle
      );
      
      // Save reflection to our database
      saveReflection({
        id: tx.id.toString(),
        content: reflection,
        timestamp: Date.now(),
        owner: userProfile.address,
        twitterHandle: userProfile.twitterHandle
      });
      
      // Reset form
      setReflection("");
      setCharacterCount(0);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (err) {
      console.error("Error minting reflection:", err);
      setError("Failed to mint reflection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Daily Reflection</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="reflection" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            What's on your mind today?
          </label>
          <textarea
            id="reflection"
            value={reflection}
            onChange={handleInputChange}
            disabled={isSubmitting}
            placeholder="Share your thoughts, feelings, or intentions..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[120px] resize-none"
            required
          />
          <div className="flex justify-end mt-1">
            <span className={`text-xs ${characterCount > MAX_CHARS * 0.8 ? 'text-orange-500' : 'text-gray-500'}`}>
              {characterCount}/{MAX_CHARS}
            </span>
          </div>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !reflection.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md disabled:opacity-70 transition-all flex items-center justify-center gap-2"
        >
          <Pencil size={18} />
          {isSubmitting ? "Minting..." : "Mint Reflection NFT"}
        </button>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Your reflection will be minted as an NFT on the GOOD CARE Network and earn you CARE Score points.
        </p>
      </form>
    </div>
  );
};

export default ReflectionForm;