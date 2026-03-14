"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  LogOut
} from "lucide-react";

import { useEffect } from "react";

export default function AdminLayout({ children }) {

  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // allow admin login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {

    if (!isLoginPage) {

      if (!user) {
        router.push("/admin/login");
      }

      if (user && !user.isAdmin) {
        router.push("/");
      }

    }

  }, [user, pathname]);

  // login page should not show sidebar
  if (isLoginPage) {
    return children;
  }

  if (!user || !user.isAdmin) return null;

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-white shadow-lg">

        <div className="p-6 font-bold text-xl border-b">
          King Admin
        </div>

        <nav className="flex flex-col gap-2 p-4">

          <Link
            href="/admin"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <LayoutDashboard size={18}/>
            Dashboard
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Users size={18}/>
            Users
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Package size={18}/>
            Products
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <ShoppingCart size={18}/>
            Orders
          </Link>

        </nav>

        {/* LOGOUT */}

        <div className="p-4 border-t">

          <button
            onClick={()=>{
              logout();
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut size={18}/>
            Logout
          </button>

        </div>

      </aside>

      {/* PAGE CONTENT */}

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>

  );

}