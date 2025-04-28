import React from "react";
import { HeartPulse, Trophy, BarChart3 } from "lucide-react";
import LoginButton from "../components/auth/LoginButton";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-700 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Begin Your Mental Wellness Journey
              </h1>
              <p className="text-lg md:text-xl mb-8 text-green-50">
                Reflect daily, mint your journey as NFTs, and build your CARE Score in a supportive community.
              </p>
              
              {!isLoggedIn && (
                <LoginButton className="mb-8" />
              )}
              
              {isLoggedIn && (
                <Link 
                  to="/dashboard" 
                  className="bg-white text-green-700 hover:bg-green-50 transition-all px-8 py-3 rounded-lg font-medium text-lg shadow-lg inline-block"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
            
            <div className="flex justify-center">
              <img 
                src="https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/main/docs/assets/portal.png" 
                alt="GOOD CARE Network - Global Mental Wellness" 
                className="rounded-lg shadow-2xl max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The GOOD CARE Network helps you build consistency in your mental wellness practice through daily reflections.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartPulse className="text-green-600" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Daily Reflections</h3>
              <p className="text-gray-600">
                Take a moment each day to reflect on your thoughts and feelings, creating a mindful practice.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-green-600" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mint NFTs</h3>
              <p className="text-gray-600">
                Each reflection is saved on the blockchain as an NFT, creating a permanent record of your journey.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-green-600" size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Build Your CARE Score</h3>
              <p className="text-gray-600">
                Earn points for consistency and streaks, climbing the leaderboard as you progress.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leaderboard Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Leaderboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See who's leading the way in their mental wellness journey.
            </p>
          </div>
          
          <LeaderboardTable />
          
          <div className="text-center mt-8">
            <Link 
              to="/leaderboard" 
              className="text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              View Full Leaderboard →
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-green-50 max-w-2xl mx-auto">
            Join the GOOD CARE Network today and take the first step towards better mental wellness.
          </p>
          
          {!isLoggedIn && (
            <LoginButton />
          )}
          
          {isLoggedIn && (
            <Link 
              to="/dashboard" 
              className="bg-white text-green-700 hover:bg-green-50 transition-all px-8 py-3 rounded-lg font-medium text-lg shadow-lg inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;