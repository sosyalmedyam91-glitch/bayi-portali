"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

// Örnek Stok Verisi
const dummyStocks = [
  {
    id: "STK-001",
    name: "EYS-50",
    category: "Kendi yürür makineler",
    sku: "LAP-I7-16G",
    qty: 45,
    minQty: 10,
    unit: "Adet",
    status: "InStock",
  },
  {
    id: "STK-002",
    name: "Kompost Tamburu",
    category: "Eleme Makineleri",
    sku: "MOU-WRLS-02",
    qty: 8,
    minQty: 15,
    unit: "Adet",
    status: "LowStock",
  },
  {
    id: "STK-003",
    name: "Mobil Geri Dönüşüm Makineleri",
    category: "Geri Dönüşüm Makineleri",
    sku: "CHR-ERG-01",
    qty: 0,
    minQty: 5,
    unit: "Adet",
    status: "OutOfStock",
  },
  {
    id: "STK-004",
    name: "GK3000",
    category: "Aksesuar",
    sku: "Kendi yürür makineler",
    qty: 120,
    minQty: 20,
    unit: "Adet",
    status: "InStock",
  },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");

  const [maxDailyUsage, setMaxDailyUsage] = useState(0);
  const [avgDailyUsage, setAvgDailyUsage] = useState(0);
  const [maxLeadTime, setMaxLeadTime] = useState(0);
  const [avgLeadTime, setAvgLeadTime] = useState(0);

  const [stocks, setStocks] = useState(dummyStocks);
  const [selectedStockId, setSelectedStockId] = useState(stocks[0]?.id ?? "");

  const selectedStock = stocks.find((item) => item.id === selectedStockId);
  const safetyStock = maxDailyUsage * maxLeadTime - avgDailyUsage * avgLeadTime;

  const recommendedMinStock = Math.max(selectedStock?.minQty ?? 0, safetyStock);

  const stockStatus =
    safetyStock > (selectedStock?.minQty ?? 0)
      ? "increase"
      : safetyStock < (selectedStock?.minQty ?? 0)
        ? "decrease"
        : "ok";

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newStock, setNewStock] = useState({
    id: "",
    name: "",
    category: "",
    sku: "",
    qty: 0,
    minQty: 0,
    unit: "Adet",
  });

  const handleAddStock = () => {
    if (!newStock.id || !newStock.name || !newStock.category || !newStock.sku) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    setStocks((prev) => [
      ...prev,
      {
        ...newStock,
        status:
          newStock.qty === 0
            ? "OutOfStock"
            : newStock.qty <= newStock.minQty
              ? "LowStock"
              : "InStock",
      },
    ]);

    setNewStock({
      id: "",
      name: "",
      category: "",
      sku: "",
      qty: 0,
      minQty: 0,
      unit: "Adet",
    });

    setIsAddModalOpen(false);
  };

  useEffect(() => {
    if (scannerOpen) {
      const scanner = new Html5QrcodeScanner(
        "barcode-reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false,
      );

      scanner.render(
        (decodedText) => {
          setScannedCode(decodedText);

          const product = stocks.find(
            (item) => item.sku === decodedText || item.id === decodedText,
          );

          if (product) {
            setSearchTerm(product.name);
          }

          setScannerOpen(false);

          scanner.clear();
        },

        (error) => {},
      );

      scannerRef.current = scanner;
    }

    return () => {
      scannerRef.current?.clear();
    };
  }, [scannerOpen]);

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* ÜST BAŞLIK VE AKSİYON BUTONU */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Stok Yönetimi
          </h1>
          <p className="text-sm text-[#53575A]">
            Ürün stok durumlarını izleyin, güncelleyin ve kritik seviyeleri
            takip edin.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          {/* Artı İkonu */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Yeni Stok Ekle
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* ÖZET KARTLARI (KPI) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:p-4">
        {/* Toplam Ürün */}
        <div className="p-3 bg-white border rounded-xl shadow-sm flex items-center gap-3 sm:p-4">
          <div className="p-3 bg-[rgba(234,0,41,0.06)] text-[#EA0029] rounded-lg">
            {/* Paket İkonu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Toplam Benzersiz Ürün
            </p>
            <p className="text-2xl font-bold text-gray-900">{stocks.length}</p>
          </div>
        </div>

        {/* Kritik Stok */}
        <div className="p-3 bg-white border rounded-xl shadow-sm flex items-center gap-3 sm:p-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            {/* Uyarı İkonu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Kritik Stok Seviyesi
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {stocks.filter((s) => s.status === "LowStock").length}
            </p>
          </div>
        </div>

        {/* Tükenen Ürünler */}
        <div className="p-3 bg-white border rounded-xl shadow-sm flex items-center gap-3 sm:p-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            {/* Tehlike İkonu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Tükenen Ürünler
            </p>
            <p className="text-2xl font-bold text-red-600">
              {stocks.filter((s) => s.status === "OutOfStock").length}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="mb-5">
        <label className="text-sm font-medium text-gray-600">
          Tedarik Edilen Ürün
        </label>

        <select
          value={selectedStockId}
          onChange={(e) => setSelectedStockId(e.target.value)}
          className="mt-1 w-full border rounded-lg p-2"
        >
          {stocks.map((stock) => (
            <option key={stock.id} value={stock.id}>
              {stock.name} ({stock.id})
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Emniyet Stoğu Hesaplama
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Emniyet Stoğu = (Maksimum Günlük Tüketim × Maksimum Teslim Süresi)
              − (Ortalama Günlük Tüketim × Ortalama Teslim Süresi) <br />
              <span className="text-xs text-red-600">
                (Lütfen birimlerin aynı olduğundan emin olun, örn: Adet/Gün)
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Maksimum Günlük Tüketim
            </label>

            <input
              type="number"
              value={maxDailyUsage}
              onChange={(e) => setMaxDailyUsage(Number(e.target.value))}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Ortalama Günlük Tüketim
            </label>

            <input
              type="number"
              value={avgDailyUsage}
              onChange={(e) => setAvgDailyUsage(Number(e.target.value))}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Maksimum Teslim Süresi (Gün)
            </label>

            <input
              type="number"
              value={maxLeadTime}
              onChange={(e) => setMaxLeadTime(Number(e.target.value))}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Ortalama Teslim Süresi (Gün)
            </label>

            <input
              type="number"
              value={avgLeadTime}
              onChange={(e) => setAvgLeadTime(Number(e.target.value))}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-[#EA0029]/5 border border-[#EA0029]/20 p-5">
          <div className="text-sm text-gray-600">Hesaplanan Emniyet Stoğu</div>

          <div className="text-4xl font-bold text-[#EA0029] mt-2">
            {safetyStock}
          </div>

          <div className="text-sm text-gray-500 mt-1">Adet</div>
        </div>
      </div>

      <div className="mt-5 border-t pt-4 text-sm text-gray-600 space-y-2">
        <div className="flex justify-between">
          <span>Maksimum Talep</span>
          <span>{maxDailyUsage * maxLeadTime}</span>
        </div>

        <div className="flex justify-between">
          <span>Beklenen Talep</span>
          <span>{avgDailyUsage * avgLeadTime}</span>
        </div>

        <div className="flex justify-between font-semibold text-[#EA0029]">
          <span>Emniyet Stoğu</span>
          <span>{safetyStock} Adet</span>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">Mevcut Minimum Stok</div>

          <div className="text-2xl font-bold">{selectedStock?.minQty ?? 0}</div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">Hesaplanan Emniyet Stoğu</div>

          <div className="text-2xl font-bold text-[#EA0029]">{safetyStock}</div>
        </div>

        <div className="rounded-lg border p-4 bg-[#EA0029]/5 border-[#EA0029]/20">
          <div className="text-sm text-gray-500">Önerilen Minimum Stok</div>

          <div className="text-2xl font-bold text-[#EA0029]">
            {recommendedMinStock}
          </div>
        </div>
      </div>

      {stockStatus === "increase" && (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h4 className="font-semibold text-amber-700">
            ⚠ Minimum stok artırılmalı
          </h4>

          <p className="text-sm text-amber-700 mt-1">
            Hesaplanan emniyet stoğu <b>{safetyStock} adet</b> iken mevcut
            minimum stok <b>{selectedStock?.minQty}</b> adettir. Bu ürün için
            minimum stok seviyesinin en az
            <b> {recommendedMinStock} adet</b> olarak güncellenmesi önerilir.
          </p>
        </div>
      )}

      {stockStatus === "ok" && (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4">
          <h4 className="font-semibold text-green-700">
            ✓ Minimum stok yeterli
          </h4>

          <p className="text-sm text-green-700 mt-1">
            Mevcut minimum stok seviyesi emniyet stoğunu karşılamaktadır.
          </p>
        </div>
      )}

      {stockStatus === "decrease" && (
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="font-semibold text-blue-700">
            ℹ Minimum stok gözden geçirilebilir
          </h4>

          <p className="text-sm text-blue-700 mt-1">
            Hesaplanan emniyet stoğu mevcut minimum stok seviyesinden düşüktür.
            Mevcut değer güvenli tarafta kalmaktadır.
          </p>
        </div>
      )}

      {/* FİLTRELEME VE ARAMA BARBARI */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-white p-3 sm:p-4 border rounded-xl shadow-sm">
        <div className="relative w-full lg:w-80">
          {/* Arama İkonu */}
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Stok adı veya SKU ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-[#53575A] bg-white hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] transition-all outline-none">
          {/* Ayar/Filtre İkonu */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="21" y1="4" x2="14" y2="4" />
            <line x1="10" y1="4" x2="3" y2="4" />
            <line x1="21" y1="12" x2="12" y2="12" />
            <line x1="8" y1="12" x2="3" y2="12" />
            <line x1="21" y1="20" x2="16" y2="20" />
            <line x1="12" y1="20" x2="3" y2="20" />
            <line x1="14" y1="2" x2="14" y2="6" />
            <line x1="8" y1="10" x2="8" y2="14" />
            <line x1="16" y1="18" x2="16" y2="22" />
          </svg>
          Filtrele
        </button>
        <button
          onClick={() => setScannerOpen(true)}
          className="
  lg:hidden
  w-full
  inline-flex
  items-center
  justify-center
  gap-2
  px-4
  py-2
  rounded-lg
  bg-[#53575A]
  text-white
  text-sm
  font-medium
  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Barkod Tara
        </button>
      </div>

      {/* STOK TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-212.5 w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[#53575A] text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Kodu / SKU</th>
                <th className="py-3 px-4">Ürün Adı</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
                  Miktar
                  {/* Sıralama Okları İkonu */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21 16-4 4-4-4" />
                    <path d="M17 20V4" />
                    <path d="m3 8 4-4 4 4" />
                    <path d="M7 4v16" />
                  </svg>
                </th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4 text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {stocks
                .filter(
                  (stock) =>
                    stock.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    stock.sku.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((stock) => (
                  <tr
                    key={stock.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <div className="font-semibold text-gray-900">
                        {stock.id}
                      </div>
                      <div className="text-gray-400">{stock.sku}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-900 max-w-55 truncate">
                      {stock.name}
                    </td>
                    <td className="py-3.5 px-4 text-[#53575A] max-w-45 truncate">
                      {stock.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-900">
                        {stock.qty}
                      </span>{" "}
                      <span className="text-xs text-gray-400">
                        {stock.unit}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {stock.status === "InStock" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          Stokta Var
                        </span>
                      )}
                      {stock.status === "LowStock" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          Kritik Seviye (Min: {stock.minQty})
                        </span>
                      )}
                      {stock.status === "OutOfStock" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          Tükendi
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Düzenle Butonu */}
                        <button
                          title="Düzenle"
                          className="p-1.5 text-[#53575A] hover:text-[#EA0029] hover:bg-[rgba(234,0,41,0.06)] rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>
                        {/* Sil Butonu */}
                        <button
                          title="Sil"
                          className="p-1.5 text-[#53575A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* TABLO ALTI SAYFALAMA */}
        <div className="p-3 sm:p-4 border-t bg-gray-50/50 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center text-xs text-[#53575A]">
          <span>Toplam {stocks.length} kayıttan 1-4 arası gösteriliyor</span>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              className="px-3 py-1 border rounded bg-white text-[#53575A] hover:bg-gray-50 disabled:opacity-50 transition-colors"
              disabled
            >
              Önceki
            </button>
            <button
              className="px-3 py-1 border rounded bg-white text-[#53575A] hover:bg-gray-50 disabled:opacity-50 transition-colors"
              disabled
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
      {scannerOpen && (
        <div
          className="
fixed
inset-0
bg-black/70
z-50
flex
items-center
justify-center
p-4
"
        >
          <div
            className="
  bg-white
  rounded-xl
p-4
w-full
max-w-md
"
          >
            <h3 className="font-semibold mb-3">Barkod Tara</h3>

            <div id="barcode-reader"></div>

            <button
              onClick={() => setScannerOpen(false)}
              className="
mt-4
w-full
bg-gray-200
py-2
rounded-lg
"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-5">Yeni Stok Ekle</h2>

            <div className="space-y-3">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Stok Kodu"
                value={newStock.id}
                onChange={(e) =>
                  setNewStock({ ...newStock, id: e.target.value })
                }
              />

              <input
                className="w-full border rounded-lg p-2"
                placeholder="Ürün Adı"
                value={newStock.name}
                onChange={(e) =>
                  setNewStock({ ...newStock, name: e.target.value })
                }
              />

              <input
                className="w-full border rounded-lg p-2"
                placeholder="Kategori"
                value={newStock.category}
                onChange={(e) =>
                  setNewStock({ ...newStock, category: e.target.value })
                }
              />

              <input
                className="w-full border rounded-lg p-2"
                placeholder="SKU"
                value={newStock.sku}
                onChange={(e) =>
                  setNewStock({ ...newStock, sku: e.target.value })
                }
              />

              <input
                type="number"
                className="w-full border rounded-lg p-2"
                placeholder="Miktar"
                value={newStock.qty}
                onChange={(e) =>
                  setNewStock({
                    ...newStock,
                    qty: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                className="w-full border rounded-lg p-2"
                placeholder="Minimum Stok"
                value={newStock.minQty}
                onChange={(e) =>
                  setNewStock({
                    ...newStock,
                    minQty: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                İptal
              </button>

              <button
                onClick={handleAddStock}
                className="px-4 py-2 rounded-lg bg-[#EA0029] text-white"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
