import Link from "next/link";
import SidebarItem from "./SidebarItem";

import { auth } from "@/auth";
import { getSidebarMenu } from "@/lib/permissions";
import { ROLES } from "@/lib/roles";

export default async function Sidebar(){

const session = await auth();

if(!session?.user?.role){

  return null;

}

const role =
 session.user.role;

 const menu =
 getSidebarMenu(role);


 return (

 <aside className="dashboard-sidebar">


 <Link href="/dashboard">
   <img
    src="/Eys Logo.png"
    className="login-logo"
    alt="EYS Logo"
   />
 </Link>



 <nav className="sidebar-nav">

 {
  menu.map(item=>(

   <SidebarItem
    key={item.href}
    title={item.title}
    href={item.href}
   />

  ))
 }


 </nav>


 </aside>

 );

}