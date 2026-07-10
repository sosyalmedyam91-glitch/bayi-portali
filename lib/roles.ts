import { UserRole } from "@prisma/client";

export { UserRole };

export const ROLES = {
  SUPER_ADMIN: UserRole.SUPER_ADMIN,
  ADMIN: UserRole.ADMIN,
  SPECIALIST: UserRole.SPECIALIST,
} as const;
