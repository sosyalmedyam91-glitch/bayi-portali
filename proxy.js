// proxy.js
import { NextResponse } from 'next/server'

export function proxy(request) {
  // Kullanıcının tarayıcısındaki session çerezini kontrol ediyoruz
  const token = request.cookies.get('session_token')?.value

  // Kullanıcının gitmek istediği URL yolunu alıyoruz
  const { pathname } = request.nextUrl

  // Giriş yapmamış kullanıcı korumalı sayfaya gitmeye çalışıyorsa
  if (!token && pathname.startsWith('/test')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Giriş yapmış kullanıcı login sayfasına gitmeye çalışıyorsa
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/test', request.url))
  }

  // Geçişe izin ver
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/:path*'],
}