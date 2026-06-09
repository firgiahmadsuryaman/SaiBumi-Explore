"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import { ArrowLeft, Upload, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreateDestinationPage() {
  const router = useRouter();
  const { categories, addDestination } = useApp();

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("17:00");
  
  // Facilities state
  const availableFacilities = ["Area Parkir", "Mushola", "Toilet", "Restoran", "Spot Foto", "Penginapan"];
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // Gallery states (mocking images via URLs)
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
  ]);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setSelectedFacilities([...selectedFacilities, facility]);
    } else {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    }
  };

  const addImage = () => {
    if (imageUrlInput && imageUrlInput.startsWith("http")) {
      setImages([...images, imageUrlInput]);
      setImageUrlInput("");
    } else {
      alert("Harap masukkan URL gambar yang valid (dimulai dengan http/https)");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Nama destinasi wajib diisi";
    if (!category) newErrors.category = "Kategori wajib dipilih";
    if (!description) newErrors.description = "Deskripsi wajib diisi";
    if (!address) newErrors.address = "Alamat lengkap wajib diisi";
    if (!latitude || isNaN(Number(latitude))) newErrors.latitude = "Koordinat latitude tidak valid";
    if (!longitude || isNaN(Number(longitude))) newErrors.longitude = "Koordinat longitude tidak valid";
    if (!ticketPrice || isNaN(Number(ticketPrice))) newErrors.ticketPrice = "Harga tiket masuk wajib diisi berupa angka";
    if (!openTime) newErrors.openTime = "Jam buka wajib diisi";
    if (!closeTime) newErrors.closeTime = "Jam tutup wajib diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top or first error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Call context to add
    addDestination({
      name,
      category,
      description,
      address,
      latitude: Number(latitude),
      longitude: Number(longitude),
      ticketPrice: Number(ticketPrice),
      openTime,
      closeTime,
      facilities: selectedFacilities,
      thumbnail,
      images
    });

    router.push("/destinations");
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Back link */}
      <div className="flex items-center gap-2">
        <Link href="/destinations" className="text-gray-500 hover:text-[#0F172A] transition-colors p-1.5 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={16} />
        </Link>
        <span className="text-xs text-gray-400 font-bold">Kembali ke Daftar Destinasi</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Buat Destinasi</h1>
        <p className="text-xs text-gray-400 font-semibold">
          Isi formulir di bawah ini untuk mendaftarkan tempat wisata baru di platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Section 1: Informasi Dasar */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5">
          <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
            Informasi Dasar
          </h2>

          <Input
            label="Nama Destinasi Wisata *"
            placeholder="Masukkan nama destinasi"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            error={errors.name}
          />

          <Select
            label="Kategori Wisata *"
            options={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
            placeholder="Pilih kategori"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setErrors((prev) => ({ ...prev, category: "" }));
            }}
            error={errors.category}
          />

          <Textarea
            label="Deskripsi Wisata *"
            placeholder="Jelaskan daya tarik destinasi, sejarah singkat, dan info lainnya..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            error={errors.description}
          />
        </div>

        {/* Section 2: Lokasi */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5">
          <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
            Lokasi Geografis
          </h2>

          <Textarea
            label="Alamat Lengkap *"
            placeholder="Nama jalan, kecamatan, kabupaten, Lampung..."
            rows={2}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
            error={errors.address}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude *"
              placeholder="Contoh: -5.7654"
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
                setErrors((prev) => ({ ...prev, latitude: "" }));
              }}
              error={errors.latitude}
            />
            <Input
              label="Longitude *"
              placeholder="Contoh: 104.9876"
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
                setErrors((prev) => ({ ...prev, longitude: "" }));
              }}
              error={errors.longitude}
            />
          </div>
        </div>

        {/* Section 3: Operasional & Biaya */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5">
          <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
            Jam Operasional & Tiket Masuk
          </h2>

          <Input
            label="Harga Tiket Masuk (IDR) *"
            placeholder="Masukkan harga tiket (isi 0 jika gratis)"
            value={ticketPrice}
            onChange={(e) => {
              setTicketPrice(e.target.value);
              setErrors((prev) => ({ ...prev, ticketPrice: "" }));
            }}
            error={errors.ticketPrice}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Jam Buka *"
              type="time"
              value={openTime}
              onChange={(e) => {
                setOpenTime(e.target.value);
                setErrors((prev) => ({ ...prev, openTime: "" }));
              }}
              error={errors.openTime}
            />
            <Input
              label="Jam Tutup *"
              type="time"
              value={closeTime}
              onChange={(e) => {
                setCloseTime(e.target.value);
                setErrors((prev) => ({ ...prev, closeTime: "" }));
              }}
              error={errors.closeTime}
            />
          </div>
        </div>

        {/* Section 4: Fasilitas */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5">
          <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">4</span>
            Fasilitas Tersedia
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableFacilities.map((facility) => (
              <Checkbox
                key={facility}
                label={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={(e) => handleFacilityChange(facility, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Section 5: Galeri & Thumbnail */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5">
          <h2 className="text-sm font-bold text-[#0F172A] pb-3 border-b border-gray-50 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">5</span>
            Galeri Foto Wisata
          </h2>

          {/* Thumbnail URL */}
          <Input
            label="URL Foto Utama (Thumbnail)"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Masukkan URL foto utama"
          />
          <div className="mt-2 flex items-center gap-4">
            <img
              src={thumbnail || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"}
              alt="Thumbnail preview"
              className="w-24 h-24 rounded-lg object-cover border border-gray-200"
              onError={(e) => {
                // fall back
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1471922639839-be7462f54e5e?auto=format&fit=crop&w=600&q=80";
              }}
            />
            <span className="text-xs text-gray-400 font-medium">Pratinjau Foto Utama (Berdasarkan URL)</span>
          </div>

          <div className="h-[1px] bg-gray-100 my-2" />

          {/* Multiple Images URL */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#0F172A]">Galeri Foto Tambahan</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Masukkan URL foto galeri tambahan"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
              />
              <Button type="button" variant="outline" onClick={addImage} className="flex items-center gap-1 text-xs py-2 px-3">
                <Plus size={14} />
                Tambah
              </Button>
            </div>
          </div>

          {/* Preview gallery */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <Link href="/destinations">
            <Button type="button" variant="outline" className="py-2.5 px-5 font-semibold text-sm">
              Batal
            </Button>
          </Link>
          <Button type="submit" variant="primary" className="py-2.5 px-6 font-semibold text-sm">
            Simpan Destinasi
          </Button>
        </div>
      </form>
    </div>
  );
}
