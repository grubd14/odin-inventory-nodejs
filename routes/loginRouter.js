import passport from "passport";
import "../controllers/loginController.js";
import { Router } from "express";
import {
  failureLogin,
  login,
  logout,
  successfulLogin,
} from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  successfulLogin,
);

loginRouter.get("/success", successfulLogin);
loginRouter.get("/fail", failureLogin);

loginRouter.post("/log-out", logout);
// loginRouter.get("/", login)

export { loginRouter };
