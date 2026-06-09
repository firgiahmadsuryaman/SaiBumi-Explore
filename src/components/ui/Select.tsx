import React, { useId } from "react";

/**
 * Opsi dropdown untuk komponen Select.
 */
interface SelectOption {
  /** Nilai internal opsi */
  value: string;
  /** Label tampilan visual opsi */
  label: string;
}

/**
 * Properti untuk komponen Select.
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Label teks di atas field select */
  label?: string;
  /** Daftar opsi dropdown */
  options: SelectOption[];
  /** Pesan kesalahan/error yang akan ditampilkan di bawah field select */
  error?: string;
  /** Teks penampung default saat tidak ada opsi terpilih */
  placeholder?: string;
}

/**
 * Komponen Dropdown Select dengan dukungan label.
 */
export default function Select({
  label,
  options,
  error,
  placeholder,
  className = "",
  id,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-[#0F172A]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-3 py-2 border rounded-lg text-sm text-[#0F172A] bg-white border-gray-200 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50 focus:shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
