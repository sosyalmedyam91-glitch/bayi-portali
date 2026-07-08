import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

import { UserRole } from "./lib/roles";
import { prisma } from "@/lib/prisma";


console.log({
  AUTH_SECRET: process.env.AUTH_SECRET ? "OK" : "MISSING",
  AUTH_URL: process.env.AUTH_URL,
  AUTH_MICROSOFT_ID: process.env.AUTH_MICROSOFT_ID ? "OK" : "MISSING",
  AUTH_MICROSOFT_SECRET: process.env.AUTH_MICROSOFT_SECRET ? "OK" : "MISSING",
  AUTH_MICROSOFT_TENANT_ID: process.env.AUTH_MICROSOFT_TENANT_ID ? "OK" : "MISSING",
});


export const { handlers, auth, signIn, signOut } = NextAuth({

  trustHost: true,

  secret: process.env.AUTH_SECRET,


  providers: [

    MicrosoftEntraID({

      clientId: process.env.AUTH_MICROSOFT_ID!,

      clientSecret: process.env.AUTH_MICROSOFT_SECRET!,

      issuer:
        `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_TENANT_ID}/v2.0`,

    }),

  ],


  session: {

    strategy: "jwt",

    maxAge: 60 * 60 * 24,

  },


  callbacks: {


    async signIn({ user }) {

      if (!user.email) {
        return false;
      }


      const existingUser =
        await prisma.user.findUnique({

          where: {
            email: user.email,
          },

        });


      if (!existingUser) {

        console.log(
          "Yetkisiz kullanıcı:",
          user.email
        );

        return false;

      }


      if (!existingUser.isActive) {

        console.log(
          "Pasif kullanıcı:",
          user.email
        );

        return false;

      }


      return true;

    },


    async jwt({ token }) {


      if (!token.email) {

        return token;

      }


      const dbUser =
        await prisma.user.findUnique({

          where: {
            email: token.email,
          },

        });


if (dbUser) {

  token.dbId =
    dbUser.id;

  token.role =
    dbUser.role;

}


      return token;

    },


async session({ session, token }) {

  if (session.user) {


    if (token.dbId) {
      session.user.dbId =
        Number(token.dbId);
    }


    if (token.role) {
      session.user.role =
        token.role as UserRole;
    }


  }


  return session;

},


  },


  pages: {

    signIn: "/",

  },


});