"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token only in client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // hide button immediately
    router.push("/login");
  };

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-black/30">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
        <a
          href="/dashboard"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-400 hover:text-white transition-colors"
        >
          NextTask AI
        </a>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition whitespace-nowrap"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
