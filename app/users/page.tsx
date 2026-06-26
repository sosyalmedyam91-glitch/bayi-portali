import db from '@/lib/db' // db dosyasının yoluna dikkat et

export default async function UsersPage() {
  // Veritabanından tüm kullanıcıları çekiyoruz
  const users = await db.user.findMany()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h1>
      {users.length === 0 ? (
        <p>Henüz kullanıcı yok.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border-b py-2">
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
