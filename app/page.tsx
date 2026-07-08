'use client'

import { useState } from 'react'
import { signIn } from "next-auth/react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const showForgotPasswordWarning = () => {
    setShowWarning(true)

    setTimeout(() => {
      setShowWarning(false)
    }, 3000)
  }

  return (
    <main className="login-page">

      <section className="login-card">
        <div className="login-brand">
          <img src="/eys-logo.png" alt="EYS Logo" className="login-logo" />
          <p>EYS portalına erişmek için lütfen EYS hesabınızı kullanın.</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>

          <button
            type="button"
            onClick={() => {
              setLoading(true)

              signIn("microsoft-entra-id", {
                callbackUrl: "/dashboard",
              })
            }}
            disabled={loading}
          >
            {loading
              ? "Yönlendiriliyor..."
              : "EYS hesabınız ile giriş yapınız"}
          </button>

          <a href="/kayit-ol" className="login-guest">
            Bayi kaydı oluşturmak için tıklayın
          </a>

          <div className="login-footer">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                showForgotPasswordWarning()
              }}
              className="cursor-pointer"
            >
              Şifremi unuttum
            </a>
          </div>

        </form>
      </section>


      {/* Tailwind Toast */}
      {showWarning && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-3
            rounded-lg
            bg-red-600
            px-5 py-3
            text-white
            shadow-lg
            animate-in
            fade-in
            slide-in-from-bottom-5
          "
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z"
            />
          </svg>

          <span>
            Lütfen Bilgi İşlem ile iletişime geçin.
          </span>
        </div>
      )}

    </main>
  )
}