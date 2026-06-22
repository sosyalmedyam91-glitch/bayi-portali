export default function Home() {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <img src="/Eys Logo.png" alt="EYS Bayi Logo" className="login-logo" /> <br></br>
          <p>EYS Bayi portalına erişmek için lütfen bilgilerinizi girin.</p>
        </div>
        <form className="login-form" action="/dashboard" method="GET">
          <label>
            <span>Kullanıcı Adı</span>
            <input type="text" name="username" placeholder="E-posta veya kullanıcı adı" required />
          </label>
          <label>
            <span>Şifre</span>
            <input type="password" name="password" placeholder="Şifrenizi girin" required />
          </label>
          <button type="submit">Giriş Yap</button>
          <div className="login-footer">
            <a href="#">Şifremi unuttum</a>
          </div>
        </form>
      </section>
    </main>
  );
}
