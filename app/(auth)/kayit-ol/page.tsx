"use client";

import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="login-page">
      <div className="login-wrapper">
        <section className="register-card">
          <div className="login-brand text-center">
            <Image
              src="/eys-logo.png"
              alt="EYS Logo"
              width={180}
              height={80}
              className="login-logo"
            />

            <h1 className="mt-3 text-xl font-bold text-[#53575A]">
              Bayi Hesabı Oluştur
            </h1>

            <p className="mt-2 text-xs text-[#53575A]/70">
              Platforma erişmek için bayi bilgilerinizi girin.
            </p>
          </div>

          <form className="login-form mt-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#53575A]">
                Ad Soyad
              </label>

              <input type="text" placeholder="Ad Soyad" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#53575A]">
                Şirket Adı
              </label>

              <input type="text" placeholder="Şirket Adı" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#53575A]">
                E-posta
              </label>

              <input type="email" placeholder="ornek@mail.com" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#53575A]">
                Şifre
              </label>

              <input type="password" placeholder="********" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#53575A]">
                Şifre Tekrar
              </label>

              <input type="password" placeholder="********" />
            </div>

            <button type="submit">Kayıt Ol</button>

            <div className="text-center text-sm text-[#53575A]/70 mt-2">
              Zaten hesabınız var mı?{" "}
              <Link
                href="/"
                className="font-semibold text-[#EA0029] hover:underline"
              >
                Giriş Yap
              </Link>
            </div>
          </form>
        </section>
      </div>

      <footer className="register-footer">
        <div>© {new Date().getFullYear()} EYS Makina • All Rights Reserved</div>
      </footer>
    </main>
  );
}
