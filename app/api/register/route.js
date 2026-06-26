import bcrypt from "bcryptjs";
import { users } from "@/lib/users";

export async function POST(req) {
  const { email, password } = await req.json();

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return Response.json(
      { message: "Kullanıcı zaten mevcut" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now(),
    email,
    password: hashedPassword,
  });

  return Response.json({
    message: "Kullanıcı oluşturuldu",
  });
}