"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROLES, UserRole } from "@/lib/roles";

export async function createUser(formData: FormData) {
  const session = await auth();

  if (
    session?.user?.role !== ROLES.ADMIN &&
    session?.user?.role !== ROLES.SUPER_ADMIN
  ) {
    throw new Error("Yetkisiz erişim");
  }

  const name = String(formData.get("name"));

  const email = String(formData.get("email"));

  const roleValue = String(formData.get("role"));

  if (!Object.values(UserRole).includes(roleValue as UserRole)) {
    throw new Error("Geçersiz kullanıcı rolü");
  }

  const role = roleValue as UserRole;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Bu kullanıcı zaten kayıtlı");
  }

  await prisma.user.create({
    data: {
      name,

      email,

      role,

      passwordHash: "ENTRA_ONLY",

      isActive: true,
    },
  });

  redirect("/kullanicilar");
}
