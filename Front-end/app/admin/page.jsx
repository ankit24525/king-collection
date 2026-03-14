"use client";

import { useEffect, useState } from "react";
import API from "@/app/lib/api";

export default function AdminDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const { data } = await API.get("/api/admin/dashboard");
 
        setStats(data);

      } catch (error) {

        console.error("Dashboard error:", error);

      }

    };

    fetchStats();

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Carts</h2>
          <p className="text-3xl font-bold">{stats.carts}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

      </div>

    </div>

  );
}