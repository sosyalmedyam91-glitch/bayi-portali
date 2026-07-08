import UserMenu from "./UserMenu";

type Props = {
  session: any;
};


export default function Header({
  session,
}: Props) {

  return (
    <header className="dashboard-header">

      <div>
        <p className="dashboard-subtitle">
          Hoş geldin {session?.user?.name}
        </p>

        <h1>
          EYS İç Portal
        </h1>
      </div>


      <UserMenu />

    </header>
  );
}