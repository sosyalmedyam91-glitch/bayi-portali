import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import UserEditForm from "./UserEditForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function KullaniciDetayPage({ params }: PageProps) {
  const { id } = await params;

  let userData = null;

  try {
    // API rotanızın doğru çalıştığından emin olmak için istek atıyoruz
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      userData = await res.json();
    } else {
      console.error(`API hatası: Durum Kodu ${res.status}`);
    }
  } catch (error) {
    console.error("Microsoft Graph / API kullanıcı detay hatası:", error);
  }

  // Eğer veri API'den dönmediyse sayfa render edilmez, buraya düşer.
  if (!userData) {
    // Geçici olarak hatayı debug edebilmek için notFound() yerine ham bir hata mesajı basabilirsiniz:
    return (
      <div className="p-6 max-w-3xl mx-auto mt-6 text-center border border-red-200 bg-red-50 text-red-700 rounded-xl text-sm">
        Kullanıcı verisi <span className="font-mono font-bold">{id}</span> ID'si
        ile API'den çekilemedi. Lütfen{" "}
        <code className="bg-white px-1 py-0.5 rounded border">
          /api/users/{id}
        </code>{" "}
        uç noktasının doğru veri döndüğünden emin olun.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white border rounded-xl shadow-sm mt-6">
      {/* Üst Bilgi Satırı */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">
              M365 & Azure AD Kullanıcı Kartı
            </h1>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
              Microsoft Graph
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Entra ID personeli rollerini ve sistem erişim izinlerini yönetin.
          </p>
        </div>
        <Link
          href="/kullanicilar" // Düzenlendi: Artik /dashboard/users yerine doğru listeye döner
          className="text-xs font-semibold text-gray-600 hover:text-gray-900 border px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          ← Listeye Geri Dön
        </Link>
      </div>

      {/* Etkileşimli Rol Atama Formu */}
      <UserEditForm user={userData} />
    </div>
  );
}
