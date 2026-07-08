import UserForm from "@/components/UserForm";
import Link from "next/link";


export default function YeniKullanici(){

  return (

    <section className="panel create-user-page">


      <div className="create-user-header">


        <div>

          <p className="dashboard-subtitle">
            Kullanıcı yönetimi
          </p>


          <h1>
            Yeni Kullanıcı
          </h1>


        </div>



        <Link
          href="/kullanicilar"
          className="secondary-button"
        >

          ← Kullanıcılara Dön

        </Link>


      </div>





      <div className="form-card">


        <div className="form-info">

          <p>
            Sisteme yeni bir kullanıcı eklemek için
            aşağıdaki bilgileri doldurun.
          </p>


        </div>



        <UserForm />


      </div>



    </section>

  );

}