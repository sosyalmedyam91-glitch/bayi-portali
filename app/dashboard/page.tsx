import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>CRM Admin</h2>
          <p>Bayi Paneli</p>
        </div>
        <nav className="sidebar-nav">
          <a href="#overview" className="active">
            Genel Bakış
          </a>
          <a href="#orders">Finans</a>
          <a href="#customers">Siparişler</a>
          <a href="#reports">Stoklar</a>
          <a href="#settings">Dökümanlar</a>
          <a href="#duyurular">Duyurular</a>
        </nav>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-subtitle">Hoş geldiniz, yönetici</p>
            <h1>CRM Yönetim Paneli</h1>
          </div>
          <Link href="/" className="dashboard-logout">
            Çıkış Yap
          </Link>
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
              <Link href="#">Tümünü gör</Link>
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
