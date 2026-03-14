"use client";

import { useState } from "react";
import API from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import Login from "@/app/login/page";
import { useAuth } from "@/context/AuthContext";
export default function AdminLogin() {

  const router = useRouter();
  const {login}=useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const submitHandler = async (e) => {

    e.preventDefault();
    setError("");

    try {

      const { data } = await API.post("/api/users/login", form);

      if (!data.isAdmin) {
        setError("Not an admin account");
        return;
      }
      login(data)
      toast.success("Admin Login Successful");

      router.push("/admin");

    } catch (err) {

      setError(err.response?.data?.msg || "Invalid credentials");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 text-sm mb-4 rounded text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}

        <div className="relative mb-4">

          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5"/>

          <input
            type="email"
            placeholder="Admin Email"
            required
            className="pl-10 border w-full h-11 rounded-md px-3"
            onChange={(e)=>
              setForm({...form,email:e.target.value})
            }
          />

        </div>

        {/* PASSWORD */}

        <div className="relative mb-6">

          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5"/>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="pl-10 pr-10 border w-full h-11 rounded-md px-3"
            onChange={(e)=>
              setForm({...form,password:e.target.value})
            }
          />

          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >

            {showPassword
              ? <EyeOff className="h-5 w-5 text-gray-500"/>
              : <Eye className="h-5 w-5 text-gray-500"/>
            }

          </button>

        </div>

        <button
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
        >
          Login as Admin
        </button>

      </form>

    </div>

  );
}