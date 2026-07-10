"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";

interface UserFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    department?: string;
  };
}

export default function UserEditForm({ user }: UserFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(user.role as UserRole);
  const [isActive, setIsActive] = useState(user.isActive);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, isActive }),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Kullanıcı başarıyla güncellendi!",
        });
        router.refresh(); // Arkadaki verileri tazelemek için
      } else {
        setMessage({
          type: "error",
          text: "Güncelleme sırasında bir hata oluştu.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Sistem hatası meydana geldi." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold border ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profil Özet Alanı */}
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="h-14 w-14 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 border border-gray-300">
          {user.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">
            {user.name ?? "-"}
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {user.department ?? "Departman Atanmamış"}
          </p>
        </div>
      </div>

      {/* Bilgiler Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">
            E-posta Adresi
          </span>
          <div className="p-2.5 bg-gray-50 rounded-lg border text-gray-700 font-mono text-xs select-all">
            {user.email}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase">
            Sistem Benzersiz ID (GUID)
          </span>
          <div className="p-2.5 bg-gray-50 rounded-lg border text-gray-500 font-mono text-xs select-all">
            {user.id}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Yönetim / Atama Alanı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rol Atama */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase">
            Yetki Rolü Atayın
          </label>
          <p className="text-xs text-gray-400">
            Kullanıcının sistem içerisindeki erişim seviyesini belirler.
          </p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full p-2.5 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-red-500/20 focus:border-[#EA0029] transition-all outline-none"
          >
            <option value="SUPER_ADMIN">👑 Super Admin</option>

            <option value="ADMIN">🛠️ Admin</option>

            <option value="SPECIALIST">👤 Specialist</option>
          </select>
        </div>

        {/* Durum Değiştirme */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase">
            Hesap Durumu
          </label>
          <select
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
            className="w-full p-2.5 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-red-500/20 focus:border-[#EA0029] transition-all outline-none"
          >
            <option value="true">Aktif (Sisteme Giriş Yapabilir)</option>
            <option value="false">Pasif (Erişimi Engelle)</option>
          </select>
        </div>
      </div>

      {/* Aksiyon Butonu */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#EA0029] hover:bg-[#c40022] disabled:bg-gray-300 text-white font-medium text-xs rounded-lg transition-colors shadow-sm uppercase tracking-wider"
        >
          {loading ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </div>
  );
}
