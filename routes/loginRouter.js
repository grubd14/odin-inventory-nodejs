import passport from "passport";
import "../controllers/loginController.js";
import { Router } from "express";
import login, { logout } from "../controllers/loginController.js"

const loginRouter = Router();

loginRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

loginRouter.get("/log-out", logout)
loginRouter.get("/", login)


