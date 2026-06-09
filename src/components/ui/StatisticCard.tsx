import React from "react";

/**
 * Properti untuk komponen StatisticCard.
 */
interface StatisticCardProps {
  /** Judul metrik statistik */
  title: string;
  /** Nilai statistik yang ditampilkan */
  value: string | number;
  /** Ikon Lucide React atau elemen node visual lainnya */
  icon: React.ReactNode;
  /** Kelas latar belakang warna kontainer ikon (contoh: bg-blue-50) */
  iconBgColor?: string;
  /** Kelas warna ikon teks (contoh: text-blue-600) */
  iconColor?: string;
  /** Nilai tren persentase atau perubahan (contoh: + 12%) */
  trend?: string;
  /** Arah panah tren untuk menentukan styling warna */
  trendDirection?: "up" | "down" | "neutral";
  /** Deskripsi tambahan yang mendampingi tren */
  subtext?: string;
}

/**
 * Kartu Statistik untuk menampilkan ringkasan metrik dashboard.
 */
export default function StatisticCard({
  title,
  value,
  icon,
  iconBgColor = "bg-blue-50",
  iconColor = "text-primary",
  trend,
  trendDirection = "up",
  subtext = "dari bulan lalu"
}: StatisticCardProps) {
  const trendColor = {
    up: "text-emerald-600 bg-emerald-50",
    down: "text-rose-600 bg-rose-50",
    neutral: "text-gray-600 bg-gray-50"
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {title}
          </span>
          <span className="text-2xl font-bold text-[#0F172A]">
            {value}
          </span>
        </div>
        <div className={`p-2.5 rounded-lg ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 text-xs">
          <span className={`px-1.5 py-0.5 rounded-md font-semibold ${trendColor[trendDirection]}`}>
            {trend}
          </span>
          <span className="text-gray-400 font-medium">
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
}
