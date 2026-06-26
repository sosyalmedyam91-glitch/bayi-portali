// app/actions/auth.js
'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs' // Şifre karşılaştırması için ekledik

// Kendi veritabanı bağlantınızı import edin. 
// Örnek olarak Prisma kullanıyorsanız:
import { prisma } from '@/lib/prisma' 

export async function handleLogin(formData) {
  const username = formData.get('email')
  const password = formData.get('password')

  try {
    // 1. Veritabanında bu kullanıcı adına sahip biri var mı bakıyoruz
    const user = await prisma.user.findUnique({
      where: { email: username } // ya da email: username
    })

    // 2. Kullanıcı bulunamadıysa hemen hata dönüyoruz
    if (!user) {
      return { error: "Kullanıcı adı veya şifre hatalı!" }
    }

    // 3. Kullanıcı varsa, girilen şifre ile DB'deki hash'lenmiş şifreyi karşılaştırıyoruz
    // Örn: Kullanıcı "123456" girdi, DB'de "$2a$10$X..." şeklinde duruyor.
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { error: "Kullanıcı adı veya şifre hatalı!" }
    }

    // 4. GİRİŞ BAŞARILI! Tarayıcıya oturum çerezini bırakıyoruz
    // Güvenlik için token içerisine kullanıcının ID'sini veya benzersiz bir değerini koyabiliriz
    const cookieStore = await cookies()
    cookieStore.set('session_token', `user_${user.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 Gün geçerli
      path: '/',
    })

  } catch (error) {
    console.error("Giriş hatası:", error)
    return { error: "Sistemsel bir hata oluştu, lütfen tekrar deneyin." }
  }

  // 5. Yönlendirmeyi try-catch bloğunun DIŞINDA yapmalıyız. 
  // Next.js redirect() fonksiyonu dahili bir hata fırlatarak çalışır, try içinde kalırsa catch'e düşer.
  redirect('/dashboard')
}