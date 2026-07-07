import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET!,
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_TENANT_ID}/v2.0`,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 gün
  },

  callbacks: {
    async jwt({ token, profile }) {
      // Microsoft login sonrası user bilgisi token'a eklenir
      if (profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },

    async session({ session, token }) {
      // client tarafına giden session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/", // login sayfan
  },

  debug: process.env.NODE_ENV === "development",
});