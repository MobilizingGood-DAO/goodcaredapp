import React from "react";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

const LeaderboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">CARE Score Leaderboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See who's leading the way in their mental wellness journey and get inspired!
          </p>
        </div>
        
        <LeaderboardTable className="mb-8" />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">How Scores Are Calculated</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Base Points</h3>
              <p className="text-gray-700 mb-4">
                Each reflection you mint earns you 10 CARE points.
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Streak Multipliers</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>1-6 days: 1x multiplier</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>7-29 days: 1.5x multiplier 🔥</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>30-89 days: 2x multiplier 🔥🔥</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  <span>90+ days: 3x multiplier 🔥🔥🔥</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Bonus Points</h3>
              <p className="text-gray-700 mb-4">
                Special bonus points may be awarded for exceptional engagement or contributions to the community.
              </p>
              
              <h3 className="font-medium text-gray-900 mb-2">Total CARE Score Formula</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-mono text-gray-800">
                  Total CARE Score = (Reflections × 10 × Streak Multiplier) + Bonus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;