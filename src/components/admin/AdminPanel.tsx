import React, { useState } from "react";
import { updateBonusScore, removeUser, getLeaderboard } from "../../services/userService";
import { LeaderboardEntry } from "../../types";
import { Trash2, Award } from "lucide-react";
import { ADMIN_ACCESS_CODE } from "../../constants";

const AdminPanel: React.FC = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<LeaderboardEntry[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [bonusScore, setBonusScore] = useState<number>(0);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  const authenticate = () => {
    if (accessCode === ADMIN_ACCESS_CODE) {
      setIsAuthenticated(true);
      loadUsers();
    } else {
      setMessage({ text: "Invalid access code", type: "error" });
    }
  };
  
  const loadUsers = () => {
    const leaderboard = getLeaderboard();
    setUsers(leaderboard);
  };
  
  const handleUpdateBonusScore = () => {
    if (!selectedUser) {
      setMessage({ text: "Please select a user", type: "error" });
      return;
    }
    
    const success = updateBonusScore(selectedUser, bonusScore);
    
    if (success) {
      setMessage({ text: "Bonus score updated successfully", type: "success" });
      loadUsers(); // Reload user list
    } else {
      setMessage({ text: "Failed to update bonus score", type: "error" });
    }
  };
  
  const handleRemoveUser = (address: string) => {
    if (confirm("Are you sure you want to remove this user?")) {
      const success = removeUser(address);
      
      if (success) {
        setMessage({ text: "User removed successfully", type: "success" });
        loadUsers(); // Reload user list
      } else {
        setMessage({ text: "Failed to remove user", type: "error" });
      }
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Admin Access</h2>
        
        <div className="mb-4">
          <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
            Access Code
          </label>
          <input
            type="password"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        {message && (
          <p className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"} mb-4`}>
            {message.text}
          </p>
        )}
        
        <button
          onClick={authenticate}
          className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Access Admin Panel
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-green-800">Admin Panel</h2>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Logout
        </button>
      </div>
      
      {message && (
        <div className={`p-3 mb-4 rounded-md ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {message.text}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Update Bonus Score</h3>
          
          <div className="mb-3">
            <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>
            <select
              id="userSelect"
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.address} value={user.address}>
                  @{user.twitterHandle} ({user.totalCareScore} pts)
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="bonusScore" className="block text-sm font-medium text-gray-700 mb-1">
              Bonus Score
            </label>
            <input
              type="number"
              id="bonusScore"
              value={bonusScore}
              onChange={(e) => setBonusScore(parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>
          
          <button
            onClick={handleUpdateBonusScore}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Award size={16} />
            Update Bonus Score
          </button>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-3">User Management</h3>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.address} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-medium text-gray-900">@{user.twitterHandle}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-gray-700">{user.totalCareScore}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleRemoveUser(user.address)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {users.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;