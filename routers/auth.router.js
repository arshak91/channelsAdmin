import { Router } from "express";
import { createUser, login, getUsers , changeUser, mailerRespose, forgotPass, authForForgotPass } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/registration", createUser)
authRoutes.post("/login", login)
authRoutes.get("/users/:id", getUsers)
authRoutes.put("/users/:id", changeUser)
authRoutes.get("/checkEmail/:oneTimePass", mailerRespose)

authRoutes.post("/forgotPass", forgotPass)
authRoutes.get("/forgotPass/:oneTimePass", authForForgotPass)

export { authRoutes }