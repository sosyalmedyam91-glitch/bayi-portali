import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { canAccessRoute } from "@/lib/permissions";

export default auth((req)=>{

 const {pathname} =
 req.nextUrl;

 if(
  pathname === "/" ||
  pathname === "/kayit-ol" ||
  pathname.startsWith("/api/auth")
 ){

  return NextResponse.next();

 }


 if(!req.auth){

  return NextResponse.redirect(
   new URL("/", req.url)
  );

 }


 const role =
 req.auth.user.role;


 if(!role){

  return NextResponse.redirect(
   new URL("/", req.url)
  );

 }


 const allowed =
 canAccessRoute(
  pathname,
  role
 );


 if(!allowed){

  return NextResponse.redirect(
   new URL("/dashboard", req.url)
  );

 }


 return NextResponse.next();


});

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|otf?)).*)",
  ],
};