"use client";

import { useState } from "react";
import API from "@/app/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {

  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // LOGIN HANDLER
  const submitHandler = async (e) => {

    e.preventDefault();
    setError("");

    try {

    const { data } = await API.post("/api/users/login", form);

// 🚫 block admin login from user login page
if (data.isAdmin) {
  setError("Admins must login from the Admin Login page");
  return;
}

login(data);

toast.success("User Login Successful");

router.push("/");

    } catch (err) {

      setError(
        err.response?.data?.msg || "Invalid email or password"
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950 px-4">

      <form
        onSubmit={submitHandler}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* ERROR MESSAGE */}

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* EMAIL INPUT */}

        <div className="relative mb-4">

          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />

          <input
            required
            type="email"
            placeholder="Email"
            className="pl-10 border w-full h-11 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F8D6A4]"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

        </div>

        {/* PASSWORD INPUT */}

        <div className="relative mb-2">

          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />

          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pl-10 pr-10 border w-full h-11 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#F8D6A4]"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* SHOW PASSWORD BUTTON */}

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

        {/* FORGOT PASSWORD */}

        <div className="text-right mb-6">

          <Link
            href="/forgot-password"
            className="text-sm text-[#F8D6A4] hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          className="w-full bg-[#F8D6A4] py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-all"
        >
          Login
        </button>

        {/* SIGNUP LINK */}

        <p className="text-center text-sm mt-5">
          New user?{" "}
          <Link
            href="/Signup"
            className="text-[#F8D6A4] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

        {/* DIVIDER */}

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-xs text-gray-400">Admin</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* ADMIN LOGIN LINK */}

        <p className="text-center text-sm">
          <Link
            href="/admin/login"
            className="text-[#F8D6A4] font-semibold hover:underline"
          >
            Login to Admin Panel
          </Link>
        </p>

      </form>

    </div>

  );

}