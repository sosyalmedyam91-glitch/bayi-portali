// app/dashboard/announcements/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Duyuru Verisi (Normalde API'den veya DB'den gelecek)
const dummyAnnouncements = [
  { id: "ANC-001", title: "Kurban Bayramı Resmi Tatil Duyurusu", content: "Şirketimiz, Kurban Bayramı resmi tatili sebebiyle 27 Haziran Cumartesi gününden itibaren 1 Temmuz Çarşamba akşamına kadar kapalı olacaktır. Tüm personellerimizin bilgisine sunar, iyi tatiller dileriz.", category: "İK / İzin", date: "26.06.2026", author: "İnsan Kaynakları Direktörlüğü", isPinned: true },
  { id: "ANC-002", title: "Yeni ERP Güncellemesi Eğitim Semineri", content: "Sisteme yeni eklenen finans ve raporlama modüllerinin kullanımına ilişkin, 3 Temmuz Cuma günü saat 14:00'te Zoom üzerinden online eğitim düzenlenecektir. Katılım zorunludur.", category: "Eğitim / Teknoloji", date: "24.06.2026", author: "Bilgi İşlem Departmanı", isPinned: true },
  { id: "ANC-003", title: "Yaz Dönemi Mesai Saatleri Düzenlemesi", content: "1 Temmuz itibarıyla yaz dönemi çalışma saatlerimiz sabah 08:30 - akşam 17:30 olarak güncellenmiştir. Servis kalkış saatleri bu düzene göre yeniden organize edilmiştir.", category: "Genel", date: "20.06.2026", author: "Genel Yönetim", isPinned: false },
  { id: "ANC-004", title: "Q2 Hedef Başarı Teşekkürü", content: "İkinci çeyrek satış hedeflerimizi %120 oranında aşarak kapatmış bulunuyoruz. Bu süreçte emeği geçen tüm saha ve merkez ofis ekibimize teşekkür ederiz.", category: "Şirket İçi", date: "15.06.2026", author: "CEO Ofisi", isPinned: false },
];

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE YENİ DUYURU OLUŞTURMA AKSİYONU */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Duyurular & Panolar</h1>
          <p className="text-sm text-gray-500">Şirket genelindeki resmi bilgilendirmeleri, tatil yönetimlerini ve departman duyurularını takip edin.</p>
        </div>
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {/* Kalem/Yazı İkonu */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Yeni Duyuru Yayınla
        </button>
      </div>

      ---

      {/* ARAMA VE KATEGORİ FİLTRESİ */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Duyurularda ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto text-sm border rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="İK / İzin">İK / İzin</option>
            <option value="Eğitim / Teknoloji">Eğitim / Teknoloji</option>
            <option value="Genel">Genel</option>
            <option value="Şirket İçi">Şirket İçi</option>
          </select>
        </div>
      </div>

      {/* DUYURU AKIŞI (FEED) */}
      <div className="space-y-4">
        {dummyAnnouncements
          .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter(a => selectedCategory === "all" || a.category === selectedCategory)
          .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1)) // Sabitlenenleri en üste taşı
          .map((announcement) => (
            <div 
              key={announcement.id} 
              className={`p-5 bg-white border rounded-xl shadow-sm space-y-3 relative transition-all hover:border-gray-300 ${
                announcement.isPinned ? "border-amber-200 bg-amber-50/5 ring-1 ring-amber-100" : ""
              }`}
            >
              {/* Duyuru Üst Bilgi Satırı */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Kategori Etiketi */}
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                    announcement.category.includes("İK") ? "bg-purple-50 text-purple-700 border border-purple-100" :
                    announcement.category.includes("Eğitim") ? "bg-blue-50 text-blue-700 border border-blue-100" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {announcement.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{announcement.id}</span>
                </div>

                {/* Sabitlenme (Pin) Durumu & Tarih */}
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  {announcement.isPinned && (
                    <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold">
                      {/* Raptiye İkonu */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.12-2.6A2 2 0 0 1 16 10.16V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6.16a2 2 0 0 1-.44 1.24l-2.12 2.6a2 2 0 0 0-.44 1.24Z"/></svg>
                      Sabitlendi
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {announcement.date}
                  </span>
                </div>
              </div>

              {/* Duyuru Başlık ve İçerik */}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {announcement.content}
                </p>
              </div>

              {/* Alt Bilgi (Yazar / Departman) */}
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 bg-gray-200 rounded-full flex items-center justify-center text-[9px] font-bold text-gray-600">
                    {announcement.author[0]}
                  </div>
                  <span>{announcement.author}</span>
                </div>
                
                {/* Yönetimsel Hızlı Aksiyonlar */}
                <div className="flex gap-2">
                  <button title="Duyuruyu Düzenle" className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  </button>
                  <button title="Kaldır" className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
      </div>

    </div>
  );
}