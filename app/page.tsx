'use client'

import { useState } from 'react'
import { signIn } from "next-auth/react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <img src="/Eys Logo.png" alt="EYS Logo" className="login-logo" />
          <p>EYS portalına erişmek için lütfen EYS hesabınızı kullanın.</p>
        </div>

        {/* method="GET" ve action="/dashboard" kaldırıldı, onun yerine action={clientAction} geldi */}
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          
<button
  type="button"
  onClick={() => {
    setLoading(true);

    signIn("microsoft-entra-id", {
      callbackUrl: "/dashboard",
    });
  }}
  disabled={loading}
>
  {loading ? "Yönlendiriliyor..." : "EYS hesabınız ile giriş yapınız"}
</button>

  <a href="/kayit-ol" className="login-guest">
    Bayi kaydı oluşturmak için tıklayın
  </a>

  <div className="login-footer">
    <a href="#">Şifremi unuttum</a>
  </div>
</form>
      </section>
    </main>
  )
}