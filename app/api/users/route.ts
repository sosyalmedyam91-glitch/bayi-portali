import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    // Azure Token Alımı
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
      console.error("Azure Token Hatası:", tokenData);
      return NextResponse.json(
        { error: "Azure token alınamadı", details: tokenData },
        { status: 400 },
      );
    }

    const accessToken = tokenData.access_token;

    // Sayfalama (Pagination) için Değişkenler
    let allUsers: any[] = [];
    let nextLink: string | null =
      "https://graph.microsoft.com/beta/users?$select=id,displayName,mail,department&$top=999";

    // Değişkenleri tipleriyle birlikte döngü dışında tanımlıyoruz.
    let graphResponse: Response;
    let graphData: any;

    // Tüm Kullanıcıları Döngüyle Toplama
    while (nextLink) {
      // Döngü içinde 'const' kullanmıyoruz, dışarıdaki değişkeni güncelliyoruz
      graphResponse = await fetch(nextLink, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      graphData = await graphResponse.json();

      if (!graphResponse.ok) {
        console.error("Graph API Hatası (Döngü İçinde):", graphData);
        return NextResponse.json(
          { error: "Graph API hatası", details: graphData },
          { status: 400 },
        );
      }

      // Gelen sayfadaki kullanıcıları ana listeye ekle
      if (graphData.value) {
        allUsers = [...allUsers, ...graphData.value];
      }

      nextLink = graphData["@odata.nextLink"] || null;
    }

    // Veriyi Biçimlendirme
    const formattedUsers = await Promise.all(
      allUsers.map(async (user: any) => {
        const localUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        return {
          id: user.id,
          name: user.displayName,
          email: user.mail || "",
          department: user.department || "Belirtilmemiş",

          role: localUser?.role || UserRole.SPECIALIST,

          isActive: localUser?.isActive ?? true,

          lastLoginAt: localUser?.lastLoginAt || null,
        };
      }),
    );

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Sistem Hatası:", error);
    return NextResponse.json(
      { error: "Kullanıcılar çekilemedi", details: String(error) },
      { status: 500 },
    );
  }
}
