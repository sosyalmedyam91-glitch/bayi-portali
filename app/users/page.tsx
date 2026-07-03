import db from "@/lib/db";

type User = {
  id: number;
  name: string | null;
  email: string | null;
};
export const dynamic = "force-dynamic";
export default async function UsersPage() {
  const users: User[] = await db.user.findMany();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h1>

      {users.length === 0 ? (
        <p>Henüz kullanıcı yok.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border-b py-2">
              {user.name ?? "İsimsiz"} ({user.email ?? "Email yok"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}