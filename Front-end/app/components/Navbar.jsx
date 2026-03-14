"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  Moon,
  LogOut,
  Shield,
} from "lucide-react";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {

  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  if (loading) return null;

  // SEARCH
  const searchHandler = (e) => {

    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${query}`);

  };

  // DARK MODE
  const toggleDarkMode = () => {

    if (dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    setDark(!dark);

  };

  return (
    <>
      {/* SALE BAR */}
      <div className="w-full bg-[#F8D6A4] dark:bg-gray-800 dark:text-white text-center py-2 text-sm font-semibold">
        🎉 MEGA SALE - Up to 70% OFF | Free Shipping Above ₹999
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4">

          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link href="/">
              <Image
                src="/kingcollection.jpeg"
                width={150}
                height={60}
                alt="logo"
              />
            </Link>

            {/* CATEGORY */}
            <nav className="md:flex gap-8 font-semibold text-sm text-gray-900 dark:text-white">
              <Link href="/men">MEN</Link>
              <Link href="/women">WOMEN</Link>
              <Link href="/kids">KIDS</Link>
              <Link href="/trending">TRENDING</Link>
            </nav>

            {/* SEARCH */}
            <form
              onSubmit={searchHandler}
              className="hidden lg:flex relative w-96"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 text-gray-400" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 border dark:border-gray-600 rounded-md w-full h-9 px-3 text-sm bg-white dark:bg-gray-800 dark:text-white"
              />
            </form>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5 relative">

              {/* DARK MODE */}
              <button onClick={toggleDarkMode}>
                <Moon className="text-gray-700 dark:text-white" />
              </button>

              {/* USER / ADMIN */}
              {!user ? (
                <Link
                  href="/login"
                  className="hidden md:flex flex-col items-center group text-gray-900 dark:text-white"
                >
                  <User size={22} />
                  <span className="text-xs mt-1 group-hover:text-[#F8D6A4]">
                    Login
                  </span>
                </Link>
              ) : (
                <div className="relative">

                  <button onClick={() => setOpen(!open)}>
                    <User className="text-gray-900 dark:text-white" />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 shadow rounded border dark:border-gray-700 p-2">

                      <Link
                        href="/profile"
                        className="block p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Profile
                      </Link>

                      {/* ADMIN PANEL */}
                      {user?.isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 p-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Shield size={16} />
                          Admin Panel
                        </Link>
                      )}

                      {/* LOGOUT */}
                      <button
                        onClick={() => {
                          logout();
                          toast.success("Logged out");
                          router.push("/");
                        }}
                        className="flex gap-2 items-center text-red-500 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>

                    </div>
                  )}

                </div>
              )}

              {/* WISHLIST */}
              <Link
                className="hidden md:flex flex-col items-center group text-gray-900 dark:text-white"
                href="/wishlist"
              >
                <Heart />
                <span className="text-xs mt-1 group-hover:text-[#F8D6A4]">
                  Wishlist
                </span>
              </Link>

              {/* CART */}
              <Link
                className="hidden md:flex flex-col items-center group text-gray-900 dark:text-white"
                href="/cart"
              >
                <ShoppingBag />
                <span className="text-xs mt-1 group-hover:text-[#F8D6A4]">
                  Cart
                </span>
              </Link>

              {/* MOBILE MENU */}
              <Menu className="md:hidden text-gray-900 dark:text-white" />

            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;