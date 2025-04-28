import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/userService";
import { LeaderboardEntry } from "../../types";
import { getStreakEmoji } from "../../utils/scoreCalculator";
import { Medal, Trophy, TrendingUp } from "lucide-react";

interface LeaderboardTableProps {
  className?: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ className = "" }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchLeaderboard = () => {
      setIsLoading(true);
      
      // Get leaderboard data
      const leaderboardData = getLeaderboard();
      setEntries(leaderboardData);
      
      setIsLoading(false);
    };
    
    fetchLeaderboard();
    
    // Refresh leaderboard every 30 seconds
    const intervalId = setInterval(fetchLeaderboard, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={18} />;
      case 2:
        return <Medal className="text-gray-400" size={18} />;
      case 3:
        return <Medal className="text-amber-700" size={18} />;
      default:
        return <TrendingUp size={18} className="text-green-500" />;
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-green-800 mb-4">CARE Score Leaderboard</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-green-500">Loading leaderboard...</div>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No entries yet. Be the first to start your mental wellness journey!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CARE Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reflections</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.address} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-2">{index + 1}</span>
                      {getRankIcon(index + 1)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium text-gray-900">@{entry.twitterHandle}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-bold text-green-700">{entry.totalCareScore}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-1">{entry.currentStreak}</span>
                      <span>{getStreakEmoji(entry.currentStreak)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-gray-700">{entry.reflectionsMinted}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;