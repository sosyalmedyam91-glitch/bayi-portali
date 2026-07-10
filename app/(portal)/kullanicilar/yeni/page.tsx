import UserForm from "@/components/UserForm";
import Link from "next/link";

export default function YeniKullanici() {
  return (
    <section className="create-user-page">
      <div className="create-user-header">
        <div>
          <p className="dashboard-subtitle">Kullanıcı yönetimi</p>

          <h1>Yeni Kullanıcı</h1>

          <p className="page-description">
            Sisteme yeni kullanıcı ekleyin ve rol yetkilendirmelerini
            belirleyin.
          </p>
        </div>

        <Link href="/kullanicilar" className="secondary-button">
          ← Kullanıcılara Dön
        </Link>
      </div>

      <div className="form-card">
        <div className="form-info">
          <h2>Kullanıcı Bilgileri</h2>

          <p>Lütfen aşağıdaki alanları eksiksiz doldurun.</p>
        </div>

        <UserForm />
      </div>
    </section>
  );
}
