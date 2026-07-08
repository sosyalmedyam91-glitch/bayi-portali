import { sidebarMenu } from "./navigation";
import { UserRole, ROLES } from "./roles";

export function getSidebarMenu(
  role: UserRole
) {

  // SUPER_ADMIN her şeyi görür
  if (role === ROLES.SUPER_ADMIN) {
    return sidebarMenu;
  }


  return sidebarMenu.filter(
    item =>
      item.roles.includes(role)
  );

}



export function canAccessRoute(
  pathname: string,
  role: UserRole
) {

  // SUPER_ADMIN bypass
  if (role === ROLES.SUPER_ADMIN) {
    return true;
  }


  const route =
    sidebarMenu.find(
      item =>
        pathname.startsWith(item.href)
    );


  // Tanımlı olmayan route'lar
  // güvenlik için kapalı tutulabilir
  if (!route) {
    return false;
  }


  return route.roles.includes(role);

}