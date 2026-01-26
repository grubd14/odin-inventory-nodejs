import { dbPool } from "../db/dbPool.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await dbPool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return done(null, false, { message: "Incorrect password" });
      }
      done(null, user);
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
    const { rows } = await dbPool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows;

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
    // response.redirect("/");
    response.json({message: "Loged out!!!"})
  });
}

async function successfulLogin(request, response) {
  response.json({message: 'Success!!'})
}

async function failureLogin(request, response) {
  response.json({message: 'Failure'})
}

export { login, logout , successfulLogin, failureLogin};
