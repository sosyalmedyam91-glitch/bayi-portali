import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "@/lib/users";

const JWT_SECRET = "super-secret-key";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return Response.json(
      { message: "Kullanıcı bulunamadı" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValid) {
    return Response.json(
      { message: "Şifre hatalı" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return Response.json({
    token,
  });
}