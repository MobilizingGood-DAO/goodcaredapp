import React from "react";
import { HeartPulse, Twitter, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse size={24} />
              <span className="text-xl font-bold">GOOD CARE Network</span>
            </div>
            <p className="text-green-100 mb-6">
              Empowering mental wellness through reflection, consistency, and community.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-lg mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-green-100 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-green-100 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-green-100 hover:text-white transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-green-100 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition-colors">
                    Mental Health Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition-colors">
                    Reflection Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                    <Twitter size={16} />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                    <Info size={16} />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-10 pt-6 text-center text-green-200 text-sm">
          <p>&copy; {new Date().getFullYear()} GOOD CARE Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;