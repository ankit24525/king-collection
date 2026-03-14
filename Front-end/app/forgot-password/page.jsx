"use client";

import { useState } from "react";
import API from "@/app/lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await API.post(
      "/api/users/forgot-password",
      { email }
    );

    setMsg(data.msg);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded shadow w-[350px]"
      >
        <h2 className="text-xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          className="border w-full h-10 px-3 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-[#F8D6A4] py-2 rounded">
          Send Reset Link
        </button>

        {msg && <p className="mt-4 text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
