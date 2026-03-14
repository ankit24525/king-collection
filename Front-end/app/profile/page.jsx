"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white shadow p-6 rounded-lg space-y-4">

        <div>
          <p className="text-gray-500">Name</p>
          <p className="font-semibold">{user?.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-semibold">{user?.email}</p>
        </div>

      </div>

    </div>
  );
}