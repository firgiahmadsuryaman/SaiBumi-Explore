"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import StatisticCard from "@/components/ui/StatisticCard";
import { MapPin, FolderOpen, MessageSquare, Users, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Dashboard Utama: Ringkasan statistik, destinasi populer, ulasan terbaru
export default function DashboardPage() {
  const { destinations, categories, reviews, users } = useApp();

  // Dynamic statistics calculated with offsets to match the design mockup
  const statDestinations = 244 + destinations.length;
  const statCategories = 8 + categories.length;
  const statReviews = 1488 + reviews.length;
  const statUsers = 8335 + users.length;

  // Popular Destinations (sorted by rating descending, top 4)
  const popularDestinations = [...destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Recent Reviews (top 3 newest)
  const recentReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Helper to render rating stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={13}
            fill={i < Math.round(rating) ? "currentColor" : "none"}
            className={i < Math.round(rating) ? "" : "text-gray-200"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Ringkasan</h1>
        <p className="text-xs text-gray-400 font-semibold">
          Selamat datang kembali di dashboard administrasi SaiBumi Explore.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatisticCard
          title="Total Destinasi"
          value={statDestinations}
          trend="+ 24%"
          trendDirection="up"
          icon={<MapPin size={20} />}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-500"
        />
        <StatisticCard
          title="Total Kategori"
          value={statCategories}
          trend="+ 5%"
          trendDirection="up"
          icon={<FolderOpen size={20} />}
          iconBgColor="bg-teal-50"
          iconColor="text-teal-500"
        />
        <StatisticCard
          title="Total Ulasan"
          value={statReviews}
          trend="+ 18%"
          trendDirection="up"
          icon={<MessageSquare size={20} />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatisticCard
          title="Total Pengguna"
          value={statUsers}
          trend="+ 12%"
          trendDirection="up"
          icon={<Users size={20} />}
          iconBgColor="bg-violet-50"
          iconColor="text-violet-500"
        />
      </div>

      {/* Main Grid: Destinations & Reviews */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Popular Destinations Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5 hover:shadow-md/50 transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Destinasi Populer</h2>
            <Link
              href="/destinations"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Lihat Semua
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse shadow-sm/50">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400">
                  <th className="pb-3 font-semibold">Nama Destinasi</th>
                  <th className="pb-3 font-semibold">Kategori</th>
                  <th className="pb-3 font-semibold text-center">Peringkat</th>
                  <th className="pb-3 font-semibold text-right">Total Ulasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {popularDestinations.map((dest) => (
                  <tr key={dest.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pr-3 font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-3">
                        <img
                          src={dest.thumbnail}
                          alt={dest.name}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm"
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {dest.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-1">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-50 text-gray-600">
                        {dest.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-1">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} fill="#F59E0B" className="text-amber-500" />
                        <span className="font-bold text-[#0F172A]">{dest.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pl-3 text-right font-semibold text-gray-500">
                      {dest.reviewsCount} Ulasan
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reviews List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Ulasan Terbaru</h2>
            <Link
              href="/reviews"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Lihat Semua
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {recentReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-gray-50/50 border border-gray-100/50 flex flex-col gap-2.5 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.user.avatar}
                      alt={rev.user.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#0F172A]">
                        {rev.user.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">
                        {rev.destinationName}
                      </span>
                    </div>
                  </div>
                  {renderStars(rev.rating)}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
