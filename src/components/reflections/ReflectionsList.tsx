import React, { useEffect, useState } from "react";
import { getUserReflections } from "../../services/web3Service";
import { Reflection } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import { CalendarCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface ReflectionsListProps {
  className?: string;
}

const ReflectionsList: React.FC<ReflectionsListProps> = ({ className = "" }) => {
  const { userProfile } = useAuth();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchReflections = async () => {
      if (!userProfile) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const userReflections = await getUserReflections(userProfile.address);
        setReflections(userReflections);
        
      } catch (err) {
        console.error("Error fetching reflections:", err);
        setError("Failed to load your reflections. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReflections();
  }, [userProfile]);
  
  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-green-800 mb-4">Your Reflections</h2>
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-green-500">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-green-800 mb-4">Your Reflections</h2>
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Your Reflections</h2>
      
      {reflections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <CalendarCheck size={48} className="text-gray-300 mb-3" />
          <p>You haven't minted any reflections yet.</p>
          <p className="text-sm mt-1">Start your first reflection above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reflections.map((reflection) => (
            <div 
              key={reflection.id} 
              className="p-4 border border-gray-100 rounded-lg hover:border-green-100 transition-all"
            >
              <p className="text-gray-800 mb-2">{reflection.content}</p>
              <p className="text-xs text-gray-500">
                Minted on {formatDate(reflection.timestamp)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReflectionsList;