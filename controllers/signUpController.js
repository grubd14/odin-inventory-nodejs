import { dbPool } from "../db/dbPool.js";
import bcrypt from "bcrypt"

export async function signUp(request, response) {
  const {username, password, role} = request.body
  const hashedPassword = bcrypt.hash(password, 12)
  const { rows } = await dbPool.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3)", [username, hashedPassword, role || "user"]);
  response.json(rows)
};
