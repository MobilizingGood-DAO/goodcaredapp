import React from "react";
import { HeartPulse, BrainCircuit, Award } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About GOOD CARE Network</h1>
          <p className="text-xl text-gray-600">
            A mental wellness platform built on the blockchain
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <div className="flex justify-center mb-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
              <HeartPulse className="text-green-600" size={40} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Our Mission</h2>
          
          <p className="text-gray-700 mb-4">
            The GOOD CARE Network is dedicated to improving mental wellness through the power of daily reflection, consistency, and community support.
          </p>
          
          <p className="text-gray-700 mb-4">
            We believe that mental wellness is a journey, not a destination. By encouraging daily reflections and turning them into blockchain-based NFTs, we create a permanent record of your wellness journey while incentivizing consistent practice.
          </p>
          
          <p className="text-gray-700">
            Our CARE Score system rewards users for their commitment to mental wellness, creating a positive feedback loop that helps establish and maintain healthy habits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                <BrainCircuit className="text-green-600" size={32} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">Mental Wellness Benefits</h2>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Increased self-awareness through regular reflection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Reduced stress and anxiety with consistent practice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Improved emotional regulation and resilience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Greater clarity and focus in daily life</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Enhanced overall wellbeing and life satisfaction</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Award className="text-green-600" size={32} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">Blockchain Integration</h2>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>NFT minting of daily reflections on GOOD CARE Network</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Permanent, immutable record of your wellness journey</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Smart wallet creation for easy onboarding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Twitter social login for seamless authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Future potential for reflection trading and sharing</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Join Us Today</h2>
          
          <p className="text-green-50 mb-4 text-center max-w-2xl mx-auto">
            Start your mental wellness journey with GOOD CARE Network. Connect with Twitter, mint your first reflection, and begin building your CARE Score.
          </p>
          
          <div className="flex justify-center mt-6">
            <a 
              href="/" 
              className="bg-white text-green-700 hover:bg-green-50 transition-all px-8 py-3 rounded-lg font-medium shadow-lg inline-block"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;