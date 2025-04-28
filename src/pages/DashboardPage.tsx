import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReflectionForm from "../components/reflections/ReflectionForm";
import ReflectionsList from "../components/reflections/ReflectionsList";
import { useAuth } from "../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { isLoggedIn, userProfile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home if not logged in
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  
  if (!isLoggedIn || !userProfile) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Wellness Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your reflection journey and CARE Score progress.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReflectionForm className="mb-8" />
            <ReflectionsList />
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Your Progress</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500 block">Total CARE Score</span>
                  <span className="text-3xl font-bold text-green-700">{userProfile.totalCareScore}</span>
                </div>
                
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500 block">Current Streak</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-green-700">{userProfile.currentStreak}</span>
                    <span className="text-xl">
                      {userProfile.currentStreak >= 7 ? "🔥" : ""}
                      {userProfile.currentStreak >= 30 ? "🔥" : ""}
                      {userProfile.currentStreak >= 90 ? "🔥" : ""}
                    </span>
                  </div>
                </div>
                
                <div className="pb-2">
                  <span className="text-sm text-gray-500 block">Reflections Minted</span>
                  <span className="text-3xl font-bold text-green-700">{userProfile.reflectionsMinted}</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="mb-3 text-sm text-gray-500">Keep the streak going!</div>
                <div className="inline-block bg-green-100 rounded-full px-4 py-2 font-medium text-green-800">
                  {userProfile.currentStreak === 0 
                    ? "Start your streak today!" 
                    : `You've reflected for ${userProfile.currentStreak} day${userProfile.currentStreak !== 1 ? 's' : ''} in a row!`}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Reflection Tips</h2>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Reflect on both positive moments and challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Be honest with yourself</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Consider what you're grateful for today</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Note any patterns in your thoughts or feelings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Set an intention for tomorrow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;