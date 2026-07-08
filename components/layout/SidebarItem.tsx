"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


type Props = {
  title: string;
  href: string;
};



export default function SidebarItem({
  title,
  href,
}: Props) {


  const pathname = usePathname();


  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`);



  return (

    <Link

      href={href}

      className={
        `sidebar-link ${
          active
          ? "active"
          : ""
        }`
      }

    >

      {title}

    </Link>

  );

}