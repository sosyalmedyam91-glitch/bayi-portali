// app/dashboard/orders/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Sipariş Verisi (Normalde API'den gelecek)
const dummyOrders = [
  { id: "SIP-26-081", customer: "Acme Teknoloji A.Ş.", itemsCount: 3, amount: 320000, currency: "TL", date: "24.06.2026", deliveryType: "Kargo", status: "Processing" },
  { id: "SIP-26-082", customer: "Lojistik Global Ltd.", itemsCount: 12, amount: 14500, currency: "EUR", date: "25.06.2026", deliveryType: "Ambar", status: "Shipped" },
  { id: "SIP-26-083", customer: "Nova Mimarlık Grubu", itemsCount: 1, amount: 85000, currency: "TL", date: "10.05.2026", deliveryType: "Firma Teslim", status: "Delivered" },
  { id: "SIP-26-084", customer: "Delta Enerji Çözümleri", itemsCount: 5, amount: 4800, currency: "USD", date: "26.06.2026", deliveryType: "Kargo", status: "Processing" },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Para formatlayıcı fonksiyon
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sipariş Takibi</h1>
          <p className="text-sm text-gray-500">Müşteri siparişlerini onaylayın, sevk durumlarını güncelleyin ve lojistik süreçlerini izleyin.</p>
        </div>
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {/* Alışveriş Torbası/Sepet İkonu */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Yeni Sipariş Gir
        </button>
      </div>

      ---

      {/* SİPARİŞ DURUM ÖZETLERİ (KPI) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Hazırlanan Siparişler</p>
            <p className="text-2xl font-bold text-blue-600">
              {dummyOrders.filter(o => o.status === "Processing").length}
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Yoldaki Siparişler</p>
            <p className="text-2xl font-bold text-amber-600">
              {dummyOrders.filter(o => o.status === "Shipped").length}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Teslim Edilen (Bu Ay)</p>
            <p className="text-2xl font-bold text-emerald-600">
              {dummyOrders.filter(o => o.status === "Delivered").length}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Toplam Hacim</p>
            <p className="text-2xl font-bold text-gray-900">435.000 ₺</p>
          </div>
          <div className="p-3 bg-gray-50 text-gray-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
      </div>

      ---

      {/* ARAMA VE DURUM FİLTRESİ */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Müşteri adı veya sipariş no ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto text-sm border rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Siparişler</option>
            <option value="Processing">Hazırlananlar / İşlemdekiler</option>
            <option value="Shipped">Sevk Edilenler / Yoldakiler</option>
            <option value="Delivered">Teslim Edilenler</option>
          </select>
        </div>
      </div>

      {/* SİPARİŞLER TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Sipariş No</th>
                <th className="py-3 px-4">Müşteri Ünvanı</th>
                <th className="py-3 px-4">Kayıt Tarihi</th>
                <th className="py-3 px-4">Lojistik Türü</th>
                <th className="py-3 px-4 text-right">Toplam Tutar</th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {dummyOrders
                .filter(o => o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(o => statusFilter === "all" || o.status === statusFilter)
                .map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                    
                    {/* Sipariş ID ve Ürün Çeşidi */}
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-500">
                      <div className="font-semibold text-gray-700">{order.id}</div>
                      <div className="text-gray-400">{order.itemsCount} Kalem Ürün</div>
                    </td>

                    {/* Müşteri */}
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      {order.customer}
                    </td>

                    {/* Tarih */}
                    <td className="py-3.5 px-4 text-gray-500">
                      {order.date}
                    </td>

                    {/* Gönderim Şekli */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600 font-medium">
                        <svg className="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m12 8-4 4 4 4M16 12H8"/></svg>
                        {order.deliveryType}
                      </span>
                    </td>

                    {/* Tutar */}
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                      {formatAmount(order.amount, order.currency)}
                    </td>

                    {/* Durum Badge */}
                    <td className="py-3.5 px-4">
                      {order.status === "Processing" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Hazırlanıyor
                        </span>
                      )}
                      {order.status === "Shipped" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          Sevk Edildi
                        </span>
                      )}
                      {order.status === "Delivered" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          Teslim Edildi
                        </span>
                      )}
                    </td>

                    {/* İşlemler Menüsü */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        {/* İrsaliye / Fatura Kes Butonu */}
                        <button title="İrsaliye / Fatura Oluştur" className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="14" rx="2" ry="2"/><line x1="16" y1="21" x2="16" y2="18"/><line x1="8" y1="21" x2="8" y2="18"/><line x1="12" y1="21" x2="12" y2="18"/></svg>
                        </button>
                        {/* Detay Gör (Göz) Butonu */}
                        <button title="Sipariş Detayları" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
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