import { dbPool } from "../db/dbPool.js";
import bcrypt from "bcryptjs";

export async function signUp(request, response, next) {
  const { username, role } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 12);

  const { rows } = await dbPool.query(
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
    [username, hashedPassword, role || "user"],
  );

  const user = rows[0];

  request.login(user, (error) => {
    if (error) {
      return next(error);
    }
    response.json({
      user,
      redirectTo: "/category",
      message: "Registered successfully!",
    });
  });
}
