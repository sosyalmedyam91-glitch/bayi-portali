"use client";

import React, { useState } from "react";

// Örnek Duyuru Verisi
const dummyAnnouncements = [
  {
    id: "ANC-001",
    title: "Kurban Bayramı Resmi Tatil Duyurusu",
    content:
      "Şirketimiz, Kurban Bayramı resmi tatili sebebiyle 27 Haziran Cumartesi gününden itibaren 1 Temmuz Çarşamba akşamına kadar kapalı olacaktır. Tüm personellerimizin bilgisine sunar, iyi tatiller dileriz.",
    category: "İK / İzin",
    date: "26.06.2026",
    author: "İnsan Kaynakları Direktörlüğü",
    isPinned: true,
  },
  {
    id: "ANC-002",
    title: "Yeni ERP Güncellemesi Eğitim Semineri",
    content:
      "Sisteme yeni eklenen finans ve raporlama modüllerinin kullanımına ilişkin, 3 Temmuz Cuma günü saat 14:00'te Zoom üzerinden online eğitim düzenlenecektir. Katılım zorunludur.",
    category: "Eğitim / Teknoloji",
    date: "24.06.2026",
    author: "Bilgi İşlem Departmanı",
    isPinned: true,
  },
  {
    id: "ANC-003",
    title: "Yaz Dönemi Mesai Saatleri Düzenlemesi",
    content:
      "1 Temmuz itibarıyla yaz dönemi çalışma saatlerimiz sabah 08:30 - akşam 17:30 olarak güncellenmiştir. Servis kalkış saatleri bu düzene göre yeniden organize edilmiştir.",
    category: "Genel",
    date: "20.06.2026",
    author: "Genel Yönetim",
    isPinned: false,
  },
  {
    id: "ANC-004",
    title: "Q2 Hedef Başarı Teşekkürü",
    content:
      "İkinci çeyrek satış hedeflerimizi %120 oranında aşarak kapatmış bulunuyoruz. Bu süreçte emeği geçen tüm saha ve merkez ofis ekibimize teşekkür ederiz.",
    category: "Şirket İçi",
    date: "15.06.2026",
    author: "CEO Ofisi",
    isPinned: false,
  },
];

