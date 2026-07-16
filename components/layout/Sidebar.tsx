import Link from "next/link";
import SidebarItem from "./SidebarItem";

import { auth } from "@/auth";
import { getSidebarMenu } from "@/lib/permissions";
import Image from "next/image";

export default async function Sidebar() {
  const session = await auth();

  if (!session?.user?.role) {
    return null;
  }

  const role = session.user.role;

  const menu = getSidebarMenu(role);

  return (
    <aside className="dashboard-sidebar">
      <Link href="/dashboard">
        <Image
          src="/eys-logo.png"
          alt="EYS Logo"
          width={400}
          height={160}
          className="login-logo"
          priority
        />
      </Link>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <SidebarItem key={item.href} title={item.title} href={item.href} />
        ))}
      </nav>
    </aside>
  );
}
