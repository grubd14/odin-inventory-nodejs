import { dbPool } from "../db/dbPool.js";
import bcrypt from "bcryptjs";

export async function signUp(request, response) {
  const { username, role } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 12);
  const { rows } = await dbPool.query(
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
    [username, hashedPassword, role || "user"],
  );
  response.json(rows);
  console.log(rows)
}