const categories = [
  "all",
  "İK / İzin",
  "Eğitim / Teknoloji",
  "Genel",
  "Şirket İçi",
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(dummyAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // --- MODAL VE FORM STATE'LERİ ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Genel");
  const [isPinned, setIsPinned] = useState(false);
  const [author, setAuthor] = useState("Genel Yönetim"); // Varsayılan yazar birimi

  // Yeni Duyuruyu Listeye Kaydetme Fonksiyonu
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR");

    // Dinamik ID Üretimi (ANC-005, ANC-006...)
    const nextId = `ANC-${String(announcements.length + 1).padStart(3, "0")}`;

    const newAnnouncement = {
      id: nextId,
      title,
      content,
      category,
      date: formattedDate,
      author,
      isPinned,
    };

    // Yeni duyuruyu listenin başına ekle
    setAnnouncements([newAnnouncement, ...announcements]);

    // Formu temizle ve kapat
    setTitle("");
    setContent("");
    setCategory("Genel");
    setIsPinned(false);
    setIsModalOpen(false);
  };

  // Duyuru Silme Fonksiyonu
  const handleDelete = (id: string) => {
    if (confirm("Bu duyuruyu kaldırmak istediğinize emin misiniz?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* ÜST BAŞLIK VE YENİ DUYURU OLUŞTURMA AKSİYONU */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Duyurular & Panolar
          </h1>
          <p className="text-sm text-[#53575A]">
            Şirket genelindeki resmi bilgilendirmeleri, tatil yönetimlerini ve
            departman duyurularını takip edin.
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
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Yeni Duyuru Yayınla
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* ARAMA VE KATEGORİ FİLTRESİ */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full lg:w-72">
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
            placeholder="Duyurularda ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border
          ${
            selectedCategory === cat
              ? "bg-[#EA0029] text-white border-[#EA0029]"
              : "bg-white text-[#53575A] border-gray-200 hover:border-[#EA0029] hover:text-[#EA0029]"
          }`}
            >
              {cat === "all" ? "Tüm Kategoriler" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* DUYURU AKIŞI (FEED) */}
      <div className="space-y-4">
        {announcements
          .filter(
            (a) =>
              a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              a.content.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .filter(
            (a) =>
              selectedCategory === "all" || a.category === selectedCategory,
          )
          .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1))
          .map((announcement) => (
            <div
              key={announcement.id}
              className={`p-5 bg-white border rounded-xl shadow-sm space-y-3 relative transition-all hover:border-gray-300 ${
                announcement.isPinned
                  ? "border-[rgba(234,0,41,0.2)] bg-[rgba(234,0,41,0.01)] ring-1 ring-[rgba(234,0,41,0.08)]"
                  : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                      announcement.category.includes("İK")
                        ? "bg-gray-100 text-[#53575A] border border-gray-200"
                        : announcement.category.includes("Eğitim")
                          ? "bg-[rgba(234,0,41,0.06)] text-[#EA0029] border border-[rgba(234,0,41,0.1)]"
                          : "bg-gray-100 text-[#53575A]"
                    }`}
                  >
                    {announcement.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {announcement.id}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  {announcement.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[#EA0029] bg-[rgba(234,0,41,0.06)] px-2 py-0.5 rounded font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="17" x2="12" y2="22" />
                        <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.12-2.6A2 2 0 0 1 16 10.16V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6.16a2 2 0 0 1-.44 1.24l-2.12 2.6a2 2 0 0 0-.44 1.24Z" />
                      </svg>
                      Sabitlendi
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {announcement.date}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900">
                  {announcement.title}
                </h3>
                <p className="text-sm text-[#53575A] leading-relaxed">
                  {announcement.content}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-[#53575A] font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 bg-gray-100 rounded-full flex items-center justify-center text-[9px] font-bold text-[#53575A] border border-gray-200">
                    {announcement.author[0]}
                  </div>
                  <span>{announcement.author}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    title="Kaldır"
                    onClick={() => handleDelete(announcement.id)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ========================================================= */}
      {/* YENİ DUYURU OLUŞTURMA MODAL FORMU */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden border flex flex-col max-h-[90vh]">
            {/* Modal Başlığı */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Yeni Şirket İçi Duyuru Yayınla
                </h3>
                <p className="text-xs text-[#53575A]">
                  Tüm personeli ilgilendiren önemli gelişmeleri ve resmi
                  evrakları buradan paylaşabilirsiniz.
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

            {/* Form Alanı */}
            <form
              onSubmit={handleCreateAnnouncement}
              className="p-5 overflow-y-auto space-y-4 flex-1"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Duyuru Başlığı
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026 Yılı Performans Değerlendirme Süreci"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Duyuru Kategorisi
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 font-medium"
                  >
                    <option value="Genel">Genel</option>
                    <option value="İK / İzin">İK / İzin</option>
                    <option value="Eğitim / Teknoloji">
                      Eğitim / Teknoloji
                    </option>
                    <option value="Şirket İçi">Şirket İçi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Yayınlayan Departman
                  </label>
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 font-medium"
                  >
                    <option value="Genel Yönetim">Genel Yönetim</option>
                    <option value="İnsan Kaynakları Direktörlüğü">
                      İnsan Kaynakları
                    </option>
                    <option value="Bilgi İşlem Departmanı">
                      Bilgi İşlem (IT)
                    </option>
                    <option value="CEO Ofisi">CEO Ofisi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Duyuru Detayı / Metni
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Duyuru metnini detaylıca yazınız..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-[#53575A]/20 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 resize-none leading-relaxed"
                />
              </div>

              {/* SABİTLEME (PIN) SEÇENEĞİ */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200/60 rounded-lg select-none">
                <input
                  type="checkbox"
                  id="pin-checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="h-4 w-4 rounded text-[#EA0029] focus:ring-[#EA0029] border-slate-300 accent-[#EA0029] cursor-pointer"
                />
                <label
                  htmlFor="pin-checkbox"
                  className="flex flex-col cursor-pointer"
                >
                  <span className="text-xs font-bold text-gray-900">
                    Bu duyuruyu en üste sabitle
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Yeni duyurular gelse bile bu duyuru en üst panoda kalmaya
                    devam eder.
                  </span>
                </label>
              </div>

              {/* Alt Eylem Butonları */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50 -mx-5 -mb-5 p-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  İptal Et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EA0029] hover:bg-[#c40022] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Duyuruyu Paylaş
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
