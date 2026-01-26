import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";

const signUpRouter = Router()

// signUpRouter.get("/sign-up", ) //no HTML form to currently show
signUpRouter.post("/", signUp)

export {signUpRouter}