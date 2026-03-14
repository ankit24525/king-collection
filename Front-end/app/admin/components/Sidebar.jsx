"use client";

import Link from "next/link";
import { LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-5 fixed">

      <h1 className="text-2xl font-bold mb-10">
        King Admin
      </h1>

      <nav className="space-y-6">

        <Link href="/admin" className="flex gap-3 items-center">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/admin/products" className="flex gap-3 items-center">
          <Package size={20} />
          Products
        </Link>

        <Link href="/admin/users" className="flex gap-3 items-center">
          <Users size={20} />
          Users
        </Link>

        <Link href="/admin/orders" className="flex gap-3 items-center">
          <ShoppingCart size={20} />
          Orders
        </Link>

      </nav>

    </div>
  );
}