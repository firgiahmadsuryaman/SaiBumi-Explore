"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Search, Bell, Menu, ExternalLink } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
}

  // Komponen header navbar atas dengan info profil dan notifikasi
  export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { profile } = useApp();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm/50">
      {/* Left section: Search & Menu toggle */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onMenuToggle}
          className="text-gray-500 hover:text-gray-800 lg:hidden p-1 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-full pl-9 pr-4 py-1.5 border border-gray-100 bg-gray-50/70 rounded-lg text-sm text-[#0F172A] outline-none transition-all focus:bg-white focus:border-primary placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right section: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Buka Situs Button */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
        >
          Buka Situs
          <ExternalLink size={12} />
        </a>

        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Vertical divider */}
        <span className="h-6 w-[1px] bg-gray-100 hidden sm:block" />

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-bold text-[#0F172A]">{profile.name}</span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              Admin
            </span>
          </div>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
