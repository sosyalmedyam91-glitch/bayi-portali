// app/dashboard/reports/page.tsx
"use client";

import React, { useState } from "react";

// Örnek Rapor Şablonları Verisi
const dummyReports = [
  { id: "REP-001", name: "2026 Yıllık Satış ve Büyüme Analizi", type: "Finans", format: "PDF", frequency: "Yıllık", downloads: 142 },
  { id: "REP-002", name: "Departman Bazlı Maliyet ve Gider Dağılımı", type: "Muhasebe", format: "XLSX", frequency: "Aylık", downloads: 89 },
  { id: "REP-003", name: "Kritik Stok ve Tedarik Süreçleri Raporu", type: "Lojistik", format: "PDF", frequency: "Haftalık", downloads: 34 },
  { id: "REP-004", name: "Personel Performans ve Mesai Verimliliği", type: "İK", format: "CSV", frequency: "Aylık", downloads: 56 },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Raporlar ve Analizler</h1>
          <p className="text-sm text-[#53575A]">Şirketinizin operasyonel ve finansal verilerini izleyin, grafiklerle analiz edin ve raporlar oluşturun.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Özel Rapor Oluştur
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* GÖRSEL ANALİZ ALANI (DÖKÜM VE GRAFİKLER) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sol Grafik: Satış Trendi (Saf Tailwind Bar Grafiği) */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-gray-900">2026 İlk Yarı Performansı</h3>
              <p className="text-xs text-gray-400">Aylık net ciro analizi</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">+24.5% Büyüme</span>
          </div>
          
          {/* Grafik Şeması */}
          <div className="h-48 flex items-end justify-between pt-6 px-2 border-b border-gray-100">
            {[
              { month: "Ocak", val: "h-2/5", amt: "120K" },
              { month: "Şubat", val: "h-3/5", amt: "180K" },
              { month: "Mart", val: "h-4/5", amt: "240K" },
              { month: "Nisan", val: "h-3.5/5", amt: "210K" },
              { month: "Mayıs", val: "h-full", amt: "310K" },
              { month: "Haziran", val: "h-4.5/5", amt: "290K" },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-12 group">
                <div className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white rounded px-1 py-0.5 -mt-6 absolute">{bar.amt}</div>
                <div className={`${bar.val} w-full bg-[#EA0029] rounded-t hover:bg-[#c40022] transition-colors`}></div>
                <span className="text-xs text-[#53575A] truncate">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Grafik: Gider Dağılım Oranları */}
        <div className="bg-white border rounded-xl shadow-sm p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Gider Dağılımı</h3>
            <p className="text-xs text-gray-400">Departman bazlı bütçe harcaması</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: "Lojistik & Operasyon", pct: "40%", color: "bg-[#EA0029]" },
              { label: "Pazarlama & Satış", pct: "25%", color: "bg-purple-500" },
              { label: "Ar-Ge & Yazılım", pct: "20%", color: "bg-[#53575A]" },
              { label: "İnsan Kaynakları", pct: "15%", color: "bg-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#53575A]">{item.label}</span>
                  <span className="text-gray-950 font-semibold">{item.pct}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: item.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <hr className="border-gray-200" />

      {/* RAPOR ŞABLONLARI LİSTESİ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">Hazır Rapor Şablonları</h2>
          
          {/* Sekme Seçimi (Tabs) */}
          <div className="flex p-0.5 bg-gray-100 rounded-lg text-xs font-medium text-[#53575A]">
            <button onClick={() => setActiveTab("all")} className={`px-3 py-1.5 rounded-md transition-all ${activeTab === "all" ? "bg-white text-gray-900 shadow-sm font-semibold" : "hover:text-gray-900"}`}>Hepsi</button>
            <button onClick={() => setActiveTab("Finans")} className={`px-3 py-1.5 rounded-md transition-all ${activeTab === "Finans" ? "bg-white text-[#EA0029] shadow-sm font-semibold" : "hover:text-gray-900"}`}>Finans</button>
            <button onClick={() => setActiveTab("Lojistik")} className={`px-3 py-1.5 rounded-md transition-all ${activeTab === "Lojistik" ? "bg-white text-[#EA0029] shadow-sm font-semibold" : "hover:text-gray-900"}`}>Lojistik</button>
          </div>
        </div>

        {/* Tablo Yapısı */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[#53575A] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Rapor Adı</th>
                  <th className="py-3 px-4">Modül / Tür</th>
                  <th className="py-3 px-4">Oluşturma Sıklığı</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4 text-right">İndirilme</th>
                  <th className="py-3 px-4 text-right">Aksiyon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {dummyReports
                  .filter(rep => activeTab === "all" || rep.type === activeTab)
                  .map((rep) => (
                    <tr key={rep.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <svg className="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                          {rep.name}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#53575A]">{rep.type}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-[#53575A] border border-gray-200">
                          {rep.frequency}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#53575A]">
                        {rep.format}
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#53575A]">{rep.downloads} kez</td>
                      <td className="py-3.5 px-4 text-right">
                        <button title="Raporu Çalıştır ve İndir" className="inline-flex items-center gap-1 text-xs font-semibold text-[#EA0029] hover:text-[#c40022] hover:bg-[rgba(234,0,41,0.06)] px-2 py-1 rounded transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Çalıştır
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}