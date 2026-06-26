// app/dashboard/finance/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Cari Hesap Verisi (Normalde API'den gelecek)
const dummyAccounts = [
  { id: "CAR-001", company: "Acme Teknoloji A.Ş.", type: "Müşteri", balance: 145000, currency: "TL", lastTransaction: "24.06.2026", status: "Receivable" },
  { id: "CAR-002", company: "Lojistik Global Ltd.", type: "Tedarikçi", balance: -82400, currency: "TL", lastTransaction: "25.06.2026", status: "Payable" },
  { id: "CAR-003", company: "Nova Mimarlık Grubu", type: "Müşteri", balance: 0, currency: "TL", lastTransaction: "18.05.2026", status: "Balanced" },
  { id: "CAR-004", company: "Delta Enerji Çözümleri", type: "Tedarikçi", balance: -12500, currency: "TL", lastTransaction: "26.06.2026", status: "Payable" },
];

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Basit para formatlayıcı yardımcı fonksiyon
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(val);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Finans & Cari Hesaplar</h1>
          <p className="text-sm text-gray-500">Müşteri ve tedarikçi cari hesaplarını, borç/alacak bakiyelerini ve finansal durumunuzu yönetin.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Yeni Cari Kart Aç
          </button>
        </div>
      </div>

      ---

      {/* FİNANSAL ÖZET KARTLARI (KPI) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kasa & Banka */}
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Kasa & Banka Toplamı</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(620500)}</p>
          </div>
        </div>

        {/* Toplam Alacak */}
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Toplam Alacak (Müşteriler)</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(145000)}</p>
          </div>
        </div>

        {/* Toplam Borç */}
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Toplam Borç (Tedarikçiler)</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(94900)}</p>
          </div>
        </div>
      </div>

      ---

      {/* FİLTRELEME VE ARAMA */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Firma adı veya kod ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/></svg>
          Gelişmiş Filtre
        </button>
      </div>

      {/* CARİ HESAPLAR TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Cari Kodu</th>
                <th className="py-3 px-4">Firma / Ünvan</th>
                <th className="py-3 px-4">Hesap Türü</th>
                <th className="py-3 px-4">Son İşlem Tarihi</th>
                <th className="py-3 px-4 text-right">Güncel Bakiye</th>
                <th className="py-3 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {dummyAccounts
                .filter(acc => acc.company.toLowerCase().includes(searchTerm.toLowerCase()) || acc.id.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((acc) => (
                  <tr key={acc.id} className="hover:bg-gray-50/70 transition-colors">
                    
                    {/* Cari Kod */}
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-500">
                      {acc.id}
                    </td>

                    {/* Firma Adı */}
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      {acc.company}
                    </td>

                    {/* Hesap Türü Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        acc.type === "Müşteri" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-orange-50 text-orange-700 border-orange-200"
                      }`}>
                        {acc.type}
                      </span>
                    </td>

                    {/* Son İşlem Tarihi */}
                    <td className="py-3.5 px-4 text-gray-500">
                      {acc.lastTransaction}
                    </td>

                    {/* Dinamik Bakiye Alanı */}
                    <td className="py-3.5 px-4 text-right font-semibold">
                      {acc.balance > 0 && (
                        <span className="text-emerald-600">+{formatCurrency(acc.balance)}</span>
                      )}
                      {acc.balance < 0 && (
                        <span className="text-red-600">{formatCurrency(acc.balance)}</span>
                      )}
                      {acc.balance === 0 && (
                        <span className="text-gray-400">{formatCurrency(acc.balance)}</span>
                      )}
                    </td>

                    {/* Hızlı Aksiyonlar */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        {/* Ekstre (Rapor) Butonu */}
                        <button title="Hesap Ekstresi Al" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                        </button>
                        {/* Tahsilat/Ödeme (Dolar-TL) Ekle Butonu */}
                        <button title="İşlem Ekle" className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* TABLO ALTI SAYFALAMA */}
        <div className="p-4 border-t bg-gray-50/50 flex justify-between items-center text-xs text-gray-500">
          <span>Toplam {dummyAccounts.length} cariden 1-4 arası gösteriliyor</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Önceki</button>
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Sonraki</button>
          </div>
        </div>
      </div>

    </div>
  );
}