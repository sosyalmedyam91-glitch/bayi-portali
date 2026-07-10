import { ROLES, UserRole } from "./roles";

export type NavigationItem = {
  title: string;
  href: string;
  roles: UserRole[];
  showInSidebar?: boolean;
};

export const sidebarMenu: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
    showInSidebar: false,
  },

  {
    title: "Ürünler",
    href: "/urunler",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "Siparişler",
    href: "/siparisler",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "Döküman Merkezi",
    href: "/dokumanlar",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "İş Akışı ve Görev Yönetimi",
    href: "/is-akisi",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "Stoklar",
    href: "/stoklar",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "Teklifler",
    href: "/teklifler",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "Finans ve Cari Hesaplar",
    href: "/finans",
    roles: [ROLES.ADMIN],
  },

  {
    title: "Raporlar ve Analizler",
    href: "/raporlar",
    roles: [ROLES.ADMIN],
  },

  {
    title: "Kullanıcı Yönetimi",
    href: "/kullanicilar",
    roles: [ROLES.ADMIN],
  },

  {
    title: "Bildirimler",
    href: "/bildirimler",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },

  {
    title: "Duyurular",
    href: "/duyurular",
    roles: [ROLES.ADMIN, ROLES.SPECIALIST],
  },
];
