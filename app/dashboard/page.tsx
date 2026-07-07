import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logout } from "@/app/actions/logout";

export default async function Dashboard() {
  const session = await auth();

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <img src="/Eys Logo.png" alt="EYS Logo" className="login-logo" />
        <div className="sidebar-brand">
        </div>
        <nav className="sidebar-nav">
          <a href="/urunler">Ürünler</a>
          <a href="/siparisler">Siparişler</a>
          <a href="/stoklar">Stoklar</a>
          <a href="/teklifler">Teklifler</a>
          <a href="/dokumanlar">Döküman Merkezi</a>
          <a href="/finans">Finans ve Cari Hesaplar</a>
          <a href="/raporlar">Raporlar ve Analizler</a>
          <a href="/is-akisi">İş Akışı ve Görev Yönetimi</a>
          <a href="/kullanicilar">Kullanıcı Yönetimi</a>
          <a href="/bildirimler">Bildirimler</a>
          <a href="/duyurular">Duyurular</a>
        </nav>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-subtitle">Hoş geldin {session?.user?.name}</p>
            <h1>EYS İç Portal</h1>
          </div>
            <form action={logout}>
              <button type="submit" className="dashboard-logout">
                Çıkış Yap
              </button>
            </form>
        </header>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <p>Toplam Bayi</p>
            <strong>128</strong>
          </article>
          <article className="dashboard-card">
            <p>Bekleyen Sipariş</p>
            <strong>24</strong>
          </article>
          <article className="dashboard-card">
            <p>Bugün Yeni Kayıt</p>
            <strong>9</strong>
          </article>
          <article className="dashboard-card">
            <p>Memnuniyet</p>
            <strong>%92</strong>
          </article>
        </div>

        <section className="dashboard-panels">
          <div className="panel panel-large">
            <h2>Hızlı Eylemler</h2>
            <div className="panel-actions">
              <button>Yeni bayii ekle</button>
              <button>Rapor indir</button>
              <button>Güncelleme yap</button>
            </div>
          </div>

          <div className="panel panel-table">
            <div className="panel-heading">
              <h2>Son Siparişler</h2>
              <Link href="/siparisler">Tümünü gör</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Bayii</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th>Tutar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Aksoy A.Ş.</td>
                  <td>20 Haz</td>
                  <td>Onaylandı</td>
                  <td>₺28.700</td>
                </tr>
                <tr>
                  <td>Deniz Tic.</td>
                  <td>19 Haz</td>
                  <td>Beklemede</td>
                  <td>₺13.450</td>
                </tr>
                <tr>
                  <td>Trend Grup</td>
                  <td>18 Haz</td>
                  <td>Gönderildi</td>
                  <td>₺54.200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
