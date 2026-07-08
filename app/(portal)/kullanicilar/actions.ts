"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROLES } from "@/lib/roles";


export async function createUser(
  formData: FormData
) {

  const session = await auth();


  if (
    session?.user?.role !== ROLES.ADMIN &&
    session?.user?.role !== ROLES.SUPER_ADMIN
  ) {
    throw new Error("Yetkisiz erişim");
  }


  const name =
    String(formData.get("name"));


  const email =
    String(formData.get("email"));


  const role =
    String(formData.get("role")) as any;



  const existingUser =
    await prisma.user.findUnique({
      where:{
        email
      }
    });


  if(existingUser){

    throw new Error(
      "Bu kullanıcı zaten kayıtlı"
    );

  }



  await prisma.user.create({

    data:{

      name,

      email,

      role,

      passwordHash:
        "ENTRA_ONLY",

      isActive:true,

    }

  });



  redirect("/kullanicilar");

}