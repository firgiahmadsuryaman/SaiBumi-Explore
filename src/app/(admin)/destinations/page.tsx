"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Search, Plus, Star, Edit, Trash2, Eye, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Halaman kelola objek wisata Lampung: Pencarian, filter, dan tabel data
export default function DestinationsPage() {
  const { destinations, categories, deleteDestination } = useApp();

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Sorting States
  const [sortField, setSortField] = useState<"name" | "rating" | "reviewsCount" | "ticketPrice">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Delete Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [destToDelete, setDestToDelete] = useState<string | null>(null);

  // Formatting currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Sort handler
  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter & Sort Logic
  const filteredDestinations = destinations
    .filter((dest) => {
      const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) ||
        dest.address.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "" || dest.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB as string)
          : (valB as string).localeCompare(valA);
      } else {
        return sortDirection === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      }
    });

  // Pagination Logic
  const totalItems = filteredDestinations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex);

  // Trigger Delete
  const handleDeleteClick = (id: string) => {
    setDestToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (destToDelete) {
      deleteDestination(destToDelete);
      setIsDeleteOpen(false);
      setDestToDelete(null);
      // Adjust page if empty
      if (paginatedDestinations.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Destinasi</h1>
          <p className="text-xs text-gray-400 font-semibold">
            Kelola seluruh objek wisata Lampung yang terdaftar di sistem.
          </p>
        </div>
        <Link href="/destinations/new">
          <Button variant="primary" className="flex items-center gap-2 font-semibold text-xs py-2 px-3 shadow-sm">
            <Plus size={16} />
            Tambah Destinasi
          </Button>
        </Link>
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
            placeholder="Cari destinasi..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-[#0F172A] outline-none transition-all focus:border-primary placeholder:text-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-48 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#0F172A] outline-none bg-white focus:border-primary"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Destinations Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 bg-gray-50/50">
                <th className="py-4 px-5 font-semibold">Thumbnail</th>
                <th
                  className="py-4 px-3 font-semibold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Nama Destinasi
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-3 font-semibold">Kategori</th>
                <th
                  className="py-4 px-3 font-semibold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("ticketPrice")}
                >
                  <div className="flex items-center gap-1">
                    Tiket Masuk
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th
                  className="py-4 px-3 font-semibold cursor-pointer hover:text-primary transition-colors text-center"
                  onClick={() => handleSort("rating")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Rating
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th
                  className="py-4 px-3 font-semibold cursor-pointer hover:text-primary transition-colors text-right"
                  onClick={() => handleSort("reviewsCount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Total Ulasan
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-4 px-5 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {paginatedDestinations.length > 0 ? (
                paginatedDestinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-3 px-5">
                      <img
                        src={dest.thumbnail}
                        alt={dest.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                      />
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0F172A]">
                      {dest.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-50 text-gray-600">
                        {dest.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-600">
                      {dest.ticketPrice === 0 ? "Gratis" : formatCurrency(dest.ticketPrice)}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-1 font-bold text-[#0F172A]">
                        <Star size={14} fill="#F59E0B" className="text-amber-500" />
                        {dest.rating.toFixed(1)}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-gray-500">
                      {dest.reviewsCount} Ulasan
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link href={`/destinations/${dest.id}`}>
                          <button
                            title="Detail"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-sky-50 transition-all"
                          >
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link href={`/destinations/${dest.id}/edit`}>
                          <button
                            title="Edit"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-secondary hover:bg-teal-50 transition-all"
                          >
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(dest.id)}
                          title="Hapus"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400 font-medium">
                    Tidak ada destinasi ditemukan.
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
              Menampilkan {startIndex + 1}-{endIndex} dari {totalItems} destinasi
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>
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
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Konfirmasi Hapus"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 leading-relaxed">
            Apakah Anda yakin ingin menghapus destinasi wisata ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="py-1.5 px-3 font-semibold text-xs"
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              className="py-1.5 px-3 font-semibold text-xs"
            >
              Hapus Destinasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
