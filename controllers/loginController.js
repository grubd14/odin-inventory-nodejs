import bcrypt from "bcrypt";
import { dbPool } from "../db/dbPool.js";
import passport from "passport";
import LocalStrategy from "passport-local";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await dbPool.query(
        "SELECT * FROm users WHERE username = $1",
        username,
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (error) {
    done(error);
  }
});

async function login(request, response) {
  response.json({ user: request.user, message: "Welcome Back!!!" });
}

async function logout(request, response, next) {
  request.logout((error) => {
    if (error) {
      return next(error);
    }
    response.redirect("/");
  });
}

export { login, logout };
