export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="px-8 pt-10 pb-6 text-center">
          <h1 className="text-3xl font-bold text-[#53575A]">
            Hesap Oluştur
          </h1>

          <p className="mt-3 text-sm text-[#53575A]/70">
            Platforma erişmek için bilgilerinizi girin.
          </p>
        </div>

        <form className="space-y-5 px-8 pb-8">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#53575A]"
            >
              Ad Soyad
            </label>

            <input
              id="name"
              type="text"
              placeholder="Ad Soyad"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#EA0029] focus:ring-2 focus:ring-[#EA0029]/20"
            />
          </div>

                    <div>
            <label
              htmlFor="b.name"
              className="mb-2 block text-sm font-medium text-[#53575A]"
            >
              Şirket Adı
            </label>

            <input
              id="b.name"
              type="text"
              placeholder="Şirket Adı"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#EA0029] focus:ring-2 focus:ring-[#EA0029]/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#53575A]"
            >
              E-posta
            </label>

            <input
              id="email"
              type="email"
              placeholder="ornek@mail.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#EA0029] focus:ring-2 focus:ring-[#EA0029]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#53575A]"
            >
              Şifre
            </label>

            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#EA0029] focus:ring-2 focus:ring-[#EA0029]/20"
            />
          </div>

          <div>
            <label
              htmlFor="passwordAgain"
              className="mb-2 block text-sm font-medium text-[#53575A]"
            >
              Şifre Tekrar
            </label>

            <input
              id="passwordAgain"
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#EA0029] focus:ring-2 focus:ring-[#EA0029]/20"
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-[#EA0029] py-3 font-semibold text-white transition duration-200 hover:bg-[#d10024] active:scale-[0.98]"
          >
            Kayıt Ol
          </button>

          <div className="text-center text-sm text-[#53575A]/70">
            Zaten hesabın var mı?{" "}
            <a
              href="/"
              className="font-semibold text-[#EA0029] hover:underline"
            >
              Giriş Yap
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}