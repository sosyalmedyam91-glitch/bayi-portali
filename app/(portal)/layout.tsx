import { auth } from "@/auth";
import Sidebar from "@/components/layout/Sidebar";


export default async function PortalLayout({
 children,
}:{
 children:React.ReactNode;
}){

 const session = await auth();


 return (

 <main className="dashboard-page">

   <Sidebar />


   <section className="dashboard-main">

    <header className="dashboard-header">

      <div>

       <p className="dashboard-subtitle">
        Hoş geldin {session?.user?.name},
       </p>

       <h1>
        EYS İç Portal
       </h1>

      </div>

    </header>


    {children}


   </section>

 </main>

 );

}