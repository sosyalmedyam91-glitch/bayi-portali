"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  department?: string;
  lastLoginAt?: string | null;
}

interface ComponentProps {
  initialUsers: ApiUser[];
}

export default function KullaniciListesiIcerik({
  initialUsers,
}: ComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Filtreleme Mantığı (Arama kutusuna göre)
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return initialUsers;

    return initialUsers.filter((user) => {
      const nameMatch = user.name?.toLowerCase().includes(term);
      const emailMatch = user.email?.toLowerCase().includes(term);
      const deptMatch = user.department?.toLowerCase().includes(term);
      return nameMatch || emailMatch || deptMatch;
    });
  }, [searchTerm, initialUsers]);

  // 2. Departmanlara Göre Gruplama
  const groupedUsers = useMemo(() => {
    const groups: { [key: string]: ApiUser[] } = {};
    filteredUsers.forEach((user) => {
      const deptName = user.department || "Departman Atanmamış";
      if (!groups[deptName]) {
        groups[deptName] = [];
      }
      groups[deptName].push(user);
    });
    return groups;
  }, [filteredUsers]);

  const sortedDepartments = useMemo(() => {
    return Object.keys(groupedUsers).sort();
  }, [groupedUsers]);

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-50 text-purple-700 border border-purple-200 font-bold";
      case "ADMIN":
        return "bg-blue-50 text-blue-700 border border-blue-200 font-semibold";
      case "SPECIALIST":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Admin";

      case "ADMIN":
        return "Admin";

      case "SPECIALIST":
        return "Specialist";

      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* ÖZET İSTATİSTİK KUTULARI (Filtrelenmiş veriye göre anlık güncellenir) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 border rounded-xl shadow-sm flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#53575A]">
            Toplam Gösterilen
          </span>
          <strong className="text-3xl font-bold text-gray-900 mt-1">
            {filteredUsers.length}
          </strong>
        </div>
        <div className="p-4 bg-gray-50 border rounded-xl shadow-sm flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#53575A]">
            Aktif Departman
          </span>
          <strong className="text-3xl font-bold text-gray-900 mt-1">
            {
              Object.keys(groupedUsers).filter(
                (k) => k !== "Departman Atanmamış",
              ).length
            }
          </strong>
        </div>
        <div className="p-4 bg-white border rounded-xl shadow-sm flex flex-col ring-1 ring-emerald-500/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Aktif Personel
          </span>
          <strong className="text-3xl font-bold text-emerald-600 mt-1">
            {filteredUsers.filter((u) => u.isActive !== false).length}
          </strong>
        </div>
        <div className="p-4 bg-white border rounded-xl shadow-sm flex flex-col ring-1 ring-red-500/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
            Pasif Personel
          </span>
          <strong className="text-3xl font-bold text-red-600 mt-1">
            {filteredUsers.filter((u) => u.isActive === false).length}
          </strong>
        </div>
      </div>

      {/* ARAMA INPUT ALANI */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="İsim, e-posta veya departman ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EA0029]/20 focus:border-[#EA0029] transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
          >
            Temizle
          </button>
        )}
      </div>

      {/* REHBER / AKORDEON YAPISI */}
      <div className="space-y-4">
        {sortedDepartments.length === 0 ? (
          <div className="p-12 text-center border border-dashed rounded-xl bg-gray-50/50 text-gray-400 text-sm">
            Arama kriterlerine uygun personel bulunamadı.
          </div>
        ) : (
          sortedDepartments.map((deptName) => (
            <details
              key={deptName}
              open={searchTerm.length > 0} // Arama yapılıyorsa akordeonları otomatik aç
              className="group border rounded-xl bg-white shadow-sm border-gray-200 overflow-hidden list-none"
            >
              <summary className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 group-open:border-gray-200 flex justify-between items-center cursor-pointer select-none hover:bg-gray-100/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EA0029]" />
                    {deptName}
                  </h2>
                </div>
                <span className="bg-gray-200/80 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {groupedUsers[deptName].length} Personel
                </span>
              </summary>

              <div className="overflow-x-auto border-t border-gray-100 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/40 border-b border-gray-100 text-[#53575A] text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-4 w-1/3">Kullanıcı Adı</th>
                      <th className="py-2.5 px-4">E-posta Adresi</th>
                      <th className="py-2.5 px-4">Yetki Rolü</th>
                      <th className="py-2.5 px-4">Durum</th>
                      <th className="py-2.5 px-4">Son Giriş</th>
                      <th className="py-2.5 px-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {groupedUsers[deptName].map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50/40 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border border-gray-200">
                              {user.name?.charAt(0).toUpperCase() ?? "?"}
                            </div>
                            <span className="font-semibold text-gray-900">
                              {user.name ?? "-"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wide ${getRoleBadgeClass(user.role)}`}
                          >
                            {getRoleLabel(user.role)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {user.isActive !== false ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                              Aktif
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-400 border border-gray-200">
                              Pasif
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#53575A]">
                          {user.lastLoginAt ? (
                            new Date(user.lastLoginAt).toLocaleDateString(
                              "tr-TR",
                            )
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/kullanicilar/${user.id}`}
                            className="inline-flex items-center text-xs font-semibold text-[#EA0029] hover:text-[#c40022] hover:underline"
                          >
                            Düzenle
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
