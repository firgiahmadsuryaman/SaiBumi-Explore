import React, { useId } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-[#0F172A]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg text-sm text-[#0F172A] bg-white border-gray-200 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary/50 disabled:bg-gray-50 disabled:cursor-not-allowed ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
