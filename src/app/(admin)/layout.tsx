"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useApp();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("sb_isLoggedIn");
    if (storedAuth !== "true" && !isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Navbar */}
        <Navbar onMenuToggle={() => setSidebarOpen(true)} />

        {/* Content Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
