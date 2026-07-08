import { sidebarMenu } from "./navigation";
import { UserRole, ROLES } from "./roles";


export function getSidebarMenu(
  role: UserRole
) {

  // SUPER_ADMIN tüm menüleri görür
  if (role === ROLES.SUPER_ADMIN) {

    return sidebarMenu.filter(
      item => item.showInSidebar !== false
    );

  }


  return sidebarMenu.filter(
    item =>
      item.roles.includes(role) &&
      item.showInSidebar !== false
  );

}




export function canAccessRoute(
  pathname: string,
  role: UserRole
) {


  if (role === ROLES.SUPER_ADMIN) {

    return true;

  }


  const route =
    sidebarMenu.find(
      item =>
        pathname.startsWith(item.href)
    );


  if (!route) {

    return false;

  }


  return route.roles.includes(role);

}