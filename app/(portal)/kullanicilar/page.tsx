import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROLES } from "@/lib/roles";
import Link from "next/link";
import KullaniciListesiIcerik from "./KullaniciListesiIcerik";

console.log(typeof KullaniciListesiIcerik);
console.log(KullaniciListesiIcerik);

interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  department?: string;
  lastLoginAt?: string | null;
}

export default async function KullaniciYonetimi() {
  const session = await auth();

  // Yetki Kontrolü
  if (
    session?.user?.role !== ROLES.ADMIN &&
    session?.user?.role !== ROLES.SUPER_ADMIN
  ) {
    redirect("/dashboard");
  }

  let users: ApiUser[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });

    if (res.ok) {
      users = await res.json();
    }
  } catch (error) {
    console.error("Kullanıcılar API'den çekilirken hata oluştu:", error);
  }

  return (
    <section className="p-6 max-w-7xl mx-auto space-y-6 bg-white border rounded-xl shadow-sm">
      {/* ÜST BAŞLIK VE AKSİYON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Kullanıcı Yönetimi
          </h1>
          <p className="text-sm text-[#53575A]">
            Şirket personellerini departman kırılımlarına göre listeleyin. Arama
            alanını kullanarak anlık filtreleme yapabilirsiniz.
          </p>
        </div>

        <Link
          href="/kullanicilar/yeni"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EA0029] hover:bg-[#c40022] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          + Yeni Kullanıcı Ekle
        </Link>
      </div>

      <hr className="border-gray-200" />

      {/* ARAMA VE TABLOLARI BARINDIRAN ETKİLEŞİMLİ BİLEŞEN */}
      <KullaniciListesiIcerik initialUsers={users} />
    </section>
  );
}
