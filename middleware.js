// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // 1. Kullanıcının tarayıcısındaki session çerezini kontrol ediyoruz
  const token = request.cookies.get('session_token')?.value

  // 2. Kullanıcının gitmek istediği URL yolunu alıyoruz
  const { pathname } = request.nextUrl

  // 3. Eğer kullanıcı giriş yapmadıysa (token yoksa) ve korumalı bir sayfaya gitmeye çalışıyorsa
  // Örnek: /dashboard ve altındaki tüm sayfalar
  if (!token && pathname.startsWith('/test')) {
    // Kullanıcıyı direkt login (ana sayfa) sayfasına yönlendiriyoruz
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 4. Eğer kullanıcı ZATEN giriş yaptıysa ve tekrar login sayfasına gitmeye çalışıyorsa
  if (token && pathname === '/') {
    // Onu direkt dashboard'a gönderiyoruz (tekrar giriş yapmasına gerek yok)
    return NextResponse.redirect(new URL('/test', request.url))
  }

  // Her şey yolundaysa geçişe izin ver
  return NextResponse.next()
}

// Hangi sayfalarda bu kontrolün çalışacağını seçiyoruz (Performans için önemli)
export const config = {
  matcher: ['/', '/:path*'], 
  // /dashboard ve /dashboard/raporlar gibi tüm alt kırılımları korur
}