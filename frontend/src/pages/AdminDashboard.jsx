import AdminCard from "../components/AdminCard";

import { useEffect, useState } from "react";

import { getDashboardStats } from "../services/dashboard.service";

import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
  totalRevenue: 0,
  totalOrders: 0,
  totalProducts: 0,
  totalUsers: 0,
});

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await getDashboardStats();
    setStats(data.stats);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-5xl font-bold">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your store efficiently.
      </p>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        <StatCard
          title="Revenue"
          value={`₹ ${stats.totalRevenue}`}
          color="text-green-600"
        />

        <StatCard
          title="Orders"
          value={stats.totalOrders}
          color="text-blue-600"
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
          color="text-orange-600"
        />

        <StatCard
          title="Users"
          value={stats.totalUsers}
          color="text-red-600"
        />

      </div>

      {/* Management */}

      <div className="grid md:grid-cols-2 gap-8 mt-12">

        <AdminCard
          title="Products"
          description="Add, edit and delete products."
          color="text-blue-700"
          button="+ Add Product"
          link="/add-product"
        />

        <AdminCard
          title="Manage Products"
          description="View all products."
          color="text-green-700"
          button="Open"
          link="/manage-products"
        />

        <AdminCard
          title="Categories"
          description="Create product categories."
          color="text-orange-700"
          button="+ Add Category"
          link="/add-category"
        />

        <AdminCard
          title="Manage Categories"
          description="Edit or delete categories."
          color="text-red-700"
          button="Open"
          link="/manage-categories"
        />

        <AdminCard
          title="Orders"
          description="Manage customer orders."
          color="text-purple-700"
          button="Manage Orders"
          link="/manage-orders"
        />

      </div>

    </div>
  );
};

export default AdminDashboard;