import { dbPool } from "../db/dbPool.js";
import bcrypt from "bcrypt"

async function signUp(request, response) {
  const {username, password, role} = req.body
  const hashedPassword = bcrypt.hash(password, 12)
  const { rows } = await dbPool.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3)", [username, hashedPassword, role || "user"]);
  response.json(rows)
};