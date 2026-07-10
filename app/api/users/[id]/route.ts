// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ROLES } from "@/lib/roles";
import { UserRole } from "@prisma/client"; // Şemanızdaki Enum tipini import ediyoruz

// 1. GET: Kullanıcı Detayını Çekme
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    // A. Azure Token Alımı
    const tokenResponse = await fetch(
      `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.AUTH_MICROSOFT_ID!,
          client_secret: process.env.AUTH_MICROSOFT_SECRET!,
          scope: "https://graph.microsoft.com/.default",
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: "Azure token alınamadı" },
        { status: 400 },
      );
    }

    // B. Microsoft Graph API'den Kullanıcıyı Anlık Çekme
    const graphResponse = await fetch(
      `https://graph.microsoft.com/beta/users/${id}?$select=id,displayName,mail,department`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );

    const graphUser = await graphResponse.json();
    if (!graphResponse.ok) {
      return NextResponse.json(
        { error: "Microsoft Graph üzerinde kullanıcı bulunamadı" },
        { status: 404 },
      );
    }

    // C. Kendi Veritabanınızdan (Prisma) Doğrudan String ID ile Sorgulama
    const localUser = await prisma.user.findUnique({
      where: { id: id }, // Şemanız String olduğu için artık hata vermez
    });

    // D. Verileri Birleştirme
    const combinedUserData = {
      id: graphUser.id,
      name: graphUser.displayName,
      email: graphUser.mail || "",
      department: graphUser.department || "Belirtilmemiş",
      role: localUser?.role || "BAYI", // Şemanızdaki default değer olan BAYI'yi verdik
      isActive: localUser ? localUser.isActive : true,
    };

    return NextResponse.json(combinedUserData);
  } catch (error) {
    console.error("API Detay Getirme Hatası:", error);
    return NextResponse.json({ error: "Sistem hatası" }, { status: 500 });
  }
}

// 2. PATCH: Rol ve Durum Güncelleme
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const { id } = await params;

  if (
    session?.user?.role !== ROLES.ADMIN &&
    session?.user?.role !== ROLES.SUPER_ADMIN
  ) {
    return new NextResponse("Yetkisiz İşlem", { status: 403 });
  }

  try {
    const body = await request.json();
    const { role, isActive, email } = body;

    // Gelen string rol değerini Prisma'nın beklediği UserRole Enum tipine güvenli şekilde cast ediyoruz
    const validatedRole = role as UserRole;

    // Microsoft GUID'si ile yerelde upsert yapıyoruz
    const updatedUser = await prisma.user.upsert({
      where: { id: id },
      update: {
        role: validatedRole,
        isActive: isActive,
      },
      create: {
        id: id,
        email: email || "",
        passwordHash: "MICROSOFT_AUTHENTICATED", // Şemanızda passwordHash zorunlu (required) olduğu için placeholder ekledik
        role: validatedRole,
        isActive: isActive,
        name: body.name || "",
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("API Güncelleme Hatası:", error);
    return new NextResponse("Güncelleme sırasında hata oluştu", {
      status: 500,
    });
  }
}
