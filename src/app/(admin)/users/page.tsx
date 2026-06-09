"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Users, Search, Calendar, Eye, Download, UserCheck, UserPlus } from "lucide-react";
import { User } from "@/types";

// Halaman daftar pengguna terdaftar beserta info status
export default function UsersPage() {
  const { users } = useApp();

  // Filter States
  const [search, setSearch] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Selected User Modal States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Statistics calculation with offsets matching the mockup
  const totalUsersCount = 1243 + users.length; // 1,248
  const activeUsersCount = 887 + users.length; // 892
  const newUsersCount = 40 + users.length; // 45

  // Filter Logic
  const filteredUsers = users.filter((u) => {
    return u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
  });

  // Pagination Logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleViewDetail = (user: User) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Daftar Pengguna</h1>
          <p className="text-xs text-gray-400 font-semibold">
            Kelola data dan pantau status keaktifan pengguna aplikasi SaiBumi Explore.
          </p>
        </div>
        <Button
          onClick={() => alert("Mengekspor data pengguna...")}
          variant="outline"
          className="flex items-center gap-2 font-semibold text-xs py-2 px-3 shadow-sm border border-gray-200 text-gray-700 bg-white"
        >
          <Download size={15} />
          Ekspor Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Pengguna */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-sky-50 text-primary">
            <Users size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Pengguna</span>
            <span className="text-xl font-bold text-[#0F172A]">{totalUsersCount.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Aktif Bulan Ini */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <UserCheck size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Aktif Bulan Ini</span>
            <span className="text-xl font-bold text-[#0F172A]">{activeUsersCount.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Pengguna Baru */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-500">
            <UserPlus size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pengguna Baru</span>
            <span className="text-xl font-bold text-[#0F172A]">{newUsersCount}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-[#0F172A] outline-none transition-all focus:border-primary placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 bg-gray-50/50">
                <th className="py-4 px-5 font-semibold">Pengguna</th>
                <th className="py-4 px-3 font-semibold">Email</th>
                <th className="py-4 px-3 font-semibold text-center w-28">Status</th>
                <th className="py-4 px-3 font-semibold">Terdaftar Pada</th>
                <th className="py-4 px-5 font-semibold text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, i) => (
                  <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm"
                        />
                        <span className="font-semibold text-[#0F172A]">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-600">
                      {user.email}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                        i % 4 === 0 
                          ? "bg-rose-50 text-rose-600" 
                          : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {i % 4 === 0 ? "Tidak Aktif" : "Aktif"}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-400 flex items-center gap-1.5 mt-2.5">
                      <Calendar size={13} />
                      {user.joinDate}
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button
                        onClick={() => handleViewDetail(user)}
                        title="Detail Pengguna"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-sky-50 transition-all"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 font-medium">
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-semibold bg-gray-50/30">
            <span>
              Menampilkan {startIndex + 1}-{endIndex} dari {totalItems} pengguna
            </span>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title="Detail Profil Pengguna"
        >
          <div className="flex flex-col gap-5 items-center text-center">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-20 h-20 rounded-full object-cover border border-gray-100 shadow-md"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-[#0F172A]">
                {selectedUser.name}
              </h3>
              <span className="text-xs text-gray-400 font-semibold">{selectedUser.email}</span>
            </div>

            <div className="h-[1px] bg-gray-100 w-full" />

            <div className="w-full grid grid-cols-2 gap-4 text-left">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status Akun</span>
                <span className="text-xs font-bold text-emerald-600">Aktif</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bergabung Sejak</span>
                <span className="text-xs font-bold text-[#0F172A]">{selectedUser.joinDate}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Ulasan</span>
                <span className="text-xs font-bold text-[#0F172A]">12 Ulasan</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Terakhir Login</span>
                <span className="text-xs font-bold text-[#0F172A]">Kemarin, 14:20 WIB</span>
              </div>
            </div>

            <div className="flex justify-end w-full mt-2">
              <Button
                variant="outline"
                onClick={() => setIsDetailOpen(false)}
                className="py-1.5 px-4 font-semibold text-xs"
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
