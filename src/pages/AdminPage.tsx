import React from "react";
import AdminPanel from "../components/admin/AdminPanel";

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Manage user accounts and CARE Scores
          </p>
        </div>
        
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;