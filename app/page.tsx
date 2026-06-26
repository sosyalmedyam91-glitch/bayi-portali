// app/page.js
'use client'

import { useState } from 'react'
import { handleLogin } from '@/app/actions/auth' // Oluşturduğumuz action'ı import ediyoruz

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function clientAction(formData: FormData) {
    setError(null)
    setLoading(true)
    
    // Sunucu fonksiyonunu çağırıyoruz
    const result = await handleLogin(formData)
    
    // Eğer geriye bir hata döndüyse state'e yazıyoruz
    async function clientAction(formData: FormData) {
  try {
    setError(null)
    setLoading(true)

    const result = await handleLogin(formData)

    if (result?.error) {
      setError(result.error)
    }
  } finally {
    setLoading(false)
  }
}
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <img src="/Eys Logo.png" alt="EYS Bayi Logo" className="login-logo" />
          <p>EYS Bayi portalına erişmek için lütfen bilgilerinizi girin.</p>
        </div>
        
        {/* Hata mesajı varsa ekranda gösteriyoruz */}
        {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        {/* method="GET" ve action="/dashboard" kaldırıldı, onun yerine action={clientAction} geldi */}
        <form className="login-form" action={clientAction}>
          <label>
            <span>Kullanıcı Adı</span>
            <input type="text" name="email" placeholder="E-posta veya kullanıcı adı" required />
          </label>
          <label>
            <span>Şifre</span>
            <input type="password" name="password" placeholder="Şifrenizi girin" required />
          </label>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
          
          <a href="/login" className="login-guest">
            Misafir olarak giriş yap
          </a>
          <div className="login-footer">
            <a href="#">Şifremi unuttum</a>
          </div>
        </form>
      </section>
    </main>
  )
}