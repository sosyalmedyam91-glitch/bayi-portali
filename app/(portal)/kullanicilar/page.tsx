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



  const users = await prisma.user.findMany({

    orderBy:{
      createdAt:"desc"
    }

  });



  return (

    <section className="panel user-management">


      <div className="user-header">


        <div>

          <p className="dashboard-subtitle">
            Sistem kullanıcıları
          </p>


          <h1>
            Kullanıcı Yönetimi
          </h1>


        </div>



        <Link
          href="/kullanicilar/yeni"
          className="primary-button"
        >

          + Yeni Kullanıcı

        </Link>


      </div>




      <div className="user-summary">


        <div className="summary-box">

          <span>
            Toplam Kullanıcı
          </span>

          <strong>
            {users.length}
          </strong>


        </div>



        <div className="summary-box">

          <span>
            Aktif Kullanıcı
          </span>

          <strong>
            {
              users.filter(
                user=>user.isActive
              ).length
            }
          </strong>


        </div>



        <div className="summary-box">

          <span>
            Pasif Kullanıcı
          </span>

          <strong>
            {
              users.filter(
                user=>!user.isActive
              ).length
            }
          </strong>


        </div>


      </div>





      <div className="table-wrapper">


        <table className="users-table">


          <thead>

            <tr>

              <th>
                Kullanıcı
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

              <th>
                İşlem
              </th>

            </tr>


          </thead>



          <tbody>


          {
            users.map(user=>(

              <tr key={user.id}>


                <td>

                  <div className="user-name">

                    <div className="avatar">
                      {
                        user.name
                        ?.charAt(0)
                        .toUpperCase()
                        ??
                        "?"
                      }
                    </div>


                    <span>
                      {user.name ?? "-"}
                    </span>


                  </div>


                </td>



                <td>
                  {user.email}
                </td>



                <td>

                  <span className="role-badge">

                    {user.role}

                  </span>


                </td>



                <td>

                  {
                    user.isActive

                    ?

                    <span className="active-badge">
                      Aktif
                    </span>

                    :

                    <span className="passive-badge">
                      Pasif
                    </span>
                  }


                </td>



                <td>

                  {
                    user.lastLoginAt

                    ?

                    user.lastLoginAt
                    .toLocaleDateString(
                      "tr-TR"
                    )

                    :

                    "-"
                  }


                </td>



                <td>

                  <Link
                    href={`/kullanicilar/${user.id}`}
                    className="table-action"
                  >

                    Görüntüle

                  </Link>


                </td>


              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </section>

  );

}