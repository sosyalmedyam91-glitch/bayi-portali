// app/dashboard/users/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Kullanıcı Verisi (Normalde API'den gelecek)
const dummyUsers = [
  { id: "USR-001", name: "Ahmet Yılmaz", email: "ahmet.yilmaz@company.com", department: "Finans", role: "Yönetici (Admin)", lastSeen: "Çevrimiçi", status: "Active" },
  { id: "USR-002", name: "Elif Kaya", email: "elif.kaya@company.com", department: "Pazarlama", role: "Editör", lastSeen: "2 saat önce", status: "Active" },
  { id: "USR-003", name: "Can Demir", email: "can.demir@company.com", department: "Bilgi İşlem", role: "Teknik Personel", lastSeen: "24.06.2026", status: "Active" },
  { id: "USR-004", name: "Zeynep Aslan", email: "zeynep.aslan@company.com", department: "İnsan Kaynakları", role: "İzleyici (Viewer)", lastSeen: "12.05.2026", status: "Suspended" },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-sm text-gray-500">Sistem erişimi olan personelleri yönetin, roller atayın ve hesap durumlarını denetleyin.</p>
        </div>
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {/* Kullanıcı Ekle İkonu */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          Yeni Kullanıcı Davet Et
        </button>
      </div>

      ---

      {/* KULLANICI İSTATİSTİKLERİ ÖZETİ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Toplam Personel</p>
            <p className="text-2xl font-bold text-gray-900">{dummyUsers.length}</p>
          </div>
          <div className="p-3 bg-gray-50 text-gray-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Aktif Kullanıcı</p>
            <p className="text-2xl font-bold text-emerald-600">
              {dummyUsers.filter(u => u.status === "Active").length}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Çevrimiçi Şu An</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <span className="relative flex h-3 w-3 m-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Askıya Alınanlar</p>
            <p className="text-2xl font-bold text-red-600">
              {dummyUsers.filter(u => u.status === "Suspended").length}
            </p>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
          </div>
        </div>
      </div>

      ---

      {/* FİLTRELEME VE ARAMA KONTROLLERİ */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="İsim veya e-posta ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Departman Seçim Select Alanı */}
        <div className="w-full sm:w-auto">
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full sm:w-auto text-sm border rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Departmanlar</option>
            <option value="Finans">Finans</option>
            <option value="Pazarlama">Pazarlama</option>
            <option value="Bilgi İşlem">Bilgi İşlem</option>
            <option value="İnsan Kaynakları">İnsan Kaynakları</option>
          </select>
        </div>
      </div>

      {/* KULLANICI TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Kullanıcı Bilgisi</th>
                <th className="py-3 px-4">Departman</th>
                <th className="py-3 px-4">Sistem Rolü</th>
                <th className="py-3 px-4">Son Görülme</th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4 text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {dummyUsers
                .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(u => selectedDept === "all" || u.department === selectedDept)
                .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                    
                    {/* Kullanıcı Profil (İsim & E-posta) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-700 text-xs">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-400 font-mono">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Departman */}
                    <td className="py-3.5 px-4 text-gray-600">
                      {user.department}
                    </td>

                    {/* Sistem Rolü (Badge) */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.role.includes("Admin") ? "bg-red-50 text-red-700 border border-red-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Son Görülme */}
                    <td className="py-3.5 px-4 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        {user.lastSeen === "Çevrimiçi" && (
                          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
                        )}
                        {user.lastSeen}
                      </div>
                    </td>

                    {/* Hesap Durumu */}
                    <td className="py-3.5 px-4">
                      {user.status === "Active" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                          Askıda
                        </span>
                      )}
                    </td>

                    {/* İşlemler Menüsü */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        {/* İzinleri Düzenle Key İkonu */}
                        <button title="Erişim Yetkilerini Düzenle" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="m21 11.5-1.5-1.5a2.5 2.5 0 0 0-3.5 0L4 22H2v-2l12-12"/></svg>
                        </button>
                        {/* Askıya Al / Engelle İkonu */}
                        <button 
                          title={user.status === "Active" ? "Hesabı Askıya Al" : "Hesabı Aktif Et"} 
                          className={`p-1.5 rounded-md transition-colors ${
                            user.status === "Active" ? "text-gray-500 hover:text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
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
  );
}