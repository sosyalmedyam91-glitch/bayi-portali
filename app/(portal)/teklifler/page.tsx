// app/dashboard/quotes/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Teklif Verisi (Normalde API'den gelecek)
const dummyQuotes = [
  { id: "TEK-26-041", customer: "Acme Teknoloji A.Ş.", project: "Bulut Altyapı Göçü", amount: 320000, currency: "TL", date: "24.06.2026", validUntil: "08.07.2026", revision: 1, status: "Pending" },
  { id: "TEK-26-042", customer: "Lojistik Global Ltd.", project: "Barkod Otomasyon Donanımı", amount: 14500, currency: "EUR", date: "25.06.2026", validUntil: "25.07.2026", revision: 3, status: "Approved" },
  { id: "TEK-26-043", customer: "Nova Mimarlık Grubu", project: "Ofis Donanım Yenileme", amount: 85000, currency: "TL", date: "12.05.2026", validUntil: "26.05.2026", revision: 1, status: "Rejected" },
  { id: "TEK-26-044", customer: "Delta Enerji Çözümleri", project: "Yıllık Bakım Anlaşması", amount: 4800, currency: "USD", date: "26.06.2026", validUntil: "10.07.2026", revision: 2, status: "Pending" },
];

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Para formatlayıcı fonksiyon (Dinamik para birimi desteğiyle)
  const formatAmount = (val: number, currency: string) => {
    const locale = currency === "TL" ? "tr-TR" : "en-US";
    return new Intl.NumberFormat(locale, { 
      style: "currency", 
      currency: currency === "TL" ? "TRY" : currency,
      maximumFractionDigits: 0 
    }).format(val);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Teklif Yönetimi</h1>
          <p className="text-sm text-[#53575A]">Müşterilere sunulan fiyat tekliflerini hazırlayın, revizyonları takip edin ve onay süreçlerini yönetin.</p>
        </div>
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          {/* Dosya/Artı İkonu */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
          Yeni Teklif Oluştur
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* TEKLİF HUNİSİ (KPI METRİKLERİ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Bekleyen Teklifler</p>
            <p className="text-2xl font-bold text-amber-600">
              {dummyQuotes.filter(q => q.status === "Pending").length}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Bu Ay Onaylanan</p>
            <p className="text-2xl font-bold text-emerald-600">
              {dummyQuotes.filter(q => q.status === "Approved").length}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Açık Potansiyel Hacim</p>
            <p className="text-2xl font-bold text-gray-900">353.000 ₺</p>
          </div>
          <div className="p-3 bg-[rgba(234,0,41,0.06)] text-[#EA0029] rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Kazanma Oranı</p>
            <p className="text-2xl font-bold text-purple-600">%74.2</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 2 12 12"/><polyline points="22 7 22 2 17 2"/></svg>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* ARAMA BAR BARBARI VE DURUM FİLTRESİ */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Müşteri veya proje adı ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto text-sm border rounded-lg px-3 py-2 bg-white text-[#53575A] outline-none focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] transition-all font-medium"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Pending">Onay Bekleyenler</option>
            <option value="Approved">Onaylananlar</option>
            <option value="Rejected">Reddedilenler</option>
          </select>
        </div>
      </div>

      {/* TEKLİFLER TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[#53575A] text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Teklif No / Rev</th>
                <th className="py-3 px-4">Müşteri / Proje</th>
                <th className="py-3 px-4">Tarih / Geçerlilik</th>
                <th className="py-3 px-4 text-right">Tutar</th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {dummyQuotes
                .filter(q => q.customer.toLowerCase().includes(searchTerm.toLowerCase()) || q.project.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(q => statusFilter === "all" || q.status === statusFilter)
                .map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50/70 transition-colors">
                    
                    {/* Teklif ID ve Revizyon No */}
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <div className="font-semibold text-gray-900">{quote.id}</div>
                      <div className="text-gray-400">Revizyon: v{quote.revision}</div>
                    </td>

                    {/* Müşteri ve Proje */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{quote.customer}</div>
                      <div className="text-xs text-[#53575A]">{quote.project}</div>
                    </td>

                    {/* Teklif ve Geçerlilik Tarihi */}
                    <td className="py-3.5 px-4 text-xs text-[#53575A]">
                      <div>Teklif: {quote.date}</div>
                      <div className="text-gray-400 mt-0.5">Son Gün: {quote.validUntil}</div>
                    </td>

                    {/* Tutar */}
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                      {formatAmount(quote.amount, quote.currency)}
                    </td>

                    {/* Durum Badge */}
                    <td className="py-3.5 px-4">
                      {quote.status === "Approved" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          Onaylandı
                        </span>
                      )}
                      {quote.status === "Pending" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          Onay Bekliyor
                        </span>
                      )}
                      {quote.status === "Rejected" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          Reddedildi
                        </span>
                      )}
                    </td>

                    {/* İşlemler Menüsü */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        {/* PDF Çıktısı Al İkonu */}
                        <button title="PDF Yazdır / Gönder" className="p-1.5 text-[#53575A] hover:text-[#EA0029] hover:bg-[rgba(234,0,41,0.06)] rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        </button>
                        {/* Revizyon Yap (Kopyala/Çoğalt) İkonu */}
                        <button title="Yeni Revizyon Oluştur" className="p-1.5 text-[#53575A] hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 14 4-4-4-4"/><path d="M4 20V14a4 4 0 0 1 4-4h8"/></svg>
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