"use client";

import { useState } from "react";
import API from "@/app/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ SIGNUP HANDLER
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/api/users/register", form);

      // save logged user
      localStorage.setItem("userInfo", JSON.stringify(data));

      router.push("/");
    } catch (err) {
      // ✅ USER EXISTS ERROR
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950 px-4">

      <form
        onSubmit={submitHandler}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account 🚀
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* NAME */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />
          <input
            required
            placeholder="Full Name"
            className="pl-10 border w-full h-11 rounded-md px-3
                       focus:outline-none focus:ring-2 focus:ring-[#F8D6A4]"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* EMAIL */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />
          <input
            required
            type="email"
            placeholder="Email Address"
            className="pl-10 border w-full h-11 rounded-md px-3
                       focus:outline-none focus:ring-2 focus:ring-[#F8D6A4]"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />

          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pl-10 pr-10 border w-full h-11 rounded-md px-3
                       focus:outline-none focus:ring-2 focus:ring-[#F8D6A4]"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* 👁 SHOW PASSWORD */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* SIGNUP BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#F8D6A4] py-3 rounded-md font-semibold
                     hover:bg-[#D4A574] transition-all"
        >
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#F8D6A4] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
