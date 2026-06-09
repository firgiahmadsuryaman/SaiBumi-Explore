"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard,
  MapPin,
  FolderOpen,
  MessageSquare,
  Users,
  User,
  LogOut,
  X,
  Compass
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

  // Komponen navigasi kiri admin yang responsif dan collapsible
  export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, logout } = useApp();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Destinasi", href: "/destinations", icon: MapPin },
    { name: "Kategori", href: "/categories", icon: FolderOpen },
    { name: "Ulasan", href: "/reviews", icon: MessageSquare },
    { name: "Pengguna", href: "/users", icon: Users },
    { name: "Profil", href: "/profile", icon: User }
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary text-white">
              <Compass size={22} className="animate-spin-slow" />
            </div>
            <span className="font-bold text-[#0F172A] text-lg tracking-tight">
              SaiBumi Explore
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 bg-white overflow-y-auto">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                  isActive
                    ? "text-primary bg-sky-50/70"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r" />
                )}
                <Icon size={18} className={isActive ? "text-primary" : "text-gray-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-[#0F172A] truncate">
                {profile.name}
              </span>
              <span className="text-[11px] text-gray-400 font-medium truncate">
                {profile.email}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
