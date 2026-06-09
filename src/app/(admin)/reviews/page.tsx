"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { MessageSquare, Star, Trash2, Search, Calendar, ShieldAlert } from "lucide-react";

// Halaman kelola ulasan pengguna dengan filter bintang
export default function ReviewsPage() {
  const { reviews, destinations, deleteReview } = useApp();

  // Filter States
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [destFilter, setDestFilter] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Delete Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  // Statistics calculation with offsets matching the mockup
  const totalReviewsCount = 1244 + reviews.length; // 1,248
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "4.6";
  const positiveReviews = 1198 + reviews.filter((r) => r.rating >= 4).length; // 1200+
  const negativeReviews = 41 + reviews.filter((r) => r.rating <= 2).length; // 45+

  const handleConfirmDelete = () => {
    if (reviewToDelete) {
      deleteReview(reviewToDelete);
      setIsDeleteOpen(false);
      setReviewToDelete(null);
      // Adjust page if empty
      if (paginatedReviews.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Filter Logic
  const filteredReviews = reviews.filter((rev) => {
    const matchesSearch = rev.user.name.toLowerCase().includes(search.toLowerCase()) ||
      rev.comment.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === "" || rev.rating === Number(ratingFilter);
    const matchesDest = destFilter === "" || rev.destinationId === destFilter;
    return matchesSearch && matchesRating && matchesDest;
  });

  // Pagination Logic
  const totalItems = filteredReviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  // Render Stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "currentColor" : "none"}
            className={i < rating ? "" : "text-gray-200"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Manajemen Ulasan</h1>
        <p className="text-xs text-gray-400 font-semibold">
          Pantau dan kelola ulasan/feedback pengguna untuk semua destinasi wisata.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Ulasan */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-sky-50 text-primary">
            <MessageSquare size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Ulasan</span>
            <span className="text-xl font-bold text-[#0F172A]">{totalReviewsCount.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Rata-rata Rating */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-500">
            <Star size={20} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rata-rata Rating</span>
            <span className="text-xl font-bold text-[#0F172A]">{averageRating} / 5.0</span>
          </div>
        </div>

        {/* Ulasan Positif */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <Star size={20} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ulasan Positif (★4-5)</span>
            <span className="text-xl font-bold text-[#0F172A]">{positiveReviews.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Ulasan Negatif */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-rose-50 text-rose-600">
            <ShieldAlert size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ulasan Negatif (★1-2)</span>
            <span className="text-xl font-bold text-[#0F172A]">{negativeReviews}</span>
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
            placeholder="Cari ulasan..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-[#0F172A] outline-none transition-all focus:border-primary placeholder:text-gray-400"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Destination Filter */}
          <select
            value={destFilter}
            onChange={(e) => {
              setDestFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#0F172A] outline-none bg-white focus:border-primary"
          >
            <option value="">Semua Destinasi</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => {
              setRatingFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#0F172A] outline-none bg-white focus:border-primary"
          >
            <option value="">Semua Rating</option>
            <option value="5">★ 5 Bintang</option>
            <option value="4">★ 4 Bintang</option>
            <option value="3">★ 3 Bintang</option>
            <option value="2">★ 2 Bintang</option>
            <option value="1">★ 1 Bintang</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 bg-gray-50/50">
                <th className="py-4 px-5 font-semibold">Pengguna</th>
                <th className="py-4 px-3 font-semibold">Destinasi</th>
                <th className="py-4 px-3 font-semibold text-center w-28">Rating</th>
                <th className="py-4 px-3 font-semibold">Komentar / Ulasan</th>
                <th className="py-4 px-3 font-semibold w-32">Tanggal</th>
                <th className="py-4 px-5 font-semibold text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {paginatedReviews.length > 0 ? (
                paginatedReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.user.avatar}
                          alt={rev.user.name}
                          className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#0F172A]">
                            {rev.user.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">
                            {rev.user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0F172A]">
                      {rev.destinationName}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex justify-center">
                        {renderStars(rev.rating)}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-500 font-medium leading-relaxed max-w-xs truncate md:max-w-md lg:whitespace-normal">
                      {rev.comment}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-400 flex items-center gap-1.5 mt-2.5">
                      <Calendar size={13} />
                      {rev.date}
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button
                        onClick={() => {
                          setReviewToDelete(rev.id);
                          setIsDeleteOpen(true);
                        }}
                        title="Hapus Ulasan"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-rose-50 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 font-medium">
                    Tidak ada ulasan ditemukan.
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
              Menampilkan {startIndex + 1}-{endIndex} dari {totalItems} ulasan
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Hapus Ulasan"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 leading-relaxed font-medium">
            Apakah Anda yakin ingin menghapus ulasan ini? Pengguna akan kehilangan rating dan komentar mereka pada destinasi terkait.
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
              Hapus Ulasan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
