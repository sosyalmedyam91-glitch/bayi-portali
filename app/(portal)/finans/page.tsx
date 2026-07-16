"use client";

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: "Borç" | "Alacak";
  operation: "Tahsilat" | "Ödeme" | "Fatura";
  amount: number;
}

interface Account {
  id: string;
  company: string;
  type: "Müşteri" | "Tedarikçi";
  balance: number;
  currency: string;
  lastTransaction: string;
  status: string;
  transactions: Transaction[];
}

interface NewAccount {
  company: string;
  type: "Müşteri" | "Tedarikçi";
  balance: number;
}

import React, { useState } from "react";

// Örnek Cari Hesap Verisi
const dummyAccounts: Account[] = [
  {
    id: "CAR-001",
    company: "Acme Teknoloji A.Ş.",
    type: "Müşteri",
    balance: 145000,
    currency: "TL",
    lastTransaction: "24.06.2026",
    status: "Receivable",
    transactions: [
      {
        id: 1,
        date: "01.06.2026",
        description: "Fatura",
        type: "Borç",
        operation: "Fatura",
        amount: 7000,
      },
      {
        id: 2,
        date: "24.06.2026",
        description: "Tahsilat",
        type: "Alacak",
        operation: "Tahsilat",
        amount: 5000,
      },
    ],
  },
  {
    id: "CAR-002",
    company: "Lojistik Global Ltd.",
    type: "Tedarikçi",
    balance: -82400,
    currency: "TL",
    lastTransaction: "25.06.2026",
    status: "Payable",
    transactions: [
      {
        id: 1,
        date: "01.06.2026",
        description: "Fatura",
        type: "Borç",
        operation: "Fatura",
        amount: 150000,
      },
      {
        id: 2,
        date: "24.06.2026",
        description: "Tahsilat",
        type: "Alacak",
        operation: "Tahsilat",
        amount: 95000,
      },
    ],
  },
  {
    id: "CAR-003",
    company: "Nova Mimarlık Grubu",
    type: "Müşteri",
    balance: 0,
    currency: "TL",
    lastTransaction: "18.05.2026",
    status: "Balanced",
    transactions: [],
  },
  {
    id: "CAR-004",
    company: "Delta Enerji Çözümleri",
    type: "Tedarikçi",
    balance: -2500,
    currency: "TL",
    lastTransaction: "26.06.2026",
    status: "Payable",
    transactions: [
      {
        id: 1,
        date: "01.06.2026",
        description: "Fatura",
        type: "Borç",
        operation: "Fatura",
        amount: 150000,
      },
      {
        id: 2,
        date: "24.06.2026",
        description: "Tahsilat",
        type: "Alacak",
        operation: "Tahsilat",
        amount: 750000,
      },
    ],
  },
];

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Basit para formatlayıcı yardımcı fonksiyon
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(val);
  };

  const [accounts, setAccounts] = useState(dummyAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [detailModal, setDetailModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    operation: "Tahsilat" as "Tahsilat" | "Ödeme" | "Fatura",
    description: "",
    amount: 0,
  });

  const [newAccount, setNewAccount] = useState<NewAccount>({
    company: "",
    type: "Müşteri",
    balance: 0,
  });

  const calculateBalance = (transactions: Transaction[]) => {
    return transactions.reduce((total, item) => {
      if (item.type === "Borç") {
        return total + item.amount;
      }

      return total - item.amount;
    }, 0);
  };

  const addAccount = () => {
    const account: Account = {
      id: `CAR-${String(accounts.length + 1).padStart(3, "0")}`,
      company: newAccount.company,
      type: newAccount.type,
      balance: Number(newAccount.balance),
      currency: "TL",
      lastTransaction: new Date().toLocaleDateString("tr-TR"),
      status: Number(newAccount.balance) >= 0 ? "Receivable" : "Payable",
      transactions: [],
    };

    setAccounts((prev) => [...prev, account]);

    setNewAccount({
      company: "",
      type: "Müşteri",
      balance: 0,
    });

    setIsModalOpen(false);
  };

  const addTransaction = () => {
    if (!selectedAccount) return;

    const transaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString("tr-TR"),
      description: newTransaction.description,
      operation: newTransaction.operation,

      type: newTransaction.operation === "Tahsilat" ? "Alacak" : "Borç",

      amount: Number(newTransaction.amount),
    };

    const updatedAccounts = accounts.map((account) => {
      if (account.id === selectedAccount.id) {
        return {
          ...account,
          transactions: [...account.transactions, transaction],
          lastTransaction: new Date().toLocaleDateString("tr-TR"),
        };
      }

      return account;
    });

    setAccounts(updatedAccounts);

    const updatedSelected = updatedAccounts.find(
      (item) => item.id === selectedAccount.id,
    );

    setSelectedAccount(updatedSelected ?? null);

    setNewTransaction({
      operation: "Tahsilat",
      description: "",
      amount: 0,
    });

    setTransactionModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* ÜST BAŞLIK VE AKSİYON BUTONLARI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Finans & Cari Hesaplar
          </h1>
          <p className="text-sm text-[#53575A]">
            Müşteri ve tedarikçi cari hesaplarını, borç/alacak bakiyelerini ve
            financial durumunuzu yönetin.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
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
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Yeni Cari Kart Aç
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* FİNANSAL ÖZET KARTLARI (KPI) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kasa & Banka */}
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[rgba(234,0,41,0.06)] text-[#EA0029] rounded-lg">
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
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Kasa & Banka Toplamı
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(620500)}
            </p>
          </div>
        </div>

        {/* Toplam Alacak */}
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
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
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Toplam Alacak (Müşteriler)
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              {formatCurrency(145000)}
            </p>
          </div>
        </div>

        {/* Toplam Borç */}
        <div className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
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
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#53575A] font-medium">
              Toplam Borç (Tedarikçiler)
            </p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(94900)}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* FİLTRELEME VE ARAMA */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 border rounded-xl shadow-sm">
        <div className="relative w-full sm:w-72">
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
            placeholder="Firma adı veya kod ara..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[rgba(234,0,41,0.15)] focus:border-[#EA0029] outline-none transition-all text-gray-900 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-[#53575A] bg-white hover:bg-gray-50 transition-colors">
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
          Gelişmiş Filtre
        </button>
      </div>

      {/* CARİ HESAPLAR TABLOSU */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[#53575A] text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Cari Kodu</th>
                <th className="py-3 px-4">Firma / Ünvan</th>
                <th className="py-3 px-4">Hesap Türü</th>
                <th className="py-3 px-4">İşlem</th>
                <th className="py-3 px-4">Son İşlem Tarihi</th>
                <th className="py-3 px-4 text-right">Güncel Bakiye</th>
                <th className="py-3 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {accounts
                .filter(
                  (acc) =>
                    acc.company
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    acc.id.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Cari Kod */}
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-400">
                      {acc.id}
                    </td>

                    {/* Firma Adı */}
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      {acc.company}
                    </td>

                    {/* Hesap Türü Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          acc.type === "Müşteri"
                            ? "bg-gray-100 text-[#53575A] border-gray-200"
                            : "bg-[rgba(234,0,41,0.06)] text-[#EA0029] border-[rgba(234,0,41,0.1)]"
                        }`}
                      >
                        {acc.type}
                      </span>
                    </td>

                    {/* Son İşlem Tarihi */}
                    <td className="py-3.5 px-4 text-[#53575A]">
                      {acc.lastTransaction}
                    </td>

                    {/* İşlem */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedAccount(acc);
                          setTransactionModal(true);
                        }}
                        className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md"
                      >
                        İşlem Ekle
                      </button>
                    </td>

                    {/* Dinamik Bakiye Alanı */}
                    <td className="py-3.5 px-4 text-right font-semibold">
                      {acc.balance > 0 && (
                        <span className="text-emerald-600">
                          +{formatCurrency(acc.balance)}
                        </span>
                      )}
                      {acc.balance < 0 && (
                        <span className="text-red-600">
                          {formatCurrency(acc.balance)}
                        </span>
                      )}
                      {acc.balance === 0 && (
                        <span className="text-gray-400">
                          {formatCurrency(acc.balance)}
                        </span>
                      )}
                    </td>

                    {/* Hızlı Aksiyonlar */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          title="Cari Detay"
                          onClick={() => {
                            setSelectedAccount(acc);
                            setDetailModal(true);
                          }}
                          className="p-1.5 text-[#53575A] hover:text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                        </button>
                        {/* Ekstre (Rapor) Butonu */}
                        <button
                          title="Hesap Ekstresi Al"
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
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </button>
                        {/* Tahsilat/Ödeme Ekle Butonu */}
                        <button
                          title="İşlem Ekle"
                          className="p-1.5 text-[#53575A] hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
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
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
        <div className="p-4 border-t bg-gray-50/50 flex justify-between items-center text-xs text-[#53575A]">
          <span>Toplam {accounts.length} cariden 1-4 arası gösteriliyor</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Önceki
            </button>
            <button
              className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Yeni Cari Kart Aç
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Firma adı"
                className="w-full border rounded-lg px-3 py-2"
                value={newAccount.company}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    company: e.target.value,
                  })
                }
              />

              <select
                className="w-full border rounded-lg px-3 py-2"
                value={newAccount.type}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    type: e.target.value as "Müşteri" | "Tedarikçi",
                  })
                }
              >
                <option>Müşteri</option>
                <option>Tedarikçi</option>
              </select>

              <input
                type="number"
                placeholder="Bakiye"
                className="w-full border rounded-lg px-3 py-2"
                value={newAccount.balance}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    balance: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Vazgeç
              </button>

              <button
                onClick={addAccount}
                className="px-4 py-2 bg-[#EA0029] text-white rounded-lg"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
      {detailModal && selectedAccount && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedAccount.company}</h2>

                <p className="text-sm text-gray-500">{selectedAccount.id}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedAccount(null);
                  setDetailModal(false);
                }}
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-xs text-gray-500">Bakiye</p>

                <p className="font-bold text-xl">
                  {formatCurrency(
                    calculateBalance(selectedAccount.transactions),
                  )}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-xs text-gray-500">Hareket</p>

                <p className="font-bold text-xl">
                  {selectedAccount.transactions.length}
                </p>
              </div>

              <button
                onClick={() => setTransactionModal(true)}
                className="bg-[#EA0029] text-white rounded-lg"
              >
                + İşlem Ekle
              </button>
            </div>

            <table className="w-full mt-6">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="text-left py-2">Tarih</th>

                  <th>Açıklama</th>

                  <th>Tür</th>

                  <th>Tutar</th>
                </tr>
              </thead>

              <tbody>
                {selectedAccount.transactions.map((t: Transaction) => (
                  <tr key={t.id} className="border-b">
                    <td className="py-2">{t.date}</td>

                    <td>{t.description}</td>

                    <td>{t.type}</td>

                    <td>{t.operation}</td>

                    <td>{formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {transactionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-5">Cari İşlem Ekle</h2>

            <div className="space-y-4">
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={newTransaction.operation}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    operation: e.target.value as
                      | "Tahsilat"
                      | "Ödeme"
                      | "Fatura",
                  })
                }
              >
                <option>Tahsilat</option>
                <option>Ödeme</option>
                <option>Fatura</option>
              </select>

              <input
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Açıklama"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Tutar"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setTransactionModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Vazgeç
              </button>

              <button
                onClick={addTransaction}
                className="px-4 py-2 bg-[#EA0029] text-white rounded-lg"
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
