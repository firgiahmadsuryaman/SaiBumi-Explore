"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Eye, EyeOff, Compass } from "lucide-react";

// Halaman login admin dengan split layout gambar pantai
export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useApp();
  
  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sb_remembered_email") || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sb_remembered_email") !== null;
    }
    return false;
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  useEffect(() => {
    // Redirect if already logged in
    const storedAuth = localStorage.getItem("sb_isLoggedIn");
    if (storedAuth === "true" || isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!password) {
      newErrors.password = "Kata sandi wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = login(email, password);
    if (success) {
      if (rememberMe) {
        localStorage.setItem("sb_remembered_email", email);
      } else {
        localStorage.removeItem("sb_remembered_email");
      }
      router.push("/dashboard");
    } else {
      setErrors({ general: "Email atau kata sandi salah" });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-end p-16 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105 rounded-l-2xl"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.2) 60%, rgba(15, 23, 42, 0.1) 100%), url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80')`
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 max-w-xl">
          <div className="flex items-center gap-2.5">
            <Compass className="text-white w-8 h-8 animate-spin-slow" />
            <span className="font-bold text-xl tracking-tight">SaiBumi Explore</span>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Jelajahi Lampung
            </h1>
            <p className="text-sm text-gray-200/90 leading-relaxed font-medium">
              Temukan keindahan alam dan pengalaman budaya Lampung yang tak terlupakan melalui sistem pengelolaan terpusat kami.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-16 bg-gray-50/50 md:py-24">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-8 hover:shadow-md/40 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 lg:hidden">
              <Compass className="text-primary w-6 h-6" />
              <span className="font-bold text-lg text-primary">SaiBumi Explore</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Masuk ke SaiBumi Explore CMS untuk mengelola data pariwisata Anda.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-semibold text-red-600">
                {errors.general}
              </div>
            )}

            <Input
              label="Alamat Email"
              type="email"
              placeholder="admin@saibumi.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined, general: undefined }));
              }}
              error={errors.email}
            />

            <div className="relative">
              <Input
                label="Kata Sandi"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
                }}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 p-1 rounded"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                Ingat saya
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-bold text-primary hover:underline"
              >
                Lupa kata sandi?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full py-2.5 font-semibold text-sm mt-2">
              Masuk
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] font-medium text-gray-400">
            © 2026 SaiBumi Explore. Hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </div>
  );
}
