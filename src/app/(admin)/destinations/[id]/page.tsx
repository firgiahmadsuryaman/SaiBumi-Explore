"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ArrowLeft, Edit, Trash2, MapPin, Calendar, Clock, Ticket, CheckSquare, Star, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Destination } from "@/types";

// Halaman detail informasi lengkap objek wisata
export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { destinations, deleteDestination } = useApp();
  const [dest, setDest] = useState<Destination | null>(null);
  
  // Delete Confirmation Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const found = destinations.find((d) => d.id === params.id);
      if (found) {
        setDest(found);
      } else {
        router.push("/destinations");
      }
    }
  }, [params, destinations, router]);

  if (!dest) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleDelete = () => {
    deleteDestination(dest.id);
    router.push("/destinations");
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/destinations"
            className="text-gray-500 hover:text-[#0F172A] transition-colors p-1.5 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
          </Link>
          <span className="text-xs text-gray-400 font-bold">Kembali ke Daftar Destinasi</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/destinations/${dest.id}/edit`}>
            <Button variant="outline" className="flex items-center gap-1.5 font-semibold text-xs py-2 px-3">
              <Edit size={14} />
              Ubah Data
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => setIsDeleteOpen(true)}
            className="flex items-center gap-1.5 font-semibold text-xs py-2 px-3"
          >
            <Trash2 size={14} />
            Hapus Destinasi
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Images & Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Photo Banner */}
          <div className="relative h-80 w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={dest.thumbnail}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            {/* Category tag */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#0F172A] shadow-sm">
              {dest.category}
            </div>
            {/* Rating card overlay */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <Star size={16} fill="#F59E0B" className="text-amber-500" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0F172A]">{dest.rating.toFixed(1)}</span>
                <span className="text-[9px] text-gray-400 font-semibold">{dest.reviewsCount} Ulasan</span>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold text-[#0F172A]">Tentang Destinasi</h2>
            <p className="text-sm text-gray-500 leading-relaxed font-medium whitespace-pre-line">
              {dest.description}
            </p>
          </div>

          {/* Gallery Photos */}
          {dest.images && dest.images.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <ImageIcon size={18} className="text-gray-400" />
                Galeri Foto
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {dest.images.map((img, i) => (
                  <div key={i} className="group relative rounded-xl overflow-hidden border border-gray-100 aspect-video shadow-sm">
                    <img
                      src={img}
                      alt={`${dest.name} Gallery ${i}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Operational details card & Facilities */}
        <div className="flex flex-col gap-6">
          {/* Quick Info Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
            <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50">
              Informasi Singkat
            </h2>

            <div className="flex flex-col gap-4">
              {/* Ticket Price */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-sky-50 text-primary">
                  <Ticket size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tiket Masuk</span>
                  <span className="text-sm font-bold text-[#0F172A]">
                    {dest.ticketPrice === 0 ? "Gratis" : formatCurrency(dest.ticketPrice)}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                  <Clock size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Jam Operasional</span>
                  <span className="text-sm font-bold text-[#0F172A]">
                    {dest.openTime} - {dest.closeTime} WIB
                  </span>
                </div>
              </div>

              {/* Location Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Alamat</span>
                  <span className="text-xs font-semibold text-gray-500 leading-relaxed mt-0.5">
                    {dest.address}
                  </span>
                </div>
              </div>

              {/* Coordinates */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Koordinat Peta</span>
                  <span className="text-xs font-bold text-gray-500 mt-0.5">
                    {dest.latitude}, {dest.longitude}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50">
              Fasilitas Pendukung
            </h2>
            <div className="flex flex-wrap gap-2">
              {dest.facilities && dest.facilities.length > 0 ? (
                dest.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-600"
                  >
                    <CheckSquare size={13} />
                    {fac}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 font-medium">Tidak ada fasilitas terdaftar.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Konfirmasi Hapus"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 leading-relaxed">
            Apakah Anda yakin ingin menghapus destinasi wisata <strong>{dest.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
              onClick={handleDelete}
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
