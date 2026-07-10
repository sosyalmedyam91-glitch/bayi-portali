import { UserRole } from "@/lib/roles";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      dbId?: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    dbId?: string;

    role?: UserRole;
  }
}
