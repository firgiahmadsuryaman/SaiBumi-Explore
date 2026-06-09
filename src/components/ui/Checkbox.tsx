import React, { useId } from "react";

/**
 * Properti untuk komponen Checkbox.
 */
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label teks di samping checkbox */
  label: string;
  /** Pesan kesalahan/error yang akan ditampilkan di bawah checkbox */
  error?: string;
}

/**
 * Komponen Checkbox untuk pilihan biner.
 */
export default function Checkbox({
  label,
  error,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={checkboxId}
          className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50 cursor-pointer ${className}`}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium text-gray-700 cursor-pointer select-none"
        >
          {label}
        </label>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
