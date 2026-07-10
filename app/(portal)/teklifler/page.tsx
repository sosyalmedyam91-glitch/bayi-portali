// app/dashboard/quotes/page.tsx
"use client";

import React, { useState, useEffect } from "react";

interface AppUser {
  id: string;
  name: string;
  email?: string;
  department?: string;
}

// Örnek Teklif Verisi
const dummyQuotes = [
  {
    id: "TEK-26-041",
    customer: "Acme Teknoloji A.Ş.",
    project: "Bulut Altyapı Göçü",
    amount: 320000,
    currency: "TL",
    date: "24.06.2026",
    validUntil: "08.07.2026",
    revision: 1,
    status: "Pending",
  },
  {
    id: "TEK-26-042",
    customer: "Lojistik Global Ltd.",
    project: "Barkod Otomasyon Donanımı",
    amount: 14500,
    currency: "EUR",
    date: "25.06.2026",
    validUntil: "25.07.2026",
    revision: 3,
    status: "Approved",
  },
  {
    id: "TEK-26-043",
    customer: "Nova Mimarlık Grubu",
    project: "Ofis Donanım Yenileme",
    amount: 85000,
    currency: "TL",
    date: "12.05.2026",
    validUntil: "26.05.2026",
    revision: 1,
    status: "Rejected",
  },
  {
    id: "TEK-26-044",
    customer: "Delta Enerji Çözümleri",
    project: "Yıllık Bakım Anlaşması",
    amount: 4800,
    currency: "USD",
    date: "26.06.2026",
    validUntil: "10.07.2026",
    revision: 2,
    status: "Pending",
  },
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(dummyQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- MODAL VE FORM STATE'LERİ ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("TL");
  const [validUntil, setValidUntil] = useState("");

  // --- DİNAMİK KULLANICI SEÇİM STATE'LERİ ---
  const [users, setUsers] = useState<AppUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Azure API'den kullanıcıları çekme
  useEffect(() => {
    if (isModalOpen) {
      setLoadingUsers(true);
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setUsers(data);
        })
        .catch((err) => console.error("Kullanıcılar yüklenemedi:", err))
        .finally(() => setLoadingUsers(false));
    }
  }, [isModalOpen]);

  // Para formatlayıcı fonksiyon
  const formatAmount = (val: number, currency: string) => {
    const locale = currency === "TL" ? "tr-TR" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency === "TL" ? "TRY" : currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Yeni Teklif Kaydetme Fonksiyonu
  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !project || !amount || !validUntil) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR");
    const formattedValidUntil = new Date(validUntil).toLocaleDateString(
      "tr-TR",
    );

    const nextId = `TEK-26-0${40 + quotes.length + 1}`;

    const newQuote = {
      id: nextId,
      customer,
      project,
      amount: Number(amount),
      currency,
      date: formattedDate,
      validUntil: formattedValidUntil,
      revision: 1,
      status: "Pending",
    };

    setQuotes([newQuote, ...quotes]);

    // Formu sıfırla ve kapat
    setCustomer("");
    setProject("");
    setAmount("");
    setCurrency("TL");
    setValidUntil("");
    setSelectedUser("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Teklif Yönetimi
          </h1>
          <p className="text-sm text-[#53575A]">
            Müşterilere sunulan fiyat tekliflerini hazırlayın, revizyonları
            takip edin og onay süreçlerini yönetin.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
          Yeni Teklif Oluştur
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* TEKLİF HUNİSİ (KPI METRİKLERİ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Bekleyen Teklifler
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {quotes.filter((q) => q.status === "Pending").length}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Bu Ay Onaylanan
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              {quotes.filter((q) => q.status === "Approved").length}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Açık Potansiyel Hacim
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatAmount(
                quotes
                  .filter((q) => q.status === "Pending")
                  .reduce(
                    (acc, curr) =>
                      acc +
                      (curr.currency === "TL" ? curr.amount : curr.amount * 34),
                    0,
                  ),
                "TL",
              )}
            </p>
          </div>
          <div className="p-3 bg-[rgba(234,0,41,0.06)] text-[#EA0029] rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-[#53575A] font-medium">Kazanma Oranı</p>
            <p className="text-2xl font-bold text-purple-600">%74.2</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 2 12 12" />
              <polyline points="22 7 22 2 17 2" />
            </svg>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* ARAMA VE DURUM FİLTRESİ */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
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
              {quotes
                .filter(
                  (q) =>
                    q.customer
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    q.project.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .filter(
                  (q) => statusFilter === "all" || q.status === statusFilter,
                )
                .map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <div className="font-semibold text-gray-900">
                        {quote.id}
                      </div>
                      <div className="text-gray-400">
                        Revizyon: v{quote.revision}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">
                        {quote.customer}
                      </div>
                      <div className="text-xs text-[#53575A]">
                        {quote.project}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#53575A]">
                      <div>Teklif: {quote.date}</div>
                      <div className="text-gray-400 mt-0.5">
                        Son Gün: {quote.validUntil}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                      ={formatAmount(quote.amount, quote.currency)}
                    </td>
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
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          title="PDF Yazdır / Gönder"
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
                          >
                            <path d="M6 9V2h12v7" />
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                            <rect x="6" y="14" width="12" height="8" />
                          </svg>
                        </button>
                        <button
                          title="Yeni Revizyon Oluştur"
                          className="p-1.5 text-[#53575A] hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m12 14 4-4-4-4" />
                            <path d="M4 20V14a4 4 0 0 1 4-4h8" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* YENİ TEKLİF OLUŞTURMA MODAL DIALOG PENCERESİ */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border flex flex-col max-h-[90vh]">
            {/* Modal Başlığı */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Yeni Fiyat Teklifi Hazırla
                </h3>
                <p className="text-xs text-[#53575A]">
                  Müşteri ve bütçe detaylarını eksiksiz giriniz.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Form Alanı */}
            <form
              onSubmit={handleCreateQuote}
              className="p-5 overflow-y-auto space-y-4 flex-1"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Müşteri Ünvanı
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Acme Endüstri A.Ş."
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Proje Adı / Kapsamı
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Sunucu Lisanslama ve Donanım Tedariği"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Bütçe / Tutar
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Döviz
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 font-medium"
                  >
                    <option value="TL">TL (₺)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Geçerlilik Son Tarihi
                </label>
                <input
                  type="date"
                  required
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900"
                />
              </div>

              {/* SİZİN AZURE ENTRA ENTEGRELİ DEPARTMAN GRUPLU SEÇİM KUTUNUZ */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Teklif Sorumlusu (Azure ID)
                </label>
                <div
                  onClick={() =>
                    !loadingUsers && setIsUserDropdownOpen(!isUserDropdownOpen)
                  }
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg bg-white text-sm cursor-pointer flex items-center justify-between focus:ring-2 focus:ring-[#EA0029] select-none"
                >
                  <span
                    className={selectedUser ? "text-gray-900" : "text-gray-400"}
                  >
                    {loadingUsers
                      ? "Yükleniyor..."
                      : selectedUser
                        ? users.find((u) => u.id === selectedUser)?.name
                        : "Sorumlu personel seçin..."}
                    {/* Not: Kodunuzdaki selectedUser state'ine göre burayı u.id === selectedUser yapabilirsiniz */}
                  </span>
                  <span className="text-gray-400 text-xs">▼</span>
                </div>

                {isUserDropdownOpen && !loadingUsers && (
                  <>
                    {/* Kapatma Katmanı */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserDropdownOpen(false)}
                    />

                    {/* GÜNCELLENEN ALAN: 'bottom-full mb-1' ile yukarı doğru açılır, z-50 ile en üstte kalır */}
                    <div className="absolute bottom-full mb-1 left-0 z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-56 overflow-hidden flex flex-col p-1 animate-slide-up">
                      {/* Arama Çubuğu */}
                      <div className="p-1 border-b border-gray-100 mb-1">
                        <input
                          type="text"
                          autoFocus
                          placeholder="Personel veya departman ara..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs outline-none focus:ring-1 focus:ring-[#EA0029] focus:bg-white text-gray-900"
                        />
                      </div>

                      {/* Sonuç Listesi */}
                      <div className="overflow-y-auto max-h-44 space-y-2 pr-0.5 custom-scrollbar">
                        {(() => {
                          const filtered = users.filter(
                            (u) =>
                              u.name
                                .toLowerCase()
                                .includes(userSearchTerm.toLowerCase()) ||
                              (u.department &&
                                u.department
                                  .toLowerCase()
                                  .includes(userSearchTerm.toLowerCase())),
                          );
                          if (filtered.length === 0)
                            return (
                              <div className="text-xs text-gray-400 p-3 text-center">
                                Sonuç bulunamadı
                              </div>
                            );

                          const groups: { [key: string]: AppUser[] } = {};
                          filtered.forEach((u) => {
                            const d = u.department || "Belirtilmemiş";
                            if (!groups[d]) groups[d] = [];
                            groups[d].push(u);
                          });

                          return Object.keys(groups).map((dept) => (
                            <div key={dept} className="space-y-0.5">
                              <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded tracking-wider uppercase sticky top-0 bg-white z-10">
                                {dept}
                              </div>
                              {groups[dept].map((u) => (
                                <div
                                  key={u.id}
                                  onClick={() => {
                                    setSelectedUser(u.id);
                                    setIsUserDropdownOpen(false);
                                  }}
                                  className={`px-3 py-2 text-xs rounded-md cursor-pointer transition-colors ${
                                    selectedUser === u.id
                                      ? "bg-[#EA0029]/5 text-[#EA0029] font-medium"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  {u.name}
                                </div>
                              ))}
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Alt Butonlar */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50 -mx-5 -mb-5 p-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EA0029] hover:bg-[#c40022] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Teklifi Kaydet (Draft)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
