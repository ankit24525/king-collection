"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import API from "@/app/lib/api";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.put(
      `/api/users/reset-password/${token}`,
      { password }
    );

    alert("Password Updated!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded shadow w-[350px]"
      >
        <h2 className="text-xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="border w-full h-10 px-3 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-[#F8D6A4] py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
}
