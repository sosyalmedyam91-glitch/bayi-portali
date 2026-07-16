"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const showForgotPasswordWarning = () => {
    setShowWarning(true);

    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };

  return (
    <main className="login-page">
      <div className="login-wrapper">
        <section className="login-card">
          <div className="login-brand">
            <Image
              src="/eys-logo.png"
              alt="EYS Logo"
              width={400}
              height={160}
              className="login-logo"
              priority
            />
            <p
              style={{
                textAlign: "center",
                marginTop: "25px",
                marginBottom: "25px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              İç ve Dış Portal
            </p>
          </div>

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
              {loading
                ? "Yönlendiriliyor..."
                : "EYS hesabınız ile giriş yapınız"}
            </button>

            <a
              style={{ marginTop: "5px", marginBottom: "5px" }}
              href="/kayit-ol"
              className="login-guest"
            >
              Bayi kaydı oluşturmak için tıklayın
            </a>

            <div className="login-footer">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showForgotPasswordWarning();
                }}
                className="cursor-pointer"
              >
                Şifremi unuttum
              </a>
            </div>
          </form>
        </section>
      </div>
      {/* Tailwind Toast */}
      {showWarning && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-3
            rounded-lg
            bg-[#EA0029]
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

          <span>Lütfen Bilgi İşlem ile iletişime geçin.</span>
        </div>
      )}

      <footer className={styles.footer}>
        {/* Sosyal Medya - En Üst */}
        <div className={styles.footerSocial}>
          <a
            href="https://www.facebook.com/eysmakina"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://www.instagram.com/eysmakina"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.youtube.com/@eysmakina"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

          <a
            href="https://www.linkedin.com/company/eysmakina"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Web Siteleri */}
        <div className={styles.footerWebsites}>
          <a href="https://e-y-s.com" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
            <span>e-y-s.com</span>
          </a>

          <a
            href="https://www.eys-gmbh.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe />
            <span>eys-gmbh.de</span>
          </a>
        </div>

        {/* Destek */}
        <div className={styles.footerSupport}>
          <FaEnvelope />

          <span>Destek talepleri için:</span>

          <a href="mailto:bilgiteknolojileri@e-y-s.com">
            bilgiteknolojileri@e-y-s.com
          </a>
        </div>

        {/* Alt Bilgi */}
        <div className={styles.footerCopy}>
          © {new Date().getFullYear()} EYS Makina • All Rights Reserved
        </div>
      </footer>
    </main>
  );
}
