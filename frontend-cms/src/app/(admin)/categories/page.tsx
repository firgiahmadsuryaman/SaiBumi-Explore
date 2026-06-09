"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { FolderOpen, Plus, Edit, Trash2, Tag, Trophy } from "lucide-react";
import { Category } from "@/types";

// Halaman kelola kategori wisata: Statistik dan tabel CRUD
export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selected/Form states
  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  // Find most popular category
  const popularCategory = [...categories].sort((a, b) => b.totalDestinations - a.totalDestinations)[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      alert("Nama kategori tidak boleh kosong");
      return;
    }
    addCategory(newCatName.trim());
    setNewCatName("");
    setIsCreateOpen(false);
  };

  const handleEditClick = (cat: Category) => {
    setEditingCat(cat);
    setEditingName(cat.name);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingName.trim()) {
      alert("Nama kategori tidak boleh kosong");
      return;
    }
    if (editingCat) {
      updateCategory(editingCat.id, editingName.trim());
      setIsEditOpen(false);
      setEditingCat(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingCatId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingCatId) {
      deleteCategory(deletingCatId);
      setIsDeleteOpen(false);
      setDeletingCatId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Manajemen Kategori</h1>
          <p className="text-xs text-gray-400 font-semibold">
            Kelola klasifikasi destinasi wisata di sistem.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          variant="primary"
          className="flex items-center gap-2 font-semibold text-xs py-2 px-3 shadow-sm"
        >
          <Plus size={16} />
          Tambah Kategori
        </Button>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Stats & Ringkasan */}
        <div className="flex flex-col gap-5">
          {/* Total Kategori Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-primary">
              <FolderOpen size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Kategori</span>
              <span className="text-2xl font-bold text-[#0F172A]">{categories.length}</span>
            </div>
          </div>

          {/* Popular Category Card */}
          {popularCategory && (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-500">
                  <Trophy size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kategori Terpopuler</span>
                  <span className="text-sm font-bold text-[#0F172A]">{popularCategory.name}</span>
                </div>
              </div>
              <div className="h-[1px] bg-gray-100" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Total Destinasi</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {popularCategory.totalDestinations} Destinasi
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Categories Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 bg-gray-50/20">
            <h2 className="text-sm font-bold text-[#0F172A]">Daftar Klasifikasi Destinasi</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 bg-gray-50/50">
                  <th className="py-4 px-5 font-semibold text-center w-16">No</th>
                  <th className="py-4 px-3 font-semibold">Nama Kategori</th>
                  <th className="py-4 px-3 font-semibold text-center">Total Destinasi</th>
                  <th className="py-4 px-5 font-semibold text-center w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {categories.map((cat, i) => (
                  <tr key={cat.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-3.5 px-5 text-center font-bold text-gray-400">
                      {i + 1}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#0F172A] flex items-center gap-2">
                      <Tag size={14} className="text-gray-400" />
                      {cat.name}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-sky-50 text-primary">
                        {cat.totalDestinations} Destinasi
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditClick(cat)}
                          title="Ubah"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-secondary hover:bg-teal-50 transition-all"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(cat.id)}
                          title="Hapus"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Tambah Kategori Baru"
      >
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
          <Input
            label="Nama Kategori *"
            placeholder="Contoh: Wisata Alam, Sejarah..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <div className="flex justify-end gap-2.5 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              className="py-1.5 px-3 font-semibold text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="py-1.5 px-4 font-semibold text-xs"
            >
              Simpan Kategori
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Ubah Nama Kategori"
      >
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
          <Input
            label="Nama Kategori *"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
          <div className="flex justify-end gap-2.5 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="py-1.5 px-3 font-semibold text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="py-1.5 px-4 font-semibold text-xs"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Hapus Kategori"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 leading-relaxed">
            Apakah Anda yakin ingin menghapus kategori ini? Destinasi yang dikaitkan dengan kategori ini tidak akan terhapus, tetapi kategorinya akan hilang.
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
              Hapus Kategori
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
