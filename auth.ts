import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

import { UserRole } from "./lib/roles";
import { prisma } from "@/lib/prisma";

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

  if (!user.email.endsWith("@e-y-s.com")) {

    console.log(
      "Firma dışı kullanıcı:",
      user.email
    );

    return false;

  }

  return true;

},

async jwt({ token, user }) {

  const email =
    user?.email ?? token.email;

  if (!email) {
    return token;
  }

  const dbUser =
    await prisma.user.findUnique({
      where:{
        email
      }
    });

  if(dbUser){

    token.dbId = dbUser.id;
    token.role = dbUser.role;

  }

  return token;
},

async session({session, token}){

 if(session.user){

   session.user.dbId =
     Number(token.dbId);

   session.user.role =
     token.role as UserRole;

 }

 return session;

},

  },

  pages: {

    signIn: "/",

  },

});