import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/lib/roles";
import Link from "next/link";


export default async function KullaniciYonetimi(){

  const session = await auth();


  if(
    session?.user?.role !== ROLES.ADMIN &&
    session?.user?.role !== ROLES.SUPER_ADMIN
  ){

    redirect("/dashboard");

  }


  const users =
    await prisma.user.findMany({

      orderBy:{
        createdAt:"desc"
      }

    });



  return (

    <section className="dashboard-panel">


      <div className="panel-heading">

        <h1>
          Kullanıcı Yönetimi
        </h1>


        <Link href="/kullanicilar/yeni">
          Yeni Kullanıcı
        </Link>


      </div>



      <table>

        <thead>

          <tr>

            <th>
              Ad
            </th>

            <th>
              Email
            </th>

            <th>
              Rol
            </th>

            <th>
              Durum
            </th>

            <th>
              Son Giriş
            </th>

          </tr>

        </thead>



        <tbody>

        {
          users.map(user=>(

            <tr key={user.id}>

              <td>
                {user.name ?? "-"}
              </td>


              <td>
                {user.email}
              </td>


              <td>
                {user.role}
              </td>


              <td>

                {
                  user.isActive
                  ?
                  "Aktif"
                  :
                  "Pasif"
                }

              </td>


              <td>

                {
                  user.lastLoginAt
                  ?
                  user.lastLoginAt.toLocaleDateString("tr-TR")
                  :
                  "-"
                }

              </td>


            </tr>


          ))
        }

        </tbody>


      </table>


    </section>

  );

}