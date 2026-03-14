"use client";

import { useEffect, useState } from "react";
import API from "@/app/lib/api";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {

      try {
        const { data } = await API.get("/api/admin/users");
        setUsers(data);
      } catch (error) {
        console.error("Users error:", error);
      }

    };

    fetchUsers();

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Users
      </h1>

      <div className="bg-white shadow rounded p-6">

        {users.map((user) => (

          <div
            key={user._id}
            className="flex justify-between border-b py-3"
          >
            <div>
              {user.name} - {user.email}
            </div>

            <div>
              {user.isAdmin ? "Admin" : "User"}
            </div>

          </div>

        ))}

      </div>

    </div>

  );
}