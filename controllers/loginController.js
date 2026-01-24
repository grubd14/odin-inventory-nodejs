import bcrypt from "bcrypt"
import { dbPool } from "../db/dbPool.js"

async function login(request, response) {
  const { username, password } = request.body;
  
}