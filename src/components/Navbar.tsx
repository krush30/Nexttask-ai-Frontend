"use client";

import React from "react";

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-black/30">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a
          href=""
          className="text-5xl mr-20 font-bold text-neutral-400 hover:text-white transition-colors"
        >
          NextTask AI
        </a>
      </div>
    </div>
  );
};

export default Navbar;
