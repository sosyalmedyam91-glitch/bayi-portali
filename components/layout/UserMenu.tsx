import { logout } from "@/app/actions/logout";


export default function UserMenu(){

 return (

  <div className="user-menu">


    <form action={logout}>

      <button
        type="submit"
        className="dashboard-logout"
      >
        Çıkış Yap
      </button>

    </form>


  </div>

 );

}