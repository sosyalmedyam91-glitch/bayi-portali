// app/dashboard/notifications/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Bildirim Verisi (Normalde API'den gelecek)
const dummyNotifications = [
  { id: "NTF-001", title: "Kritik Stok Uyarısı", message: "Laptop - Pro 15 I7 ürünü minimum stok seviyesinin (10 adet) altına düştü. Güncel stok: 5.", type: "Error", time: "10 dk önce", read: false },
  { id: "NTF-002", title: "Yeni Fatura Tahsilatı", message: "Acme Teknoloji A.Ş. cari hesabından 145.000 TL tutarında tahsilat sisteme işlendi.", type: "Success", time: "1 saat önce", read: false },
  { id: "NTF-003", title: "Sözleşme Yenileme Hatırlatması", message: "Lojistik Global Ltd. ile olan taşıma sözleşmesinin bitmesine 15 gün kaldı.", type: "Warning", time: "3 saat önce", read: true },
  { id: "NTF-004", title: "Sistem Güncellemesi", message: "ERP v2.4.0 sürümü başarıyla canlıya alındı. Yeni raporlama modülleri aktif.", type: "Info", time: "Yesterday", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [filter, setFilter] = useState("all");

  // Tek bir bildirimi okundu yapma fonksiyonu
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Tümünü okundu yapma fonksiyonu
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Filtreleme mantığı
  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    return true;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE TÜMÜNÜ OKUNDU YAP AKSİYONU */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bildirimler</h1>
          <p className="text-sm text-gray-500">Sistem uyarıları, finansal hareketler ve operasyonel güncellemelerden anında haberdar olun.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-4 py-2 rounded-lg transition-colors"
        >
          {/* Çift Tik İkonu */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5 9.5 12.5 5 8"/><path d="m22 9-7.5 7.5L13 15"/></svg>
          Tümünü Okundu İşaretle
        </button>
      </div>

      ---

      {/* FİLTRE BUTONLARI (SEKMELER) */}
      <div className="flex p-1 bg-gray-100 rounded-xl w-fit text-sm font-medium text-gray-600">
        <button 
          onClick={() => setFilter("all")} 
          className={`px-4 py-2 rounded-lg transition-all ${filter === "all" ? "bg-white text-gray-900 shadow-sm" : "hover:text-gray-900"}`}
        >
          Tüm Bildirimler ({notifications.length})
        </button>
        <button 
          onClick={() => setFilter("unread")} 
          className={`px-4 py-2 rounded-lg transition-all ${filter === "unread" ? "bg-white text-gray-900 shadow-sm" : "hover:text-gray-900"}`}
        >
          Okunmamışlar ({notifications.filter(n => !n.read).length})
        </button>
      </div>

      {/* BİLDİRİM LİSTESİ */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center p-12 bg-white border rounded-xl shadow-sm text-gray-400 space-y-2">
            <svg className="mx-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <p className="font-medium text-sm">Görüntülenecek bildirim bulunmuyor.</p>
          </div>
        ) : (
          filteredNotifications.map((ntf) => (
            <div 
              key={ntf.id} 
              className={`p-4 border rounded-xl shadow-sm flex items-start gap-4 transition-all bg-white hover:border-gray-300 ${
                !ntf.read ? "ring-1 ring-blue-100 border-blue-200 bg-blue-50/10" : ""
              }`}
            >
              {/* Dinamik Renkli Sol İkon Alanı */}
              <div className={`p-2.5 rounded-xl shrink-0 ${
                ntf.type === "Error" ? "bg-red-50 text-red-600" :
                ntf.type === "Success" ? "bg-emerald-50 text-emerald-600" :
                ntf.type === "Warning" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
              }`}>
                {ntf.type === "Error" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                {ntf.type === "Success" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                {ntf.type === "Warning" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                {ntf.type === "Info" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
              </div>

              {/* Bildirim İçeriği */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900">{ntf.title}</h4>
                    {!ntf.read && (
                      <span className="h-2 w-2 bg-blue-600 rounded-full" title="Okunmadı"></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{ntf.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{ntf.message}</p>
              </div>

              {/* Sağ Aksiyon (Okundu İşaretleme Butonu) */}
              {!ntf.read && (
                <button 
                  onClick={() => markAsRead(ntf.id)}
                  title="Okundu olarak işaretle"
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}