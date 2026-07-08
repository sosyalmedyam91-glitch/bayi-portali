import { UserRole } from "@prisma/client";

export { UserRole };


export const ROLES = {
  USER: UserRole.USER,
  BAYI: UserRole.BAYI,
  DEPO: UserRole.DEPO,
  FINANS: UserRole.FINANS,
  ADMIN: UserRole.ADMIN,
  SUPER_ADMIN: UserRole.SUPER_ADMIN,
} as const;