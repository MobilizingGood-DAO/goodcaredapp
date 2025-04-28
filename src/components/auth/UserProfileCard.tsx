import React from "react";
import { UserProfile } from "../../types";
import { getStreakEmoji } from "../../utils/scoreCalculator";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface UserProfileCardProps {
  profile: UserProfile;
  className?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ profile, className = "" }) => {
  const { logout } = useAuth();
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {profile.profileImage ? (
            <img 
              src={profile.profileImage} 
              alt={profile.twitterHandle} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-800 font-bold">
                {profile.twitterHandle.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">@{profile.twitterHandle}</span>
              {profile.currentStreak > 0 && (
                <span title={`${profile.currentStreak} day streak`}>
                  {getStreakEmoji(profile.currentStreak)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {profile.reflectionsMinted} reflection{profile.reflectionsMinted !== 1 ? 's' : ''} minted
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-500">CARE Score</div>
            <div className="font-bold text-green-700">{profile.totalCareScore}</div>
          </div>
          
          <button 
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;