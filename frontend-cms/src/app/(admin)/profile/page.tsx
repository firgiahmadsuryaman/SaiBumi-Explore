"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { User, Shield, Key, Edit, Check } from "lucide-react";

// Halaman profil pengguna administratif dan keamanan kata sandi
export default function ProfilePage() {
  const { profile, updateProfile } = useApp();

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(profile.name.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [avatar, setAvatar] = useState(profile.avatar || "");

  // Change Password states
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // 2FA state
  const [twoFactor, setTwoFactor] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      alert("Nama depan wajib diisi");
      return;
    }
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    updateProfile({
      name: fullName,
      email: email.trim(),
      avatar: avatar.trim()
    });
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!oldPassword) errs.oldPassword = "Kata sandi lama wajib diisi";
    if (!newPassword) errs.newPassword = "Kata sandi baru wajib diisi";
    else if (newPassword.length < 6) errs.newPassword = "Kata sandi baru minimal 6 karakter";
    if (newPassword !== confirmPassword) errs.confirmPassword = "Konfirmasi kata sandi tidak cocok";

    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }

    // Success simulation
    alert("Kata sandi berhasil diubah!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
    setIsPasswordOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Profil Pengguna</h1>
        <p className="text-xs text-gray-400 font-semibold">
          Kelola informasi pribadi dan pengaturan keamanan akun Anda.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Avatar & Overview Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-5">
          <div className="relative">
            <img
              src={avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border border-gray-100 shadow-md"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">Ubah</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-[#0F172A]">{profile.name}</h2>
            <span className="text-xs font-semibold text-primary">Administrator Utama</span>
            <span className="text-[10px] text-gray-400 font-semibold">Bandar Lampung</span>
          </div>

          <div className="h-[1px] bg-gray-100 w-full" />

          <div className="w-full flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400">Status Akun</span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Aktif
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400">Terakhir Login</span>
              <span className="text-[#0F172A]">Hari Ini, 08:30 WIB</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form & Security */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Section 1: Informasi Pribadi */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                Informasi Pribadi
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline hover:text-primary-hover transition-colors"
                >
                  <Edit size={14} />
                  Edit Profil
                </button>
              ) : null}
            </div>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Depan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Nama Belakang"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Alamat Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Nomor Telepon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <Input
                  label="URL Foto Profil"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="Masukkan URL gambar profil baru"
                />
              )}

              {isEditing && (
                <div className="flex justify-end gap-2.5 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFirstName(profile.name.split(" ")[0]);
                      setLastName(profile.name.split(" ").slice(1).join(" "));
                      setEmail(profile.email);
                      setAvatar(profile.avatar);
                      setIsEditing(false);
                    }}
                    className="py-1.5 px-3 font-semibold text-xs"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="py-1.5 px-4 font-semibold text-xs flex items-center gap-1"
                  >
                    <Check size={14} />
                    Simpan
                  </Button>
                </div>
              )}
            </form>
          </div>

          {/* Section 2: Keamanan Akun */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 py-8">
            <h3 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50 flex items-center gap-2">
              <Shield size={16} className="text-gray-400" />
              Keamanan Akun
            </h3>

            <div className="flex items-center justify-between text-xs font-semibold py-2.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-400">Kata Sandi</span>
                <span className="text-[#0F172A] font-bold">Terakhir diubah 3 bulan yang lalu</span>
              </div>
              <Button
                onClick={() => setIsPasswordOpen(true)}
                variant="outline"
                className="py-1.5 px-3 font-bold text-xs hover:bg-gray-50 transition-colors"
              >
                Ganti Kata Sandi
              </Button>
            </div>
          </div>

          {/* Section 3: Autentikasi Dua Faktor */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1 pr-6">
              <div className="p-2 rounded-lg bg-sky-50 text-primary mt-0.5">
                <Key size={18} />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs font-bold text-[#0F172A]">Autentikasi Dua Faktor (2FA)</h4>
                <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                  Amankan akun Anda dengan mewajibkan kode verifikasi tambahan setiap kali Anda masuk.
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => {
                setTwoFactor(!twoFactor);
                alert(`2FA berhasil ${!twoFactor ? "diaktifkan" : "dinonaktifkan"}`);
              }}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                twoFactor ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  twoFactor ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordOpen}
        onClose={() => {
          setIsPasswordOpen(false);
          setPasswordErrors({});
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }}
        title="Ganti Kata Sandi"
      >
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <Input
            label="Kata Sandi Lama *"
            type="password"
            placeholder="Masukkan kata sandi saat ini"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={passwordErrors.oldPassword}
          />
          <Input
            label="Kata Sandi Baru *"
            type="password"
            placeholder="Minimal 6 karakter"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={passwordErrors.newPassword}
          />
          <Input
            label="Konfirmasi Kata Sandi Baru *"
            type="password"
            placeholder="Ulangi kata sandi baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordErrors.confirmPassword}
          />
          <div className="flex justify-end gap-2.5 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordOpen(false)}
              className="py-1.5 px-3 font-semibold text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="py-1.5 px-4 font-semibold text-xs"
            >
              Simpan Kata Sandi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
