// app/dashboard/documents/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Döküman Verisi (Normalde API'den gelecek)
const dummyDocuments = [
  { id: "DOC-091", title: "EYS-50 Kullanım Kılavuzu", category: "Üretim / Teknik", size: "2.4 MB", type: "PDF", updatedAt: "15.06.2026", owner: "Ahmet Yılmaz" },
  { id: "DOC-092", title: "Satış Sözleşmesi Şablonu v3", category: "Hukuk / Sözleşmeler", size: "412 KB", type: "DOCX", updatedAt: "22.06.2026", owner: "Elif Kaya" },
  { id: "DOC-093", title: "GK3000 Garanti Sözleşmesi", category: "Hukuk / Sözleşmeler", size: "8.1 MB", type: "XLSX", updatedAt: "24.06.2026", owner: "Can Demir" },
  { id: "DOC-094", title: "Fabrika Bakım Kılavuzu", category: "Üretim / Teknik", size: "14.2 MB", type: "PDF", updatedAt: "10.05.2026", owner: "Murat Avcı" },
];

export default function DocumentCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Döküman Merkezi</h1>
          <p className="text-sm text-[#53575A]">Kurumsal dökümanları, kılavuzları ve şablonları güvenli bir şekilde depolayın ve paylaşın.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            {/* Yükle (Upload) İkonu */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Yeni Dosya Yükle
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* HIZLI KATEGORİ ÖZET KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Tüm Dökümanlar</p>
            <p className="text-2xl font-bold text-gray-900">142</p>
          </div>
          <div className="p-3 bg-gray-50 text-[#53575A] rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Finans & Hukuk</p>
            <p className="text-2xl font-bold text-[#EA0029]">38</p>
          </div>
          <div className="p-3 bg-[rgba(234,0,41,0.06)] text-[#EA0029] rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">İK & Yönetmelik</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="p-3 bg-gray-100 text-[#53575A] rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Son 30 Gün</p>
            <p className="text-2xl font-bold text-[#EA0029]">+12 Yeni</p>
          </div>
          <div className="p-3 bg-[rgba(234,0,41,0.06)] text-[#EA0029] rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* FİLTRELEME VE ARAMA BAR BARBARI */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          {/* Arama İkonu */}
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Döküman adı veya kategori ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-[#53575A] bg-white hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/></svg>
            Filtrele
          </button>
        </div>
      </div>

      {/* DÖKÜMAN TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[#53575A] text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Döküman Adı</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Boyut / Tür</th>
                <th className="py-3 px-4">Yükleyen</th>
                <th className="py-3 px-4">Son Güncelleme</th>
                <th className="py-3 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {dummyDocuments
                .filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.category.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/70 transition-colors">
                    
                    {/* Döküman Adı ve Tür İkonu */}
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          doc.type === "PDF" ? "bg-red-50 text-red-600" :
                          doc.type === "DOCX" ? "bg-[rgba(234,0,41,0.06)] text-[#EA0029]" : "bg-gray-100 text-[#53575A]"
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                        <div>
                          <div className="text-gray-900">{doc.title}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">{doc.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-[#53575A]">
                        {doc.category}
                      </span>
                    </td>

                    {/* Boyut ve Tür */}
                    <td className="py-3.5 px-4 text-[#53575A]">
                      <div>{doc.size}</div>
                      <div className="text-xs text-gray-400 uppercase font-semibold">{doc.type}</div>
                    </td>

                    {/* Sahibi / Yükleyen */}
                    <td className="py-3.5 px-4 text-gray-700 font-medium">
                      {doc.owner}
                    </td>

                    {/* Son Güncelleme */}
                    <td className="py-3.5 px-4 text-[#53575A]">
                      {doc.updatedAt}
                    </td>

                    {/* Aksiyonlar */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        {/* İndir Butonu */}
                        <button title="İndir" className="p-1.5 text-[#53575A] hover:text-[#EA0029] hover:bg-[rgba(234,0,41,0.06)] rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        </button>
                        {/* Paylaş Butonu */}
                        <button title="Paylaş" className="p-1.5 text-[#53575A] hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        </button>
                        {/* Sil Butonu */}
                        <button title="Sil" className="p-1.5 text-[#53575A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* TABLO ALTI SAYFALAMA */}
        <div className="p-4 border-t bg-gray-50/50 flex justify-between items-center text-xs text-[#53575A]">
          <span>Toplam {dummyDocuments.length} dökümandan 1-4 arası gösteriliyor</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Önceki</button>
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Sonraki</button>
          </div>
        </div>
      </div>

    </div>
  );
}